"use strict";

var ctx = require.context('.', false, /\.less$/);
var transitionFactory = require('../../src/transitionFactory').default;
var capitalize = require('lodash/string/capitalize');
module.exports = ctx.keys().reduce(function (ret, key) {
    const name = capitalize(key.replace(/^(\.?\/)?(.*)\.less$/, '$2'));
    console.log('name', name);
    ret[name] = transitionFactory(ctx(key));
    return ret;
}, {});
