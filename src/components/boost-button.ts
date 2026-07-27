import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles } from "../styles";

@customElement("boost-button")
export class BoostButton extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) hasCancel = false;
  @property({ type: String }) remaining: string | null = null;

  static styles = [cardStyles];

  render() {
    const label = this.active
      ? this.remaining
        ? `Boost ${this.remaining}`
        : "Boost active"
      : "Boost";

    return html`
      <button
        class="boost-button ${this.active ? "active" : ""}"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.active ? "Boost active" : "Start boost"}
        aria-pressed=${this.active ? "true" : "false"}
        @click=${this._handleClick}
        @contextmenu=${this._handleContextMenu}
      >
        <span aria-live="polite">${label}</span>
      </button>
    `;
  }

  private _handleClick(event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent("boost-press", { bubbles: true, composed: true }),
    );
  }

  private _handleContextMenu(event: Event) {
    if (!this.hasCancel || !this.active) return;
    event.preventDefault();
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
