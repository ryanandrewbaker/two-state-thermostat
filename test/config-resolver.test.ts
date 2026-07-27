import { describe, expect, it } from "vitest";
import {
  buildDiscoverySummary,
  deriveBaseFromClimateEntity,
  discoverEntitiesByNaming,
  discoverFromClimateAttributes,
  findCompatibleClimateEntity,
  isCompatibleClimateEntity,
  normalizeControllerEntity,
  resolveCardConfig,
} from "../src/config";
import { TwoStageThermostatCard } from "../src/two-state-thermostat";
import type { HassEntity, HomeAssistant } from "../src/types";

function makeClimate(overrides: Partial<HassEntity> = {}): HassEntity {
  return {
    entity_id: "climate.family_room_auto_climate",
    state: "heat_cool",
    attributes: {
      current_temperature: 23.2,
      target_temp_low: 22,
      target_temp_high: 27.5,
      min_temp: 16,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_mode: "heat_cool",
      friendly_name: "Family Room Auto Climate",
      two_state_thermostat: true,
      temperature_entity: "sensor.family_room_control_temperature",
      operating_state_entity: "sensor.family_room_auto_operating_state",
      fan_auto_entity: "input_boolean.family_room_fan_automatic",
      fan_override_entity: "input_select.family_room_fan_override",
      effective_fan_entity: "sensor.family_room_effective_fan_mode",
      recommended_fan_entity: "sensor.family_room_automatic_fan_recommendation",
      boost_script_entity: "script.family_room_climate_boost",
      boost_cancel_script_entity: "script.family_room_climate_cancel_boost",
      boost_active_entity: "input_boolean.family_room_climate_boost",
      boost_timer_entity: "timer.family_room_climate_boost",
      power_on_mode: "heat_cool",
      target_step: 0.5,
      minimum_target_separation: 1,
      fan_options: ["quiet", "low", "medium", "high"],
    },
    ...overrides,
  };
}

function makeHass(entities: Record<string, HassEntity>): HomeAssistant {
  return {
    states: entities,
    callService: async () => undefined,
    formatEntityName: (entity) =>
      String(entity.attributes.friendly_name ?? entity.entity_id),
  };
}

const familyRoomEntities: Record<string, HassEntity> = {
  "climate.family_room_auto_climate": makeClimate(),
  "sensor.family_room_control_temperature": {
    entity_id: "sensor.family_room_control_temperature",
    state: "23.1",
    attributes: {},
  },
  "sensor.family_room_auto_operating_state": {
    entity_id: "sensor.family_room_auto_operating_state",
    state: "idle",
    attributes: {},
  },
  "input_boolean.family_room_fan_automatic": {
    entity_id: "input_boolean.family_room_fan_automatic",
    state: "on",
    attributes: {},
  },
  "input_select.family_room_fan_override": {
    entity_id: "input_select.family_room_fan_override",
    state: "low",
    attributes: { options: ["quiet", "low", "medium", "high"] },
  },
  "sensor.family_room_effective_fan_mode": {
    entity_id: "sensor.family_room_effective_fan_mode",
    state: "medium",
    attributes: {},
  },
  "sensor.family_room_automatic_fan_recommendation": {
    entity_id: "sensor.family_room_automatic_fan_recommendation",
    state: "medium",
    attributes: {},
  },
  "script.family_room_climate_boost": {
    entity_id: "script.family_room_climate_boost",
    state: "off",
    attributes: {},
  },
  "script.family_room_climate_cancel_boost": {
    entity_id: "script.family_room_climate_cancel_boost",
    state: "off",
    attributes: {},
  },
  "input_boolean.family_room_climate_boost": {
    entity_id: "input_boolean.family_room_climate_boost",
    state: "off",
    attributes: {},
  },
  "timer.family_room_climate_boost": {
    entity_id: "timer.family_room_climate_boost",
    state: "idle",
    attributes: {},
  },
};

describe("normalizeControllerEntity", () => {
  it("prefers entity over climate_entity", () => {
    expect(
      normalizeControllerEntity({
        type: "custom:two-state-thermostat",
        entity: "climate.primary",
        climate_entity: "climate.legacy",
      }),
    ).toBe("climate.primary");
  });

  it("accepts climate_entity alias", () => {
    expect(
      normalizeControllerEntity({
        type: "custom:two-state-thermostat",
        climate_entity: "climate.legacy",
      }),
    ).toBe("climate.legacy");
  });
});

describe("deriveBaseFromClimateEntity", () => {
  it("strips auto_climate suffix", () => {
    expect(deriveBaseFromClimateEntity("climate.family_room_auto_climate")).toBe(
      "family_room",
    );
  });

  it("strips climate suffix", () => {
    expect(deriveBaseFromClimateEntity("climate.kitchen_climate")).toBe("kitchen");
  });
});

describe("discoverEntitiesByNaming", () => {
  it("discovers companion entities from naming convention", () => {
    const hass = makeHass(familyRoomEntities);
    const discovered = discoverEntitiesByNaming(
      hass,
      "climate.family_room_auto_climate",
    );

    expect(discovered.temperature_entity).toBe(
      "sensor.family_room_control_temperature",
    );
    expect(discovered.operating_state_entity).toBe(
      "sensor.family_room_auto_operating_state",
    );
    expect(discovered.boost_timer_entity).toBe("timer.family_room_climate_boost");
  });

  it("does not match entities from another room", () => {
    const hass = makeHass({
      ...familyRoomEntities,
      "sensor.kitchen_auto_operating_state": {
        entity_id: "sensor.kitchen_auto_operating_state",
        state: "idle",
        attributes: {},
      },
    });

    const discovered = discoverEntitiesByNaming(
      hass,
      "climate.family_room_auto_climate",
    );

    expect(discovered.operating_state_entity).toBe(
      "sensor.family_room_auto_operating_state",
    );
    expect(discovered.operating_state_entity).not.toBe(
      "sensor.kitchen_auto_operating_state",
    );
  });

  it("returns empty when no matching entities exist", () => {
    const hass = makeHass({
      "climate.family_room_auto_climate": makeClimate(),
    });

    expect(discoverEntitiesByNaming(hass, "climate.family_room_auto_climate")).toEqual(
      {},
    );
  });
});

describe("resolveCardConfig", () => {
  const hass = makeHass(familyRoomEntities);

  it("resolves companion entities from climate attributes", () => {
    const resolved = resolveCardConfig(hass, {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
    });

    expect(resolved.entity).toBe("climate.family_room_auto_climate");
    expect(resolved.climate_entity).toBe("climate.family_room_auto_climate");
    expect(resolved.temperature_entity).toBe("sensor.family_room_control_temperature");
    expect(resolved.operating_state_entity).toBe(
      "sensor.family_room_auto_operating_state",
    );
    expect(resolved.boost_script_entity).toBe("script.family_room_climate_boost");
    expect(resolved.usesHvacActionFallback).toBe(false);
  });

  it("lets explicit config override attributes", () => {
    const resolved = resolveCardConfig(hass, {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
      temperature_entity: "sensor.custom_temperature",
    });

    expect(resolved.temperature_entity).toBe("sensor.custom_temperature");
  });

  it("falls back to naming convention when attributes are absent", () => {
    const hassWithoutAttributes = makeHass({
      "climate.family_room_auto_climate": makeClimate({ attributes: {} }),
      ...Object.fromEntries(
        Object.entries(familyRoomEntities).filter(
          ([key]) => key !== "climate.family_room_auto_climate",
        ),
      ),
    });

    const resolved = resolveCardConfig(hassWithoutAttributes, {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
    });

    expect(resolved.operating_state_entity).toBe(
      "sensor.family_room_auto_operating_state",
    );
  });

  it("uses defaults for optional settings", () => {
    const resolved = resolveCardConfig(hass, {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
    });

    expect(resolved.power_on_mode).toBe("heat_cool");
    expect(resolved.target_step).toBe(0.5);
    expect(resolved.minimum_target_separation).toBe(1);
    expect(resolved.show_countdown).toBe(true);
  });

  it("omits optional entities when not discovered", () => {
    const resolved = resolveCardConfig(makeHass({}), {
      type: "custom:two-state-thermostat",
      entity: "climate.unknown",
    });

    expect(resolved.temperature_entity).toBeUndefined();
    expect(resolved.boost_script_entity).toBeUndefined();
    expect(resolved.usesHvacActionFallback).toBe(true);
  });

  it("supports climate_entity backwards compatibility", () => {
    const resolved = resolveCardConfig(hass, {
      type: "custom:two-state-thermostat",
      climate_entity: "climate.family_room_auto_climate",
      operating_state_entity: "sensor.family_room_auto_operating_state",
    });

    expect(resolved.entity).toBe("climate.family_room_auto_climate");
    expect(resolved.operating_state_entity).toBe(
      "sensor.family_room_auto_operating_state",
    );
  });
});

describe("buildDiscoverySummary", () => {
  it("reports discovered companion entities", () => {
    const summary = buildDiscoverySummary(makeHass(familyRoomEntities), {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
    });

    const found = summary.filter((item) => item.status === "found");
    expect(found.some((item) => item.label === "Temperature sensor")).toBe(true);
    expect(found.some((item) => item.label === "Operating-state sensor")).toBe(true);
    expect(found.some((item) => item.label === "Boost")).toBe(true);
    expect(found.some((item) => item.label === "Boost timer")).toBe(true);
  });

  it("warns when a referenced entity is unavailable", () => {
    const hass = makeHass({
      ...familyRoomEntities,
      "timer.family_room_climate_boost": {
        entity_id: "timer.family_room_climate_boost",
        state: "unavailable",
        attributes: {},
      },
    });

    const summary = buildDiscoverySummary(hass, {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
    });

    const timer = summary.find((item) => item.label === "Boost timer");
    expect(timer?.status).toBe("unavailable");
    expect(timer?.message).toContain("unavailable entity");
  });

  it("returns empty summary without a controller", () => {
    expect(
      buildDiscoverySummary(makeHass(familyRoomEntities), {
        type: "custom:two-state-thermostat",
      }),
    ).toEqual([]);
  });
});

describe("entity suggestion compatibility", () => {
  it("suggests only compatible climate entities", () => {
    const hass = makeHass({
      ...familyRoomEntities,
      "climate.generic_thermostat": {
        entity_id: "climate.generic_thermostat",
        state: "heat",
        attributes: {
          temperature: 22,
        },
      },
    });

    expect(isCompatibleClimateEntity(hass, "climate.family_room_auto_climate")).toBe(
      true,
    );
    expect(isCompatibleClimateEntity(hass, "climate.generic_thermostat")).toBe(false);
  });

  it("accepts dual-range climates with discoverable operating state", () => {
    const hass = makeHass({
      "climate.family_room_auto_climate": makeClimate({
        attributes: {
          target_temp_low: 20,
          target_temp_high: 25,
        },
      }),
      "sensor.family_room_auto_operating_state": {
        entity_id: "sensor.family_room_auto_operating_state",
        state: "idle",
        attributes: {},
      },
    });

    expect(isCompatibleClimateEntity(hass, "climate.family_room_auto_climate")).toBe(
      true,
    );
  });

  it("returns suggestion config with entity only", () => {
    const hass = makeHass(familyRoomEntities);
    const cards = window.customCards ?? [];
    const entry = cards.find((card) => card.type === "two-state-thermostat");
    const suggestion = entry?.getEntitySuggestion?.(
      hass,
      "climate.family_room_auto_climate",
    );

    expect(suggestion).toEqual({
      config: {
        type: "custom:two-state-thermostat",
        entity: "climate.family_room_auto_climate",
      },
    });
  });
});

describe("getStubConfig", () => {
  it("returns empty configuration", () => {
    expect(TwoStageThermostatCard.getStubConfig()).toEqual({});
  });
});

describe("findCompatibleClimateEntity", () => {
  it("finds the first compatible climate entity", () => {
    const hass = makeHass(familyRoomEntities);
    expect(findCompatibleClimateEntity(hass)).toBe("climate.family_room_auto_climate");
  });
});

describe("discoverFromClimateAttributes", () => {
  it("reads string and numeric attributes", () => {
    const discovered = discoverFromClimateAttributes(
      makeHass(familyRoomEntities),
      "climate.family_room_auto_climate",
    );

    expect(discovered.operating_state_entity).toBe(
      "sensor.family_room_auto_operating_state",
    );
    expect(discovered.target_step).toBe(0.5);
    expect(discovered.fan_options?.map((option) => option.value)).toEqual([
      "quiet",
      "low",
      "medium",
      "high",
    ]);
  });
});
