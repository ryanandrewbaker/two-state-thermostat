import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { describeArcState, getArcGeometry } from "../state";
import { dialStyles } from "../styles";
import type { CardViewState } from "../types";

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

@customElement("climate-dial")
export class ClimateDial extends LitElement {
  @property({ attribute: false }) viewState!: CardViewState;

  static styles = [
    dialStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  private get arcState() {
    return describeArcState(this.viewState.operatingState);
  }

  private get geometry() {
    return getArcGeometry(this.viewState.climate);
  }

  private formatTemp(value: number | null): string {
    if (value === null) return "—";
    return value.toFixed(1);
  }

  private splitTemp(value: number | null): { int: string; dec: string } {
    if (value === null) return { int: "—", dec: "" };
    const fixed = value.toFixed(1);
    const [int, dec] = fixed.split(".");
    return { int, dec: `.${dec}` };
  }

  render() {
    const { climate, operatingLabel } = this.viewState;
    const arc = this.arcState;
    const geo = this.geometry;
    const cx = 100;
    const cy = 100;
    const r = 78;
    const trackPath = describeArc(cx, cy, r, geo.startAngle, geo.endAngle);
    const heatPath =
      geo.lowAngle !== null ? describeArc(cx, cy, r, geo.startAngle, geo.lowAngle) : "";
    const coolPath =
      geo.highAngle !== null && geo.lowAngle !== null
        ? describeArc(cx, cy, r, geo.highAngle, geo.endAngle)
        : geo.highAngle !== null
          ? describeArc(cx, cy, r, geo.highAngle, geo.endAngle)
          : "";
    const temp = this.splitTemp(climate.current);
    const lowKnob = geo.lowAngle !== null ? polar(cx, cy, r, geo.lowAngle) : null;
    const highKnob = geo.highAngle !== null ? polar(cx, cy, r, geo.highAngle) : null;
    const currentDot =
      geo.currentAngle !== null ? polar(cx, cy, r, geo.currentAngle) : null;

    return html`
      <div class="dial-wrap ${arc.subdued ? "subdued" : ""}">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <path class="track" d=${trackPath}></path>
          ${
            heatPath
              ? svg`<path
                class="arc-heat ${arc.warmActive ? "active" : ""} ${arc.warmStrong ? "strong" : ""}"
                d=${heatPath}
              ></path>`
              : null
          }
          ${
            coolPath
              ? svg`<path
                class="arc-cool ${arc.coolActive ? "active" : ""} ${arc.coolStrong ? "strong" : ""}"
                d=${coolPath}
              ></path>`
              : null
          }
          ${
            currentDot
              ? svg`<circle class="current-dot" cx=${currentDot.x} cy=${currentDot.y} r="3"></circle>`
              : null
          }
          ${
            lowKnob
              ? svg`<circle
                class="knob knob-heat"
                cx=${lowKnob.x}
                cy=${lowKnob.y}
                r="8"
              ></circle>`
              : null
          }
          ${
            highKnob
              ? svg`<circle
                class="knob knob-cool"
                cx=${highKnob.x}
                cy=${highKnob.y}
                r="8"
              ></circle>`
              : null
          }
        </svg>
        <div class="center">
          <div class="state-label">${operatingLabel}</div>
          <div
            class="temperature"
            aria-label="Current temperature ${this.formatTemp(climate.current)} degrees"
          >
            <span class="temp-int">${temp.int}</span>
            ${temp.dec ? html`<span class="temp-dec">${temp.dec}</span>` : null}
            <span class="temp-unit">°C</span>
          </div>
          <div class="range">
            ${this.formatTemp(climate.targetLow)} ·
            ${this.formatTemp(climate.targetHigh)}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "climate-dial": ClimateDial;
  }
}
