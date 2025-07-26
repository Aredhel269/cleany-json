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

export function cleanJson(value: JsonValue, options: CleanOptions = {}, isRoot = true): JsonValue {
  const opts = { ...defaultOptions, ...options };

  const shouldRemove = (v: any): boolean => {
    if (v === '' && opts.preserveEmptyStrings) return false;
    if (v === null && opts.preserveNulls) return false;
    return opts.valuesToRemove.includes(v);
  };

  if (Array.isArray(value)) {
    const cleanedArray = value
      .map((item) => cleanJson(item, opts, false))
      .filter((item) => !shouldRemove(item));

    if (cleanedArray.length === 0 && opts.removeEmptyArrays && !isRoot) {
      return undefined;
    }
    return cleanedArray;
  }

  if (value !== null && typeof value === 'object') {
    const cleanedObject: JsonObject = {};
    let hadOriginalProperties = false;

    for (const [key, val] of Object.entries(value)) {
      hadOriginalProperties = true;
      const cleanedVal = cleanJson(val, opts, false);

      if (!shouldRemove(cleanedVal)) {
        cleanedObject[key] = cleanedVal;
      }
    }

    // Cas especial: objecte que tenia propietats però totes s'han eliminat
    if (hadOriginalProperties && Object.keys(cleanedObject).length === 0) {
      return {};
    }

    // Objecte buit original
    if (Object.keys(cleanedObject).length === 0) {
      if (isRoot) return cleanedObject;
      return opts.removeEmptyObjects ? undefined : cleanedObject;
    }

    return cleanedObject;
  }

  return shouldRemove(value) ? undefined : value;
}