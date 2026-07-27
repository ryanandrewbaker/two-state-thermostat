# Two Stage Thermostat

A production-quality Home Assistant Lovelace card for dual-range (heat/cool) climate control with Boost and Maintain operating-state feedback.

![Screenshot placeholder](docs/screenshot-placeholder.png)

> Screenshot placeholder — replace with a dashboard capture before publishing.

## Features

- Dual heating and cooling thermostat range display
- Current control temperature with responsive SVG dial
- Operating state from a dedicated sensor: Off, Idle, Boost Heating, Maintain Heating, Boost Cooling, Maintain Cooling
- Single power button controlling the virtual climate entity
- Boost button with optional countdown from a timer entity
- Automatic or manual fan control via helpers (never uses native appliance `auto` fan mode)
- Theme-aware styling using Home Assistant CSS variables
- Graphical Lovelace card editor
- HACS-ready Dashboard plugin

## Architecture

This card is **frontend only**. It does not implement thermostat decisions, timers, hysteresis, automatic fan selection, or direct control of a physical split system.

All climate logic remains in Home Assistant entities, scripts, helpers, and automations. The card:

- Reads state from configured virtual entities
- Calls services only on the virtual climate entity, scripts, and helpers
- **Never** calls `climate.set_fan_mode`
- **Never** calls services on a physical Sensibo or split-system climate entity

## HACS installation

1. Open HACS.
2. Open the three-dot menu.
3. Select **Custom repositories**.
4. Add the GitHub repository URL.
5. Select **Dashboard** as the category.
6. Install **Two Stage Thermostat**.
7. Reload the browser frontend.
8. Add `custom:two-state-thermostat` to a dashboard.

HACS normally registers the resource automatically. After an update, reload the frontend or clear the browser cache if the card does not appear.

Recommended GitHub topics: `home-assistant`, `lovelace`, `custom-card`, `hacs`, `thermostat`, `climate`

## Manual installation

1. Download `two-state-thermostat.js` from the [latest release](https://github.com/ryanandrewbaker/two-state-thermostat/releases).
2. Copy it to your Home Assistant `config/www/` directory.
3. Add a Lovelace resource:

```yaml
url: /local/two-state-thermostat.js
type: module
```

4. Reload the browser frontend.

## Minimal YAML example

```yaml
type: custom:two-state-thermostat
climate_entity: climate.family_room_auto_climate
operating_state_entity: sensor.family_room_auto_operating_state
```

## Full YAML example

```yaml
type: custom:two-state-thermostat
name: Family Room
climate_entity: climate.family_room_auto_climate
temperature_entity: sensor.family_room_control_temperature
operating_state_entity: sensor.family_room_auto_operating_state

fan_auto_entity: input_boolean.family_room_fan_automatic
fan_override_entity: input_select.family_room_fan_override
effective_fan_entity: sensor.family_room_effective_fan_mode
recommended_fan_entity: sensor.family_room_automatic_fan_recommendation

boost_script_entity: script.family_room_climate_boost
boost_cancel_script_entity: script.family_room_climate_cancel_boost
boost_active_entity: input_boolean.family_room_climate_boost
boost_timer_entity: timer.family_room_climate_boost

power_on_mode: heat_cool

fan_options:
  - value: quiet
    label: Quiet
  - value: low
    label: Low
  - value: medium
    label: Medium
  - value: high
    label: High

target_step: 0.5
show_countdown: true
show_recommended_fan: true
show_effective_targets: false
```

## Entity contract

| Config key                   | Required | Purpose                                                            |
| ---------------------------- | -------- | ------------------------------------------------------------------ |
| `climate_entity`             | Yes      | Virtual climate entity with `target_temp_low` / `target_temp_high` |
| `operating_state_entity`     | Yes      | Sensor reporting operating state                                   |
| `temperature_entity`         | No       | Preferred current temperature source                               |
| `fan_auto_entity`            | No       | `input_boolean` — on = automatic fan management                    |
| `fan_override_entity`        | No       | `input_select` with explicit fan speeds                            |
| `effective_fan_entity`       | No       | Sensor showing requested fan speed                                 |
| `recommended_fan_entity`     | No       | Sensor showing automatic recommendation                            |
| `boost_script_entity`        | No       | Script to start/restart boost                                      |
| `boost_cancel_script_entity` | No       | Script to cancel boost                                             |
| `boost_active_entity`        | No       | `input_boolean` indicating boost active                            |
| `boost_timer_entity`         | No       | Timer for countdown display                                        |

## Fan semantics

**Auto** in this card means Home Assistant automatically chooses an explicit fan speed through your external staged controller.

- When Auto is enabled, the slider is read-only and shows the effective or recommended speed.
- When Auto is disabled, the slider writes an explicit manual override via `input_select.select_option`.
- The physical appliance's native `auto` fan mode is **not** used or exposed.
- The card never calls `climate.set_fan_mode`.

Preferred backend model: `fan_auto_entity` (boolean) + `fan_override_entity` (select).

Alternative: represent Auto as a special option in `fan_override_entity`.

## Boost semantics

Boost behaviour is owned by your Home Assistant package, not this card.

When Boost is pressed, the card calls `script.turn_on` on `boost_script_entity`. Documented backend behaviour:

- Heating: effective target = base target + 1°C
- Cooling: effective target = base target − 1°C
- Base user targets remain unchanged
- Fan forced to High
- Expires after 30 minutes

Pressing Boost again restarts the period. If `boost_cancel_script_entity` is configured, right-click the active Boost button to cancel.

## Troubleshooting

| Symptom                        | Check                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| Card shows configuration error | `climate_entity` and `operating_state_entity` are set and available                 |
| No dual-range display          | Climate entity exposes `target_temp_low` and `target_temp_high`                     |
| Fan controls missing           | Configure `fan_auto_entity` + `fan_override_entity`, or `fan_override_entity` alone |
| Boost has no countdown         | Configure `boost_timer_entity`; set `show_countdown: false` to hide                 |
| Card not in picker             | Resource registered; hard-refresh browser; check browser console                    |

## Development

```bash
npm ci
npm run dev        # watch build
npm run build      # typecheck + production bundle
npm run lint
npm run typecheck
npm test
```

Output: `dist/two-state-thermostat.js`

## Release process

1. Update `CHANGELOG.md` and version in `package.json`.
2. Run full validation: `npm run lint && npm run typecheck && npm test && npm run build`.
3. Commit changes including `dist/two-state-thermostat.js`.
4. Tag: `git tag v0.1.0 && git push origin v0.1.0`
5. GitHub Actions creates a release with the compiled JS asset.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

MIT — see [LICENSE](LICENSE).
