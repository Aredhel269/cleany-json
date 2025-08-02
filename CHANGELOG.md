# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-07-28
### Changed
- Updated `package.json` metadata:
  - Added `homepage` and `bugs` fields.
  - GitHub repository link now shows on npm package page.

## [1.0.1] - 2025-07-28
### Changed
- Bumped version to `1.0.1`.

## [1.0.0] - 2025-07-27
### Added
- `main` and `types` fields in `package.json`.
- GitHub repository URL using HTTPS format.
- Initial `README.md` content.

### Changed
- Improved formatting of `package.json`.

## [0.1.0] - 2025-07-26
### Added
- Initial implementation of `cleanJson` function.
- TypeScript build script (`tsc`).
- Vitest test configuration and tests for `cleanJson`.
- Options to:
  - Preserve empty strings and nulls.
  - Remove empty objects and arrays.

### Changed
- Refactored `cleanJson` to handle deeply nested structures.
- Improved logic for empty structure removal.

### Removed
- Deleted `node_modules` from the repository.