import { describe, expect, it } from "vitest";
import { describeArcState, buildCardViewState, getStateLabelTone } from "../src/state";
import { TwoStageThermostatCard } from "../src/two-state-thermostat";
import type { HassEntity, HomeAssistant, RawCardConfig } from "../src/types";

function makeClimate(hvacMode = "heat_cool"): HassEntity {
  return {
    entity_id: "climate.family_room_auto_climate",
    state: hvacMode,
    attributes: {
      current_temperature: 22.4,
      target_temp_low: 20,
      target_temp_high: 24,
      min_temp: 16,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_mode: hvacMode,
      hvac_modes: ["off", "heat_cool", "fan_only"],
      friendly_name: "Family Room",
    },
  };
}

function makeHass(
  hvacMode = "heat_cool",
  extras: Record<string, HassEntity> = {},
): HomeAssistant {
  return {
    states: {
      "climate.family_room_auto_climate": makeClimate(hvacMode),
      "sensor.family_room_auto_operating_state": {
        entity_id: "sensor.family_room_auto_operating_state",
        state: hvacMode === "off" ? "off" : "idle",
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
      ...extras,
    },
    callService: async () => undefined,
  };
}

const config: RawCardConfig = {
  type: "custom:two-state-thermostat",
  entity: "climate.family_room_auto_climate",
  operating_state_entity: "sensor.family_room_auto_operating_state",
  fan_auto_entity: "input_boolean.family_room_fan_automatic",
  fan_override_entity: "input_select.family_room_fan_override",
  boost_script_entity: "script.family_room_climate_boost",
  boost_cancel_script_entity: "script.family_room_climate_cancel_boost",
  boost_active_entity: "input_boolean.family_room_climate_boost",
};

async function renderCard(hass: HomeAssistant, cardConfig: RawCardConfig = config) {
  const card = document.createElement("two-state-thermostat") as TwoStageThermostatCard;
  document.body.appendChild(card);
  card.setConfig(cardConfig);
  card.hass = hass;
  await card.updateComplete;

  const dial = card.shadowRoot?.querySelector("climate-dial") as
    (HTMLElement & { updateComplete: Promise<boolean> }) | null;
  const fan = card.shadowRoot?.querySelector("fan-mode-button") as
    (HTMLElement & { updateComplete: Promise<boolean> }) | null;
  const boost = card.shadowRoot?.querySelector("boost-button") as
    (HTMLElement & { updateComplete: Promise<boolean> }) | null;
  if (dial) await dial.updateComplete;
  if (fan) await fan.updateComplete;
  if (boost) await boost.updateComplete;
  return { card, dial, fan, boost };
}

async function flush() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("fan only mode", () => {
  it("shows a Fan dial and keeps fan speed controls", async () => {
    const hass = makeHass("fan_only");
    const view = buildCardViewState(hass, config);

    expect(view.operatingState).toBe("fan");
    expect(view.operatingLabel).toBe("Fan");
    expect(getStateLabelTone("fan")).toBe("fan");
    expect(describeArcState("fan")).toMatchObject({
      warmActive: false,
      coolActive: false,
      subdued: false,
    });

    const { card, dial, fan, boost } = await renderCard(hass);
    const wrap = dial?.shadowRoot?.querySelector(".dial-wrap");
    expect(dial?.shadowRoot?.querySelector(".state-label")?.textContent?.trim()).toBe(
      "Fan",
    );
    expect(wrap?.classList.contains("fan")).toBe(true);
    expect(dial?.shadowRoot?.querySelector(".arc-fan")).not.toBeNull();
    expect(dial?.shadowRoot?.querySelector(".arc-heat")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".range")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".knob-heat")).toBeNull();
    expect(fan?.shadowRoot?.querySelector("button")?.getAttribute("aria-pressed")).toBe(
      "true",
    );
    expect(boost).toBeNull();
    expect(card.shadowRoot?.querySelector(".fan-section")).not.toBeNull();
    card.remove();
  });

  it("overrides an idle operating sensor while fan only is active", () => {
    const hass = makeHass("fan_only");
    hass.states["sensor.family_room_auto_operating_state"] = {
      entity_id: "sensor.family_room_auto_operating_state",
      state: "idle",
      attributes: {},
    };

    expect(buildCardViewState(hass, config).operatingLabel).toBe("Fan");
  });

  it("lets Dry mode take over when both are active", () => {
    const hass = makeHass("fan_only", {
      "switch.family_room_dry_mode": {
        entity_id: "switch.family_room_dry_mode",
        state: "on",
        attributes: {},
      },
    });
    const view = buildCardViewState(hass, {
      ...config,
      dry_entity: "switch.family_room_dry_mode",
    });
    expect(view.operatingState).toBe("dry");
    expect(view.operatingLabel).toBe("Dry Mode");
  });

  it("starts fan only from heat/cool", async () => {
    const hass = makeHass("heat_cool");
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    const { card, fan, boost } = await renderCard(hass);
    expect(boost).not.toBeNull();
    expect(fan?.shadowRoot?.querySelector("button")?.getAttribute("aria-pressed")).toBe(
      "false",
    );

    fan?.shadowRoot?.querySelector("button")?.click();
    await flush();

    expect(calls).toEqual([
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.family_room_auto_climate",
          hvac_mode: "fan_only",
        },
      },
    ]);
    card.remove();
  });

  it("returns to heat/cool when fan only is pressed again", async () => {
    const hass = makeHass("fan_only");
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    const { card, fan } = await renderCard(hass);
    fan?.shadowRoot?.querySelector("button")?.click();
    await flush();

    expect(calls).toEqual([
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.family_room_auto_climate",
          hvac_mode: "heat_cool",
        },
      },
    ]);
    card.remove();
  });

  it("cancels boost before starting fan only", async () => {
    const hass = makeHass("heat_cool", {
      "input_boolean.family_room_climate_boost": {
        entity_id: "input_boolean.family_room_climate_boost",
        state: "on",
        attributes: {},
      },
    });
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    const { card, fan } = await renderCard(hass);
    fan?.shadowRoot?.querySelector("button")?.click();
    await flush();

    expect(calls.map((call) => call.data?.entity_id)).toEqual([
      "script.family_room_climate_cancel_boost",
      "climate.family_room_auto_climate",
    ]);
    expect(calls[1]?.data?.hvac_mode).toBe("fan_only");
    expect(calls.some((call) => call.service === "set_fan_mode")).toBe(false);
    card.remove();
  });

  it("hides the fan button while Dry is active", async () => {
    const hass = makeHass("off", {
      "switch.family_room_dry_mode": {
        entity_id: "switch.family_room_dry_mode",
        state: "on",
        attributes: {},
      },
    });
    const { card, fan } = await renderCard(hass, {
      ...config,
      dry_entity: "switch.family_room_dry_mode",
    });
    expect(fan).toBeNull();
    card.remove();
  });
});
