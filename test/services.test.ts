import { describe, expect, it } from "vitest";
import {
  assertAllowedService,
  buildBoostCall,
  buildBoostCancelCall,
  buildDryOffCall,
  buildFanAutoOnCall,
  buildFanOnlyCall,
  buildFanOverrideCall,
  setFanOnlyMode,
  buildPowerOffCall,
  buildPowerOnCall,
  buildSetTemperatureCall,
  callService,
  cancelDry,
  setPower,
} from "../src/services";
import type { HomeAssistant, ResolvedCardConfig } from "../src/types";

const config: ResolvedCardConfig = {
  type: "custom:two-state-thermostat",
  entity: "climate.family_room_auto_climate",
  climate_entity: "climate.family_room_auto_climate",
  operating_state_entity: "sensor.family_room_auto_operating_state",
  fan_auto_entity: "input_boolean.family_room_fan_automatic",
  fan_override_entity: "input_select.family_room_fan_override",
  boost_script_entity: "script.family_room_climate_boost",
  boost_cancel_script_entity: "script.family_room_climate_cancel_boost",
  power_on_mode: "heat_cool",
  target_step: 0.5,
  minimum_target_separation: 1,
  show_countdown: true,
  show_recommended_fan: true,
  show_effective_targets: false,
  usesHvacActionFallback: false,
};

describe("service payloads", () => {
  it("builds power on call", () => {
    expect(buildPowerOnCall(config)).toEqual({
      domain: "climate",
      service: "set_hvac_mode",
      data: {
        entity_id: "climate.family_room_auto_climate",
        hvac_mode: "heat_cool",
      },
    });
  });

  it("builds power off call", () => {
    expect(buildPowerOffCall(config)).toEqual({
      domain: "climate",
      service: "set_hvac_mode",
      data: {
        entity_id: "climate.family_room_auto_climate",
        hvac_mode: "off",
      },
    });
  });

  it("builds set temperature call", () => {
    expect(
      buildSetTemperatureCall(config, { targetLow: 22, targetHigh: 27.5 }),
    ).toEqual({
      domain: "climate",
      service: "set_temperature",
      data: {
        entity_id: "climate.family_room_auto_climate",
        target_temp_low: 22,
        target_temp_high: 27.5,
        hvac_mode: "heat_cool",
      },
    });
  });

  it("builds fan only call without using climate.set_fan_mode", () => {
    expect(buildFanOnlyCall(config)).toEqual({
      domain: "climate",
      service: "set_hvac_mode",
      data: {
        entity_id: "climate.family_room_auto_climate",
        hvac_mode: "fan_only",
      },
    });
  });

  it("builds fan auto and override calls", () => {
    expect(buildFanAutoOnCall(config)).toEqual({
      domain: "input_boolean",
      service: "turn_on",
      data: { entity_id: "input_boolean.family_room_fan_automatic" },
    });
    expect(buildFanOverrideCall(config, "medium")).toEqual({
      domain: "input_select",
      service: "select_option",
      data: {
        entity_id: "input_select.family_room_fan_override",
        option: "medium",
      },
    });
  });

  it("builds boost start/extend and cancel calls", () => {
    expect(buildBoostCall(config)).toEqual({
      domain: "script",
      service: "turn_on",
      data: { entity_id: "script.family_room_climate_boost" },
    });
    expect(buildBoostCancelCall(config)).toEqual({
      domain: "script",
      service: "turn_on",
      data: { entity_id: "script.family_room_climate_cancel_boost" },
    });
  });
});

describe("service guards", () => {
  it("rejects climate.set_fan_mode", () => {
    expect(() => assertAllowedService("climate", "set_fan_mode")).toThrow(
      "Forbidden service call: climate.set_fan_mode",
    );
  });

  it("rejects unknown domains", () => {
    expect(() => assertAllowedService("fan", "turn_on")).toThrow(
      "Service domain not allowed: fan",
    );
  });

  it("never calls climate.set_fan_mode through callService", async () => {
    const calls: Array<{ domain: string; service: string }> = [];
    const hass: HomeAssistant = {
      states: {},
      callService: async (domain, service) => {
        calls.push({ domain, service });
      },
    };

    await callService(hass, buildPowerOnCall(config));
    await callService(
      hass,
      buildSetTemperatureCall(config, { targetLow: 22, targetHigh: 27 }),
    );

    expect(calls.some((c) => c.service === "set_fan_mode")).toBe(false);
    expect(calls).toEqual([
      { domain: "climate", service: "set_hvac_mode" },
      { domain: "climate", service: "set_temperature" },
    ]);
  });

  it("allows switch.turn_off", () => {
    expect(() => assertAllowedService("switch", "turn_off")).not.toThrow();
  });
});

describe("fan only mode", () => {
  it("enables fan only and returns to the power-on mode", async () => {
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    const hass: HomeAssistant = {
      states: {},
      callService: async (domain, service, data) => {
        calls.push({ domain, service, data });
      },
    };

    await setFanOnlyMode(hass, config, true);
    await setFanOnlyMode(hass, config, false);

    expect(calls).toEqual([
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.family_room_auto_climate",
          hvac_mode: "fan_only",
        },
      },
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.family_room_auto_climate",
          hvac_mode: "heat_cool",
        },
      },
    ]);
    expect(calls.some((call) => call.service === "set_fan_mode")).toBe(false);
  });
});

describe("dry and power-off services", () => {
  const dryConfig: ResolvedCardConfig = {
    ...config,
    dry_entity: "switch.family_room_dry_mode",
  };

  it("builds dry off from the configured entity", () => {
    expect(buildDryOffCall(dryConfig)).toEqual({
      domain: "switch",
      service: "turn_off",
      data: { entity_id: "switch.family_room_dry_mode" },
    });
  });

  it("power off without dry_entity only turns off climate", async () => {
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    const hass: HomeAssistant = {
      states: {},
      callService: async (domain, service, data) => {
        calls.push({ domain, service, data });
      },
    };

    await setPower(hass, config, false);
    expect(calls).toEqual([
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.family_room_auto_climate",
          hvac_mode: "off",
        },
      },
    ]);
  });

  it("power off with dry_entity turns off dry then climate", async () => {
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    const hass: HomeAssistant = {
      states: {},
      callService: async (domain, service, data) => {
        calls.push({ domain, service, data });
      },
    };

    await setPower(hass, dryConfig, false);
    expect(calls).toEqual([
      {
        domain: "switch",
        service: "turn_off",
        data: { entity_id: "switch.family_room_dry_mode" },
      },
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.family_room_auto_climate",
          hvac_mode: "off",
        },
      },
    ]);
  });

  it("cancelDry does not turn climate on", async () => {
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    const hass: HomeAssistant = {
      states: {},
      callService: async (domain, service, data) => {
        calls.push({ domain, service, data });
      },
    };

    await cancelDry(hass, dryConfig);
    expect(calls).toEqual([
      {
        domain: "switch",
        service: "turn_off",
        data: { entity_id: "switch.family_room_dry_mode" },
      },
    ]);
  });
});
