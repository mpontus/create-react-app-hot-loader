// Describe major parts of create-react-app project as paths relative to the project root
const path = require('path');
const map = require('../utils/mapObject');

const appDirectory = process.cwd();
const relativePaths = {
    appPackageJson: 'package.json',
    appSrc: 'src',
    appIndexJs: 'src/index.js',
    appPublic: 'public',
    appHtml: 'public/index.html',
    appBuild: 'build',
    appNodeModules: 'node_modules',
};

module.exports = map(
    relativePath => path.resolve(appDirectory, relativePath),
    relativePaths,
);
