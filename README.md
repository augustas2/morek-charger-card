# Morek EV Charger Card

[![Release](https://github.com/augustas2/morek-charger-card/actions/workflows/release.yml/badge.svg)](https://github.com/augustas2/morek-charger-card/actions/workflows/release.yml)

A Home Assistant dashboard card for Morek EV chargers connected through OCPP. It displays the charger status, selected live-session metrics, and a status-aware charging control.

<img src="https://raw.githubusercontent.com/augustas2/morek-charger-card/master/src/assets/card.png" alt="Morek EV charger" width="160">

## Features

- Localized English and Lithuanian interface
- Optional power, session time, session energy, and session-cost metrics
- Session-cost calculation from energy and an EUR/kWh price entity
- Contextual Start/Stop control that is enabled only for suitable OCPP statuses
- Responsive two-column metric layout

## Installation

### HACS

1. In HACS, open **Dashboard** and choose **Download repositories**.
2. Search for **Morek EV Charger Card**. Until it is included in the default HACS repository, add `augustas2/morek-charger-card` as a custom repository with the **Dashboard** category first.
3. Download the card.
4. Add the dashboard resource if HACS does not add it automatically:

    ```yaml
    url: /hacsfiles/morek-charger-card/morek-charger-card.js
    type: module
    ```

### Manual installation

1. Download `morek-charger-card.js` from the latest release.
2. Copy it to `/config/www/morek-charger-card.js`.
3. Add the dashboard resource:

    ```yaml
    url: /local/morek-charger-card.js
    type: module
    ```

Refresh the browser after installing or updating the resource.

## Configuration

```yaml
type: custom:morek-charger-card
entity: sensor.charger_status_connector
name: Morek EV Charger
power_entity: sensor.charger_power_active_import
session_time_entity: sensor.charger_time_session
session_energy_entity: sensor.charger_energy_session
electricity_cost_entity: input_number.electricity_cost_eur_kwh
charge_control_entity: switch.charger_charge_control
```

| Option                    | Required | Description                                                              |
| ------------------------- | -------- | ------------------------------------------------------------------------ |
| `entity`                  | Yes      | Charger connector-status sensor.                                         |
| `name`                    | No       | Card title. Defaults to `Morek EV Charger`.                              |
| `power_entity`            | No       | Active charging-power sensor, displayed in kW.                           |
| `session_time_entity`     | No       | Current session duration, in minutes.                                    |
| `session_energy_entity`   | No       | Current session energy, in kWh.                                          |
| `electricity_cost_entity` | No       | Electricity price in EUR/kWh. Shows session cost when configured.        |
| `charge_control_entity`   | No       | OCPP Charge Control switch. Defaults to `switch.charger_charge_control`. |

Metrics are displayed only when their corresponding entity is configured. Session cost is calculated as session energy multiplied by the electricity price.

## Charging control

The card shows **Start charging** while `charge_control_entity` is off and **Stop charging** while it is on. To avoid commands that the charger cannot act on, the button is enabled only for these connector statuses:

| Action         | Enabled statuses                                        |
| -------------- | ------------------------------------------------------- |
| Start charging | `Preparing`                                             |
| Stop charging  | `Charging`, `SuspendedEV`, `SuspendedEVSE`, `Finishing` |

The control is disabled for all other statuses, including `Available`, `Faulted`, `Unavailable`, and `Unknown`.
