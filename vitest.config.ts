import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    environment: 'node',
    env: {
      NEXT_PUBLIC_API_URL: 'https://stage-api.boundlessfi.xyz',
      NEXT_PUBLIC_SITE_URL: 'https://builders.boundlessfi.xyz',
      NEXT_PUBLIC_BOUNDLESS_APP_URL: 'https://boundlessfi.xyz',
    },
  },
});
