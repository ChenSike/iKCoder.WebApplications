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
                if (sheets[j].rules[i].selectorText && sheets[j].rules[i].selectorText == selector) {
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

function CreateNewStyleSheet() {
    if (document.all) {
        window.style = "body{}";
        return document.createStyleSheet("javascript:style");
    } else {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = "body{}";
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
        return document.styleSheets[document.styleSheets.length - 1];
    }
}

function GetKeyframesRuleInfo(keyframesName) {
    var currRule = null;
    var currRules = null;
    var currentSheet = null;
    for (var i = 0; i < document.styleSheets.length; i++) {
        currentSheet = document.styleSheets[i];
        currRules = currentSheet.rules;
        for (var j = currRules.length - 1; j >= 0 ; j--) {
            currRule = currRules[j];
            if (currRule.type == 7 && currRule.name == keyframesName) {
                return { sheet: currentSheet, rule: currRule, index: j };
            }
        }
    }

    if (currentSheet == null) {
        currentSheet = CreateNewStyleSheet();
    }

    return { sheet: currentSheet, rule: currRule, index: -1 };
}

function DeleteKeyframesRule(keyframesName) {
    var tmpobj = GetKeyframesRuleInfo(keyframesName);
    if (tmpobj.sheet && tmpobj.rule && tmpobj.index >= 0) {
        tmpobj.deleteRule(tmpobj.index);
    }

    return tmpobj.sheet;
}

