import { describe, expect, it } from 'vitest';

import { deriveInitials } from '@/lib/initials';

describe('deriveInitials', () => {
  it('returns "B" for empty name or whitespace', () => {
    expect(deriveInitials('')).toBe('B');
    expect(deriveInitials('   ')).toBe('B');
    expect(deriveInitials('\t\n')).toBe('B');
  });

  it('returns up to first two letters for a single word', () => {
    expect(deriveInitials('Alice')).toBe('AL');
    expect(deriveInitials('A')).toBe('A');
    expect(deriveInitials('stellar')).toBe('ST');
  });

  it('returns the first letter of each of the first two words for multi-word names', () => {
    expect(deriveInitials('Alice Bob')).toBe('AB');
    expect(deriveInitials('Alice Bob Charlie')).toBe('AB');
    expect(deriveInitials('  jane   doe  ')).toBe('JD');
    expect(deriveInitials('boundless builders platform')).toBe('BB');
  });
});
