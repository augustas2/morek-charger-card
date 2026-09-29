import type { MorekCardConfig } from './types';

export const CARD_TYPE = 'morek-charger-card';

export const DEFAULT_CONFIG = {
    power_entity: 'sensor.charger_power_active_import',
    session_time_entity: 'sensor.charger_time_session',
    session_energy_entity: 'sensor.charger_energy_session',
    charge_control_entity: 'switch.charger_charge_control',
} satisfies Partial<MorekCardConfig>;

export const STARTABLE_CHARGER_STATUSES = new Set(['preparing']);

export const STOPPABLE_CHARGER_STATUSES = new Set([
    'charging',
    'suspendedev',
    'suspendedevse',
    'finishing',
]);
