# Create React App Hot Loader

Webpack dev server for create-react-app projects built for hot reloading.

## Introduction

Adding react-hot-loader to your application requires some changes to the webpack pipeline. For create-react-app projects webpack configuration files remain hidden until the developer ejects. Unfortunatelly ejecting comes at a price of losing the convent updates to features beyond just dev server.

The solution is to delegate the responsiblity for running the dev server to another library. This package comes with webpack dev server preconfigured for create-react-app projects and supporting react-hot-loader out of the box.

## Installation

Both local and global installations are supported by this package. 

Chose local installation if you want to provide other contributors with the convenience of real hot reloading. Go for global installation if you have several create-react-app projects which you don't want to pollute with external dependencies.

### Locally

Run following command to install custom dev server on a per-project basis:

```bash
$ npm install --dev create-react-app-hot-loader
```

Open package.json and change `start` entry inside `scripts` section to execute new dev server:

```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "create-react-app-hot-loader",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

You now ready to test your new setup by running `npm start`.

### Globally

You can make this server available in any directory on your local machine by installing it as follows:

```bash
$ npm install -g create-react-app-hot-loader
```

Now you can start the server from the root directory of any create-react-app project using following command:

```bash
$ create-react-app-hot-loader
```


## Debugging

By default update errors cause full page refresh. Not very useful for debugging.

Start the server with `--hot-only` flag to disable this fallback mechanism.

## Plans

At the moment server heavily relies on react-scripts internals.

I plan to get rid of those dependencies at the cost of sacrificing some of its useful features.
