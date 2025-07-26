import {describe, it, expect} from 'vitest';
import { cleanJson } from '../src/index';

type JsonObject = { [key: string]: any };



describe('cleanJson', () => {
  const base = {
    a: '',
    b: null,
    c: undefined,
    d: 0,
    e: false,
    f: 'text',
    g: {},
    h: [],
    i: { j: null, k: '' },
    l: [null, '', 1],
  };

  it('removes "", null, and undefined by default', () => {
    const result = cleanJson(base);
    expect(result).toEqual({
      d: 0,
      e: false,
      f: 'text',
      i: {},
      l: [1],
    });
  });

  it('preserves empty strings when preserveEmptyStrings is true', () => {
    const result = cleanJson(base, { preserveEmptyStrings: true });
    expect(result).toMatchObject({
      a: '',
      i: { k: '' },
    });
  });

  it('preserves nulls when preserveNulls is true', () => {
    const result = cleanJson(base, { preserveNulls: true });
    expect(result).toMatchObject({
      b: null,
      i: { j: null },
    });
  });

  it('removes 0 when included in valuesToRemove', () => {
    const result = cleanJson(base, { valuesToRemove: ['', null, undefined, 0] });
    expect(result).not.toHaveProperty('d');
  });

  it('removes empty objects by default', () => {
  const result = cleanJson(base) as JsonObject;
  expect(result).not.toHaveProperty('g');
  expect(result.i).toEqual({});
});

  it('preserves empty objects when removeEmptyObjects is false', () => {
    const result = cleanJson(base, { removeEmptyObjects: false });
    expect(result).toHaveProperty('g');
  });

  it('removes empty arrays by default', () => {
    const result = cleanJson(base);
    expect(result).not.toHaveProperty('h');
  });

  it('preserves empty arrays when removeEmptyArrays is false', () => {
    const result = cleanJson(base, { removeEmptyArrays: false });
    expect(result).toHaveProperty('h');
  });

  it('cleans nested objects and arrays recursively', () => {
    const complex = {
      x: {
        y: {
          z: '',
          n: null,
          valid: 'ok',
        },
        emptyObj: {},
      },
      arr: [null, '', 1, { a: null, b: 2 }],
    };

    const result = cleanJson(complex);
    expect(result).toEqual({
      x: {
        y: { valid: 'ok' },
      },
      arr: [1, { b: 2 }],
    });
  });
});
