# cleany-json

🧹 A lightweight utility to deeply clean JSON objects by removing unwanted values like `null`, `undefined`, empty strings, and empty objects/arrays.

---

## Installation

```bash
npm install cleany-json
```

---

## Basic Usage

```typescript
import { cleanJson } from 'cleany-json';

const userProfile = {
  name: '',
  age: null,
  address: {
    street: 'Main St',
    apartment: undefined,
    tags: ['', 'javascript', null]
  },
  active: true,
  emptyArray: []
};

// Basic cleaning
const cleaned = cleanJson(userProfile);

// Note: cleanJson returns a new cleaned object; the original is not modified.

console.log(cleaned);
/* 
Result:
{
  address: {
    street: 'Main St',
    tags: ['javascript']
  },
  active: true
}
*/
```

---

## Advanced Configuration

```typescript
// Custom cleaning rules
const customCleaned = cleanJson(userProfile, {
  preserveNulls: true,          // Keep null values
  preserveEmptyStrings: false,  // Remove empty strings (default)
  valuesToRemove: [undefined],  // Only remove undefined
  removeEmptyArrays: false      // Keep empty arrays
});

/*
Result:
{
  age: null,                    // Preserved
  address: {
    street: 'Main St',          // Empty string removed (default)
    tags: ['javascript']        // Null removed from array
  },
  active: true,
  emptyArray: []                // Preserved
}
*/
```

---

## Key Features

✅ **Deep Cleaning** - Recursively processes nested objects and arrays  
✅ **Flexible Rules** - Customize what gets removed or preserved  
✅ **Type Safe** - Written in TypeScript with full type definitions  
✅ **Immutable** - Never modifies the original input data  
✅ **Zero Dependencies** - Lightweight and self-contained  

---

## API Reference

### `cleanJson(value: JsonValue, options?: CleanOptions): JsonValue`

#### Options

| Option                 | Type      | Default                 | Description               |
| ---------------------- | --------- | ----------------------- | ------------------------- |
| `preserveEmptyStrings` | `boolean` | `false`                 | Keep empty strings (`""`) |
| `preserveNulls`        | `boolean` | `false`                 | Keep `null` values        |
| `valuesToRemove`       | `any[]`   | `[undefined, null, '']` | Custom values to remove   |
| `removeEmptyObjects`   | `boolean` | `true`                  | Remove empty objects `{}` |
| `removeEmptyArrays`    | `boolean` | `true`                  | Remove empty arrays `[]`  |

---

## Why Choose cleany-json?

* **More configurable** than basic JSON cleaning utilities
* **Specialized** for deep nested structures
* **Predictable behavior** with clear rules
* **Maintained** with regular updates

---

## Roadmap

### Implemented Features ✔️

✅ Recursive deep cleaning  
✅ Customizable removal rules  
✅ TypeScript support  
✅ Empty object/array handling  
✅ Preserve false/0 by default  

### Planned Features ✨

* [ ] Custom predicate functions
* [ ] Deno support
* [ ] CLI interface
* [ ] Browser build
* [ ] Enhanced empty value handling

---

## License

MIT © [aredhel269](https://github.com/aredhel269)
