import en from './en.json';
import lt from './lt.json';

type TranslationValue = string | TranslationTree;

interface TranslationTree {
    [key: string]: TranslationValue;
}

const translations = { en, lt } satisfies Record<string, TranslationTree>;

type SupportedLanguage = keyof typeof translations;

const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const normalizeLanguage = (language?: string): SupportedLanguage => {
    const normalized = language?.toLowerCase().split('-')[0];

    return normalized && normalized in translations
        ? (normalized as SupportedLanguage)
        : DEFAULT_LANGUAGE;
};

const nestedValue = (tree: TranslationTree, key: string): string | undefined => {
    const value = key.split('.').reduce<TranslationValue | undefined>((current, part) => {
        if (!current || typeof current === 'string') return undefined;

        return current[part];
    }, tree);

    return typeof value === 'string' ? value : undefined;
};

export const localize = (key: string, language?: string): string => {
    const selected = translations[normalizeLanguage(language)];

    return nestedValue(selected, key) ?? nestedValue(translations.en, key) ?? key;
};

export const getCurrentDocumentLanguage = (): string =>
    document.documentElement.lang || navigator.language || DEFAULT_LANGUAGE;
