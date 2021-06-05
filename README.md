# easy-cipher

easy-cipher is a lightweight set of libraries that provide mapping utilities.

## Installation

Clone the repository & run `yarn`.

## Contributing

easy-cipher is open-source project, feel free to make pull requests and fork this repository.

## Structure

The project consists of packages that are stored in `packages/*` directory. The `core` package is the core mapping utility of all other packages like `morse` or `caesar` are packages built on the `core` package.

The test runner is `jest`. You can run the test by running `yarn run test` in root directory.

rollup.config.js was strongly inspired by https://github.com/typeofweb/schema by Type of Web - Michał Miszczyszyn.
