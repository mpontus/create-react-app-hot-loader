// Describe major parts of create-react-app project as paths relative to the project root
const appDirectory = process.cwd();
const relativePaths = {
    appSrc: 'src',
    appIndexJs: 'src/index.js',
    appHtml: 'public/index.html',
    appBuild: 'build',
    appNodeModules: 'node_modules',
};

module.exports = map(
    relativePath => path.resolve(appDirectory, relativePath),
    relativePaths
);
