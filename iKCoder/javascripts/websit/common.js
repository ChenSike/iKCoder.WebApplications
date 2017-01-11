'use strict';

var _gLabelMap = {};
var _gHostName = 'http://ikcoder.iok.la:24525/';

function _loadLabels() {

};

function _getLabel(key) {
    return _gLabelMap[key] ? _gLabelMap[key] : key;
}

function _getRequestURL(page, params){
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