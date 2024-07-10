import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ['./tests/setup.js', './tests/setup-mongo-memory-server.js'],
    css: {
      modules: {classNameStrategy: 'non-scoped'}
    },
    alias: {
      '@/': new URL('./', import.meta.url).pathname, 
    },
    exclude: [...configDefaults.exclude, './tests/e2e/**']
  },
})