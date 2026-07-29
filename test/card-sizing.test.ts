import { describe, expect, it } from "vitest";
import { TwoStageThermostatCard } from "../src/two-state-thermostat";
import type { HassEntity, HomeAssistant } from "../src/types";

function makeClimate(): HassEntity {
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
      friendly_name: "Family Room",
      two_state_thermostat: true,
      operating_state_entity: "sensor.family_room_auto_operating_state",
      fan_auto_entity: "input_boolean.family_room_fan_automatic",
      fan_override_entity: "input_select.family_room_fan_override",
      effective_fan_entity: "sensor.family_room_effective_fan_mode",
      recommended_fan_entity: "sensor.family_room_automatic_fan_recommendation",
      boost_script_entity: "script.family_room_climate_boost",
      boost_active_entity: "input_boolean.family_room_climate_boost",
      boost_timer_entity: "timer.family_room_climate_boost",
      fan_options: ["quiet", "low", "medium", "high"],
    },
  };
}

function makeHass(): HomeAssistant {
  return {
    states: {
      "climate.family_room_auto_climate": makeClimate(),
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
    },
    callService: async () => undefined,
    formatEntityName: (entity) =>
      String(entity.attributes.friendly_name ?? entity.entity_id),
  };
}

describe("card grid sizing", () => {
  it("getCardSize remains available for legacy Masonry layouts", () => {
    const card = new TwoStageThermostatCard();
    expect(typeof card.getCardSize).toBe("function");
    expect(card.getCardSize()).toBe(8);
  });

  it("getGridOptions declares fixed half-width sizing for Sections dashboards", () => {
    const card = new TwoStageThermostatCard();
    expect(card.getGridOptions()).toEqual({
      columns: 6,
      min_columns: 6,
      rows: 8,
      min_rows: 7,
    });
  });

  it("keeps fan controls in normal document flow below the dial", async () => {
    const card = document.createElement(
      "two-state-thermostat",
    ) as TwoStageThermostatCard;
    document.body.appendChild(card);

    card.setConfig({
      type: "custom:two-state-thermostat",
      entity: "climate.family_room_auto_climate",
      show_recommended_fan: true,
    });
    card.hass = makeHass();
    await card.updateComplete;

    const cardRoot = card.shadowRoot?.querySelector(".card");
    expect(cardRoot).not.toBeNull();

    const dialSection = cardRoot?.querySelector(".dial-section");
    const fanSection = cardRoot?.querySelector(".fan-section");
    expect(dialSection).not.toBeNull();
    expect(fanSection).not.toBeNull();
    if (!cardRoot || !dialSection || !fanSection) {
      throw new Error("Expected card layout sections to render");
    }

    expect(fanSection.parentElement).toBe(cardRoot);
    expect(
      dialSection.compareDocumentPosition(fanSection) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const dialControls = cardRoot.querySelector(".dial-controls");
    expect(dialControls?.parentElement).toBe(dialSection);

    const fanPosition = getComputedStyle(fanSection).position;
    expect(["static", "relative", ""]).toContain(fanPosition);
    expect(fanSection.closest(".dial-section")).toBeNull();

    card.remove();
  });
});
