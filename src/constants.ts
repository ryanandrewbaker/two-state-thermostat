import type { FanOption, OperatingStateKey } from "./types";

export const CARD_TYPE = "two-state-thermostat";
export const CARD_ELEMENT = "two-state-thermostat";
export const CARD_NAME = "Two State Thermostat";
export const CARD_VERSION = "0.3.8";
export const DOCUMENTATION_URL =
  "https://github.com/ryanandrewbaker/two-state-thermostat";

export const DEFAULT_POWER_ON_MODE = "heat_cool";
export const DEFAULT_TARGET_STEP = 0.5;
export const DEFAULT_MINIMUM_TARGET_SEPARATION = 1;
export const DEFAULT_MIN_TEMP = 5;
export const DEFAULT_MAX_TEMP = 35;

export const DEFAULT_FAN_OPTIONS: FanOption[] = [
  { value: "quiet", label: "Quiet" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const DEFAULT_STATE_MAP: Record<OperatingStateKey, string> = {
  off: "Off",
  idle: "Idle",
  boost_heating: "Boost Heating",
  maintain_heating: "Maintain Heating",
  boost_cooling: "Boost Cooling",
  maintain_cooling: "Maintain Cooling",
  unknown: "Unknown",
};

export const AUTO_FAN_OPTION_VALUE = "auto";

export const ALLOWED_SERVICE_DOMAINS = [
  "climate",
  "input_boolean",
  "input_select",
  "script",
] as const;

export const FORBIDDEN_SERVICES = ["climate.set_fan_mode"] as const;

export const ARC_START_ANGLE = 135;
export const ARC_END_ANGLE = 405;
export const ARC_SWEEP = ARC_END_ANGLE - ARC_START_ANGLE;

export const MIN_TOUCH_TARGET_PX = 42;
