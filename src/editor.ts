import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { buildDiscoverySummary, normalizeControllerEntity } from "./config";
import {
  CARD_ELEMENT,
  DEFAULT_FAN_OPTIONS,
  DEFAULT_MINIMUM_TARGET_SEPARATION,
  DEFAULT_POWER_ON_MODE,
  DEFAULT_TARGET_STEP,
} from "./constants";
import type { FanOption, HomeAssistant, RawCardConfig } from "./types";

@customElement(`${CARD_ELEMENT}-editor`)
export class TwoStageThermostatEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config!: RawCardConfig;
  @state() private _advancedOpen = false;

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label,
    .section-label {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
    }

    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin: 0;
    }

    .empty-state {
      padding: 12px;
      border-radius: 8px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      font-size: 0.875rem;
    }

    .discovery {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .discovery-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary-text-color);
      margin: 0;
    }

    .discovery-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.8125rem;
      color: var(--primary-text-color);
    }

    .discovery-icon {
      flex-shrink: 0;
      width: 1rem;
      text-align: center;
    }

    .discovery-icon.found {
      color: var(--success-color, #4caf50);
    }

    .discovery-icon.warning {
      color: var(--warning-color, #ff9800);
    }

    .discovery-icon.missing-optional {
      color: var(--disabled-text-color);
    }

    .discovery-detail {
      color: var(--secondary-text-color);
      font-size: 0.75rem;
    }

    .advanced {
      border-top: 1px solid var(--divider-color);
      padding-top: 8px;
    }

    .advanced summary {
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary-text-color);
      padding: 4px 0;
    }

    .advanced-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 12px;
    }

    input[type="text"],
    input[type="number"],
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--primary-text-color);
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-row label {
      color: var(--primary-text-color);
    }
  `;

  setConfig(config: RawCardConfig): void {
    this._config = { ...config };
  }

  render() {
    if (!this._config) return html``;

    const controllerEntity = normalizeControllerEntity(this._config);
    const discovery = controllerEntity
      ? buildDiscoverySummary(this.hass, this._config)
      : [];

    return html`
      <div class="editor">
        ${
          controllerEntity
            ? nothing
            : html`
                <div class="empty-state">
                  Select a Two State Thermostat controller to begin.
                </div>
              `
        }

        <div class="row">
          <label>Controller entity</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${controllerEntity ?? ""}
            .includeDomains=${["climate"]}
            allow-custom-entity
            @value-changed=${this._onControllerChanged}
          ></ha-entity-picker>
          <p class="hint">
            Select the virtual climate controller. Companion entities are discovered
            automatically from its attributes.
          </p>
        </div>

        <div class="row">
          <label for="name">Display name (optional)</label>
          <input
            id="name"
            type="text"
            .value=${this._config.name ?? ""}
            placeholder="Leave blank to use entity name"
            @change=${(e: Event) =>
              this._update({ name: (e.target as HTMLInputElement).value || undefined })}
          />
        </div>

        ${
          controllerEntity && discovery.length
            ? html`
                <div class="discovery">
                  <p class="discovery-title">Controller configuration detected</p>
                  ${discovery.map((item) => this._renderDiscoveryItem(item))}
                </div>
              `
            : nothing
        }

        <details
          class="advanced"
          ?open=${this._advancedOpen}
          @toggle=${this._onAdvancedToggle}
        >
          <summary>Advanced configuration</summary>
          <div class="advanced-content">
            <p class="hint">
              Explicit values here override auto-discovery from the controller entity.
            </p>

            ${this._entityPicker("temperature_entity", "Temperature entity", ["sensor"])}
            ${this._entityPicker("operating_state_entity", "Operating-state entity", [
              "sensor",
            ])}
            ${this._entityPicker("fan_auto_entity", "Fan auto entity", ["input_boolean"])}
            ${this._entityPicker("fan_override_entity", "Fan override entity", [
              "input_select",
            ])}
            ${this._entityPicker("effective_fan_entity", "Effective fan entity", ["sensor"])}
            ${this._entityPicker("recommended_fan_entity", "Recommended fan entity", [
              "sensor",
            ])}
            ${this._entityPicker("boost_script_entity", "Boost script", ["script"])}
            ${this._entityPicker("boost_cancel_script_entity", "Boost cancel script", [
              "script",
            ])}
            ${this._entityPicker("boost_active_entity", "Boost active entity", [
              "input_boolean",
            ])}
            ${this._entityPicker("boost_timer_entity", "Boost timer", ["timer"])}

            <div class="row">
              <label for="power_on_mode">Power on mode</label>
              <input
                id="power_on_mode"
                type="text"
                .value=${this._config.power_on_mode ?? DEFAULT_POWER_ON_MODE}
                @change=${(e: Event) =>
                  this._update({
                    power_on_mode: (e.target as HTMLInputElement).value || undefined,
                  })}
              />
            </div>

            <div class="row">
              <label for="target_step">Target step</label>
              <input
                id="target_step"
                type="number"
                step="0.1"
                .value=${String(this._config.target_step ?? DEFAULT_TARGET_STEP)}
                @change=${(e: Event) =>
                  this._update({
                    target_step: Number((e.target as HTMLInputElement).value),
                  })}
              />
            </div>

            <div class="row">
              <label for="minimum_target_separation">Minimum target separation</label>
              <input
                id="minimum_target_separation"
                type="number"
                step="0.1"
                .value=${String(
                  this._config.minimum_target_separation ??
                    DEFAULT_MINIMUM_TARGET_SEPARATION,
                )}
                @change=${(e: Event) =>
                  this._update({
                    minimum_target_separation: Number(
                      (e.target as HTMLInputElement).value,
                    ),
                  })}
              />
            </div>

            ${this._checkbox("show_countdown", "Show boost countdown", true)}
            ${this._checkbox("show_recommended_fan", "Show recommended fan", true)}
            ${this._checkbox("show_effective_targets", "Show effective targets", false)}

            <div class="row">
              <label>Fan options (value:label per line)</label>
              <textarea
                rows="4"
                .value=${this._fanOptionsText()}
                @change=${this._updateFanOptions}
              ></textarea>
            </div>
          </div>
        </details>
      </div>
    `;
  }

  private _renderDiscoveryItem(item: ReturnType<typeof buildDiscoverySummary>[number]) {
    if (item.status === "fallback") {
      return html`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${item.label}</div>
            <div class="discovery-detail">${item.message}</div>
          </div>
        </div>
      `;
    }

    if (item.status === "unavailable") {
      return html`
        <div class="discovery-item">
          <span class="discovery-icon warning">⚠</span>
          <div>
            <div>${item.label}</div>
            <div class="discovery-detail">${item.message ?? item.entityId}</div>
          </div>
        </div>
      `;
    }

    if (item.status === "found" || item.status === "override") {
      return html`
        <div class="discovery-item">
          <span class="discovery-icon found">✓</span>
          <div>
            <div>${item.label}</div>
            ${
              item.status === "override"
                ? html`<div class="discovery-detail">Manual override</div>`
                : nothing
            }
          </div>
        </div>
      `;
    }

    if (item.optional) {
      return nothing;
    }

    return html`
      <div class="discovery-item">
        <span class="discovery-icon warning">⚠</span>
        <div>
          <div>${item.label}</div>
          <div class="discovery-detail">${item.message ?? "Not discovered"}</div>
        </div>
      </div>
    `;
  }

  private _entityPicker(
    key: keyof RawCardConfig,
    label: string,
    includeDomains: string[],
  ) {
    const value = (this._config[key] as string | undefined) ?? "";
    return html`
      <div class="row">
        <label>${label}</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${value}
          .includeDomains=${includeDomains}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._update({
              [key]: e.detail.value || undefined,
            } as Partial<RawCardConfig>)}
        ></ha-entity-picker>
      </div>
    `;
  }

  private _onControllerChanged(event: CustomEvent) {
    const entityId = event.detail.value as string | undefined;
    const patch: Partial<RawCardConfig> = {
      entity: entityId || undefined,
      climate_entity: undefined,
    };
    this._update(patch);
  }

  private _onAdvancedToggle(event: Event) {
    this._advancedOpen = (event.target as HTMLDetailsElement).open;
  }

  private _checkbox(
    key: "show_countdown" | "show_recommended_fan" | "show_effective_targets",
    label: string,
    defaultValue: boolean,
  ) {
    const checked = this._config[key] ?? defaultValue;
    return html`
      <div class="checkbox-row">
        <input
          id=${key}
          type="checkbox"
          .checked=${checked}
          @change=${(e: Event) =>
            this._update({
              [key]: (e.target as HTMLInputElement).checked,
            })}
        />
        <label for=${key}>${label}</label>
      </div>
    `;
  }

  private _fanOptionsText(): string {
    const options = this._config.fan_options ?? DEFAULT_FAN_OPTIONS;
    return options.map((option) => `${option.value}:${option.label}`).join("\n");
  }

  private _updateFanOptions(event: Event) {
    const raw = (event.target as HTMLTextAreaElement).value;
    const options: FanOption[] = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [value, optionLabel] = line.split(":");
        return { value: value.trim(), label: (optionLabel ?? value).trim() };
      });

    this._update({
      fan_options: options.length ? options : undefined,
    });
  }

  private _update(patch: Partial<RawCardConfig>) {
    this._config = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config: this._config },
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "two-state-thermostat-editor": TwoStageThermostatEditor;
  }
}
