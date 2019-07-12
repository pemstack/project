# @my-app

[Monorepo](https://en.wikipedia.org/wiki/Monorepo) for a [TypeScript](https://www.typescriptlang.org)-based [full stack application](https://www.w3schools.com/whatis/whatis_fullstack.asp).

[Click here](fullstack.md) for a full stack learning guide.

## Getting started

1. Clone this repository.
2. Ensure a recent version of [Node.js](https://nodejs.org) is installed.
3. Open a terminal in project root path.
4. Perform initial installation `npm install`.
5. Bootstrap and symlink packages using `npm run bootstrap`.
6. Run a development build using `npm start`.

If you get compilation errors for dynamic imports after following the steps above, run the following commands:

```
npm update acorn --depth 20
npm dedupe
```

# Project structure

## File structure

- `packages/` - Directory for all packages.
- `packages/web` - Web app built with [Create React App](https://facebook.github.io/create-react-app) - [read more](packages/web/README.md).
- `packages/server` - Web server using [NestJS](https://nestjs.com) - [read more](packages/server/README.md).
- `packages/shared` - Modules [shared](https://github.com/lerna/lerna/tree/master/commands/link) by all packages - [read more](packages/shared/README.md).
- `packages/presentation` - Modules shared by `web` and `app` (todo) - [read more](packages/presentation/README.md).
- `package.json` - Root [package.json](https://docs.npmjs.com/files/package.json) for common scripts and dev dependencies.
- `lerna.json` - Root [lerna](https://lerna.js.org) configuration.
- `tsconfig.json` - Root [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- `tslint.json` - [TSLint](https://palantir.github.io/tslint) shared [configuration](https://palantir.github.io/tslint/usage/configuration) for linting.

## Scripts

- `npm run bootstrap` - Download ([and hoist](https://github.com/lerna/lerna/tree/master/commands/bootstrap)) dependencies for all packages.
- `npm start` - Run in development. All packages are watched and will update accordingly on file changes.
- `npm run build` - Create [production build](https://facebook.github.io/create-react-app/docs/production-build) for all packages.
- `npm run commit` - Create a formatted commit using [commitizen](http://commitizen.github.io/cz-cli).
- `npm run analyze` - Analyzes web bundles using [source-map-explorer](https://github.com/danvk/source-map-explorer). Shortcut for `analyze` script of `packages/web`.

## Dependencies (root package only)

- [@types/node](https://www.npmjs.com/package/@types/node) - [typings](https://github.com/DefinitelyTyped/DefinitelyTyped) for [Node APIs](https://nodejs.org/en/docs). Needed for the server and various build tools.
- [lerna](https://lerna.js.org) - A tool for managing JavaScript projects with multiple packages.
- [typescript](https://github.com/Microsoft/TypeScript) - TypeScript compiler CLI.

## Dev-dependencies (root package only)

Used for various dev/build tasks.

# Optional packages

The following packages are considered optional and can be removed or substituted.
Follow the listed instructions to uninstall them.

Runtime dependencies are discussed separately in each package's readme.

## commitizen and cz-conventional-changelog

Optionally create formatted commits. Safe to remove.

- Remove `commitizen` from `package.json`.
- Remove `cz-conventional-changelog` from `package.json`.
- Remove script `commit` in `package.json`.

## source-map-explorer

Optionally analyze web bundles. Safe to remove.

- Remove `source-map-explorer` in `package.json`.
- Remove script `analyze` in `package.json`.
- Remove script `analyze` in `packages/web/package.json`.

## compodoc

Optionally generate docs for server using [compodoc](https://compodoc.app). Safe to remove.

- Remove `packages/server/.compodocrc.json`.
- Remove `@compodoc/compodoc` from `packages/server/package.json`.
- Remove scripts `docs` and `docs:serve` from `packages/server/package.json`.

## tslint

Optionally check code for common errors and style violations. Safe to remove.

- Remove `tslint` from `package.json`.
- Remove `tslint-react` from `package.json`.
- Remove `tslint.json` files from root and each package.

## ts-node-dev and tsconfig-paths

Runs typescript on the fly and watches required modules for changes.
**Warning:** If you remove these tools then you need to provide a custom development start script for `packages/server`.

- Remove `ts-node-dev` from `package.json`.
- Remove `tsconfig-paths` from `package.json`.
- Replace script `start` in `packages/server/package.json`.
- Remove `wait-on` from `package.json` if it's no longer needed.

## rimraf

Delete files/directories. **Warning:** Some scripts may break.

- Remove `rimraf` from `package.json`.
