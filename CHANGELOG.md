# Changelog

All notable changes to this project will be documented in this file.

## [0.6.1] - 2026-09-26

### Fixed

- Fan-only mode no longer replaces the card with an error when the climate entity hides `target_temp_low` and `target_temp_high`.

## [0.6.0] - 2026-09-26

### Added

- Fan button on the dial enables fan-only mode by setting the virtual climate HVAC mode to `fan_only`.
- While fan only is active, the dial uses a teal **Fan** presentation, hides heat/cool targets and Boost, and keeps fan speed controls available.
- Pressing the fan button again returns to the configured power-on mode. Power still turns the climate entity off.

## [0.5.0] - 2026-08-27

### Added

- Optional Dry mode via `dry_entity` and `humidity_entity`, independent of the climate HVAC mode.
- While Dry is active, the dial uses a yellow presentation, shows **Dry Mode** with current temperature and humidity, hides heat/cool targets and fan controls, and replaces Boost with **Switch Mode** (cancels Dry without turning the thermostat on).
- Off turns off both Dry mode and the climate entity when `dry_entity` is configured.
- Current humidity is shown as a secondary reading in the normal thermostat UI when `humidity_entity` is set.

## [0.4.4] - 2026-08-21

### Changed

- Adjusting a heat or cool setpoint while Boost is active now cancels Boost and applies the new targets, instead of ignoring the change.
- Boost overlay uses a darker orange-red for heating and a lighter blue for cooling so the temporary margin is easier to see.

## [0.4.3] - 2026-08-21

### Fixed

- Boost overlay now starts at the heat or cool setpoint knob, not at the current-temperature marker.

## [0.4.2] - 2026-08-21

### Fixed

- Boost overlay now extends the live heat or cool setpoint by 2°C instead of moving the knob backward, which had shortened the arc.

## [0.4.1] - 2026-08-21

### Changed

- While Boost is active, the heat or cool arc extends from the original setpoint to the boosted target without a draggable knob, so the temporary +2°C / −2°C margin is visible on the dial.

## [0.4.0] - 2026-08-21

### Changed

- Default minimum heat/cool gap is now 2°C (`minimum_target_separation`). Explicit YAML values, including `1`, are unchanged.
- Raising the heating target now pushes cooling up only when needed, instead of recentring both setpoints. Lowering cooling pushes heating down the same way.
- While Boost is active, the Boost pill becomes a remaining-time control (click to extend) and a cancel control. Fan Auto/speed and dial knobs are locked until Boost ends.
- Editor label is now **Minimum heat/cool gap**, with helper text in Advanced configuration.

### Package contract

Boost remains owned by the Home Assistant package: snapshot, 30-minute timer, High fan override, heating/cooling direction, and restore. The card only calls the existing Boost and Cancel scripts.

## [0.3.8] - 2026-07-29

### Changed

- Current temperature dot on the dial no longer has a dark outline
- Dragging a heat or cool target past the current temperature now live-previews the prominent arc gap needed to reach that setpoint

## [0.3.7] - 2026-07-29

### Changed

- Current temperature marker on the dial is white, larger, and drawn above target knobs so it stays visible on the arcs
- Fan controls consolidated into a single compact row with dot-style speed steps

## [0.3.6] - 2026-07-28

### Fixed

- Reverted Sections grid sizing from `rows: auto` to fixed 6×8 cells and raised `min_columns` to 6 so cards stay half-width instead of shrinking into narrow strips.

## [0.3.5] - 2026-07-28

### Fixed

- Fixed card overlap in Home Assistant Sections dashboards by declaring automatic grid row height instead of a fixed row count.

## [0.3.4] - 2026-07-28

### Fixed

- Fixed card overlap in Home Assistant Sections dashboards by increasing the declared grid height for cards with fan and Boost controls.

## [0.3.3] - 2026-07-28

### Changed

- Brighter heat/cool arc and knob colours when the thermostat is on; greyed-out when off for clearer power-state distinction
- Power and boost controls grouped below the dial

## [0.3.1] - 2026-07-27

### Fixed

- v0.3.0 release shipped the wrong bundle: the tag was pushed before draggable-dial source was committed, so the GitHub Release rebuild still contained +/- target controls. This release includes the correct source and bundle.

### Changed

- Draggable heat/cool arc knobs replace +/- setpoint buttons (as intended for 0.3.0)

## [0.3.0] - 2026-07-27

### Changed

- Replace heating/cooling +/- buttons with draggable arc knobs for direct setpoint adjustment
- Live preview of target range while dragging; changes commit on release

## [0.2.0] - 2026-07-27

### Added

- Anchor-entity configuration: select one virtual climate controller (`entity`) and auto-discover companion entities from climate attributes
- `resolveCardConfig(hass, rawConfig)` runtime resolver with explicit-config-first precedence
- Conservative naming-convention fallback for companion entity discovery
- Redesigned graphical editor with climate entity picker, discovery summary, and collapsed Advanced configuration section
- `getEntitySuggestion` for compatible climate entities (`two_state_thermostat` attribute or dual-range + operating-state discovery)
- Degraded operating-state fallback via `climate.hvac_action` when no operating-state sensor is configured
- Package integration contract documentation in README
- Unit tests for config resolution, discovery summary, entity suggestions, and hvac_action fallback

### Changed

- `getStubConfig()` returns `{}` instead of fake example entities
- `climate_entity` remains supported as a backwards-compatible alias for `entity`
- Card title uses `hass.formatEntityName` when no custom `name` is configured (generated names are not stored)

## [0.1.0] - 2026-07-27

### Added

- Initial public release of the Two State Thermostat Lovelace card
- HACS Dashboard plugin packaging (`hacs.json`, `dist/two-state-thermostat.js`)
- Dual-range SVG climate dial with operating-state visual feedback
- Power, Boost, and fan Auto/manual controls
- Graphical card editor
- GitHub Actions for build, HACS validation, and tagged releases
- Unit tests for state, services, and configuration validation
