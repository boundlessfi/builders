const invalidVariables: string[] = [];

function readHttpUrl(
  name: string,
  value: string | undefined,
  required = false
): string | undefined {
  const normalized = value?.trim();
  if (!normalized) {
    if (required) invalidVariables.push(name);
    return undefined;
  }

  try {
    const url = new URL(normalized);
    if (
      (url.protocol !== 'http:' && url.protocol !== 'https:') ||
      !url.hostname
    ) {
      invalidVariables.push(name);
      return undefined;
    }
  } catch {
    invalidVariables.push(name);
    return undefined;
  }

  return normalized;
}

const apiUrl = readHttpUrl(
  'NEXT_PUBLIC_API_URL',
  process.env.NEXT_PUBLIC_API_URL,
  true
);
const siteUrl = readHttpUrl(
  'NEXT_PUBLIC_SITE_URL',
  process.env.NEXT_PUBLIC_SITE_URL
);
const boundlessAppUrl = readHttpUrl(
  'NEXT_PUBLIC_BOUNDLESS_APP_URL',
  process.env.NEXT_PUBLIC_BOUNDLESS_APP_URL
);

if (invalidVariables.length > 0) {
  throw new Error(
    `Invalid or missing public environment variable(s): ${invalidVariables.join(', ')}. Copy .env.example to .env.local and set each URL to an absolute http(s) URL.`
  );
}

export const publicEnv = {
  apiUrl: apiUrl as string,
  siteUrl,
  boundlessAppUrl,
};