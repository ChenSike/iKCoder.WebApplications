'use strict';

if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    };
}

(function () {
    'use strict';
    var vendors = ['webkit', 'moz', 'o', 'ms'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(
                function () {
                    callback(lastTime = nextTime);
                },
                nextTime - now
            );
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

function Extend(target, settings, params) {
    for (var i in settings) {
        target[i] = params[i] || settings[i];
    }
    return target;
};

function CloneObject(source) {
    var newObj = {};
    for (var key in source) {
        newObj[key] = source[key];
    }

    return newObj;
} 