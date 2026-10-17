/**
 * Application environment configuration and build-time validation.
 *
 * This module is imported in next.config.ts so both `next dev` and `next build`
 * fail fast if required environment variables are missing or invalid.
 */

function isValidHttpUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateEnv(): void {
  const errors: string[] = [];

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!rawApiUrl) {
    errors.push(
      'NEXT_PUBLIC_API_URL is missing or empty. It must be an absolute http(s) URL.'
    );
  } else if (!isValidHttpUrl(rawApiUrl)) {
    errors.push(
      `NEXT_PUBLIC_API_URL is invalid ("${rawApiUrl}"). It must be an absolute http(s) URL.`
    );
  }

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (rawSiteUrl && !isValidHttpUrl(rawSiteUrl)) {
    errors.push(
      `NEXT_PUBLIC_SITE_URL is invalid ("${rawSiteUrl}"). It must be an absolute http(s) URL.`
    );
  }

  const rawBoundlessAppUrl = process.env.NEXT_PUBLIC_BOUNDLESS_APP_URL?.trim();
  if (rawBoundlessAppUrl && !isValidHttpUrl(rawBoundlessAppUrl)) {
    errors.push(
      `NEXT_PUBLIC_BOUNDLESS_APP_URL is invalid ("${rawBoundlessAppUrl}"). It must be an absolute http(s) URL.`
    );
  }

  if (errors.length > 0) {
    if (typeof process !== 'undefined' && typeof process.exit === 'function') {
      console.error('\nEnvironment validation failed:');
      for (const err of errors) {
        console.error(`  - ${err}`);
      }
      console.error(
        '\nPlease copy .env.example to .env.local and configure the variables.\n'
      );
      process.exit(1);
    }
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }
}

// Automatically validate in server/build environments when loaded (e.g. by next.config.ts)
if (typeof window === 'undefined') {
  validateEnv();
}

/**
 * Validated public environment variables with trailing slashes stripped.
 */
export const env = {
  NEXT_PUBLIC_API_URL: (process.env.NEXT_PUBLIC_API_URL ?? '')
    .trim()
    .replace(/\/+$/, ''),
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(
    /\/+$/,
    ''
  ),
  NEXT_PUBLIC_BOUNDLESS_APP_URL:
    process.env.NEXT_PUBLIC_BOUNDLESS_APP_URL?.trim().replace(/\/+$/, ''),
} as const;
