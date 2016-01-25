var postcss = require('postcss');
var tp = require('./src/transitionParser.js');
var selectors = ['enter', 'leave', 'appear', 'enterActive', 'leaveActive', 'appearActive'];


function handleCss(conf, selectorsMap) {
    // Work with options here
    var re = new RegExp(Object.keys(selectorsMap).join('|'));
    return function (css, result) {
        css.walkRules(re, s=> {
            var timeoutKey = selectorsMap[s.selector.replace(/^\./, '')], delay, duration, total = conf[timeoutKey] || 0;
            s.walkDecls('transition', t => total = Math.max(total, tp.calcMax(t.value)));

            s.walkDecls('transition-duration', d => duration = d.value);
            s.walkDecls('transition-delay', d => delay = d.value);

            s.walkDecls('animation', a => total = Math.max(total, tp.calcMax(a.value)));
            s.walkDecls('animation-delay', a => delay = a.value);
            s.walkDecls('animation-duration', a => duration = a.value);


            var max = Math.max(tp.maxLongForm(delay, duration), total);
            if (max > 0) {
                conf[timeoutKey] = max;
            }

        });
    };
}

module.exports = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }
    var lines = source.split('\n');
    var css = "";
    var exports = {
        push(id){
            css = id[1];
        }
    };
    var callback = this.async();

    //console.log('newSource\n', newSource, '\n\n');
    //yeah, I know should use child compiler, but damn that is a lot of work.
    (new Function(['exports', 'module'], lines.slice(1).join('\n'))(exports, {}));

    var selectorsMap = Object.keys(exports.locals).filter(key=>(selectors.indexOf(key) > -1)).reduce((ret, key)=> {
        //sets the timeout key.
        ret[exports.locals[key]] = key.replace(/(.+?)(Active)?$/, '@$1Timeout');
        return ret;
    }, {});

    postcss([handleCss(exports.locals, selectorsMap)]).process(css, {}).then(function () {

        var str = lines.slice(0, lines.indexOf('// exports')).join('\n');
        str += 'exports.locals = ' + JSON.stringify((exports.locals), null, 2) + ';';
        callback(null, str);
    }).catch(callback);
};