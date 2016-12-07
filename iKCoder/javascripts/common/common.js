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

function ChangeStyleSheet(selector, newStyle) {
    var flag = false;
    var sheets = document.styleSheets;
    try {
        for (var j = 0; j < sheets.length; j++) {
            for (var i = 0; i < sheets[j].rules.length; i++) {
                if (sheets[j].rules[i].selectorText == selector) {
                    var style = sheets[j].rules[i].style;
                    for (var key in newStyle) {
                        style[key] = newStyle[key];
                    }

                    flag = true;
                }
            }
        }

        if (!flag) {
            var sheet = sheets[sheets.length - 1];
            var newRuleStr = "";
            for (var key in newStyle) {
                newRuleStr += key + ":" + newStyle[key] + ";";
            }
            sheet.addRule(selector, newRuleStr, sheet.rules.length);
        }
    }
    catch (ex) {
        var message = ex;
    }
}