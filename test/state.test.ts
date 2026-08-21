import { describe, expect, it } from "vitest";
import { resolveCardConfig } from "../src/config";
import {
  adjustTarget,
  applyAuthoritativeTarget,
  buildCardViewState,
  clampTargetRange,
  formatTimerRemaining,
  getArcGeometry,
  getArcRemainingSegments,
  getBoostArcOverlay,
  getDegradedOperatingLabel,
  getFanState,
  getOperatingLabel,
  getStateLabelTone,
  normalizeOperatingState,
  normalizeOperatingStateFromHvacAction,
  roundToStep,
  targetFromAngle,
  tempToAngle,
  validateConfig,
} from "../src/state";
import type {
  ClimateRange,
  HassEntity,
  HomeAssistant,
  RawCardConfig,
} from "../src/types";

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

const baseConfig: RawCardConfig = {
  type: "custom:two-state-thermostat",
  entity: "climate.family_room",
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
  const baseRange = (overrides: Partial<ClimateRange> = {}): ClimateRange => ({
    current: 23,
    targetLow: 20,
    targetHigh: 23,
    minTemp: 16,
    maxTemp: 30,
    step: 0.5,
    hvacMode: "heat_cool",
    isOn: true,
    ...overrides,
  });

  it("rounds to step", () => {
    expect(roundToStep(22.24, 0.5)).toBe(22);
    expect(roundToStep(22.26, 0.5)).toBe(22.5);
  });

  it("enforces minimum separation without recentring", () => {
    const result = clampTargetRange(20, 20.2, 16, 30, 0.5, 1);
    expect(result.targetLow).toBe(20);
    expect(result.targetHigh).toBe(21);
    expect(result.targetHigh - result.targetLow).toBeGreaterThanOrEqual(1);
  });

  it("raises heat and pushes cool only when the gap is violated", () => {
    const close = adjustTarget(baseRange(), "low", 2, 2);
    expect(close).toEqual({ targetLow: 22, targetHigh: 24 });

    const wide = adjustTarget(
      baseRange({ targetLow: 18, targetHigh: 24 }),
      "low",
      2,
      2,
    );
    expect(wide).toEqual({ targetLow: 20, targetHigh: 24 });
  });

  it("lowers cool and pushes heat only when the gap is violated", () => {
    const close = adjustTarget(baseRange(), "high", -2, 2);
    expect(close).toEqual({ targetLow: 19, targetHigh: 21 });

    const wide = adjustTarget(
      baseRange({ targetLow: 18, targetHigh: 24 }),
      "high",
      -2,
      2,
    );
    expect(wide).toEqual({ targetLow: 18, targetHigh: 22 });
  });

  it("does not recentre both targets around the midpoint", () => {
    const result = applyAuthoritativeTarget(baseRange(), "low", 22, 2);
    expect(result).toEqual({ targetLow: 22, targetHigh: 24 });
    expect(result).not.toEqual({ targetLow: 21.5, targetHigh: 23.5 });
  });

  it("rounds requested values to the configured step", () => {
    const halfStep = applyAuthoritativeTarget(
      baseRange({ step: 0.5 }),
      "low",
      21.24,
      2,
    );
    expect(halfStep).toEqual({ targetLow: 21, targetHigh: 23 });

    const wholeStep = applyAuthoritativeTarget(baseRange({ step: 1 }), "high", 21.4, 2);
    expect(wholeStep).toEqual({ targetLow: 19, targetHigh: 21 });
  });

  it("pins to climate bounds when the requested heat cannot keep a valid cool target", () => {
    const result = applyAuthoritativeTarget(
      baseRange({ minTemp: 5, maxTemp: 30, targetLow: 20, targetHigh: 23 }),
      "low",
      29,
      2,
    );
    expect(result).toEqual({ targetLow: 28, targetHigh: 30 });
  });

  it("pins to climate bounds when the requested cool cannot keep a valid heat target", () => {
    const result = applyAuthoritativeTarget(
      baseRange({ minTemp: 5, maxTemp: 30, targetLow: 20, targetHigh: 23 }),
      "high",
      6,
      2,
    );
    expect(result).toEqual({ targetLow: 5, targetHigh: 7 });
  });

  it("adjusts low target without crossing high", () => {
    const climate = baseRange({
      targetLow: 22,
      targetHigh: 27.5,
      minTemp: 16,
    });
    const adjusted = adjustTarget(climate, "low", 0.5, 1);
    expect(adjusted?.targetLow).toBe(22.5);
    expect(adjusted!.targetHigh).toBe(27.5);
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

    const fan = getFanState(
      hass,
      resolveCardConfig(hass, {
        ...baseConfig,
        fan_auto_entity: "input_boolean.fan_auto",
        fan_override_entity: "input_select.fan_override",
        effective_fan_entity: "sensor.effective_fan",
      }),
    );

    expect(fan.isAuto).toBe(true);
    expect(fan.readOnly).toBe(true);
    expect(fan.displayLabel).toBe("Auto · Medium");
  });

  it("locks manual fan controls while boost is active", () => {
    const hass = makeHass({
      "input_boolean.fan_auto": {
        entity_id: "input_boolean.fan_auto",
        state: "off",
        attributes: {},
      },
      "input_select.fan_override": {
        entity_id: "input_select.fan_override",
        state: "low",
        attributes: { options: ["quiet", "low", "medium", "high"] },
      },
      "sensor.effective_fan": {
        entity_id: "sensor.effective_fan",
        state: "high",
        attributes: {},
      },
      "input_boolean.boost": {
        entity_id: "input_boolean.boost",
        state: "on",
        attributes: {},
      },
    });

    const fan = getFanState(
      hass,
      resolveCardConfig(hass, {
        ...baseConfig,
        fan_auto_entity: "input_boolean.fan_auto",
        fan_override_entity: "input_select.fan_override",
        effective_fan_entity: "sensor.effective_fan",
        boost_active_entity: "input_boolean.boost",
      }),
    );

    expect(fan.isAuto).toBe(false);
    expect(fan.readOnly).toBe(true);
    expect(fan.displayLabel).toBe("Manual · Low");
  });

  it("omits fan controls when not configured", () => {
    const fan = getFanState(makeHass({}), resolveCardConfig(undefined, baseConfig));
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

  it("converts pointer angles back to clamped targets", () => {
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

    const angle = tempToAngle(24, climate.minTemp, climate.maxTemp);
    const adjusted = targetFromAngle(angle, "low", climate, 2);
    expect(adjusted).toEqual({ targetLow: 24, targetHigh: 27.5 });
  });

  it("splits heating arc into base and remaining segments", () => {
    const geometry = getArcGeometry({
      current: 23.1,
      targetLow: 24.5,
      targetHigh: 27,
      minTemp: 16,
      maxTemp: 30,
      step: 0.5,
      hvacMode: "heat_cool",
      isOn: true,
    });

    const segments = getArcRemainingSegments(geometry, "maintain_heating");
    expect(segments.heatBase).not.toBeNull();
    expect(segments.heatRemaining).not.toBeNull();
    expect(segments.heatRemaining!.start).toBe(geometry.currentAngle);
    expect(segments.heatRemaining!.end).toBe(geometry.lowAngle);
  });

  it("splits cooling arc into base and remaining segments", () => {
    const geometry = getArcGeometry({
      current: 28,
      targetLow: 22,
      targetHigh: 27,
      minTemp: 16,
      maxTemp: 30,
      step: 0.5,
      hvacMode: "heat_cool",
      isOn: true,
    });

    const segments = getArcRemainingSegments(geometry, "maintain_cooling");
    expect(segments.coolBase).not.toBeNull();
    expect(segments.coolRemaining).not.toBeNull();
    expect(segments.coolRemaining!.start).toBe(geometry.highAngle);
    expect(segments.coolRemaining!.end).toBe(geometry.currentAngle);
  });

  it("shows heating gap while dragging the low target past current temperature", () => {
    const geometry = getArcGeometry({
      current: 21.8,
      targetLow: 24.5,
      targetHigh: 27,
      minTemp: 16,
      maxTemp: 30,
      step: 0.5,
      hvacMode: "heat_cool",
      isOn: true,
    });

    const idleSegments = getArcRemainingSegments(geometry, "idle");
    expect(idleSegments.heatRemaining).toBeNull();

    const dragSegments = getArcRemainingSegments(geometry, "idle", "low");
    expect(dragSegments.heatRemaining).not.toBeNull();
    expect(dragSegments.heatRemaining!.start).toBe(geometry.currentAngle);
    expect(dragSegments.heatRemaining!.end).toBe(geometry.lowAngle);
  });

  it("shows cooling gap while dragging the high target past current temperature", () => {
    const geometry = getArcGeometry({
      current: 28,
      targetLow: 22,
      targetHigh: 25,
      minTemp: 16,
      maxTemp: 30,
      step: 0.5,
      hvacMode: "heat_cool",
      isOn: true,
    });

    const idleSegments = getArcRemainingSegments(geometry, "idle");
    expect(idleSegments.coolRemaining).toBeNull();

    const dragSegments = getArcRemainingSegments(geometry, "idle", "high");
    expect(dragSegments.coolRemaining).not.toBeNull();
    expect(dragSegments.coolRemaining!.start).toBe(geometry.highAngle);
    expect(dragSegments.coolRemaining!.end).toBe(geometry.currentAngle);
  });
});

describe("getBoostArcOverlay", () => {
  const heatHold = {
    current: 19,
    targetLow: 20,
    targetHigh: 24,
    minTemp: 16,
    maxTemp: 30,
    step: 0.5,
    hvacMode: "heat_cool",
    isOn: true,
  };

  it("returns null when boost is inactive", () => {
    expect(getBoostArcOverlay(heatHold, "boost_heating", false)).toBeNull();
  });

  it("extends heating from the live heat target by 2°C without moving the knob", () => {
    const overlay = getBoostArcOverlay(heatHold, "boost_heating", true);
    expect(overlay?.kind).toBe("heat");
    expect(overlay?.originalTarget).toBe(20);
    expect(overlay?.boostedTarget).toBe(22);
    expect(overlay?.knobClimate.targetLow).toBe(20);
    expect(overlay?.knobClimate.targetHigh).toBe(24);
    expect(overlay?.segment).not.toBeNull();
    expect(overlay!.segment!.end).toBeGreaterThan(overlay!.segment!.start);
  });

  it("clips the heating boost overlay once current is past the live heat target", () => {
    const overlay = getBoostArcOverlay(
      { ...heatHold, current: 21 },
      "boost_heating",
      true,
    );
    expect(overlay?.segment?.start).toBe(tempToAngle(21, 16, 30));
    expect(overlay?.segment?.end).toBe(tempToAngle(22, 16, 30));
  });

  it("omits the heating overlay segment when current has reached the boost target", () => {
    const overlay = getBoostArcOverlay(
      { ...heatHold, current: 23 },
      "boost_heating",
      true,
    );
    expect(overlay?.originalTarget).toBe(20);
    expect(overlay?.boostedTarget).toBe(22);
    expect(overlay?.segment).toBeNull();
  });

  it("extends cooling 2°C below the live cool target without moving the knob", () => {
    const overlay = getBoostArcOverlay(
      {
        ...heatHold,
        current: 25,
        targetLow: 18,
        targetHigh: 24,
      },
      "boost_cooling",
      true,
    );
    expect(overlay?.kind).toBe("cool");
    expect(overlay?.originalTarget).toBe(24);
    expect(overlay?.boostedTarget).toBe(22);
    expect(overlay?.knobClimate.targetHigh).toBe(24);
    expect(overlay?.segment).not.toBeNull();
  });
});

describe("getStateLabelTone", () => {
  it("returns heat and cool tones for active states", () => {
    expect(getStateLabelTone("maintain_heating")).toBe("heat");
    expect(getStateLabelTone("boost_cooling")).toBe("cool");
    expect(getStateLabelTone("idle")).toBe("neutral");
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

describe("hvac_action fallback", () => {
  it("maps hvac_action to degraded operating labels", () => {
    expect(getDegradedOperatingLabel("heating")).toBe("Heating");
    expect(getDegradedOperatingLabel("cooling")).toBe("Cooling");
    expect(getDegradedOperatingLabel("idle")).toBe("Idle");
    expect(normalizeOperatingStateFromHvacAction("heating")).toBe("maintain_heating");
  });

  it("builds view state without operating-state entity", () => {
    const hass = makeHass({
      "climate.family_room": makeClimate({
        attributes: {
          ...makeClimate().attributes,
          hvac_action: "heating",
        },
      }),
    });

    const view = buildCardViewState(hass, {
      type: "custom:two-state-thermostat",
      entity: "climate.family_room",
    });

    expect(view.errors).toHaveLength(0);
    expect(view.operatingLabel).toBe("Heating");
    expect(view.warnings.some((warning) => warning.includes("operating-state"))).toBe(
      true,
    );
  });
});

describe("validateConfig", () => {
  it("requires entity", () => {
    expect(
      validateConfig({
        type: "custom:two-state-thermostat",
      }),
    ).toEqual(["Missing required configuration: entity"]);
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
