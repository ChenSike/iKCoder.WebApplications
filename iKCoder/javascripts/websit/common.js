'use strict';

var _gLabelMap = {};
var _gHostName = 'http://ikcoder.iok.la:24525/';
var _gCID = null;

function _loadLabels() {

};

function _getLabel(key) {
    return _gLabelMap[key] ? _gLabelMap[key] : key;
}

function _getRequestURL(page, params) {
    var url = _gHostName + page;
    url += '?';
    if (params) {
        for (var key in params) {
            url += key + '=' + params[key] + '&';
        }
    }

    url += 'rnd=' + Date.now();
    return url;
}

function _checkPhoneNumber(phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        return false;
    }

    return true;
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
})();