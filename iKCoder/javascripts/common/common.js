'use strict';

var _cssPrefixArr = ['', '-moz-', '-o-', '-webkit-', 'ms'];

if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    };
}

(function () {
    'use strict';
    var _cssPrefixArr = ['webkit', 'moz', 'o', 'ms'];
    for (var i = 0; i < _cssPrefixArr.length && !window.requestAnimationFrame; ++i) {
        var vp = _cssPrefixArr[i];
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

        window.cancelAnimationFrame = window.clearTimeout;
    }
}());

function Extend(target, settings, params) {
    for (var i in settings) {
        target[i] = params[i] || settings[i];
    }

    return target;
};

function CloneObject(source) {   
    return $.extend(true, {}, source);
};

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
};

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
};

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
};

function DeleteKeyframesRule(keyframesName) {
    var tmpobj = GetKeyframesRuleInfo(keyframesName);
    if (tmpobj.sheet && tmpobj.rule && tmpobj.index >= 0) {
        tmpobj.deleteRule(tmpobj.index);
    }

    return tmpobj.sheet;
};

function ConvertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };

    img.src = url;
};

//ConvertImgToBase64('http://bit.ly/18g0VNp', function (base64Img) {
//    // Base64DataURL
//});

function testTextWidth(sourceTagId) {
    var sourceTag = document.getElementById(sourceTagId);
    if (!sourceTag) {
        return -1;
    }

    var testDiv = document.getElementById("div_test_text_widht");
    if (!testDiv) {
        testDiv = document.createElement("div");
        testDiv.id = "div_test_text_widht";
        testDiv.style.position = "absolute";
        testDiv.style.left = "-10000px";
        testDiv.style.top = "-10000px";
        testDiv.style.width = "auto";
        document.body.appendChild(testDiv);
    }

    testDiv.style.fontFamily = sourceTag.style.fontFamily;
    testDiv.style.fontSize = sourceTag.style.fontSize;
    testDiv.style.fontWeight = sourceTag.style.fontWeight;
    testDiv.innerHTML = sourceTag.innerHTML;

    return testDiv.clientWidth;
};

function randomInt(minVal, maxVal) {    
    var rand = parseInt(Math.random() * (maxVal - minVal + 1) + minVal);
    return rand;
}