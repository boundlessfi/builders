#!/usr/bin/env node
/**
 * SEO regression check.
 *
 * Starts the production build with `next start`, fetches a set of routes and
 * static files, then asserts that every HTML page contains the four required
 * SEO signals:
 *
 *   - og:image
 *   - twitter:card
 *   - link rel="canonical"
 *   - meta name="description"
 *
 * robots.txt and sitemap.xml are checked for a 200 status only.
 *
 * Usage:
 *   npm run build && npm run seo:check
 *
 * Environment variables:
 *   SEO_CHECK_PORT    Port for the local server (default: 3000).
 *   SEO_CHECK_ORIGIN  Base URL to check (default: http://localhost:<port>).
 *                     A localhost origin starts a local server on its port.
 *                     Any other origin, such as a deployed preview URL, is
 *                     checked as is and no server is started.
 *
 * Dependency-free: uses only Node built-ins (fetch, child_process, timers).
 */

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DEFAULT_PORT = process.env.SEO_CHECK_PORT ?? '3000';
const ORIGIN = (
  process.env.SEO_CHECK_ORIGIN ?? `http://localhost:${DEFAULT_PORT}`
).replace(/\/+$/, '');
const ORIGIN_URL = new URL(ORIGIN);
const IS_LOCAL = ['localhost', '127.0.0.1', '[::1]'].includes(
  ORIGIN_URL.hostname
);
/** The port the local server must listen on so it matches ORIGIN. */
const PORT = ORIGIN_URL.port || DEFAULT_PORT;

const START_TIMEOUT_MS = 60_000;
const FETCH_TIMEOUT_MS = 15_000;

/** HTML routes to check for all four SEO signals. */
const HTML_ROUTES = ['/', '/about', '/builders'];

/** Plain-text / XML routes that must return HTTP 200. */
const STATUS_ROUTES = ['/robots.txt', '/sitemap.xml'];

/** Regex patterns that must match somewhere in the raw HTML of each route. */
export const REQUIRED_PATTERNS = {
  'og:image':
    /<meta(?=[^>]*?\bproperty=["']og:image["'])(?=[^>]*?\bcontent=["'][^"'\s][^"']*?["'])[^>]*?>/i,
  'twitter:card':
    /<meta(?=[^>]*?\bname=["']twitter:card["'])(?=[^>]*?\bcontent=["'][^"'\s][^"']*?["'])[^>]*?>/i,
  canonical:
    /<link(?=[^>]*?\brel=["']canonical["'])(?=[^>]*?\bhref=["'][^"'\s][^"']*?["'])[^>]*?>/i,
  description:
    /<meta(?=[^>]*?\bname=["']description["'])(?=[^>]*?\bcontent=["'][^"'\s][^"']*?["'])[^>]*?>/i,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** ANSI color helpers (no external deps). */
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

function log(msg) {
  process.stdout.write(msg + '\n');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch a URL and read its whole body under one timeout, so neither slow
 * headers nor a stalled body can hang the script.
 */
async function fetchText(url, ms = FETCH_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    const body = await res.text();
    return { status: res.status, ok: res.ok, body };
  } finally {
    clearTimeout(timer);
  }
}

/** True when something already answers on ORIGIN. */
async function isOriginInUse() {
  try {
    await fetchText(`${ORIGIN}/`, 2_000);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Local server lifecycle
// ---------------------------------------------------------------------------

let server = null;
/** Set before we stop the server ourselves, so its exit is not an error. */
let stopping = false;
/** Filled in when the server dies on its own. */
let serverFailure = null;

function startServer() {
  server = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '-p', PORT],
    // stdout is ignored so an unread pipe can never block the server.
    { stdio: ['ignore', 'ignore', 'pipe'], shell: false }
  );

  // Surface server errors so failures are diagnosable.
  server.stderr.on('data', (chunk) => {
    process.stderr.write(dim(chunk.toString()));
  });

  server.on('error', (err) => {
    serverFailure = `Failed to start server: ${err.message}`;
  });

  server.on('exit', (code, signal) => {
    if (stopping) return;
    serverFailure = signal
      ? `Server was killed by signal ${signal}.`
      : `Server exited with code ${code}. Did you run \`npm run build\`?`;
  });
}

/** Stop the local server and wait until it has exited. */
async function stopServer() {
  if (!server || server.exitCode !== null || server.signalCode !== null) return;
  stopping = true;
  const exited = new Promise((resolve) => server.once('exit', resolve));
  server.kill();
  await Promise.race([exited, sleep(5_000)]);
}

/** Wait for the local server to answer, failing fast if it dies first. */
async function waitForServer(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (serverFailure) throw new Error(serverFailure);
    try {
      const res = await fetchText(`${ORIGIN}/`, 2_000);
      if (res.status < 500) return;
    } catch {
      // server not ready yet
    }
    await sleep(500);
  }
  throw new Error(`Server did not respond on ${ORIGIN} within ${timeoutMs}ms.`);
}

/** Stop the server, then exit with the given code. */
async function finish(code) {
  await stopServer();
  process.exit(code);
}

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    finish(130);
  });
}

// ---------------------------------------------------------------------------
// Check routines
// ---------------------------------------------------------------------------

/**
 * Fetch an HTML route and assert each required SEO pattern is present.
 * Returns an array of failure strings (empty = pass).
 */
async function checkHtmlRoute(route) {
  try {
    const res = await fetchText(`${ORIGIN}${route}`);
    if (!res.ok) return [`HTTP ${res.status}`];

    return Object.entries(REQUIRED_PATTERNS)
      .filter(([, pattern]) => !pattern.test(res.body))
      .map(([label]) => `missing ${label}`);
  } catch (err) {
    return [`fetch failed: ${err.message}`];
  }
}

/**
 * Fetch a non-HTML route and assert it returns HTTP 200.
 * Returns an array of failure strings (empty = pass).
 */
async function checkStatusRoute(route) {
  try {
    const res = await fetchText(`${ORIGIN}${route}`);
    return res.status === 200 ? [] : [`HTTP ${res.status}`];
  } catch (err) {
    return [`fetch failed: ${err.message}`];
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log('');
  log(bold('SEO check'));
  log(dim(`Target: ${ORIGIN}`));
  log('');

  if (IS_LOCAL) {
    // Refuse to run against whatever else is on the port, such as a dev
    // server, because the results would not describe the production build.
    if (await isOriginInUse()) {
      log(red(`Something is already running on ${ORIGIN}.`));
      log(red('Stop it, or pick a free port with SEO_CHECK_PORT.'));
      process.exit(1);
    }

    log(dim(`Starting production server (\`next start -p ${PORT}\`)...`));
    startServer();
    await waitForServer(START_TIMEOUT_MS);
    log(green('Server ready.'));
    log('');
  }

  let passed = 0;
  const failedRoutes = [];

  const record = (route, failures) => {
    if (failures.length === 0) {
      log(`  ${green('PASS')} ${route}`);
      passed++;
      return;
    }
    log(`  ${red('FAIL')} ${route}`);
    for (const failure of failures) log(`       ${red(failure)}`);
    failedRoutes.push(route);
  };

  log(bold('HTML routes'));
  for (const route of HTML_ROUTES) {
    record(route, await checkHtmlRoute(route));
  }
  log('');

  log(bold('Static / XML routes (200 check)'));
  for (const route of STATUS_ROUTES) {
    record(route, await checkStatusRoute(route));
  }
  log('');

  const failed = failedRoutes.length;
  log(bold('Summary'));
  log(`  Passed: ${green(String(passed))}`);
  log(`  Failed: ${failed > 0 ? red(String(failed)) : String(failed)}`);
  log('');

  if (serverFailure) {
    log(red(serverFailure));
    await finish(1);
  }

  if (failed > 0) {
    log(red('SEO check failed. Fix the issues above and re-run npm run seo:check.'));
    await finish(1);
  }

  log(green('All checks passed.'));
  await finish(0);
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
  main().catch(async (err) => {
    process.stderr.write(red(`${err.message}\n`));
    await finish(1);
  });
}
