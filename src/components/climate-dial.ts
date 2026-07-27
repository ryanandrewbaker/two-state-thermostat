import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  clampAngleToArc,
  describeArcState,
  getArcGeometry,
  targetFromAngle,
  tempToAngle,
} from "../state";
import { dialStyles } from "../styles";
import type { CardViewState, ClimateRange, TargetAdjustment } from "../types";

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

function pointerAngle(svg: SVGSVGElement, clientX: number, clientY: number): number {
  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 200;
  const y = ((clientY - rect.top) / rect.height) * 200;
  const angleDeg = (Math.atan2(y - 100, x - 100) * 180) / Math.PI;
  return clampAngleToArc(angleDeg);
}

@customElement("climate-dial")
export class ClimateDial extends LitElement {
  @property({ attribute: false }) viewState!: CardViewState;
  @property({ type: Number }) minimumTargetSeparation = 1;
  @property({ type: Boolean }) disabled = false;

  @state() private _dragTarget: "low" | "high" | null = null;
  @state() private _preview: TargetAdjustment | null = null;

  static styles = [
    dialStyles,
    css`
      :host {
        display: block;
      }

      .knob-hit {
        fill: transparent;
        stroke: none;
        cursor: grab;
        touch-action: none;
      }

      .knob-hit.dragging {
        cursor: grabbing;
      }
    `,
  ];

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._endDrag(false);
  }

  private get arcState() {
    return describeArcState(this.viewState.operatingState);
  }

  private get displayClimate(): ClimateRange {
    if (!this._preview) return this.viewState.climate;

    const climate = this.viewState.climate;
    return {
      ...climate,
      targetLow: this._preview.targetLow,
      targetHigh: this._preview.targetHigh,
    };
  }

  private get geometry() {
    return getArcGeometry(this.displayClimate);
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
    const displayClimate = this.displayClimate;
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
    const targetLow = displayClimate.targetLow;
    const targetHigh = displayClimate.targetHigh;

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
          ${this._renderKnob("low", lowKnob, targetLow, "Heating target")}
          ${this._renderKnob("high", highKnob, targetHigh, "Cooling target")}
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
            ${this.formatTemp(targetLow)} · ${this.formatTemp(targetHigh)}
          </div>
        </div>
      </div>
    `;
  }

  private _renderKnob(
    which: "low" | "high",
    position: { x: number; y: number } | null,
    target: number | null,
    label: string,
  ) {
    if (!position || target === null) return nothing;

    const dragging = this._dragTarget === which;
    const knobClass = which === "low" ? "knob knob-heat" : "knob knob-cool";

    return svg`
      <g
        role="slider"
        aria-label=${label}
        aria-valuemin=${this.viewState.climate.minTemp}
        aria-valuemax=${this.viewState.climate.maxTemp}
        aria-valuenow=${target}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? -1 : 0}
        @keydown=${(event: KeyboardEvent) => this._handleKnobKeydown(event, which)}
      >
        <circle
          class="knob-hit ${dragging ? "dragging" : ""}"
          cx=${position.x}
          cy=${position.y}
          r="18"
          ?disabled=${this.disabled}
          @pointerdown=${(event: PointerEvent) => this._handlePointerDown(event, which)}
        ></circle>
        <circle
          class="${knobClass}${dragging ? " dragging" : ""}"
          cx=${position.x}
          cy=${position.y}
          r="8"
        ></circle>
      </g>
    `;
  }

  private _handleKnobKeydown(event: KeyboardEvent, which: "low" | "high") {
    if (this.disabled) return;

    const { climate } = this.viewState;
    if (climate.targetLow === null || climate.targetHigh === null) return;

    let delta: number | null = null;
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      delta = climate.step;
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      delta = -climate.step;
    }

    if (delta === null) return;

    event.preventDefault();
    const angle =
      which === "low"
        ? tempToAngle(climate.targetLow + delta, climate.minTemp, climate.maxTemp)
        : tempToAngle(climate.targetHigh + delta, climate.minTemp, climate.maxTemp);
    const adjusted = targetFromAngle(
      angle,
      which,
      climate,
      this.minimumTargetSeparation,
    );
    if (!adjusted) return;

    this._commitTarget(adjusted);
  }

  private _handlePointerDown(event: PointerEvent, which: "low" | "high") {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    const hitTarget = event.currentTarget as SVGCircleElement;
    hitTarget.setPointerCapture(event.pointerId);

    this._dragTarget = which;
    this._updatePreviewFromPointer(event, which);

    hitTarget.addEventListener("pointermove", this._handlePointerMove);
    hitTarget.addEventListener("pointerup", this._handlePointerUp);
    hitTarget.addEventListener("pointercancel", this._handlePointerUp);
  }

  private _handlePointerMove = (event: PointerEvent) => {
    if (!this._dragTarget) return;
    this._updatePreviewFromPointer(event, this._dragTarget);
  };

  private _handlePointerUp = (event: PointerEvent) => {
    const hitTarget = event.currentTarget as SVGCircleElement;
    hitTarget.removeEventListener("pointermove", this._handlePointerMove);
    hitTarget.removeEventListener("pointerup", this._handlePointerUp);
    hitTarget.removeEventListener("pointercancel", this._handlePointerUp);

    if (hitTarget.hasPointerCapture(event.pointerId)) {
      hitTarget.releasePointerCapture(event.pointerId);
    }

    this._endDrag(true);
  };

  private _updatePreviewFromPointer(event: PointerEvent, which: "low" | "high") {
    const svg = this.shadowRoot?.querySelector("svg");
    if (!svg) return;

    const angle = pointerAngle(svg, event.clientX, event.clientY);
    const adjusted = targetFromAngle(
      angle,
      which,
      this.viewState.climate,
      this.minimumTargetSeparation,
    );
    if (!adjusted) return;

    this._preview = adjusted;
  }

  private _endDrag(commit: boolean) {
    if (commit && this._preview) {
      const { targetLow, targetHigh } = this.viewState.climate;
      if (
        this._preview.targetLow !== targetLow ||
        this._preview.targetHigh !== targetHigh
      ) {
        this._commitTarget(this._preview);
      }
    }

    this._dragTarget = null;
    this._preview = null;
  }

  private _commitTarget(targets: TargetAdjustment) {
    this.dispatchEvent(
      new CustomEvent("target-change", {
        bubbles: true,
        composed: true,
        detail: targets,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "climate-dial": ClimateDial;
  }
}
