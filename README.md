# Morek Charger Card

Home Assistant Lovelace card for a Morek EV charger using the OCPP entities shown below.

## Install

Build with `npm run build`, copy `dist/morek-charger-card.js` to `/config/www/`, then add it as a module dashboard resource at `/local/morek-charger-card.js`.

## Card configuration

```yaml
type: custom:morek-charger-card
entity: sensor.charger_status_connector
name: Morek EV 22 kW Charger
power_entity: sensor.charger_power_active_import
session_time_entity: sensor.charger_time_session
session_energy_entity: sensor.charger_energy_session
charge_control_entity: switch.charger_charge_control
```

The card uses the state of `charge_control_entity` for its single contextual control. It shows **Stop charging** while the switch is `on`, **Start charging** while it is `off`, and calls `switch.toggle` when pressed. The button is enabled only when the charger status permits that action: **Start charging** requires `Available`, `Preparing`, or `Finishing`; **Stop charging** requires `Charging`, `SuspendedEV`, `SuspendedEVSE`, or `Finishing`. It stays disabled for `Faulted`, `Unavailable`, and `Unknown`.

`name` is optional. When it is omitted, the card displays `Morek EV 22 kW Charger` instead of the selected status sensor's friendly name.
