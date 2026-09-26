import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles } from "../styles";

@customElement("fan-mode-button")
export class FanModeButton extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static styles = [cardStyles];

  render() {
    return html`
      <button
        class="fan-mode-button ${this.active ? "active" : ""}"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.active ? "Leave fan only mode" : "Enable fan only mode"}
        aria-pressed=${this.active ? "true" : "false"}
        title="Fan only"
        @click=${this._handleClick}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 11a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1m.5-9C17 2 17.11 5.57 14.75 6.75c-.99.49-1.43 1.54-1.62 2.47.48.2.9.51 1.22.91 3.7-2 7.68-1.21 7.68 2.37 0 4.5-3.57 4.6-4.75 2.23-.5-.99-1.56-1.43-2.49-1.62-.2.48-.51.89-.91 1.23 1.99 3.69 1.2 7.66-2.38 7.66-4.5 0-4.59-3.58-3.23-5.76.98-.49 1.42-1.53 1.62-2.45-.49-.2-.92-.52-1.24-.92C5.96 15.85 2 15.07 2 11.5 2 7 5.56 6.89 6.74 9.26c.5.99 1.55 1.42 2.48 1.61.19-.48.51-.9.92-1.22C8.15 5.96 8.94 2 12.5 2Z"
          ></path>
        </svg>
      </button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("fan-mode-toggle", { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fan-mode-button": FanModeButton;
  }
}
