import { describe, expect, it } from "vitest";
import {
  adjustTarget,
  buildCardViewState,
  clampTargetRange,
  formatTimerRemaining,
  getArcGeometry,
  getFanState,
  getOperatingLabel,
  normalizeOperatingState,
  roundToStep,
  validateConfig,
} from "../src/state";
import type { HassEntity, HomeAssistant, TwoStageThermostatConfig } from "../src/types";

function makeClimate(overrides: Partial<HassEntity> = {}): HassEntity {
  return {
    entity_id: "climate.family_room",
    state: "heat_cool",
    attributes: {
      current_temperature: 23.2,
      target_temp_low: 22,
      target_temp_high: 27.5,
      min_temp: 16,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_mode: "heat_cool",
      friendly_name: "Family Room",
    },
    ...overrides,
  };
}

function makeHass(entities: Record<string, HassEntity>): HomeAssistant {
  return {
    states: entities,
    callService: async () => undefined,
  };
}

const baseConfig: TwoStageThermostatConfig = {
  type: "custom:two-state-thermostat",
  climate_entity: "climate.family_room",
  operating_state_entity: "sensor.family_room_operating_state",
};

describe("normalizeOperatingState", () => {
  it("normalises common formats", () => {
    expect(normalizeOperatingState("Boost Heating")).toBe("boost_heating");
    expect(normalizeOperatingState("maintain-cooling")).toBe("maintain_cooling");
    expect(normalizeOperatingState("idle")).toBe("idle");
    expect(normalizeOperatingState("off")).toBe("off");
  });

  it("returns unknown for unavailable states", () => {
    expect(normalizeOperatingState("unavailable")).toBe("unknown");
    expect(normalizeOperatingState(undefined)).toBe("unknown");
  });
});

describe("getOperatingLabel", () => {
  it("uses state_map when provided", () => {
    expect(getOperatingLabel("boost_heating", { boost_heating: "Turbo Heat" })).toBe(
      "Turbo Heat",
    );
  });
});

describe("formatTimerRemaining", () => {
  it("formats active timer remaining time", () => {
    const finish = new Date(Date.now() + 125_000).toISOString();
    const timer: HassEntity = {
      entity_id: "timer.boost",
      state: "active",
      attributes: { finishes_at: finish },
    };
    const remaining = formatTimerRemaining(timer);
    expect(remaining).toMatch(/^\d+:\d{2}$/);
  });

  it("returns null for idle timer", () => {
    const timer: HassEntity = {
      entity_id: "timer.boost",
      state: "idle",
      attributes: {},
    };
    expect(formatTimerRemaining(timer)).toBeNull();
  });
});

describe("target constraints", () => {
  it("rounds to step", () => {
    expect(roundToStep(22.24, 0.5)).toBe(22);
    expect(roundToStep(22.26, 0.5)).toBe(22.5);
  });

  it("enforces minimum separation", () => {
    const result = clampTargetRange(20, 20.2, 16, 30, 0.5, 1);
    expect(result.targetHigh - result.targetLow).toBeGreaterThanOrEqual(1);
  });

  it("adjusts low target without crossing high", () => {
    const climate = {
      current: 23,
      targetLow: 22,
      targetHigh: 27.5,
      minTemp: 16,
      maxTemp: 30,
      step: 0.5,
      hvacMode: "heat_cool",
      isOn: true,
    };
    const adjusted = adjustTarget(climate, "low", 0.5, 1);
    expect(adjusted?.targetLow).toBe(22.5);
    expect(adjusted!.targetHigh).toBeGreaterThan(adjusted!.targetLow);
  });
});

describe("fan state", () => {
  it("reports auto mode with effective speed", () => {
    const hass = makeHass({
      "input_boolean.fan_auto": {
        entity_id: "input_boolean.fan_auto",
        state: "on",
        attributes: {},
      },
      "input_select.fan_override": {
        entity_id: "input_select.fan_override",
        state: "low",
        attributes: { options: ["quiet", "low", "medium", "high"] },
      },
      "sensor.effective_fan": {
        entity_id: "sensor.effective_fan",
        state: "medium",
        attributes: {},
      },
    });

    const fan = getFanState(hass, {
      ...baseConfig,
      fan_auto_entity: "input_boolean.fan_auto",
      fan_override_entity: "input_select.fan_override",
      effective_fan_entity: "sensor.effective_fan",
    });

    expect(fan.isAuto).toBe(true);
    expect(fan.readOnly).toBe(true);
    expect(fan.displayLabel).toBe("Auto · Medium");
  });

  it("omits fan controls when not configured", () => {
    const fan = getFanState(makeHass({}), baseConfig);
    expect(fan.available).toBe(false);
  });
});

describe("arc geometry", () => {
  it("maps temperatures to angles", () => {
    const geometry = getArcGeometry({
      current: 23,
      targetLow: 20,
      targetHigh: 28,
      minTemp: 16,
      maxTemp: 32,
      step: 0.5,
      hvacMode: "heat_cool",
      isOn: true,
    });

    expect(geometry.lowAngle).not.toBeNull();
    expect(geometry.highAngle).not.toBeNull();
    expect(geometry.currentAngle).not.toBeNull();
    expect(geometry.lowAngle!).toBeLessThan(geometry.highAngle!);
  });
});

describe("buildCardViewState", () => {
  it("handles unavailable optional entities gracefully", () => {
    const hass = makeHass({
      "climate.family_room": makeClimate(),
      "sensor.family_room_operating_state": {
        entity_id: "sensor.family_room_operating_state",
        state: "idle",
        attributes: {},
      },
      "timer.family_room_boost": {
        entity_id: "timer.family_room_boost",
        state: "unavailable",
        attributes: {},
      },
    });

    const view = buildCardViewState(hass, {
      ...baseConfig,
      boost_script_entity: "script.boost",
      boost_timer_entity: "timer.family_room_boost",
    });

    expect(view.errors).toHaveLength(0);
    expect(view.operatingLabel).toBe("Idle");
  });
});

describe("validateConfig", () => {
  it("requires climate and operating state entities", () => {
    expect(
      validateConfig({
        type: "custom:two-state-thermostat",
        climate_entity: "",
        operating_state_entity: "",
      }),
    ).toEqual([
      "Missing required configuration: climate_entity",
      "Missing required configuration: operating_state_entity",
    ]);
  });

  it("requires paired fan entities", () => {
    expect(
      validateConfig({
        ...baseConfig,
        fan_auto_entity: "input_boolean.fan_auto",
      }),
    ).toContain(
      "fan_auto_entity and fan_override_entity must both be configured together",
    );
  });
});
