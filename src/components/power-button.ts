import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles } from "../styles";

@customElement("power-button")
export class PowerButton extends LitElement {
  @property({ type: Boolean }) on = false;
  @property({ type: Boolean }) disabled = false;

  static styles = [cardStyles];

  render() {
    return html`
      <button
        class="power-button ${this.on ? "on" : ""}"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.on ? "Turn climate off" : "Turn climate on"}
        aria-pressed=${this.on ? "true" : "false"}
        @click=${this._handleClick}
      >
        ${this.on ? "⏻" : "○"}
      </button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("power-toggle", { bubbles: true, composed: true }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "power-button": PowerButton;
  }
}
