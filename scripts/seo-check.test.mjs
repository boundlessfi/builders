import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { REQUIRED_PATTERNS } from './seo-check.mjs';

describe('SEO Pattern Validation (#435)', () => {
  describe('Valid non-empty attributes', () => {
    test('matches og:image with non-empty content', () => {
      assert.ok(
        REQUIRED_PATTERNS['og:image'].test(
          '<meta property="og:image" content="https://boundless.fi/og.png">'
        )
      );
      // Content before property (order-independent)
      assert.ok(
        REQUIRED_PATTERNS['og:image'].test(
          '<meta content="https://boundless.fi/og.png" property="og:image">'
        )
      );
      // Single-quoted
      assert.ok(
        REQUIRED_PATTERNS['og:image'].test(
          "<meta property='og:image' content='https://boundless.fi/og.png'>"
        )
      );
    });

    test('matches twitter:card with non-empty content', () => {
      assert.ok(
        REQUIRED_PATTERNS['twitter:card'].test(
          '<meta name="twitter:card" content="summary_large_image">'
        )
      );
      assert.ok(
        REQUIRED_PATTERNS['twitter:card'].test(
          '<meta content="summary_large_image" name="twitter:card">'
        )
      );
    });

    test('matches canonical with non-empty href', () => {
      assert.ok(
        REQUIRED_PATTERNS.canonical.test(
          '<link rel="canonical" href="https://boundless.fi/builders">'
        )
      );
      assert.ok(
        REQUIRED_PATTERNS.canonical.test(
          '<link href="https://boundless.fi/builders" rel="canonical">'
        )
      );
    });

    test('matches description with non-empty content', () => {
      assert.ok(
        REQUIRED_PATTERNS.description.test(
          '<meta name="description" content="Discover talented builders on Stellar.">'
        )
      );
      assert.ok(
        REQUIRED_PATTERNS.description.test(
          '<meta content="Discover talented builders on Stellar." name="description">'
        )
      );
    });
  });

  describe('Empty and whitespace-only attributes are rejected', () => {
    test('rejects og:image when content is empty or whitespace', () => {
      assert.strictEqual(
        REQUIRED_PATTERNS['og:image'].test(
          '<meta property="og:image" content="">'
        ),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS['og:image'].test(
          '<meta property="og:image" content="   ">'
        ),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS['og:image'].test('<meta property="og:image">'),
        false
      );
    });

    test('rejects twitter:card when content is empty or whitespace', () => {
      assert.strictEqual(
        REQUIRED_PATTERNS['twitter:card'].test(
          '<meta name="twitter:card" content="">'
        ),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS['twitter:card'].test(
          '<meta name="twitter:card" content="  ">'
        ),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS['twitter:card'].test('<meta name="twitter:card">'),
        false
      );
    });

    test('rejects canonical link when href is empty or whitespace', () => {
      assert.strictEqual(
        REQUIRED_PATTERNS.canonical.test('<link rel="canonical" href="">'),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS.canonical.test('<link rel="canonical" href="   ">'),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS.canonical.test('<link rel="canonical">'),
        false
      );
    });

    test('rejects description when content is empty or whitespace', () => {
      assert.strictEqual(
        REQUIRED_PATTERNS.description.test(
          '<meta name="description" content="">'
        ),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS.description.test(
          '<meta name="description" content="   ">'
        ),
        false
      );
      assert.strictEqual(
        REQUIRED_PATTERNS.description.test('<meta name="description">'),
        false
      );
    });
  });
});
