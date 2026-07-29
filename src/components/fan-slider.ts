import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fanSliderStyles } from "../styles";
import type { FanOption } from "../types";

@customElement("fan-slider")
export class FanSlider extends LitElement {
  @property({ attribute: false }) options: FanOption[] = [];
  @property({ type: Number }) index = 0;
  @property({ type: Boolean }) readOnly = false;
  @property({ type: Boolean }) isAuto = false;

  static styles = [fanSliderStyles];

  render() {
    const fillPercent =
      this.options.length > 1 ? (this.index / (this.options.length - 1)) * 100 : 0;

    return html`
      <div
        class="slider"
        role="slider"
        aria-label="Fan speed"
        aria-valuemin="0"
        aria-valuemax=${Math.max(0, this.options.length - 1)}
        aria-valuenow=${this.index}
        aria-readonly=${this.readOnly ? "true" : "false"}
        tabindex=${this.readOnly ? -1 : 0}
        @keydown=${this._handleKeydown}
      >
        <div class="track-bg"></div>
        <div class="track-fill" style="width: ${fillPercent}%"></div>
        <div class="steps">
          ${this.options.map(
            (option, index) => html`
              <button
                class="step ${index === this.index ? "active" : ""} ${this.readOnly ? "readonly" : ""}"
                type="button"
                ?disabled=${this.readOnly}
                aria-label=${option.label}
                title=${option.label}
                aria-current=${index === this.index ? "true" : "false"}
                @click=${() => this._select(index)}
              >
                <span class="dot"></span>
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }

  private _select(index: number) {
    if (this.readOnly || index === this.index) return;
    this.dispatchEvent(
      new CustomEvent("fan-select", {
        bubbles: true,
        composed: true,
        detail: { index, value: this.options[index]?.value },
      }),
    );
  }

  private _handleKeydown(event: KeyboardEvent) {
    if (this.readOnly) return;

    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = Math.min(this.options.length - 1, this.index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = Math.max(0, this.index - 1);
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = this.options.length - 1;
    }

    if (next === null) return;

    event.preventDefault();
    this._select(next);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fan-slider": FanSlider;
  }
}
