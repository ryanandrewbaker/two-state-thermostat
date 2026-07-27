import { ALLOWED_SERVICE_DOMAINS, FORBIDDEN_SERVICES } from "./constants";
import { getResolvedPowerOnMode } from "./state";
import type {
  HomeAssistant,
  TargetAdjustment,
  TwoStageThermostatConfig,
} from "./types";

export interface ServiceCall {
  domain: string;
  service: string;
  data: Record<string, unknown>;
}

export function assertAllowedService(domain: string, service: string): void {
  const full = `${domain}.${service}`;
  if ((FORBIDDEN_SERVICES as readonly string[]).includes(full)) {
    throw new Error(`Forbidden service call: ${full}`);
  }
  if (!(ALLOWED_SERVICE_DOMAINS as readonly string[]).includes(domain)) {
    throw new Error(`Service domain not allowed: ${domain}`);
  }
}

export function buildPowerOnCall(config: TwoStageThermostatConfig): ServiceCall {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: config.climate_entity,
      hvac_mode: getResolvedPowerOnMode(config),
    },
  };
}

export function buildPowerOffCall(config: TwoStageThermostatConfig): ServiceCall {
  return {
    domain: "climate",
    service: "set_hvac_mode",
    data: {
      entity_id: config.climate_entity,
      hvac_mode: "off",
    },
  };
}

export function buildSetTemperatureCall(
  config: TwoStageThermostatConfig,
  targets: TargetAdjustment,
): ServiceCall {
  return {
    domain: "climate",
    service: "set_temperature",
    data: {
      entity_id: config.climate_entity,
      target_temp_low: targets.targetLow,
      target_temp_high: targets.targetHigh,
      hvac_mode: "heat_cool",
    },
  };
}

export function buildFanAutoOnCall(config: TwoStageThermostatConfig): ServiceCall {
  return {
    domain: "input_boolean",
    service: "turn_on",
    data: {
      entity_id: config.fan_auto_entity,
    },
  };
}

export function buildFanAutoOffCall(config: TwoStageThermostatConfig): ServiceCall {
  return {
    domain: "input_boolean",
    service: "turn_off",
    data: {
      entity_id: config.fan_auto_entity,
    },
  };
}

export function buildFanOverrideCall(
  config: TwoStageThermostatConfig,
  option: string,
): ServiceCall {
  return {
    domain: "input_select",
    service: "select_option",
    data: {
      entity_id: config.fan_override_entity,
      option,
    },
  };
}

export function buildBoostCall(config: TwoStageThermostatConfig): ServiceCall {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: config.boost_script_entity,
    },
  };
}

export function buildBoostCancelCall(config: TwoStageThermostatConfig): ServiceCall {
  return {
    domain: "script",
    service: "turn_on",
    data: {
      entity_id: config.boost_cancel_script_entity,
    },
  };
}

export async function callService(
  hass: HomeAssistant,
  call: ServiceCall,
): Promise<void> {
  assertAllowedService(call.domain, call.service);
  await hass.callService(call.domain, call.service, call.data);
}

export async function setPower(
  hass: HomeAssistant,
  config: TwoStageThermostatConfig,
  on: boolean,
): Promise<void> {
  await callService(hass, on ? buildPowerOnCall(config) : buildPowerOffCall(config));
}

export async function setTemperature(
  hass: HomeAssistant,
  config: TwoStageThermostatConfig,
  targets: TargetAdjustment,
): Promise<void> {
  await callService(hass, buildSetTemperatureCall(config, targets));
}

export async function setFanAuto(
  hass: HomeAssistant,
  config: TwoStageThermostatConfig,
  enabled: boolean,
): Promise<void> {
  if (config.fan_auto_entity) {
    await callService(
      hass,
      enabled ? buildFanAutoOnCall(config) : buildFanAutoOffCall(config),
    );
    return;
  }

  if (config.fan_override_entity) {
    await callService(hass, buildFanOverrideCall(config, enabled ? "auto" : "low"));
  }
}

export async function setFanOverride(
  hass: HomeAssistant,
  config: TwoStageThermostatConfig,
  option: string,
): Promise<void> {
  await callService(hass, buildFanOverrideCall(config, option));
}

export async function triggerBoost(
  hass: HomeAssistant,
  config: TwoStageThermostatConfig,
): Promise<void> {
  await callService(hass, buildBoostCall(config));
}

export async function cancelBoost(
  hass: HomeAssistant,
  config: TwoStageThermostatConfig,
): Promise<void> {
  if (!config.boost_cancel_script_entity) return;
  await callService(hass, buildBoostCancelCall(config));
}
