import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  CARD_ELEMENT,
  DEFAULT_FAN_OPTIONS,
  DEFAULT_MINIMUM_TARGET_SEPARATION,
  DEFAULT_POWER_ON_MODE,
  DEFAULT_TARGET_STEP,
} from "./constants";
import type { FanOption, HomeAssistant, TwoStageThermostatConfig } from "./types";

@customElement(`${CARD_ELEMENT}-editor`)
export class TwoStageThermostatEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config!: TwoStageThermostatConfig;

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    label {
      font-size: 0.8125rem;
      color: var(--secondary-text-color);
    }

    input,
    select {
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
  `;

  setConfig(config: TwoStageThermostatConfig): void {
    this._config = { ...config };
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="editor">
        <div class="row">
          <label for="name">Card title</label>
          <input
            id="name"
            .value=${this._config.name ?? ""}
            @change=${(e: Event) =>
              this._update({ name: (e.target as HTMLInputElement).value || undefined })}
          />
        </div>

        ${this._entityField("climate_entity", "Climate entity", "climate")}
        ${this._entityField("temperature_entity", "Temperature sensor", "sensor")}
        ${this._entityField("operating_state_entity", "Operating state sensor", "sensor")}
        ${this._entityField("fan_auto_entity", "Fan auto boolean", "input_boolean")}
        ${this._entityField("fan_override_entity", "Fan override select", "input_select")}
        ${this._entityField("effective_fan_entity", "Effective fan sensor", "sensor")}
        ${this._entityField("recommended_fan_entity", "Recommended fan sensor", "sensor")}
        ${this._entityField("boost_script_entity", "Boost script", "script")}
        ${this._entityField("boost_cancel_script_entity", "Boost cancel script", "script")}
        ${this._entityField("boost_active_entity", "Boost active boolean", "input_boolean")}
        ${this._entityField("boost_timer_entity", "Boost timer", "timer")}

        <div class="row">
          <label for="power_on_mode">Power on mode</label>
          <input
            id="power_on_mode"
            .value=${this._config.power_on_mode ?? DEFAULT_POWER_ON_MODE}
            @change=${(e: Event) =>
              this._update({
                power_on_mode: (e.target as HTMLInputElement).value,
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
                minimum_target_separation: Number((e.target as HTMLInputElement).value),
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
    `;
  }

  private _entityField(
    key: keyof TwoStageThermostatConfig,
    label: string,
    _domain: string,
  ) {
    const value = (this._config[key] as string | undefined) ?? "";
    return html`
      <div class="row">
        <label for=${key}>${label}</label>
        <input
          id=${key}
          .value=${value}
          placeholder="entity_id"
          @change=${(e: Event) =>
            this._update({
              [key]: (e.target as HTMLInputElement).value || undefined,
            } as Partial<TwoStageThermostatConfig>)}
        />
      </div>
    `;
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
        const [value, label] = line.split(":");
        return { value: value.trim(), label: (label ?? value).trim() };
      });

    this._update({
      fan_options: options.length ? options : undefined,
    });
  }

  private _update(patch: Partial<TwoStageThermostatConfig>) {
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
