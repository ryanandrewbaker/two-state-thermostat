import {
  formatCardTitle,
  normalizeControllerEntity,
  resolveCardConfig,
  resolveFanOptionsFromConfig,
} from "./config";
import {
  ARC_END_ANGLE,
  ARC_START_ANGLE,
  ARC_SWEEP,
  AUTO_FAN_OPTION_VALUE,
  DEFAULT_MAX_TEMP,
  DEFAULT_MIN_TEMP,
  DEFAULT_MINIMUM_TARGET_SEPARATION,
  DEFAULT_POWER_ON_MODE,
  DEFAULT_STATE_MAP,
  DEFAULT_TARGET_STEP,
} from "./constants";
import type {
  ArcGeometry,
  BoostState,
  CardViewState,
  ClimateRange,
  FanOption,
  FanState,
  HassEntity,
  HomeAssistant,
  OperatingStateKey,
  RawCardConfig,
  ResolvedCardConfig,
  TargetAdjustment,
} from "./types";

export function normalizeOperatingState(raw: string | undefined): OperatingStateKey {
  if (!raw || raw === "unavailable" || raw === "unknown") {
    return "unknown";
  }

  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  const aliases: Record<string, OperatingStateKey> = {
    off: "off",
    idle: "idle",
    boost: "boost_heating",
    boost_heating: "boost_heating",
    maintain: "maintain_heating",
    maintain_heating: "maintain_heating",
    boost_cooling: "boost_cooling",
    maintain_cooling: "maintain_cooling",
  };

  return aliases[normalized] ?? "unknown";
}

export function getOperatingLabel(
  state: OperatingStateKey,
  stateMap?: Partial<Record<OperatingStateKey, string>>,
): string {
  return stateMap?.[state] ?? DEFAULT_STATE_MAP[state];
}

export function isEntityAvailable(entity: HassEntity | undefined): boolean {
  if (!entity) return false;
  return entity.state !== "unavailable" && entity.state !== "unknown";
}

export function getEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!hass || !entityId) return undefined;
  return hass.states[entityId];
}

export function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function roundToStep(value: number, step: number): number {
  const precision = step.toString().includes(".")
    ? (step.toString().split(".")[1]?.length ?? 0)
    : 0;
  const rounded = Math.round(value / step) * step;
  return Number(rounded.toFixed(precision));
}

export function normalizeOperatingStateFromHvacAction(
  hvacAction: string | undefined,
): OperatingStateKey {
  if (!hvacAction || hvacAction === "unavailable" || hvacAction === "unknown") {
    return "unknown";
  }

  const normalized = hvacAction.trim().toLowerCase();
  const map: Record<string, OperatingStateKey> = {
    off: "off",
    idle: "idle",
    heating: "maintain_heating",
    cooling: "maintain_cooling",
  };

  return map[normalized] ?? "unknown";
}

export function getDegradedOperatingLabel(hvacAction: string | undefined): string {
  if (!hvacAction) return "Unknown";
  const normalized = hvacAction.trim().toLowerCase();
  const labels: Record<string, string> = {
    off: "Off",
    idle: "Idle",
    heating: "Heating",
    cooling: "Cooling",
  };
  return labels[normalized] ?? "Unknown";
}

export function resolveFanOptions(
  config: RawCardConfig | ResolvedCardConfig,
): FanOption[] {
  if ("usesHvacActionFallback" in config) {
    return resolveFanOptionsFromConfig(config);
  }
  return config.fan_options?.length
    ? config.fan_options
    : resolveFanOptionsFromConfig(resolveCardConfig(undefined, config));
}

export function findFanOptionLabel(
  options: FanOption[],
  value: string | null | undefined,
): string {
  if (!value) return "—";
  const match = options.find(
    (option) => option.value.toLowerCase() === value.toLowerCase(),
  );
  return match?.label ?? value;
}

export function formatTimerRemaining(
  timerEntity: HassEntity | undefined,
): string | null {
  if (!timerEntity || !isEntityAvailable(timerEntity)) return null;
  if (timerEntity.state === "idle" || timerEntity.state === "paused") {
    return null;
  }

  const remaining = timerEntity.attributes.finishes_at;
  if (typeof remaining !== "string") {
    return timerEntity.state === "active" ? "Active" : null;
  }

  const finish = new Date(remaining).getTime();
  const diffMs = finish - Date.now();
  if (diffMs <= 0) return "0:00";

  const totalSeconds = Math.ceil(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function validateConfig(config: RawCardConfig | ResolvedCardConfig): string[] {
  const errors: string[] = [];

  const entity = normalizeControllerEntity(config);
  if (!entity) {
    errors.push("Missing required configuration: entity");
  }

  const fanOptions = resolveFanOptions(config);
  const values = new Set(fanOptions.map((option) => option.value.toLowerCase()));
  if (values.size !== fanOptions.length) {
    errors.push("fan_options contains duplicate values");
  }

  const hasFanAuto = Boolean(config.fan_auto_entity);
  const hasFanOverride = Boolean(config.fan_override_entity);
  if (hasFanAuto !== hasFanOverride && (hasFanAuto || hasFanOverride)) {
    errors.push(
      "fan_auto_entity and fan_override_entity must both be configured together",
    );
  }

  return errors;
}

export function validateRuntime(
  hass: HomeAssistant | undefined,
  config: ResolvedCardConfig,
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!hass) return { errors, warnings };

  const climate = getEntity(hass, config.entity);
  if (!climate) {
    errors.push(`Climate entity not found: ${config.entity}`);
  } else if (!isEntityAvailable(climate)) {
    errors.push(`Climate entity unavailable: ${config.entity}`);
  } else {
    const low = parseNumber(climate.attributes.target_temp_low);
    const high = parseNumber(climate.attributes.target_temp_high);
    if (low === null || high === null) {
      errors.push("Climate entity does not expose target_temp_low/high");
    }
  }

  if (config.usesHvacActionFallback) {
    warnings.push(
      "Boost/Maintain feedback requires an operating-state sensor; using climate hvac_action instead",
    );
  } else {
    const operating = getEntity(hass, config.operating_state_entity);
    if (!operating) {
      errors.push(`Operating state entity not found: ${config.operating_state_entity}`);
    } else if (!isEntityAvailable(operating)) {
      errors.push(
        `Operating state entity unavailable: ${config.operating_state_entity}`,
      );
    }
  }

  const optionalEntities: Array<{ id: string | undefined; label: string }> = [
    { id: config.temperature_entity, label: "Temperature sensor" },
    { id: config.boost_timer_entity, label: "Boost timer" },
    { id: config.boost_script_entity, label: "Boost script" },
    { id: config.boost_active_entity, label: "Boost active" },
  ];

  for (const { id, label } of optionalEntities) {
    if (!id) continue;
    const entityState = getEntity(hass, id);
    if (entityState && !isEntityAvailable(entityState)) {
      warnings.push(`${label} references an unavailable entity: ${id}`);
    }
  }

  const fanOptions = resolveFanOptions(config);
  if (config.fan_override_entity) {
    const override = getEntity(hass, config.fan_override_entity);
    if (override && isEntityAvailable(override)) {
      const options = override.attributes.options;
      if (Array.isArray(options)) {
        for (const option of fanOptions) {
          if (
            !options.some(
              (value) => String(value).toLowerCase() === option.value.toLowerCase(),
            )
          ) {
            warnings.push(`Unsupported fan option in override entity: ${option.value}`);
          }
        }
      }
    }
  }

  return { errors, warnings };
}

export function getClimateRange(
  hass: HomeAssistant | undefined,
  config: ResolvedCardConfig,
): ClimateRange {
  const climate = getEntity(hass, config.entity);
  const temperature = getEntity(hass, config.temperature_entity);

  const currentFromSensor = parseNumber(temperature?.state);
  const currentFromClimate = parseNumber(climate?.attributes.current_temperature);
  const current = currentFromSensor ?? currentFromClimate;

  const targetLow = parseNumber(climate?.attributes.target_temp_low);
  const targetHigh = parseNumber(climate?.attributes.target_temp_high);
  const minTemp = parseNumber(climate?.attributes.min_temp) ?? DEFAULT_MIN_TEMP;
  const maxTemp = parseNumber(climate?.attributes.max_temp) ?? DEFAULT_MAX_TEMP;
  const step =
    config.target_step ??
    parseNumber(climate?.attributes.target_temp_step) ??
    DEFAULT_TARGET_STEP;
  const hvacMode =
    typeof climate?.attributes.hvac_mode === "string"
      ? climate.attributes.hvac_mode
      : (climate?.state ?? null);
  const isOn = hvacMode !== null && hvacMode !== "off";

  return {
    current,
    targetLow,
    targetHigh,
    minTemp,
    maxTemp,
    step,
    hvacMode,
    isOn,
  };
}

export function clampTargetRange(
  low: number,
  high: number,
  minTemp: number,
  maxTemp: number,
  step: number,
  minimumSeparation: number,
): TargetAdjustment {
  let targetLow = roundToStep(low, step);
  let targetHigh = roundToStep(high, step);

  targetLow = Math.max(minTemp, Math.min(targetLow, maxTemp));
  targetHigh = Math.max(minTemp, Math.min(targetHigh, maxTemp));

  if (targetHigh - targetLow < minimumSeparation) {
    const midpoint = (targetLow + targetHigh) / 2;
    targetLow = roundToStep(midpoint - minimumSeparation / 2, step);
    targetHigh = roundToStep(midpoint + minimumSeparation / 2, step);
  }

  targetLow = Math.max(minTemp, Math.min(targetLow, maxTemp - minimumSeparation));
  targetHigh = Math.min(maxTemp, Math.max(targetHigh, targetLow + minimumSeparation));

  return { targetLow, targetHigh };
}

export function adjustTarget(
  current: ClimateRange,
  which: "low" | "high",
  delta: number,
  minimumSeparation: number,
): TargetAdjustment | null {
  if (current.targetLow === null || current.targetHigh === null) return null;

  const low = which === "low" ? current.targetLow + delta : current.targetLow;
  const high = which === "high" ? current.targetHigh + delta : current.targetHigh;

  return clampTargetRange(
    low,
    high,
    current.minTemp,
    current.maxTemp,
    current.step,
    minimumSeparation,
  );
}

export function getFanState(
  hass: HomeAssistant | undefined,
  config: ResolvedCardConfig,
): FanState {
  const options = resolveFanOptions(config);
  const fanAuto = getEntity(hass, config.fan_auto_entity);
  const fanOverride = getEntity(hass, config.fan_override_entity);
  const effective = getEntity(hass, config.effective_fan_entity);
  const recommended = getEntity(hass, config.recommended_fan_entity);

  const hasPreferredModel = Boolean(
    config.fan_auto_entity && config.fan_override_entity,
  );
  const hasSimplifiedModel = Boolean(!hasPreferredModel && config.fan_override_entity);

  if (!hasPreferredModel && !hasSimplifiedModel) {
    return {
      available: false,
      isAuto: false,
      manualValue: null,
      effectiveValue: null,
      recommendedValue: null,
      displayLabel: "",
      sliderIndex: 0,
      readOnly: true,
      usesSimplifiedModel: false,
    };
  }

  if (hasPreferredModel) {
    const isAuto = fanAuto?.state === "on";
    const manualValue = fanOverride?.state ?? null;
    const effectiveValue = effective?.state ?? recommended?.state ?? manualValue;
    const recommendedValue = recommended?.state ?? null;
    const displayValue = isAuto
      ? (effectiveValue ?? recommendedValue)
      : (manualValue ?? effectiveValue);
    const displayLabel = isAuto
      ? `Auto · ${findFanOptionLabel(options, displayValue)}`
      : `Manual · ${findFanOptionLabel(options, displayValue)}`;
    const sliderIndex = Math.max(
      0,
      options.findIndex(
        (option) => option.value.toLowerCase() === String(displayValue).toLowerCase(),
      ),
    );

    return {
      available: true,
      isAuto,
      manualValue,
      effectiveValue,
      recommendedValue,
      displayLabel,
      sliderIndex: sliderIndex === -1 ? 0 : sliderIndex,
      readOnly: isAuto,
      usesSimplifiedModel: false,
    };
  }

  const overrideValue = fanOverride?.state ?? null;
  const isAuto =
    overrideValue?.toLowerCase() === AUTO_FAN_OPTION_VALUE ||
    overrideValue?.toLowerCase() === "automatic";
  const displayValue = isAuto
    ? (effective?.state ?? recommended?.state ?? options[0]?.value ?? null)
    : overrideValue;
  const displayLabel = isAuto
    ? `Auto · ${findFanOptionLabel(options, displayValue)}`
    : `Manual · ${findFanOptionLabel(options, displayValue)}`;
  const sliderIndex = Math.max(
    0,
    options.findIndex(
      (option) => option.value.toLowerCase() === String(displayValue).toLowerCase(),
    ),
  );

  return {
    available: true,
    isAuto,
    manualValue: overrideValue,
    effectiveValue: effective?.state ?? null,
    recommendedValue: recommended?.state ?? null,
    displayLabel,
    sliderIndex: sliderIndex === -1 ? 0 : sliderIndex,
    readOnly: isAuto,
    usesSimplifiedModel: true,
  };
}

export function getBoostState(
  hass: HomeAssistant | undefined,
  config: ResolvedCardConfig,
): BoostState {
  const available = Boolean(config.boost_script_entity);
  const activeEntity = getEntity(hass, config.boost_active_entity);
  const timerEntity = getEntity(hass, config.boost_timer_entity);
  const active = activeEntity?.state === "on" || timerEntity?.state === "active";

  return {
    available,
    active,
    remaining:
      config.show_countdown === false ? null : formatTimerRemaining(timerEntity),
    hasCancel: Boolean(config.boost_cancel_script_entity),
  };
}

export function buildCardViewState(
  hass: HomeAssistant | undefined,
  rawConfig: RawCardConfig,
): CardViewState {
  const config = resolveCardConfig(hass, rawConfig);
  const configErrors = validateConfig(config);
  const runtime = validateRuntime(hass, config);

  let operatingState: OperatingStateKey;
  let operatingLabel: string;

  if (config.usesHvacActionFallback) {
    const climate = getEntity(hass, config.entity);
    const hvacAction =
      typeof climate?.attributes.hvac_action === "string"
        ? climate.attributes.hvac_action
        : undefined;
    operatingState = normalizeOperatingStateFromHvacAction(hvacAction);
    operatingLabel = getDegradedOperatingLabel(hvacAction);
  } else {
    const operatingEntity = getEntity(hass, config.operating_state_entity);
    operatingState = normalizeOperatingState(operatingEntity?.state);
    operatingLabel = getOperatingLabel(operatingState, config.state_map);
  }

  return {
    title: formatCardTitle(hass, rawConfig, config.entity),
    operatingState,
    operatingLabel,
    climate: getClimateRange(hass, config),
    fan: getFanState(hass, config),
    boost: getBoostState(hass, config),
    errors: [...configErrors, ...runtime.errors],
    warnings: runtime.warnings,
  };
}

export function tempToAngle(temp: number, minTemp: number, maxTemp: number): number {
  const ratio = (temp - minTemp) / (maxTemp - minTemp);
  const clamped = Math.max(0, Math.min(1, ratio));
  return ARC_START_ANGLE + clamped * ARC_SWEEP;
}

export function getArcGeometry(climate: ClimateRange): ArcGeometry {
  return {
    currentAngle:
      climate.current === null
        ? null
        : tempToAngle(climate.current, climate.minTemp, climate.maxTemp),
    lowAngle:
      climate.targetLow === null
        ? null
        : tempToAngle(climate.targetLow, climate.minTemp, climate.maxTemp),
    highAngle:
      climate.targetHigh === null
        ? null
        : tempToAngle(climate.targetHigh, climate.minTemp, climate.maxTemp),
    startAngle: ARC_START_ANGLE,
    endAngle: ARC_END_ANGLE,
  };
}

export function getResolvedPowerOnMode(config: ResolvedCardConfig): string {
  return config.power_on_mode ?? DEFAULT_POWER_ON_MODE;
}

export function getMinimumTargetSeparation(config: ResolvedCardConfig): number {
  return config.minimum_target_separation ?? DEFAULT_MINIMUM_TARGET_SEPARATION;
}

export { resolveCardConfig };

export function describeArcState(state: OperatingStateKey): {
  warmActive: boolean;
  coolActive: boolean;
  warmStrong: boolean;
  coolStrong: boolean;
  subdued: boolean;
} {
  switch (state) {
    case "off":
      return {
        warmActive: false,
        coolActive: false,
        warmStrong: false,
        coolStrong: false,
        subdued: true,
      };
    case "idle":
      return {
        warmActive: true,
        coolActive: true,
        warmStrong: false,
        coolStrong: false,
        subdued: false,
      };
    case "boost_heating":
      return {
        warmActive: true,
        coolActive: false,
        warmStrong: true,
        coolStrong: false,
        subdued: false,
      };
    case "maintain_heating":
      return {
        warmActive: true,
        coolActive: false,
        warmStrong: false,
        coolStrong: false,
        subdued: false,
      };
    case "boost_cooling":
      return {
        warmActive: false,
        coolActive: true,
        warmStrong: false,
        coolStrong: true,
        subdued: false,
      };
    case "maintain_cooling":
      return {
        warmActive: false,
        coolActive: true,
        warmStrong: false,
        coolStrong: false,
        subdued: false,
      };
    default:
      return {
        warmActive: true,
        coolActive: true,
        warmStrong: false,
        coolStrong: false,
        subdued: false,
      };
  }
}
