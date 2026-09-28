import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/morek-charger-card.ts',
            formats: ['es'],
            fileName: () => 'morek-charger-card.js',
        },
    },
});
