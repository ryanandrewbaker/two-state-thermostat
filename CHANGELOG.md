# Changelog

All notable changes to this project will be documented in this file.

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
