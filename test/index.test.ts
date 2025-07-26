import { describe, it, expect } from 'vitest';
import { cleanJson } from '../src';

describe('cleanJson', () => {
  it('removes null, undefined, and empty strings at first level', () => {
    const input = { a: '', b: null, c: undefined, d: 0, e: false, f: 'hello' };
    const expected = { d: 0, e: false, f: 'hello' };
    expect(cleanJson(input)).toEqual(expected);
  });

  it('cleans nested objects recursively', () => {
    const input = {
      a: '',
      b: null,
      c: {
        d: undefined,
        e: 'value',
        f: '',
      },
      g: [null, '', 'text', 0],
    };
    const expected = {
      c: {
        e: 'value',
      },
      g: ['text', 0],
    };
    expect(cleanJson(input)).toEqual(expected);
  });

  it('cleans arrays with nested objects', () => {
    const input = [
      null,
      '',
      { a: null, b: 'text', c: '' },
      0,
      false,
    ];
    const expected = [
      { b: 'text' },
      0,
      false,
    ];
    expect(cleanJson(input)).toEqual(expected);
  });
});
