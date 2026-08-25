import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '~components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '~features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '~types': fileURLToPath(new URL('./src/types', import.meta.url)),
        },
    },
});

