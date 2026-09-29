import {
    html,
    LitElement,
    type CSSResultGroup,
    type PropertyValues,
    type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HomeAssistant } from 'custom-card-helpers';
import chargerImage from './assets/charger.png';
import {
    CARD_TYPE,
    DEFAULT_CONFIG,
    STARTABLE_CHARGER_STATUSES,
    STOPPABLE_CHARGER_STATUSES,
} from './constants';
import { cardStyles } from './styles';
import { getCurrentDocumentLanguage, localize } from './translations/localize';
import type { MorekCardConfig } from './types';

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
    language?: string,
): string => {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) return '—';

    return `${new Intl.NumberFormat(language, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(numberValue)} ${unit}`;
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

const sessionCost = (
    energy: string | undefined,
    electricityCost: string | undefined,
    language?: string,
): string => {
    const total = Number(energy) * Number(electricityCost);

    if (!Number.isFinite(total)) return '—';

    return new Intl.NumberFormat(language, {
        style: 'currency',
        currency: 'EUR',
    }).format(total);
};

const statusText = (status: string, language?: string): string => {
    const key = status.toLowerCase().replaceAll(/[^a-z]/g, '');
    const translationKey = `states.${key}`;
    const translated = localize(translationKey, language);

    return translated === translationKey ? status : translated;
};

const normalizedStatus = (status: string): string => status.trim().toLowerCase();

const canControlCharging = (
    chargerStatus: string,
    chargeControlState: string | undefined,
): boolean => {
    const status = normalizedStatus(chargerStatus);

    return (
        (chargeControlState === 'off' && STARTABLE_CHARGER_STATUSES.has(status)) ||
        (chargeControlState === 'on' && STOPPABLE_CHARGER_STATUSES.has(status))
    );
};

@customElement(CARD_TYPE)
export class MorekChargerCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private config?: MorekCardConfig;

    @state() private isToggling = false;

    private pendingChargeControlState: string | undefined;

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
                    name: 'electricity_cost_entity',
                    selector: {
                        entity: { domain: ['input_number', 'number', 'sensor'] },
                    },
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
        const powerEntity = this.config?.power_entity;
        const power = this.hass?.states[powerEntity ?? '']?.state;
        const sessionTimeEntity = this.config?.session_time_entity;
        const time = this.hass?.states[sessionTimeEntity ?? '']?.state;
        const sessionEnergyEntity = this.config?.session_energy_entity;
        const sessionEnergy = this.hass?.states[sessionEnergyEntity ?? '']?.state;
        const electricityCostEntity = this.config?.electricity_cost_entity;
        const electricityCost = this.hass?.states[electricityCostEntity ?? '']?.state;
        const chargeControlEntity = this.config?.charge_control_entity;
        const chargeControlState = this.hass?.states[chargeControlEntity ?? '']?.state;
        const isChargeControlOn = chargeControlState === 'on';
        const canToggleCharging = canControlCharging(status, chargeControlState);
        const language = this.hass?.language;
        const label = localize(
            isChargeControlOn ? 'card.stop_charging' : 'card.start_charging',
            language,
        );
        const metrics = [
            this.renderMetric(
                powerEntity,
                'card.current_usage',
                'card.open_current_usage',
                displayValue(power, 2, 'kW', language),
                language,
            ),
            this.renderMetric(
                sessionTimeEntity,
                'card.session_time',
                'card.open_session_time',
                sessionTime(time, language),
                language,
            ),
            this.renderMetric(
                sessionEnergyEntity,
                'card.session_energy',
                'card.open_session_energy',
                displayValue(sessionEnergy, 2, 'kWh', language),
                language,
            ),
            this.renderMetric(
                electricityCostEntity,
                'card.session_cost',
                'card.open_session_cost',
                sessionCost(sessionEnergy, electricityCost, language),
                language,
            ),
        ].filter((metric): metric is TemplateResult => metric !== null);

        return html`
            <ha-card style=${styleMap({ '--morek-color': stateColor(status) })}>
                <div class="content">
                    <div>
                        <div class="name">${name}</div>
                        <div
                            class="status"
                            role="button"
                            tabindex="0"
                            aria-label=${localize('card.open_status', language)}
                            @click=${() => this.openMoreInfo(statusEntity)}
                            @keydown=${(event: KeyboardEvent) =>
                                this.openMoreInfoOnKeydown(event, statusEntity)}
                        >
                            ${statusText(status, language)}
                        </div>
                        ${metrics.length ? html`<div class="metrics">${metrics}</div>` : null}
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
                        ?disabled=${!canToggleCharging || this.isToggling}
                        @click=${(event: Event) =>
                            void this.toggleCharging(event, chargeControlEntity, status)}
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

    private renderMetric(
        entityId: string | undefined,
        labelKey: string,
        openLabelKey: string,
        value: string,
        language?: string,
    ): TemplateResult | null {
        if (!entityId) return null;

        return html`
            <div
                class="metric"
                role="button"
                tabindex="0"
                aria-label=${localize(openLabelKey, language)}
                @click=${() => this.openMoreInfo(entityId)}
                @keydown=${(event: KeyboardEvent) =>
                    this.openMoreInfoOnKeydown(event, entityId)}
            >
                <span class="metric-label">${localize(labelKey, language)}</span
                ><span class="metric-value">${value}</span>
            </div>
        `;
    }

    private openMoreInfoOnKeydown(
        event: KeyboardEvent,
        entityId: string | undefined,
    ): void {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        this.openMoreInfo(entityId);
    }

    private async toggleCharging(
        event: Event,
        entityId: string | undefined,
        chargerStatus: string,
    ): Promise<void> {
        event.stopPropagation();

        if (!this.hass || !entityId) return;

        const chargeControlState = this.hass.states[entityId]?.state;

        if (!canControlCharging(chargerStatus, chargeControlState)) return;

        this.pendingChargeControlState = chargeControlState;
        this.isToggling = true;

        try {
            await this.hass.callService('switch', 'toggle', { entity_id: entityId });
        } catch (error) {
            this.isToggling = false;
            this.pendingChargeControlState = undefined;
            throw error;
        }
    }

    protected override updated(changedProperties: PropertyValues<this>): void {
        if (!changedProperties.has('hass') || !this.isToggling) return;

        const state = this.hass?.states[this.config?.charge_control_entity ?? '']?.state;

        if (state !== this.pendingChargeControlState) {
            this.isToggling = false;
            this.pendingChargeControlState = undefined;
        }
    }

    public static override styles: CSSResultGroup = cardStyles;
}

window.customCards = window.customCards ?? [];
window.customCards.push({
    type: CARD_TYPE,
    name: 'Morek EV Charger Card',
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
