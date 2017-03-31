'use strict';

var _gRegisterServer = false;
var _gLabelMap = {};
//var _gHostName = 'http://ikcoder.iok.la:24525/ikcoder';
var _gHostName = 'http://10.86.18.67/ikcoder';
var _gURLMapping = {
    server: {
        reg: '/Sys/SYS_RegServer.aspx'
    },
    account: {
        reg: '/Account/SET_Reg.aspx',
        sign: '/Account/GET_Sign.aspx',
        signwithcode: '/Account/GET_SignWithCheckCode.aspx',
        checkcode: '/data/get_checkcodenua.aspx',
        signsstatus: '/Account/GET_SignStatus.aspx',
        nickname: '/Account/Profile/GET_NickName.aspx'
    },
    data: {
        studentcenter: '/Data/GET_ResourceDataText.aspx',
        parentreport: '/data/get_checkcodenua.aspx',
        updateprofile: '/data/get_checkcodenua.aspx',
        getwordlist: '/data/get_checkcodenua.aspx'
    }
};

var _gCID = null;

function _initURLMapping() {
    $.ajax({
        type: 'GET',
        url: _gHostName + '/data/get_UrlMap.aspx?showall=1&cid=' + _gCID,
        success: function (xml, status) {
            for (var key in _gURLMapping) {
                $(xml).find("item[group='" + key + "']").each(function (index, ele) {
                    _gURLMapping[key][$(ele).attr('key')] = $(ele).attr('value');
                });
            }
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            alert('Fail to load URL Mapping.');
        }
    });
}

function _registerRemoteServer() {
    //if (!_gRegisterServer) {
    $.ajax({
        type: 'GET',
        data: '<root></root>',
        url: _getRequestURL(_gURLMapping.server.reg, { domain: window.location.origin }),
        success: function (xml, status) {
            //alert('111');
            _gRegisterServer = true;
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            //alert('Fail to regist remote server.');
            _gRegisterServer = false;
        }
    });
    //}
};

function _loadLabels() {

};

function _getLabel(key) {
    return _gLabelMap[key] ? _gLabelMap[key] : key;
}

function _getRequestURL(page, params) {
    var url = _gHostName + page;
    url += '?cid=' + _gCID;
    if (params) {
        for (var key in params) {
            url += '&' + key + '=' + params[key];
        }
    }

    url += '&rnd=' + Date.now();
    return url;
}

function _checkUserName(name) {
    if (!(/^[a-zA-Z]{1}[0-9a-zA-Z_]{3,}$/.test(phone))) {
        return false;
    }

    return true;
}

function _checkPhoneNumber(phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        return false;
    }

    return true;
}

function _checkPassword(pwd) {
    pwd = pwd.trim();
    if (pwd.length < 8 || pwd.length > 16) {
        return -2;
    } else {
        if (/^((?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+){8}$/.test(pwd)) {
            return 3;
        } else if (/^((?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+){8}$/.test(pwd)) {
            return 2;
        } else if (/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+){8}$/.test(pwd)) {
            return 1;
        } else {
            return -1;
        }
    }
}

function _getCSSRule(ruleName) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        for (var j = 0; j < sheet.rules.length; j++) {
            var rule = sheet.rules[j];
            if (rule.selectorText == ruleName) {
                return rule;
            }
        }
    }

    return null;
}

function _setCssRuleStyle(rule, style, value) {
    if (typeof rule == 'string') {
        rule = _getCSSRule(rule);
    }

    if (rule) {
        rule.style[style] = value;
    }
}

function _getOffsetPosition(target, topParentClass) {
    var offsetPos = { left: 0, top: 0 };
    var flag = true;
    while (flag) {
        var pLeft = parseInt(target.css('padding-left'));
        var pTop = parseInt(target.css('padding-top'));
        offsetPos.top += pTop;
        offsetPos.left += pLeft;
        if (target.hasClass(topParentClass)) {
            flag = false;
        } else {
            var mLeft = parseInt(target.css('margin-left'));
            var mTop = parseInt(target.css('margin-top'));
            offsetPos.top += mTop;
            offsetPos.left += mLeft;
            target = target.parent();
        }
    }

    return offsetPos;
}

function listMovePrev() {
    if (arguments[0] && arguments[0].data) {
        var targetId = arguments[0].data.id;
        var step = arguments[0].data.step;
        var container = $('#' + targetId);
        var wrap = container.parent();
        var left = parseInt(container.css('left').replace('px', ''));
        var width = container.width();
        var wrapWidth = wrap.width();
        if (left < 0) {
            var tmpStep = step;
            if (Math.abs(left) < step) {
                tmpStep = Math.abs(left);
            }

            container.animate({ left: left + tmpStep + 'px', });
        }
    }
};

function listMoveNext() {
    if (arguments[0] && arguments[0].data) {
        var targetId = arguments[0].data.id;
        var step = arguments[0].data.step;
        var container = $('#' + targetId);
        var wrap = container.parent();
        var left = parseInt(container.css('left').replace('px', ''));
        var width = container.width();
        var wrapWidth = wrap.width();
        if (width + left > wrapWidth) {
            var tmpStep = step;
            if (width + left - wrapWidth < step) {
                tmpStep = width + left - wrapWidth;
            }

            container.animate({ left: left - tmpStep + 'px', });
        }
    }
};

function drawPolygon(context, n, x, y, r, a, c, fillStyle, strokeStyle) {
    var angle = a || 0;
    var counterclockwise = c || false;
    var vertex = [];
    if (fillStyle) {
        context.fillStyle = fillStyle;
    }

    if (strokeStyle) {
        context.strokeStyle = strokeStyle;
    }

    var tmpX = x + r * Math.sin(angle);
    var tmpY = y - r * Math.cos(angle);
    context.moveTo(tmpX, tmpY);
    vertex.push({ x: tmpX, y: tmpY });
    context.beginPath();
    var delta = 2 * Math.PI / n;
    for (var i = 0; i < n; i++) {
        angle += counterclockwise ? -delta : delta;
        tmpX = x + r * Math.sin(angle);
        tmpY = y - r * Math.cos(angle);
        context.lineTo(tmpX, tmpY);
        vertex.push({ x: tmpX, y: tmpY });
    }

    context.closePath();
    if (strokeStyle) {
        context.stroke();
    }

    if (fillStyle) {
        context.fill();
    }

    context.restore();
    return vertex;
}

function _startIntroJs() {
    var flag = true;
    $('head').find('link').each(function (index, ele) {
        if ($(ele).attr('href').indexOf('introjs.css') >= 0) {
            flag = false;
        }
    });

    if (flag) {
        $('head').append('<link rel="stylesheet" href="intro.js-2.4.0/introjs.css">');
        $('head').append('<link rel="stylesheet" href="intro.js-2.4.0/themes/introjs-modern.css">');
        $.getScript("intro.js-2.4.0/intro.js", function () {
            introJs().setOptions({
                'showButtons': true,
                "nextLabel": "下一步",
                "prevLabel": "上一步",
                "skipLabel": "跳过",
                "doneLabel": "完成",
                "exitOnEsc": true,
                "keyboardNavigation": true
            }).start();
        });
    }

    //$.ajax({
    //    type: 'GET',
    //    url: _getRequestURL(_gURLMapping.account.signsstatus),
    //    data: '<root></root>',
    //    success: function (data, status) {
    //        /*
    //        data: <root><username></username><firstsignin>1</firstsignin></root>
    //        */
    //        if ($(data).find('firstsignin').text() == "1") {
    //            var flag = true;
    //            $('head').find('link').each(function (index, ele) {
    //                if ($(ele).attr('href').indexOf('introjs.css') >= 0) {
    //                    flag = false;
    //                }
    //            });

    //            if (flag) {
    //                $('head').append('<link rel="stylesheet" href="intro.js-2.4.0/introjs.css">');
    //                $.getScript("intro.js-2.4.0/intro.js", function () {
    //                    introJs().setOption('showButtons', true).start();
    //                });
    //            }
    //        }
    //    },
    //    dataType: 'xml',
    //    xhrFields: {
    //        withCredentials: true
    //    }
    //});
}

(function initCID() {
    if (_gCID == null) {
        if (!window.top._gCID) {
            var searchArr = window.location.search.replace('?', '').split('&');
            for (var i = 0; i < searchArr.length; i++) {
                if (searchArr[i].indexOf('cid') == 0) {
                    var tmpSearchArr = searchArr[i].split('=');
                    if (tmpSearchArr.length == 2 && tmpSearchArr[1].trim() != '') {
                        _gCID = tmpSearchArr[1];
                    }

                    break;
                }
            }

            if (!_gCID) {
                _gCID = Date.now();
            }
        } else {
            _gCID = window.top._gCID;
        }
    }

    _registerRemoteServer();
    //_initURLMapping();
})();