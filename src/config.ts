import {
  DEFAULT_FAN_OPTIONS,
  DEFAULT_MINIMUM_TARGET_SEPARATION,
  DEFAULT_POWER_ON_MODE,
  DEFAULT_TARGET_STEP,
} from "./constants";
import type {
  DiscoverySummaryItem,
  FanOption,
  HassEntity,
  HomeAssistant,
  RawCardConfig,
  ResolvedCardConfig,
} from "./types";

function getEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!hass || !entityId) return undefined;
  return hass.states[entityId];
}

function isEntityAvailable(entity: HassEntity | undefined): boolean {
  if (!entity) return false;
  return entity.state !== "unavailable" && entity.state !== "unknown";
}

const CLIMATE_ENTITY_SUFFIXES = ["_auto_climate", "_climate"] as const;

const NAMING_PATTERNS: Record<keyof EntityDiscoveryKeys, (base: string) => string> = {
  temperature_entity: (b) => `sensor.${b}_control_temperature`,
  operating_state_entity: (b) => `sensor.${b}_auto_operating_state`,
  fan_auto_entity: (b) => `input_boolean.${b}_fan_automatic`,
  fan_override_entity: (b) => `input_select.${b}_fan_override`,
  effective_fan_entity: (b) => `sensor.${b}_effective_fan_mode`,
  recommended_fan_entity: (b) => `sensor.${b}_automatic_fan_recommendation`,
  boost_script_entity: (b) => `script.${b}_climate_boost`,
  boost_cancel_script_entity: (b) => `script.${b}_climate_cancel_boost`,
  boost_active_entity: (b) => `input_boolean.${b}_climate_boost`,
  boost_timer_entity: (b) => `timer.${b}_climate_boost`,
};

type EntityDiscoveryKeys = Pick<
  ResolvedCardConfig,
  | "temperature_entity"
  | "operating_state_entity"
  | "fan_auto_entity"
  | "fan_override_entity"
  | "effective_fan_entity"
  | "recommended_fan_entity"
  | "boost_script_entity"
  | "boost_cancel_script_entity"
  | "boost_active_entity"
  | "boost_timer_entity"
>;

const CLIMATE_ATTRIBUTE_MAP: Record<keyof EntityDiscoveryKeys, string> = {
  temperature_entity: "temperature_entity",
  operating_state_entity: "operating_state_entity",
  fan_auto_entity: "fan_auto_entity",
  fan_override_entity: "fan_override_entity",
  effective_fan_entity: "effective_fan_entity",
  recommended_fan_entity: "recommended_fan_entity",
  boost_script_entity: "boost_script_entity",
  boost_cancel_script_entity: "boost_cancel_script_entity",
  boost_active_entity: "boost_active_entity",
  boost_timer_entity: "boost_timer_entity",
};

const OPTIONAL_CLIMATE_ATTRIBUTES = {
  power_on_mode: "power_on_mode",
  fan_options: "fan_options",
  target_step: "target_step",
  minimum_target_separation: "minimum_target_separation",
} as const;

function readStringAttribute(
  attributes: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = attributes[key];
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function readNumberAttribute(
  attributes: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = attributes[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function readFanOptionsAttribute(
  attributes: Record<string, unknown>,
  key: string,
): FanOption[] | undefined {
  const value = attributes[key];
  if (!Array.isArray(value) || value.length === 0) return undefined;

  if (typeof value[0] === "string") {
    return value.map((entry) => {
      const label = String(entry);
      return { value: label, label };
    });
  }

  const options: FanOption[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;
    const record = entry as Record<string, unknown>;
    if (typeof record.value !== "string") continue;
    options.push({
      value: record.value,
      label: typeof record.label === "string" ? record.label : record.value,
    });
  }

  return options.length ? options : undefined;
}

export function normalizeControllerEntity(raw: RawCardConfig): string | undefined {
  const entity = raw.entity?.trim() || raw.climate_entity?.trim();
  return entity || undefined;
}

export function deriveBaseFromClimateEntity(entityId: string): string | null {
  const parts = entityId.split(".");
  if (parts.length !== 2 || parts[0] !== "climate") return null;

  const objectId = parts[1];
  for (const suffix of CLIMATE_ENTITY_SUFFIXES) {
    if (objectId.endsWith(suffix)) {
      return objectId.slice(0, -suffix.length);
    }
  }

  return objectId;
}

export function discoverEntitiesByNaming(
  hass: HomeAssistant | undefined,
  climateEntityId: string,
): Partial<EntityDiscoveryKeys> {
  if (!hass) return {};

  const base = deriveBaseFromClimateEntity(climateEntityId);
  if (!base) return {};

  const discovered: Partial<EntityDiscoveryKeys> = {};
  for (const [key, buildEntityId] of Object.entries(NAMING_PATTERNS) as Array<
    [keyof EntityDiscoveryKeys, (base: string) => string]
  >) {
    const candidate = buildEntityId(base);
    if (hass.states[candidate]) {
      discovered[key] = candidate;
    }
  }

  return discovered;
}

export function discoverFromClimateAttributes(
  hass: HomeAssistant | undefined,
  climateEntityId: string,
): Partial<EntityDiscoveryKeys> &
  Partial<
    Pick<
      ResolvedCardConfig,
      "power_on_mode" | "fan_options" | "target_step" | "minimum_target_separation"
    >
  > {
  const climate = getEntity(hass, climateEntityId);
  if (!climate) return {};

  const attributes = climate.attributes;
  const discovered: Partial<EntityDiscoveryKeys> = {};

  for (const [configKey, attributeKey] of Object.entries(
    CLIMATE_ATTRIBUTE_MAP,
  ) as Array<[keyof EntityDiscoveryKeys, string]>) {
    const value = readStringAttribute(attributes, attributeKey);
    if (value) discovered[configKey] = value;
  }

  return {
    ...discovered,
    power_on_mode: readStringAttribute(
      attributes,
      OPTIONAL_CLIMATE_ATTRIBUTES.power_on_mode,
    ),
    fan_options: readFanOptionsAttribute(
      attributes,
      OPTIONAL_CLIMATE_ATTRIBUTES.fan_options,
    ),
    target_step: readNumberAttribute(
      attributes,
      OPTIONAL_CLIMATE_ATTRIBUTES.target_step,
    ),
    minimum_target_separation: readNumberAttribute(
      attributes,
      OPTIONAL_CLIMATE_ATTRIBUTES.minimum_target_separation,
    ),
  };
}

function pickEntityId(
  explicit: string | undefined,
  fromAttributes: string | undefined,
  fromNaming: string | undefined,
): string | undefined {
  if (explicit?.trim()) return explicit.trim();
  if (fromAttributes) return fromAttributes;
  if (fromNaming) return fromNaming;
  return undefined;
}

function pickValue<T>(
  explicit: T | undefined,
  fromAttributes: T | undefined,
  defaultValue: T,
): T {
  if (explicit !== undefined) return explicit;
  if (fromAttributes !== undefined) return fromAttributes;
  return defaultValue;
}

function pickOptionalValue<T>(
  explicit: T | undefined,
  fromAttributes: T | undefined,
): T | undefined {
  if (explicit !== undefined) return explicit;
  if (fromAttributes !== undefined) return fromAttributes;
  return undefined;
}

export function resolveCardConfig(
  hass: HomeAssistant | undefined,
  rawConfig: RawCardConfig,
): ResolvedCardConfig {
  const entity = normalizeControllerEntity(rawConfig) ?? "";
  const fromAttributes = entity ? discoverFromClimateAttributes(hass, entity) : {};
  const fromNaming = entity ? discoverEntitiesByNaming(hass, entity) : {};

  const resolved: ResolvedCardConfig = {
    type: rawConfig.type,
    entity,
    climate_entity: entity,
    name: rawConfig.name,
    temperature_entity: pickEntityId(
      rawConfig.temperature_entity,
      fromAttributes.temperature_entity,
      fromNaming.temperature_entity,
    ),
    operating_state_entity: pickEntityId(
      rawConfig.operating_state_entity,
      fromAttributes.operating_state_entity,
      fromNaming.operating_state_entity,
    ),
    fan_auto_entity: pickEntityId(
      rawConfig.fan_auto_entity,
      fromAttributes.fan_auto_entity,
      fromNaming.fan_auto_entity,
    ),
    fan_override_entity: pickEntityId(
      rawConfig.fan_override_entity,
      fromAttributes.fan_override_entity,
      fromNaming.fan_override_entity,
    ),
    effective_fan_entity: pickEntityId(
      rawConfig.effective_fan_entity,
      fromAttributes.effective_fan_entity,
      fromNaming.effective_fan_entity,
    ),
    recommended_fan_entity: pickEntityId(
      rawConfig.recommended_fan_entity,
      fromAttributes.recommended_fan_entity,
      fromNaming.recommended_fan_entity,
    ),
    boost_script_entity: pickEntityId(
      rawConfig.boost_script_entity,
      fromAttributes.boost_script_entity,
      fromNaming.boost_script_entity,
    ),
    boost_cancel_script_entity: pickEntityId(
      rawConfig.boost_cancel_script_entity,
      fromAttributes.boost_cancel_script_entity,
      fromNaming.boost_cancel_script_entity,
    ),
    boost_active_entity: pickEntityId(
      rawConfig.boost_active_entity,
      fromAttributes.boost_active_entity,
      fromNaming.boost_active_entity,
    ),
    boost_timer_entity: pickEntityId(
      rawConfig.boost_timer_entity,
      fromAttributes.boost_timer_entity,
      fromNaming.boost_timer_entity,
    ),
    power_on_mode: pickValue(
      rawConfig.power_on_mode,
      fromAttributes.power_on_mode,
      DEFAULT_POWER_ON_MODE,
    ),
    fan_options: pickOptionalValue(rawConfig.fan_options, fromAttributes.fan_options),
    target_step: pickValue(
      rawConfig.target_step,
      fromAttributes.target_step,
      DEFAULT_TARGET_STEP,
    ),
    minimum_target_separation: pickValue(
      rawConfig.minimum_target_separation,
      fromAttributes.minimum_target_separation,
      DEFAULT_MINIMUM_TARGET_SEPARATION,
    ),
    show_countdown: rawConfig.show_countdown ?? true,
    show_recommended_fan: rawConfig.show_recommended_fan ?? true,
    show_effective_targets: rawConfig.show_effective_targets ?? false,
    state_map: rawConfig.state_map,
    usesHvacActionFallback: false,
  };

  resolved.usesHvacActionFallback = !resolved.operating_state_entity;
  return resolved;
}

export function formatCardTitle(
  hass: HomeAssistant | undefined,
  rawConfig: RawCardConfig,
  entityId: string | undefined,
): string {
  if (rawConfig.name?.trim()) return rawConfig.name.trim();

  const entity = entityId ? getEntity(hass, entityId) : undefined;
  if (entity && hass?.formatEntityName) {
    return hass.formatEntityName(entity);
  }

  if (entity && typeof entity.attributes.friendly_name === "string") {
    return entity.attributes.friendly_name;
  }

  return entityId ?? "Two State Thermostat";
}

export function hasDualRangeClimateAttributes(
  hass: HomeAssistant | undefined,
  entityId: string,
): boolean {
  const climate = getEntity(hass, entityId);
  if (!climate) return false;
  return (
    climate.attributes.target_temp_low !== undefined &&
    climate.attributes.target_temp_high !== undefined
  );
}

export function hasDiscoverableOperatingState(
  hass: HomeAssistant | undefined,
  entityId: string,
): boolean {
  const fromAttributes = discoverFromClimateAttributes(hass, entityId);
  if (
    fromAttributes.operating_state_entity &&
    hass?.states[fromAttributes.operating_state_entity]
  ) {
    return true;
  }

  const fromNaming = discoverEntitiesByNaming(hass, entityId);
  return Boolean(
    fromNaming.operating_state_entity &&
    hass?.states[fromNaming.operating_state_entity],
  );
}

export function isCompatibleClimateEntity(
  hass: HomeAssistant | undefined,
  entityId: string,
): boolean {
  if (!entityId.startsWith("climate.")) return false;

  const climate = getEntity(hass, entityId);
  if (!climate) return false;

  if (climate.attributes.two_state_thermostat === true) {
    return true;
  }

  return (
    hasDualRangeClimateAttributes(hass, entityId) &&
    hasDiscoverableOperatingState(hass, entityId)
  );
}

export function findCompatibleClimateEntity(
  hass: HomeAssistant | undefined,
): string | undefined {
  if (!hass) return undefined;
  return Object.keys(hass.states)
    .filter((entityId) => entityId.startsWith("climate."))
    .find((entityId) => isCompatibleClimateEntity(hass, entityId));
}

function isExplicitOverride(
  raw: RawCardConfig,
  key: keyof EntityDiscoveryKeys,
): boolean {
  const value = raw[key];
  return typeof value === "string" && value.trim() !== "";
}

function entityDiscoveryStatus(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): DiscoverySummaryItem["status"] {
  if (!entityId) return "missing";
  const entity = getEntity(hass, entityId);
  if (!entity) return "missing";
  if (!isEntityAvailable(entity)) return "unavailable";
  return "found";
}

export function buildDiscoverySummary(
  hass: HomeAssistant | undefined,
  rawConfig: RawCardConfig,
): DiscoverySummaryItem[] {
  const resolved = resolveCardConfig(hass, rawConfig);
  const entity = normalizeControllerEntity(rawConfig);

  if (!entity) {
    return [];
  }

  const items: Array<{
    key: keyof EntityDiscoveryKeys;
    label: string;
    optional?: boolean;
  }> = [
    { key: "temperature_entity", label: "Temperature sensor", optional: true },
    { key: "operating_state_entity", label: "Operating-state sensor" },
    { key: "fan_auto_entity", label: "Automatic fan control", optional: true },
    { key: "fan_override_entity", label: "Manual fan control", optional: true },
    { key: "effective_fan_entity", label: "Effective fan mode", optional: true },
    { key: "recommended_fan_entity", label: "Recommended fan mode", optional: true },
    { key: "boost_script_entity", label: "Boost", optional: true },
    { key: "boost_cancel_script_entity", label: "Boost cancel", optional: true },
    { key: "boost_active_entity", label: "Boost active", optional: true },
    { key: "boost_timer_entity", label: "Boost timer", optional: true },
  ];

  return items.map(({ key, label, optional }) => {
    const entityId = resolved[key];
    const status = entityDiscoveryStatus(hass, entityId);
    const overridden = isExplicitOverride(rawConfig, key);

    if (
      key === "operating_state_entity" &&
      !entityId &&
      resolved.usesHvacActionFallback
    ) {
      return {
        key,
        label,
        status: "fallback" as const,
        entityId: undefined,
        message: "Using climate hvac_action (Boost/Maintain feedback unavailable)",
      };
    }

    if (optional && status === "missing") {
      return {
        key,
        label,
        status: "missing" as const,
        entityId: undefined,
        optional: true,
      };
    }

    let message: string | undefined;
    if (status === "unavailable" && entityId) {
      message = `${label} references an unavailable entity`;
    } else if (status === "missing" && !optional) {
      message = `${label} not discovered`;
    }

    return {
      key,
      label,
      status: overridden ? ("override" as const) : status,
      entityId,
      optional,
      message,
    };
  });
}

export function resolveFanOptionsFromConfig(config: ResolvedCardConfig): FanOption[] {
  return config.fan_options?.length ? config.fan_options : DEFAULT_FAN_OPTIONS;
}
