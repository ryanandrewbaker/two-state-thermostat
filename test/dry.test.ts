import { describe, expect, it } from "vitest";
import { resolveCardConfig } from "../src/config";
import { buildDryOffCall, cancelDry, setPower, triggerBoost } from "../src/services";
import {
  buildCardViewState,
  describeArcState,
  formatHumidity,
  getStateLabelTone,
} from "../src/state";
import { TwoStageThermostatCard } from "../src/two-state-thermostat";
import type { HassEntity, HomeAssistant, RawCardConfig } from "../src/types";

function makeClimate(overrides: Partial<HassEntity> = {}): HassEntity {
  return {
    entity_id: "climate.bedroom_auto_climate",
    state: "off",
    attributes: {
      current_temperature: 12.9,
      target_temp_low: 20,
      target_temp_high: 24,
      min_temp: 16,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_mode: "off",
      friendly_name: "Bedroom",
    },
    ...overrides,
  };
}

function makeHass(entities: Record<string, HassEntity> = {}): HomeAssistant {
  return {
    states: {
      "climate.bedroom_auto_climate": makeClimate(),
      "sensor.bedroom_operating_state": {
        entity_id: "sensor.bedroom_operating_state",
        state: "off",
        attributes: {},
      },
      "script.bedroom_climate_boost": {
        entity_id: "script.bedroom_climate_boost",
        state: "off",
        attributes: {},
      },
      ...entities,
    },
    callService: async () => undefined,
  };
}

const climateConfig: RawCardConfig = {
  type: "custom:two-state-thermostat",
  entity: "climate.bedroom_auto_climate",
  operating_state_entity: "sensor.bedroom_operating_state",
  boost_script_entity: "script.bedroom_climate_boost",
};

const dryConfig: RawCardConfig = {
  ...climateConfig,
  dry_entity: "switch.bedroom_dry_mode",
  humidity_entity: "sensor.bedroom_humidity",
};

const resolvedDryConfig = resolveCardConfig(undefined, dryConfig);

function dryEntities(state: "on" | "off" = "off"): Record<string, HassEntity> {
  return {
    "switch.bedroom_dry_mode": {
      entity_id: "switch.bedroom_dry_mode",
      state,
      attributes: {},
    },
    "sensor.bedroom_humidity": {
      entity_id: "sensor.bedroom_humidity",
      state: "79",
      attributes: { unit_of_measurement: "%" },
    },
  };
}

function withDryOn(hass: HomeAssistant): HomeAssistant {
  return {
    ...hass,
    states: {
      ...dryEntities("on"),
      ...hass.states,
      "switch.bedroom_dry_mode": {
        entity_id: "switch.bedroom_dry_mode",
        state: "on",
        attributes: {},
      },
    },
  };
}

async function renderCard(config: RawCardConfig, hass: HomeAssistant) {
  const card = document.createElement("two-state-thermostat") as TwoStageThermostatCard;
  document.body.appendChild(card);
  card.setConfig(config);
  card.hass = hass;
  await card.updateComplete;

  const dial = card.shadowRoot?.querySelector("climate-dial") as
    (HTMLElement & { updateComplete: Promise<boolean> }) | null;
  const boost = card.shadowRoot?.querySelector("boost-button") as
    (HTMLElement & { updateComplete: Promise<boolean> }) | null;
  const power = card.shadowRoot?.querySelector("power-button") as
    (HTMLElement & { updateComplete: Promise<boolean> }) | null;

  if (dial) await dial.updateComplete;
  if (boost) await boost.updateComplete;
  if (power) await power.updateComplete;

  return { card, dial, boost, power };
}

async function flush() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("existing card without dry_entity", () => {
  it("keeps normal thermostat presentation and Boost", async () => {
    const hass = makeHass({
      "climate.bedroom_auto_climate": makeClimate({
        state: "heat_cool",
        attributes: {
          ...makeClimate().attributes,
          hvac_mode: "heat_cool",
        },
      }),
      "sensor.bedroom_operating_state": {
        entity_id: "sensor.bedroom_operating_state",
        state: "idle",
        attributes: {},
      },
    });

    const view = buildCardViewState(hass, climateConfig);
    expect(view.dry).toEqual({ configured: false, active: false });
    expect(view.humidity.configured).toBe(false);
    expect(view.operatingLabel).toBe("Idle");
    expect(view.boost.available).toBe(true);

    const { card, dial, boost } = await renderCard(climateConfig, hass);
    expect(dial?.shadowRoot?.querySelector(".state-label")?.textContent?.trim()).toBe(
      "Idle",
    );
    expect(
      dial?.shadowRoot?.querySelector(".dial-wrap")?.classList.contains("dry"),
    ).toBe(false);
    expect(dial?.shadowRoot?.querySelector(".range")).not.toBeNull();
    expect(boost?.shadowRoot?.textContent).toContain("Boost");
    expect(boost?.shadowRoot?.textContent).not.toContain("Switch Mode");
    card.remove();
  });
});

describe("dry inactive", () => {
  it("keeps the normal thermostat UI and Boost behaviour", async () => {
    const hass = makeHass({
      "climate.bedroom_auto_climate": makeClimate({
        state: "heat_cool",
        attributes: {
          ...makeClimate().attributes,
          hvac_mode: "heat_cool",
        },
      }),
      "sensor.bedroom_operating_state": {
        entity_id: "sensor.bedroom_operating_state",
        state: "idle",
        attributes: {},
      },
      ...dryEntities("off"),
    });
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    const view = buildCardViewState(hass, dryConfig);
    expect(view.dry).toEqual({ configured: true, active: false });
    expect(view.operatingState).toBe("idle");
    expect(view.operatingLabel).toBe("Idle");
    expect(view.humidity).toEqual({ configured: true, value: 79 });

    const { card, dial, boost } = await renderCard(dryConfig, hass);
    expect(dial?.shadowRoot?.querySelector(".state-label")?.textContent?.trim()).toBe(
      "Idle",
    );
    expect(dial?.shadowRoot?.querySelector(".humidity")?.textContent?.trim()).toBe(
      "79%",
    );
    expect(dial?.shadowRoot?.querySelector(".range")).not.toBeNull();
    expect(boost?.shadowRoot?.textContent).toContain("Boost");

    boost?.shadowRoot?.querySelector("button")?.click();
    await flush();
    expect(calls).toEqual([
      {
        domain: "script",
        service: "turn_on",
        data: { entity_id: "script.bedroom_climate_boost" },
      },
    ]);
    card.remove();
  });
});

describe("dry active", () => {
  it("uses Dry Mode presentation, humidity, and Switch Mode", async () => {
    const hass = withDryOn(makeHass());
    const view = buildCardViewState(hass, dryConfig);

    expect(view.dry).toEqual({ configured: true, active: true });
    expect(view.operatingState).toBe("dry");
    expect(view.operatingLabel).toBe("Dry Mode");
    expect(view.humidity.value).toBe(79);
    expect(getStateLabelTone(view.operatingState)).toBe("dry");
    expect(describeArcState("dry")).toMatchObject({
      warmActive: false,
      coolActive: false,
      subdued: false,
    });

    const { card, dial, boost } = await renderCard(dryConfig, hass);
    const wrap = dial?.shadowRoot?.querySelector(".dial-wrap");
    expect(dial?.shadowRoot?.querySelector(".state-label")?.textContent?.trim()).toBe(
      "Dry Mode",
    );
    expect(wrap?.classList.contains("dry")).toBe(true);
    expect(dial?.shadowRoot?.querySelector(".arc-dry")).not.toBeNull();
    expect(dial?.shadowRoot?.querySelector(".arc-heat")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".arc-cool")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".humidity")?.textContent?.trim()).toBe(
      "79%",
    );
    expect(dial?.shadowRoot?.querySelector(".range")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".knob-heat")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".knob-cool")).toBeNull();
    expect(boost?.shadowRoot?.textContent).toContain("Switch Mode");
    expect(boost?.shadowRoot?.textContent).not.toContain("Boost");
    expect(card.shadowRoot?.querySelector(".fan-section")).toBeNull();
    card.remove();
  });

  it("does not show Unknown when climate is off while drying", () => {
    const hass = withDryOn(
      makeHass({
        "sensor.bedroom_operating_state": {
          entity_id: "sensor.bedroom_operating_state",
          state: "unknown",
          attributes: {},
        },
      }),
    );

    const view = buildCardViewState(hass, dryConfig);
    expect(view.operatingLabel).toBe("Dry Mode");
    expect(view.operatingLabel).not.toBe("Unknown");
    expect(view.errors).toHaveLength(0);
  });
});

describe("Switch Mode", () => {
  it("turns off dry without starting climate", async () => {
    const hass = withDryOn(makeHass());
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    const { card, boost } = await renderCard(dryConfig, hass);
    boost?.shadowRoot?.querySelector("button")?.click();
    await flush();

    expect(calls).toEqual([
      {
        domain: "switch",
        service: "turn_off",
        data: { entity_id: "switch.bedroom_dry_mode" },
      },
    ]);
    expect(calls.some((call) => call.domain === "climate")).toBe(false);
    card.remove();
  });

  it("does not call climate.set_hvac_mode when cancelling Dry", async () => {
    const hass = withDryOn(makeHass());
    const calls: Array<{ domain: string; service: string }> = [];
    hass.callService = async (domain, service) => {
      calls.push({ domain, service });
    };

    await cancelDry(hass, resolvedDryConfig);
    expect(calls).toEqual([{ domain: "switch", service: "turn_off" }]);
  });
});

describe("Off", () => {
  it("turns off dry and climate when Dry is active", async () => {
    const hass = withDryOn(makeHass());
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    const { card, power } = await renderCard(dryConfig, hass);
    power?.shadowRoot?.querySelector("button")?.click();
    await flush();

    expect(calls).toEqual([
      {
        domain: "switch",
        service: "turn_off",
        data: { entity_id: "switch.bedroom_dry_mode" },
      },
      {
        domain: "climate",
        service: "set_hvac_mode",
        data: {
          entity_id: "climate.bedroom_auto_climate",
          hvac_mode: "off",
        },
      },
    ]);
    card.remove();
  });

  it("turns off both entities from setPower even if Dry is already off", async () => {
    const hass = makeHass();
    const calls: Array<{
      domain: string;
      service: string;
      data?: Record<string, unknown>;
    }> = [];
    hass.callService = async (domain, service, data) => {
      calls.push({ domain, service, data });
    };

    await setPower(hass, resolvedDryConfig, false);
    expect(calls.map((call) => `${call.domain}.${call.service}`)).toEqual([
      "switch.turn_off",
      "climate.set_hvac_mode",
    ]);
  });
});

describe("missing or unavailable humidity", () => {
  it("keeps Dry UI working when humidity is unavailable", async () => {
    const hass = withDryOn(
      makeHass({
        "sensor.bedroom_humidity": {
          entity_id: "sensor.bedroom_humidity",
          state: "unavailable",
          attributes: {},
        },
      }),
    );

    const view = buildCardViewState(hass, dryConfig);
    expect(view.dry.active).toBe(true);
    expect(view.operatingLabel).toBe("Dry Mode");
    expect(view.humidity).toEqual({ configured: true, value: null });
    expect(view.errors).toHaveLength(0);
    expect(formatHumidity(view.humidity.value)).toBe("—%");

    const { card, dial } = await renderCard(dryConfig, hass);
    expect(dial?.shadowRoot?.querySelector(".state-label")?.textContent?.trim()).toBe(
      "Dry Mode",
    );
    expect(dial?.shadowRoot?.querySelector(".humidity")?.textContent?.trim()).toBe(
      "—%",
    );
    card.remove();
  });

  it("omits humidity when humidity_entity is not configured", async () => {
    const hass = makeHass({
      "switch.bedroom_dry_mode": {
        entity_id: "switch.bedroom_dry_mode",
        state: "on",
        attributes: {},
      },
    });
    const config: RawCardConfig = {
      ...climateConfig,
      dry_entity: "switch.bedroom_dry_mode",
    };
    const view = buildCardViewState(hass, config);

    expect(view.humidity.configured).toBe(false);
    const { card, dial } = await renderCard(config, hass);
    expect(dial?.shadowRoot?.querySelector(".humidity")).toBeNull();
    expect(dial?.shadowRoot?.querySelector(".state-label")?.textContent?.trim()).toBe(
      "Dry Mode",
    );
    card.remove();
  });
});

describe("unavailable dry entity", () => {
  it("does not crash or show Unknown from the optional dry entity", () => {
    const hass = makeHass({
      "climate.bedroom_auto_climate": makeClimate({
        state: "heat_cool",
        attributes: {
          ...makeClimate().attributes,
          hvac_mode: "heat_cool",
        },
      }),
      "sensor.bedroom_operating_state": {
        entity_id: "sensor.bedroom_operating_state",
        state: "idle",
        attributes: {},
      },
      "switch.bedroom_dry_mode": {
        entity_id: "switch.bedroom_dry_mode",
        state: "unavailable",
        attributes: {},
      },
    });

    const view = buildCardViewState(hass, dryConfig);
    expect(view.dry).toEqual({ configured: true, active: false });
    expect(view.operatingLabel).toBe("Idle");
    expect(view.errors).toHaveLength(0);
  });
});

describe("dry service payloads", () => {
  it("builds a switch.turn_off call for the configured dry entity", () => {
    expect(buildDryOffCall(resolvedDryConfig)).toEqual({
      domain: "switch",
      service: "turn_off",
      data: { entity_id: "switch.bedroom_dry_mode" },
    });
  });

  it("does not build a dry call when dry_entity is omitted", () => {
    expect(buildDryOffCall(resolveCardConfig(undefined, climateConfig))).toBeNull();
  });

  it("leaves climate unchanged when triggering Boost in normal mode", async () => {
    const hass = makeHass();
    const calls: Array<{ domain: string; service: string }> = [];
    hass.callService = async (domain, service) => {
      calls.push({ domain, service });
    };

    await triggerBoost(hass, resolvedDryConfig);
    expect(calls).toEqual([{ domain: "script", service: "turn_on" }]);
  });
});
