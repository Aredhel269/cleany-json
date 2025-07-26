type JsonValue = string | number | boolean | undefined | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

interface CleanOptions {
  preserveEmptyStrings?: boolean;
  preserveNulls?: boolean;
  valuesToRemove?: any[]; // ex: ['', null, undefined, 0]
  removeEmptyObjects?: boolean;
  removeEmptyArrays?: boolean;
}

const defaultOptions: Required<CleanOptions> = {
  preserveEmptyStrings: false,
  preserveNulls: false,
  valuesToRemove: [undefined, null, ''],
  removeEmptyObjects: true,
  removeEmptyArrays: true,
};

export function cleanJson(value: JsonValue, options: CleanOptions = {}): JsonValue {
  const opts = { ...defaultOptions, ...options };

  const shouldRemove = (v: any): boolean => {
    if (v === '' && opts.preserveEmptyStrings) return false;
    if (v === null && opts.preserveNulls) return false;
    return opts.valuesToRemove.includes(v);
  };

  if (Array.isArray(value)) {
    const cleanedArray = value
      .map((item) => cleanJson(item, opts))
      .filter((item) => !shouldRemove(item));

    return opts.removeEmptyArrays && cleanedArray.length === 0 ? undefined : cleanedArray;
  }

  if (value !== null && typeof value === 'object') {
    const cleanedObject: JsonObject = {};

    for (const [key, val] of Object.entries(value)) {
      const cleanedVal = cleanJson(val, opts);

      if (!shouldRemove(cleanedVal)) {
        cleanedObject[key] = cleanedVal;
      }
    }

    const isEmpty = Object.keys(cleanedObject).length === 0;
    return opts.removeEmptyObjects && isEmpty ? undefined : cleanedObject;
  }

  return shouldRemove(value) ? undefined : value;
}
