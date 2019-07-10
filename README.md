# @my-app

[Monorepo](https://en.wikipedia.org/wiki/Monorepo) for a [TypeScript](https://www.typescriptlang.org)-based [full stack application](https://www.w3schools.com/whatis/whatis_fullstack.asp).

## File structure

- `packages/` - Directory for all packages.
- `packages/web` - Web app built with [Create React App](https://facebook.github.io/create-react-app) - [read more](packages/web/README).
- `packages/server` - Web server using [NestJS](https://nestjs.com) - [read more](packages/server/README).
- `packages/shared` - Modules [shared](https://github.com/lerna/lerna/tree/master/commands/link) by all packages - [read more](packages/shared/README).
- `packages/presentation` - Modules shared by `web` and `app` (todo) - [read more](packages/presentation/README).
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
