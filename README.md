# Two State Thermostat

A Home Assistant Lovelace card for dual-range (heat/cool) climate control with Boost and Maintain operating-state feedback.

![Screenshot](docs/screenshot-placeholder.png)

## Features

- Dual heating and cooling thermostat range display
- Current control temperature with responsive SVG dial
- Operating state from a dedicated sensor (Off, Idle, Boost/Maintain Heating/Cooling)
- Power button for the virtual climate entity
- Boost button with optional countdown from a timer entity
- Automatic or manual fan control via Home Assistant helpers
- Theme-aware styling using Home Assistant CSS variables
- Graphical Lovelace card editor

This card is **frontend only**. Thermostat logic, timers, hysteresis, and fan staging remain in your Home Assistant configuration.

## Installation

### HACS (recommended)

1. Open **HACS**.
2. Open the three-dot menu → **Custom repositories**.
3. Add repository URL:

   `https://github.com/ryanandrewbaker/two-state-thermostat`

4. Select category: **Dashboard**
5. Click **Add**.
6. Open **HACS → Dashboard** (or search for **Two State Thermostat**).
7. Click **Download**.
8. Reload your browser frontend (or clear cache after updates).
9. Add the card to a dashboard (see [Configuration](#configuration)).

HACS normally registers the resource automatically. If the card does not appear, confirm the resource exists under **Settings → Dashboards → Resources**:

```yaml
url: /hacsfiles/two-state-thermostat/two-state-thermostat.js
type: module
```

### Manual installation

1. Download `two-state-thermostat.js` from the [latest release](https://github.com/ryanandrewbaker/two-state-thermostat/releases/latest).
2. Copy it to your Home Assistant `config/www/` directory.
3. Add a Lovelace resource:

```yaml
url: /local/two-state-thermostat.js
type: module
```

4. Reload your browser frontend.

## Configuration

### Minimal example

```yaml
type: custom:two-state-thermostat
climate_entity: climate.family_room_auto_climate
operating_state_entity: sensor.family_room_auto_operating_state
```

### Full example

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
target_step: 0.5
show_countdown: true
show_recommended_fan: true
show_effective_targets: false
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full entity contract and development guidelines.

## Development

### Prerequisites

- Node.js 22 LTS (or current Node LTS)
- npm

### Setup

```bash
git clone https://github.com/ryanandrewbaker/two-state-thermostat.git
cd two-state-thermostat
npm install
```

### Commands

```bash
npm run dev        # watch build to dist/
npm run build      # production bundle
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Vitest unit tests
```

### Local testing in Home Assistant

1. Run `npm run build`.
2. Copy or symlink `dist/two-state-thermostat.js` into your HA `config/www/` directory.
3. Register the resource as `/local/two-state-thermostat.js` with `type: module`.
4. Hard-refresh the browser after each rebuild.

## Building

```bash
npm install
npm run build
```

Output: `dist/two-state-thermostat.js`

The built file is committed to the repository so HACS can install directly from the default branch without a GitHub Release.

## Releases

Tagged releases (`v*`) trigger GitHub Actions to build, validate with HACS, and attach `dist/two-state-thermostat.js` to the release.

```bash
npm run lint && npm run typecheck && npm test && npm run build
git add dist/two-state-thermostat.js
git commit -m "Prepare release v0.1.0"
git tag v0.1.0
git push origin main
git push origin v0.1.0
```

## Licence

MIT — see [LICENSE](LICENSE).
