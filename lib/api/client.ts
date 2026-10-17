import { env } from '@/lib/env';
import type { ApiEnvelope, ApiErrorDetail, ApiErrorEnvelope } from './types';

const API_PREFIX = '/api';

/** Thrown on a non-2xx response or an unreadable body. */
export class ApiError extends Error {
  readonly status: number;
  readonly url: string;
  readonly details: ApiErrorDetail[];
  readonly requestId?: string;

  constructor(
    message: string,
    options: {
      status: number;
      url: string;
      details?: ApiErrorDetail[];
      requestId?: string;
    }
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.url = options.url;
    this.details = options.details ?? [];
    this.requestId = options.requestId;
  }
}

function resolveBaseUrl(): string {
  const origin = env.NEXT_PUBLIC_API_URL;
  if (!origin) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not set. Copy .env.example to .env.local.'
    );
  }
  return `${origin.replace(/\/+$/, '')}${API_PREFIX}`;
}

async function readJson(response: Response): Promise<unknown> {
  const body = await response.text();
  if (!body) return null;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function isErrorEnvelope(body: unknown): body is ApiErrorEnvelope {
  return (
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    (body as { success?: unknown }).success === false
  );
}

function isSuccessEnvelope(body: unknown): body is ApiEnvelope<unknown> {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    (body as { success?: unknown }).success === true
  );
}

function toErrorMessage(message: string | string[]): string {
  return Array.isArray(message) ? message.join(', ') : message;
}

/**
 * Fetch a public read endpoint and return its unwrapped payload. Pass the path
 * without the `/api` prefix, for example `apiFetch('/users/directory?limit=12')`.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${resolveBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  const body = await readJson(response);

  if (!response.ok) {
    const envelope = isErrorEnvelope(body) ? body : null;
    throw new ApiError(
      envelope
        ? toErrorMessage(envelope.message)
        : `Request to ${path} failed with ${response.status}.`,
      {
        status: response.status,
        url,
        details: envelope?.errors,
        requestId: envelope?.meta?.requestId,
      }
    );
  }

  if (!isSuccessEnvelope(body)) {
    throw new ApiError(`Response from ${path} was not a valid API envelope.`, {
      status: response.status,
      url,
    });
  }

  return body.data as T;
}
