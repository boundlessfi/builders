import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
