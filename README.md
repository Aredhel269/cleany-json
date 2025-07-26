# cleany-json

🧹 A tiny utility to clean JSON objects by removing `null`, `undefined`, and empty string (`""`) values.

## Installation

```
npm install cleany-json
````

## Usage

```
import { cleanJson } from 'cleany-json';

const input = {
  name: '',
  age: null,
  country: 'Spain',
  active: true,
  note: undefined,
};

const result = cleanJson(input);
// {
//   country: 'Spain',
//   active: true
// }
```

## Features

* Removes fields with:

  * `null`
  * `undefined`
  * empty string (`""`)
* Keeps:

  * `0`, `false`, and `""` if configured (coming soon)
* Written in TypeScript
* Tiny and dependency-free

## API

### `cleanJson(obj: object): object`

Returns a new object with the unwanted values removed. Only works at the first level (deep cleaning support is planned).

## Roadmap

### Implemented Features ✔️
- [x] Deep cleaning (recursive nested object/array cleaning)
- [x] Flexible configuration (preserve empty strings, nulls, etc.)
- [x] Empty object/array removal
- [x] TypeScript support
- [x] Custom value removal (via `valuesToRemove`)

### Planned Features ✨
- [ ] Custom predicate functions (for advanced cleaning logic)
- [ ] Deno support
- [ ] CLI tool
- [ ] Browser/UMD build
- [ ] Option to preserve empty root objects/arrays
- [ ] Path-specific cleaning
- [ ] Support for Map, Set and other data structures
- [ ] Performance optimizations for large datasets
- [ ] Schema-based cleaning rules

## License

MIT

## Author

Made with ❤️ by [@aredhel269](https://github.com/aredhel269)
