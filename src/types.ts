import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

export interface MorekCardConfig extends LovelaceCardConfig {
    entity?: string;
    name?: string;
    power_entity?: string;
    session_time_entity?: string;
    charge_control_entity?: string;
}

interface CustomCardEntry {
    type: string;
    name: string;
    preview?: boolean;
    description?: string;
    documentationURL?: string;
    getEntitySuggestion?: (
        hass: HomeAssistant,
        entityId: string,
    ) => null | { config: LovelaceCardConfig; label?: string };
}

declare global {
    interface Window {
        customCards?: CustomCardEntry[];
    }
}
