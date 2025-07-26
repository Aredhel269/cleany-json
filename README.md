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

* [ ] Option to clean nested objects and arrays
* [ ] Custom clean rules (e.g., remove `false`, `0`, empty arrays)
* [ ] Deno support
* [ ] CLI tool

## License

MIT

## Author

Made with ❤️ by [@aredhel269](https://github.com/aredhel269)
