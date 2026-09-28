import { css } from 'lit';

export const cardStyles = css`
    :host {
        display: block;
    }

    ha-card {
        overflow: hidden;
        color: var(--primary-text-color);
    }

    .content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 128px;
        gap: var(--ha-space-3, 12px);
        align-items: center;
        width: 100%;
        padding: var(--ha-space-4, 16px);
        text-align: left;
        font: inherit;
    }

    .name {
        font-size: var(--ha-font-size-xl, 22px);
        font-weight: var(--ha-font-weight-medium, 500);
    }

    .status {
        appearance: none;
        border: 0;
        background: transparent;
        margin-top: var(--ha-space-3, 12px);
        color: var(--morek-color);
        cursor: pointer;
        padding: 0;
        text-align: left;
        font-size: var(--ha-font-size-l, 16px);
        font-weight: var(--ha-font-weight-medium, 500);
    }

    .metrics {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ha-space-4, 12px) var(--ha-space-8, 16px);
        margin-top: var(--ha-space-3, 12px);
    }

    .metric {
        appearance: none;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        display: grid;
        gap: 2px;
        padding: 0;
        text-align: left;
    }

    .metric-label {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-s, 12px);
    }

    .metric-value {
        font-size: var(--ha-font-size-l, 16px);
        font-weight: var(--ha-font-weight-medium, 500);
    }

    .charger-image {
        width: 128px;
        height: 160px;
        object-fit: contain;
    }

    .actions {
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
        padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    }

    .action-button {
        width: 100%;
        appearance: none;
        border: 0;
        border-radius: var(--ha-border-radius-lg, 12px);
        background: color-mix(in srgb, var(--primary-color) 14%, transparent);
        color: var(--primary-color);
        padding: 12px 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font: inherit;
        font-weight: var(--ha-font-weight-medium, 500);
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            background-color 120ms ease;
    }

    .action-button:hover:not(:disabled) {
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
    }

    .action-button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .action-button ha-icon {
        --mdc-icon-size: 22px;
    }
`;
