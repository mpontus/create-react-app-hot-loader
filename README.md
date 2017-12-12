# Create React App Hot Loader

Webpack dev-server for [create-react-app](https://github.com/facebookincubator/create-react-app) projects with support for hot reloading.

> # Defunct
>
> This module is no longer compatible with create-react-app. Complete rewrite is in the plans.

## Introduction

Adding react-hot-loader to your application requires changing webpack configuration. Create-react-app hides webpack files from the developer until they eject. By ejecting you lose the convenience of updates to features beyond just dev-server.

The solution is to delegate the responsibility of running the dev-server to another library. This package comes with webpack server configured for create-react-app projects and with support for [react hot loader](https://github.com/gaearon/react-hot-loader).

## Installation

Package supports both local and global installations.

Add this package to your project if you want to share the experience of real hot reloading with other developers.

Install the server globally if you want to avoid bringing in extra dependencies.

### Locally

Run following command to add this package to your project:

```bash
$ npm install --dev create-react-app-hot-loader
```

Open package.json and change `start` script to run different server:

```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "create-react-app-hot-loader",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

Test your new setup by running `npm start`.

### Globally

To be able to start the server for any project on your local machine, install it as follows:

```bash
$ npm install -g create-react-app-hot-loader
```

Now you can start the server from anywhere with the following command:

```bash
$ create-react-app-hot-loader
```

## Debugging

By default update errors cause full page refresh. Not very useful for debugging.

Start the server with `--hot-only` flag to disable this fallback mechanism.
