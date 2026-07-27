export type OperatingStateKey =
  | "off"
  | "idle"
  | "boost_heating"
  | "maintain_heating"
  | "boost_cooling"
  | "maintain_cooling"
  | "unknown";

export interface FanOption {
  value: string;
  label: string;
}

export interface TwoStageThermostatConfig {
  type: string;
  name?: string;
  climate_entity: string;
  temperature_entity?: string;
  operating_state_entity: string;
  fan_auto_entity?: string;
  fan_override_entity?: string;
  effective_fan_entity?: string;
  recommended_fan_entity?: string;
  boost_script_entity?: string;
  boost_cancel_script_entity?: string;
  boost_active_entity?: string;
  boost_timer_entity?: string;
  power_on_mode?: string;
  fan_options?: FanOption[];
  target_step?: number;
  minimum_target_separation?: number;
  show_countdown?: boolean;
  show_recommended_fan?: boolean;
  show_effective_targets?: boolean;
  state_map?: Partial<Record<OperatingStateKey, string>>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<void>;
  localize?: (key: string) => string;
}

export interface LovelaceCard {
  setConfig(config: TwoStageThermostatConfig): void;
  hass?: HomeAssistant;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: unknown;
  setConfig(config: TwoStageThermostatConfig): void;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
  getEntitySuggestion?: (
    hass: HomeAssistant,
    entityId: string,
  ) => { config: Partial<TwoStageThermostatConfig>; label?: string } | null;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

export interface ClimateRange {
  current: number | null;
  targetLow: number | null;
  targetHigh: number | null;
  minTemp: number;
  maxTemp: number;
  step: number;
  hvacMode: string | null;
  isOn: boolean;
}

export interface FanState {
  available: boolean;
  isAuto: boolean;
  manualValue: string | null;
  effectiveValue: string | null;
  recommendedValue: string | null;
  displayLabel: string;
  sliderIndex: number;
  readOnly: boolean;
  usesSimplifiedModel: boolean;
}

export interface BoostState {
  available: boolean;
  active: boolean;
  remaining: string | null;
  hasCancel: boolean;
}

export interface CardViewState {
  title: string;
  operatingState: OperatingStateKey;
  operatingLabel: string;
  climate: ClimateRange;
  fan: FanState;
  boost: BoostState;
  errors: string[];
  warnings: string[];
}

export interface TargetAdjustment {
  targetLow: number;
  targetHigh: number;
}

export interface ArcGeometry {
  currentAngle: number | null;
  lowAngle: number | null;
  highAngle: number | null;
  startAngle: number;
  endAngle: number;
}
