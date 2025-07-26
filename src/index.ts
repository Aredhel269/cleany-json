type JsonValue = string | number | boolean | undefined | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export function cleanJson(obj: JsonValue): JsonValue {
  if (Array.isArray(obj)) {
    return obj
      .map(cleanJson)
      .filter(v => v !== undefined && v !== null && v !== "");
  } else if (obj !== null && typeof obj === "object") {
    const result: JsonObject = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
      
      const cleanedValue = cleanJson(value);
      if (cleanedValue !== undefined && cleanedValue !== null && cleanedValue !== "") {
        result[key] = cleanedValue;
      }
    }
}
    return result;
  }
  return obj;
}
