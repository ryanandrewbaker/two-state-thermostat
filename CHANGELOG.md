# Changelog

All notable changes to this project will be documented in this file.

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
