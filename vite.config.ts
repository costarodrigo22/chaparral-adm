/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: { open: true },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
