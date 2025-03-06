import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
    base: '/',
    plugins: [react(), removeConsole()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.js',
        css: true,
        coverage: {
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
        },
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: 'http://0.0.0.0:8080',
    },
});
