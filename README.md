# React Hot Loader Dev Server

This package provides an alternative dev server for create-react-app projects, allowing you to enable react-hot-loader without ejecting.

## Usage

In your package.json replace the start script with following command: `react-hot-loader-dev-server`.

## Debugging

Firstly, make sure that you follow the latest instructions found in react-hot-loader's documentation:

https://github.com/gaearon/react-hot-loader/tree/master/docs

Command argument `--hot-only` can be used to disable webpack's fallback mechanism, which hides update errors behind full page refresh.

Some errors can be swallowed by webpack client. For better insight use breakpoints to inspect contexts of the clauses linked from the stacktrace.
