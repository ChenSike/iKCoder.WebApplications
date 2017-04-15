'use strict';

var _gRegisterServer = false;
var _gLabelMap = {};
//var _gHostName = 'http://ikcoder.iok.la:24525/ikcoder';
//var _gHostName = 'http://10.86.18.67/ikcoder';
var _gHostName = 'http://192.168.199.182/ikcoder';
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
        nickname: '/Account/Profile/GET_NickName.aspx',
        updatepwd: '/Account/SET_ResetPassword.aspx',
        logout: '/Account/SET_Logout.aspx'
    },
    data: {
        studentcenter: '/Data/GET_ResourceDataText.aspx',
        parentreport: '/Data/GET_ResourceDataText.aspx',
        updateprofile: '/data/get_checkcodenua.aspx',
        getwordlist: '/data/get_checkcodenua.aspx',
        setbinresource: '/Data/SET_BinResource.aspx',
        getimage: '/Data/GET_image.aspx',
        getimageheader: '/Data/GET_ImageHeader.aspx'
    },
    util:{
        setclipimage: '/Util/SET_ClipImage.aspx'
    },
    bus:{
        getworkspace: '/Bus/Workspace/GET_Workspace.aspx',
        saveworkspace: '/Bus/Workspace/GET_Workspace.aspx'
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
};

function _showGlobalMessage(msg, type, id) {
    if ($('.alert-mask').length == 0) {
        $('body').append($('<div class="alert-mask"></div>'));
    }
    $('.alert-mask').show();
    $('body').append($('<div class="alert alert-' + type + '  alert-dismissable" id="' + id + '"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msg + '</div>'));
    $('#' + id).bind('close.bs.alert', function () {
        $('.alert-mask').hide();
    });
};

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

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));