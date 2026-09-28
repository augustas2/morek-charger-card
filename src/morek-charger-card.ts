import { html, LitElement, type CSSResultGroup, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HomeAssistant } from 'custom-card-helpers';
import chargerImage from './assets/morek-charger.png';
import { cardStyles } from './styles';
import { getCurrentDocumentLanguage, localize } from './translations/localize';
import type { MorekCardConfig } from './types';

const CARD_TYPE = 'morek-charger-card';
const DEFAULT_CONFIG = {
    power_entity: 'sensor.charger_power_active_import',
    session_time_entity: 'sensor.charger_time_session',
    session_energy_entity: 'sensor.charger_energy_session',
    charge_control_entity: 'switch.charger_charge_control',
} satisfies Partial<MorekCardConfig>;

const stateColor = (status: string): string => {
    if (status.toLowerCase() === 'charging') return 'var(--success-color, #43a047)';

    if (['faulted', 'unavailable'].includes(status.toLowerCase()))
        return 'var(--error-color, #db4437)';

    return 'var(--state-inactive-color, #6f7287)';
};

const displayValue = (
    value: string | undefined,
    decimals: number,
    unit: string,
): string => {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) return '—';

    return `${numberValue.toFixed(decimals)} ${unit}`;
};

const sessionTime = (value: string | undefined, language?: string): string => {
    const minutes = Number(value);

    if (!Number.isFinite(minutes)) return '—';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);

    const formattedHours = String(hours);
    const formattedMinutes = String(remainingMinutes);

    return hours > 0
        ? `${formattedHours} ${localize('card.hours_short', language)} ${formattedMinutes} ${localize('card.minutes_short', language)}`
        : `${formattedMinutes} ${localize('card.minutes_short', language)}`;
};

const statusText = (status: string, language?: string): string => {
    const key = status.toLowerCase().replaceAll(/[^a-z]/g, '');
    const translationKey = `states.${key}`;
    const translated = localize(translationKey, language);

    return translated === translationKey ? status : translated;
};

@customElement(CARD_TYPE)
export class MorekChargerCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: MorekCardConfig;

    public setConfig(config: MorekCardConfig): void {
        if (!config.entity) {
            throw new Error(
                localize('errors.entity_required', getCurrentDocumentLanguage()),
            );
        }

        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    public getCardSize(): number {
        return 3;
    }

    public static getStubConfig(hass: HomeAssistant): Partial<MorekCardConfig> {
        return {
            entity:
                Object.keys(hass.states).find(
                    (entityId) => entityId === 'sensor.charger_status_connector',
                ) ?? '',
            ...DEFAULT_CONFIG,
        };
    }

    public static getConfigForm(): object {
        const language = getCurrentDocumentLanguage();

        return {
            schema: [
                {
                    name: 'entity',
                    required: true,
                    selector: { entity: { domain: 'sensor' } },
                },
                { name: 'name', selector: { text: {} } },
                { name: 'power_entity', selector: { entity: { domain: 'sensor' } } },
                {
                    name: 'session_time_entity',
                    selector: { entity: { domain: 'sensor' } },
                },
                {
                    name: 'session_energy_entity',
                    selector: { entity: { domain: 'sensor' } },
                },
                {
                    name: 'charge_control_entity',
                    selector: { entity: { domain: 'switch' } },
                },
            ],
            computeLabel: (schema: { name: string }): string =>
                localize(`common.${schema.name}`, language),
        };
    }

    protected override render(): TemplateResult {
        const statusEntity = this.config?.entity;
        const status = statusEntity
            ? (this.hass?.states[statusEntity]?.state ?? 'Unknown')
            : 'Unknown';
        const name = this.config?.name ?? 'Morek EV Charger';
        const power = this.hass?.states[this.config?.power_entity ?? '']?.state;
        const time = this.hass?.states[this.config?.session_time_entity ?? '']?.state;
        const sessionEnergy =
            this.hass?.states[this.config?.session_energy_entity ?? '']?.state;
        const chargeControlEntity = this.config?.charge_control_entity;
        const isChargeControlOn =
            this.hass?.states[chargeControlEntity ?? '']?.state === 'on';
        const language = this.hass?.language;
        const label = localize(
            isChargeControlOn ? 'card.stop_charging' : 'card.start_charging',
            language,
        );

        return html`
            <ha-card style=${styleMap({ '--morek-color': stateColor(status) })}>
                <div class="content">
                    <div>
                        <div class="name">${name}</div>
                        <div
                            class="status"
                            @click=${() => this.openMoreInfo(statusEntity)}
                        >
                            ${statusText(status, language)}
                        </div>
                        <div class="metrics">
                            <div class="metric">
                                <span class="metric-label"
                                    >${localize('card.current_usage', language)}</span
                                ><span class="metric-value"
                                    >${displayValue(power, 2, 'kW')}</span
                                >
                            </div>
                            <div class="metric">
                                <span class="metric-label"
                                    >${localize('card.session_time', language)}</span
                                ><span class="metric-value"
                                    >${sessionTime(time, language)}</span
                                >
                            </div>
                            <div class="metric">
                                <span class="metric-label"
                                    >${localize('card.session_energy', language)}</span
                                ><span class="metric-value"
                                    >${displayValue(sessionEnergy, 2, 'kWh')}</span
                                >
                            </div>
                        </div>
                    </div>
                    <img
                        class="charger-image"
                        src=${chargerImage}
                        alt=${localize('card.charger_image', language)}
                    />
                </div>
                <div class="actions">
                    <button
                        class="action-button"
                        type="button"
                        aria-label=${label}
                        ?disabled=${!chargeControlEntity || !this.hass}
                        @click=${(event: Event) =>
                            void this.toggleCharging(event, chargeControlEntity)}
                    >
                        <ha-icon
                            icon=${
                                isChargeControlOn
                                    ? 'mdi:stop-circle-outline'
                                    : 'mdi:play-circle-outline'
                            }
                        ></ha-icon
                        >${label}
                    </button>
                </div>
            </ha-card>
        `;
    }

    private openMoreInfo(entityId: string | undefined): void {
        if (!entityId) return;
        this.dispatchEvent(
            new CustomEvent('hass-more-info', {
                bubbles: true,
                composed: true,
                detail: { entityId },
            }),
        );
    }

    private async toggleCharging(
        event: Event,
        entityId: string | undefined,
    ): Promise<void> {
        event.stopPropagation();

        if (!this.hass || !entityId) return;
        await this.hass.callService('switch', 'toggle', { entity_id: entityId });
    }

    public static override styles: CSSResultGroup = cardStyles;
}

window.customCards = window.customCards ?? [];
window.customCards.push({
    type: CARD_TYPE,
    name: 'Morek Charger Card',
    preview: true,
    description:
        'Morek EV charger status, live power, session duration, and charging control.',
    documentationURL: 'https://github.com/augustas2/morek-charger-card',
    getEntitySuggestion: (_hass: HomeAssistant, entityId: string) =>
        entityId === 'sensor.charger_status_connector'
            ? { config: { type: `custom:${CARD_TYPE}`, entity: entityId } }
            : null,
});

declare global {
    interface HTMLElementTagNameMap {
        [CARD_TYPE]: MorekChargerCard;
    }
}
