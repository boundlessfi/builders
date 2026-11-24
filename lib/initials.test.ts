import { describe, expect, it } from 'vitest';

import { deriveInitials } from '@/lib/initials';

describe('deriveInitials', () => {
  it('returns fallback initial for an empty string', () => {
    expect(deriveInitials('')).toBe('B');
  });

  it('returns fallback initial for a whitespace-only string', () => {
    expect(deriveInitials('   ')).toBe('B');
    expect(deriveInitials('\t\n')).toBe('B');
  });

  it('returns up to first two characters uppercase for a single word', () => {
    expect(deriveInitials('Alice')).toBe('AL');
    expect(deriveInitials('b')).toBe('B');
    expect(deriveInitials('developer')).toBe('DE');
  });

  it('returns first letters of the first two words uppercase for two or more words', () => {
    expect(deriveInitials('John Doe')).toBe('JD');
    expect(deriveInitials('jane mary doe')).toBe('JM');
    expect(deriveInitials('  First   Middle  Last  ')).toBe('FM');
  });
});
