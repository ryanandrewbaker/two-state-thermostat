# Contributing

Thank you for contributing to Two State Thermostat.

## Design rules

Please keep these constraints intact in any contribution:

1. The card must **never** call `climate.set_fan_mode`.
2. The card must **never** call services on a physical split-system climate entity.
3. Thermostat logic (boost timers, hysteresis, fan staging) belongs in Home Assistant, not JavaScript.
4. Auto fan means controller-managed explicit speeds, not the appliance native auto mode.

## Development setup

```bash
git clone https://github.com/ryanandrewbaker/two-state-thermostat.git
cd two-state-thermostat
npm ci
npm run dev
```

Copy or symlink `dist/two-state-thermostat.js` into your Home Assistant `www/` folder for local testing.

## Pull requests

1. Create a feature branch from `main`.
2. Make focused changes with tests for pure logic.
3. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
4. Commit `dist/two-state-thermostat.js` if the bundle changed.
5. Open a PR with a clear description and test plan.

## Release checklist

- [ ] `CHANGELOG.md` updated
- [ ] Version bumped in `package.json`
- [ ] All CI checks pass
- [ ] `dist/two-state-thermostat.js` committed
- [ ] Tag pushed (`v*`)
- [ ] GitHub Release created with JS asset

## Code style

- TypeScript strict mode
- ESLint + Prettier (`npm run format`)
- Lit web components with shadow DOM
- Home Assistant theme CSS variables for colours
