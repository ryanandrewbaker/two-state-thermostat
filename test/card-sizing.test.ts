import { describe, expect, it } from "vitest";
import { TwoStageThermostatCard } from "../src/two-state-thermostat";

describe("card grid sizing", () => {
  it("getCardSize reserves enough vertical space for the full layout", () => {
    const card = new TwoStageThermostatCard();
    expect(card.getCardSize()).toBe(8);
  });

  it("getGridOptions declares columns and rows for Sections and grid layouts", () => {
    const card = new TwoStageThermostatCard();
    expect(card.getGridOptions()).toEqual({
      columns: 6,
      min_columns: 4,
      rows: 8,
      min_rows: 7,
    });
  });
});
