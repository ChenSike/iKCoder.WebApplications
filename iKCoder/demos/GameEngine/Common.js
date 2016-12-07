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

function _Inherits (childCtor, parentCtor) {
    function tempCtor() { }
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;
    childCtor.base = function (me, methodName, var_args) {
        var args = new Array(arguments.length - 2);
        for (var i = 2; i < arguments.length; i++) {
            args[i - 2] = arguments[i];
        }
        return parentCtor.prototype[methodName].apply(me, args);
    };
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

function _RectImpactCheck(rect_1, rect_2) {




    C += A, D += B, G += E, H += F;

    // 没有相交
    if (C <= E || G <= A || D <= F || H <= B)
        return [0, 0, 0, 0];

    var tmpX, tmpY;

    if (E > A) {
        tmpX = G < C ? [E, G] : [E, C];
    } else {
        tmpX = C < G ? [A, C] : [A, G];
    }

    if (F > B) {
        tmpY = H < D ? [F, H] : [F, D];
    } else {
        tmpY = D < H ? [B, D] : [B, H];
    }

    return [tmpX[0], tmpY[0], tmpX[1], tmpY[1]];
}

// 相交矩形坐标信息
var rect = check(fish.pos.x, fish.pos.y, fish.size.x, fish.size.y,
  cat.pos.x, cat.pos.y, cat.size.x, cat.size.y);

// 相交面积大于 0 即为碰撞
var isHit = (rect[2] - rect[0]) * (rect[3] - rect[1]) > 0;