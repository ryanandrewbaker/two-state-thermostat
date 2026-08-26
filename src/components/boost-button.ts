import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles } from "../styles";

@customElement("boost-button")
export class BoostButton extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) hasCancel = false;
  @property({ type: String }) remaining: string | null = null;
  @property({ type: Boolean }) switchMode = false;

  static styles = [
    cardStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
    `,
  ];

  render() {
    if (this.switchMode) {
      return html`
        <button
          class="boost-button switch-mode"
          type="button"
          ?disabled=${this.disabled}
          aria-label="Switch mode"
          @click=${this._handleSwitchModeClick}
        >
          <span>Switch Mode</span>
        </button>
      `;
    }

    if (this.active) {
      const remainingLabel = this.remaining ?? "Boost";
      const extendLabel = this.remaining
        ? `Boost remaining ${this.remaining}. Click to extend.`
        : "Extend boost";

      return html`
        <button
          class="boost-button active boost-extend"
          type="button"
          ?disabled=${this.disabled}
          aria-label=${extendLabel}
          @click=${this._handleClick}
        >
          <span aria-live="polite">${remainingLabel}</span>
        </button>
        ${
          this.hasCancel
            ? html`
                <button
                  class="boost-cancel"
                  type="button"
                  ?disabled=${this.disabled}
                  aria-label="Cancel boost"
                  @click=${this._handleCancelClick}
                >
                  ×
                </button>
              `
            : nothing
        }
      `;
    }

    return html`
      <button
        class="boost-button"
        type="button"
        ?disabled=${this.disabled}
        aria-label="Start boost"
        aria-pressed="false"
        @click=${this._handleClick}
      >
        <span>Boost</span>
      </button>
    `;
  }

  private _handleClick(event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("boost-press", { bubbles: true, composed: true }),
    );
  }

  private _handleSwitchModeClick(event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("switch-mode", { bubbles: true, composed: true }),
    );
  }

  private _handleCancelClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("boost-cancel", { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "boost-button": BoostButton;
  }
}
