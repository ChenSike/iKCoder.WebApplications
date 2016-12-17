'use strict';

if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    };
}

(function () {
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

var Object = function () {
    this.name = '';
    this.type = ''
}

function _Inherits(childCtor, parentCtor) {
    function tempCtor() { }
    tempCtor.prototype = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor.constructor;
};

function _Extend(target, params) {
    for (var key in params) {
        target[key] = params[key];
    }

    return target;
};

function _CloneObject(source) {
    var newObj = null;
    if (source instanceof Array) {
        newObj = [];
        for (var i = 0; i < source.length; i++) {
            newObj.push(_CloneObject(source[i]));
        }
    } else if (source instanceof Object) {
        newObj = {};
        for (var key in source) {
            newObj[key] = _CloneObject(source[key]);
        }
    } else {
        newObj = source;
    }

    return newObj;
};