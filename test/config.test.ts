import { describe, expect, it } from "vitest";
import { validateConfig } from "../src/state";
import type { TwoStageThermostatConfig } from "../src/types";

describe("config validation", () => {
  it("accepts minimal configuration", () => {
    const config: TwoStageThermostatConfig = {
      type: "custom:two-state-thermostat",
      climate_entity: "climate.family_room_auto_climate",
      operating_state_entity: "sensor.family_room_auto_operating_state",
    };

    expect(validateConfig(config)).toEqual([]);
  });

  it("accepts full configuration", () => {
    const config: TwoStageThermostatConfig = {
      type: "custom:two-state-thermostat",
      name: "Family Room",
      climate_entity: "climate.family_room_auto_climate",
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
      fan_options: [
        { value: "quiet", label: "Quiet" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
      target_step: 0.5,
      show_countdown: true,
      show_recommended_fan: true,
      show_effective_targets: false,
    };

    expect(validateConfig(config)).toEqual([]);
  });

  it("rejects duplicate fan option values", () => {
    const errors = validateConfig({
      type: "custom:two-state-thermostat",
      climate_entity: "climate.test",
      operating_state_entity: "sensor.test",
      fan_options: [
        { value: "low", label: "Low" },
        { value: "low", label: "Low again" },
      ],
    });

    expect(errors).toContain("fan_options contains duplicate values");
  });
});
