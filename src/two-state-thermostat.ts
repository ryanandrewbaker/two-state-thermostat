import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./editor";
import "./components/boost-button";
import "./components/climate-dial";
import "./components/fan-slider";
import "./components/power-button";
import { isCompatibleClimateEntity } from "./config";
import {
  CARD_ELEMENT,
  CARD_NAME,
  CARD_TYPE,
  CARD_VERSION,
  DOCUMENTATION_URL,
} from "./constants";
import {
  adjustTarget,
  buildCardViewState,
  getMinimumTargetSeparation,
  resolveCardConfig,
  resolveFanOptions,
  validateConfig,
} from "./state";
import {
  cancelBoost,
  setFanAuto,
  setFanOverride,
  setPower,
  setTemperature,
  triggerBoost,
} from "./services";
import { cardStyles } from "./styles";
import type { HomeAssistant, RawCardConfig, ResolvedCardConfig } from "./types";

@customElement(CARD_ELEMENT)
export class TwoStageThermostatCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config!: RawCardConfig;
  @state() private _pending = false;

  static styles = [cardStyles];

  public setConfig(config: RawCardConfig): void {
    const errors = validateConfig(config);
    const hasEntity = Boolean(config.entity?.trim() || config.climate_entity?.trim());
    if (hasEntity && errors.length) {
      throw new Error(errors.join("; "));
    }
    this._config = config;
  }

  public static getConfigElement() {
    return document.createElement(`${CARD_ELEMENT}-editor`);
  }

  public static getStubConfig(): Partial<RawCardConfig> {
    return {};
  }

  public getCardSize(): number {
    return 5;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      rows: 5,
      min_rows: 4,
    };
  }

  private _resolvedConfig(): ResolvedCardConfig {
    return resolveCardConfig(this.hass, this._config);
  }

  render() {
    if (!this._config) return html``;

    const view = buildCardViewState(this.hass, this._config);
    const resolved = this._resolvedConfig();
    const fanOptions = resolveFanOptions(resolved);
    const disabled = this._pending || view.errors.length > 0;

    if (view.errors.length) {
      return html`
        <ha-card>
          <div class="card">
            <div class="error">${view.errors.join(" ")}</div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="card">
          <div class="title">${view.title}</div>

          <climate-dial .viewState=${view}></climate-dial>

          <div class="target-controls">
            <div class="target-group">
              <button
                type="button"
                aria-label="Decrease heating target"
                ?disabled=${disabled}
                @click=${() => this._adjustTarget("low", -view.climate.step)}
              >
                −
              </button>
              <span class="target-label"
                >${view.climate.targetLow?.toFixed(1) ?? "—"}</span
              >
              <button
                type="button"
                aria-label="Increase heating target"
                ?disabled=${disabled}
                @click=${() => this._adjustTarget("low", view.climate.step)}
              >
                +
              </button>
            </div>
            <div class="target-group">
              <button
                type="button"
                aria-label="Decrease cooling target"
                ?disabled=${disabled}
                @click=${() => this._adjustTarget("high", -view.climate.step)}
              >
                −
              </button>
              <span class="target-label"
                >${view.climate.targetHigh?.toFixed(1) ?? "—"}</span
              >
              <button
                type="button"
                aria-label="Increase cooling target"
                ?disabled=${disabled}
                @click=${() => this._adjustTarget("high", view.climate.step)}
              >
                +
              </button>
            </div>
          </div>

          <div class="controls-row">
            <power-button
              .on=${view.climate.isOn}
              .disabled=${disabled}
              @power-toggle=${this._togglePower}
            ></power-button>

            ${
              view.boost.available
                ? html`
                    <boost-button
                      .active=${view.boost.active}
                      .disabled=${disabled}
                      .remaining=${view.boost.remaining}
                      .hasCancel=${view.boost.hasCancel}
                      @boost-press=${this._handleBoost}
                      @boost-cancel=${this._handleBoostCancel}
                    ></boost-button>
                  `
                : nothing
            }
          </div>

          ${
            view.fan.available
              ? html`
                  <div class="fan-section">
                    <div class="fan-header">
                      <span class="fan-label">${view.fan.displayLabel}</span>
                      <button
                        class="auto-toggle ${view.fan.isAuto ? "active" : ""}"
                        type="button"
                        aria-label="${
                          view.fan.isAuto
                            ? "Disable automatic fan"
                            : "Enable automatic fan"
                        }"
                        aria-pressed=${view.fan.isAuto ? "true" : "false"}
                        ?disabled=${disabled}
                        @click=${this._toggleFanAuto}
                      >
                        Auto
                      </button>
                    </div>
                    <fan-slider
                      .options=${fanOptions}
                      .index=${view.fan.sliderIndex}
                      .readOnly=${view.fan.readOnly}
                      .isAuto=${view.fan.isAuto}
                      @fan-select=${this._handleFanSelect}
                    ></fan-slider>
                    ${
                      resolved.show_recommended_fan !== false &&
                      view.fan.recommendedValue
                        ? html`
                            <div class="secondary-status">
                              Recommended: ${view.fan.recommendedValue}
                            </div>
                          `
                        : nothing
                    }
                  </div>
                `
              : nothing
          }
          ${
            view.warnings.length
              ? html`<div class="warning">${view.warnings.join(" ")}</div>`
              : nothing
          }
        </div>
      </ha-card>
    `;
  }

  private async _withPending<T>(action: () => Promise<T>): Promise<T | void> {
    if (this._pending || !this.hass) return;
    this._pending = true;
    try {
      return await action();
    } finally {
      this._pending = false;
    }
  }

  private async _togglePower() {
    if (!this.hass) return;
    const resolved = this._resolvedConfig();
    const view = buildCardViewState(this.hass, this._config);
    await this._withPending(() => setPower(this.hass!, resolved, !view.climate.isOn));
  }

  private async _adjustTarget(which: "low" | "high", delta: number) {
    if (!this.hass) return;
    const resolved = this._resolvedConfig();
    const view = buildCardViewState(this.hass, this._config);
    const adjusted = adjustTarget(
      view.climate,
      which,
      delta,
      getMinimumTargetSeparation(resolved),
    );
    if (!adjusted) return;
    await this._withPending(() => setTemperature(this.hass!, resolved, adjusted));
  }

  private async _handleBoost() {
    if (!this.hass) return;
    await this._withPending(() => triggerBoost(this.hass!, this._resolvedConfig()));
  }

  private async _handleBoostCancel() {
    if (!this.hass) return;
    await this._withPending(() => cancelBoost(this.hass!, this._resolvedConfig()));
  }

  private async _toggleFanAuto() {
    if (!this.hass) return;
    const resolved = this._resolvedConfig();
    const view = buildCardViewState(this.hass, this._config);
    await this._withPending(() => setFanAuto(this.hass!, resolved, !view.fan.isAuto));
  }

  private async _handleFanSelect(event: CustomEvent<{ value: string }>) {
    if (!this.hass || !event.detail?.value) return;
    await this._withPending(() =>
      setFanOverride(this.hass!, this._resolvedConfig(), event.detail.value),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "two-state-thermostat": TwoStageThermostatCard;
  }
}

window.customCards = window.customCards ?? [];
const existingIndex = window.customCards.findIndex((entry) => entry.type === CARD_TYPE);
const cardEntry = {
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "A dual-range climate card with staged Boost and Maintain feedback.",
  preview: true,
  documentationURL: DOCUMENTATION_URL,
  getEntitySuggestion(hass: HomeAssistant, entityId: string) {
    if (!isCompatibleClimateEntity(hass, entityId)) return null;
    return {
      config: {
        type: `custom:${CARD_TYPE}`,
        entity: entityId,
      },
    };
  },
};

if (existingIndex >= 0) {
  window.customCards[existingIndex] = cardEntry;
} else {
  window.customCards.push(cardEntry);
}

console.info(
  `%c ${CARD_NAME} %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;",
);
