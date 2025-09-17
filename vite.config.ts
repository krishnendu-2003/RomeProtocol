import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      crypto: 'node:crypto', // ensure core module, not a polyfill
    },
  },
});
