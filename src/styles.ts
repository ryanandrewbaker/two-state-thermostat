import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 12px);
    background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    color: var(--primary-text-color, #fff);
    box-shadow: var(--ha-card-box-shadow, none);
  }

  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--primary-text-color);
    text-align: center;
  }

  .error {
    color: var(--error-color, #f44336);
    padding: 12px;
    border: 1px solid var(--error-color, #f44336);
    border-radius: 8px;
    font-size: 0.875rem;
  }

  .warning {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    text-align: center;
  }

  .controls-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .dial-section {
    position: relative;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  .dial-controls {
    position: absolute;
    left: 50%;
    bottom: 11%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .secondary-status {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    text-align: center;
  }

  button {
    min-width: 42px;
    min-height: 42px;
    border-radius: 50%;
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }

  button:hover:not(:disabled) {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
  }

  button:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--disabled-text-color, rgba(255, 255, 255, 0.38));
  }

  .power-button {
    border-color: color-mix(
      in srgb,
      var(--secondary-text-color, #888) 55%,
      transparent
    );
    color: var(--secondary-text-color);
  }

  .power-button.on {
    border-color: color-mix(in srgb, var(--heat-color, #f0884a) 65%, transparent);
    background: color-mix(in srgb, var(--heat-color, #f0884a) 22%, transparent);
    color: var(--primary-text-color);
  }

  .boost-button {
    min-width: auto;
    border-radius: 999px;
    padding: 0 16px;
    gap: 8px;
    font-size: 0.875rem;
  }

  .boost-button.active {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
    border-color: var(--primary-color, #03a9f4);
  }

  .fan-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .fan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .fan-label {
    font-size: 0.875rem;
    color: var(--primary-text-color);
  }

  .auto-toggle {
    min-width: auto;
    border-radius: 999px;
    padding: 0 14px;
    font-size: 0.8125rem;
  }

  .auto-toggle.active {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
    border-color: var(--primary-color, #03a9f4);
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
`;

export const dialStyles = css`
  :host {
    --dial-track: var(--divider-color, rgba(255, 255, 255, 0.12));
    display: block;
    width: 100%;
  }

  .dial-wrap {
    --heat-color: #f0884a;
    --cool-color: #5a9ae8;
    width: 100%;
    margin: 0 auto;
    aspect-ratio: 1;
    position: relative;
  }

  .dial-wrap.subdued {
    --heat-color: color-mix(
      in srgb,
      var(--secondary-text-color, #888) 82%,
      #c86b3a 18%
    );
    --cool-color: color-mix(
      in srgb,
      var(--secondary-text-color, #888) 82%,
      #4a78b8 18%
    );
  }

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .track {
    fill: none;
    stroke: var(--dial-track);
    stroke-width: 10;
    stroke-linecap: round;
  }

  .arc-heat {
    fill: none;
    stroke: var(--heat-color);
    stroke-linecap: round;
    opacity: 0.48;
    transition:
      opacity 0.2s ease,
      stroke 0.2s ease,
      stroke-width 0.2s ease;
  }

  .arc-heat.base {
    stroke-width: 10;
  }

  .arc-heat.base.active {
    opacity: 0.72;
  }

  .arc-heat.remaining {
    stroke-width: 14;
    opacity: 1;
  }

  .arc-heat.remaining.strong {
    opacity: 1;
    stroke-width: 16;
  }

  .arc-cool {
    fill: none;
    stroke: var(--cool-color);
    stroke-linecap: round;
    opacity: 0.48;
    transition:
      opacity 0.2s ease,
      stroke 0.2s ease,
      stroke-width 0.2s ease;
  }

  .arc-cool.base {
    stroke-width: 10;
  }

  .arc-cool.base.active {
    opacity: 0.72;
  }

  .arc-cool.remaining {
    stroke-width: 14;
    opacity: 1;
  }

  .arc-cool.remaining.strong {
    opacity: 1;
    stroke-width: 16;
  }

  .subdued .arc-heat,
  .subdued .arc-cool {
    opacity: 0.16;
  }

  .subdued .knob-heat,
  .subdued .knob-cool {
    opacity: 0.45;
  }

  .knob {
    fill: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    stroke-width: 3;
    pointer-events: none;
  }

  .knob.dragging {
    stroke-width: 4;
  }

  .knob-hit:disabled,
  .knob-hit[aria-disabled="true"] {
    cursor: not-allowed;
    pointer-events: none;
  }

  .knob-heat {
    stroke: var(--heat-color);
    transition:
      stroke 0.2s ease,
      opacity 0.2s ease,
      stroke-width 0.2s ease;
  }

  .knob-cool {
    stroke: var(--cool-color);
    transition:
      stroke 0.2s ease,
      opacity 0.2s ease,
      stroke-width 0.2s ease;
  }

  .current-dot {
    fill: var(--secondary-text-color);
  }

  .center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    pointer-events: none;
    padding: 24% 18%;
  }

  .state-label {
    font-size: 0.8125rem;
    color: var(--secondary-text-color);
    margin-bottom: 4px;
  }

  .state-label.heating {
    color: var(--heat-color);
    font-weight: 500;
  }

  .state-label.cooling {
    color: var(--cool-color);
    font-weight: 500;
  }

  .temperature {
    display: flex;
    align-items: flex-start;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .temp-int {
    font-size: clamp(2rem, 8vw, 3rem);
    font-weight: 300;
  }

  .temp-dec {
    font-size: clamp(1rem, 4vw, 1.5rem);
    margin-top: 0.2em;
    opacity: 0.9;
  }

  .temp-unit {
    font-size: 0.75rem;
    margin-left: 2px;
    margin-top: 0.35em;
    color: var(--secondary-text-color);
  }

  .range {
    margin-top: 8px;
    font-size: 0.8125rem;
    color: var(--secondary-text-color);
  }

  .range-heat.active,
  .range-cool.active {
    font-weight: 500;
  }

  .range-heat.active {
    color: var(--heat-color);
  }

  .range-cool.active {
    color: var(--cool-color);
  }
`;

export const fanSliderStyles = css`
  .slider {
    position: relative;
    height: 42px;
    display: flex;
    align-items: center;
    touch-action: none;
  }

  .track-bg {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(255, 255, 255, 0.12));
  }

  .track-fill {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: 2px;
    background: var(--primary-color, #03a9f4);
    pointer-events: none;
  }

  .steps {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
  }

  .step {
    width: 42px;
    height: 42px;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.6875rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .step.active {
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
  }

  .step.readonly {
    cursor: default;
  }

  .step:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
`;
