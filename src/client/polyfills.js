// Enable the same polyfills which are used in create-react-app's webpack configuration
if (typeof Promise === 'undefined') {
    require('promise/lib/rejection-tracking').enable();
    window.Promise = require('promise/lib/es6-extensions.js');
}
require('whatwg-fetch');
Object.assign = require('object-assign');
