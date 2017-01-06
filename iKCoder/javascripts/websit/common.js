'use strict';

var _gLabelMap = {};
var _gHostName = 'http://ikcoder.iok.la:24525/';

function loadLabels() {

};

function getLabel(key) {
    return _gLabelMap[key] ? _gLabelMap[key] : key;
}

function getRequestURL(page, params){
    var url = _gHostName + page;
    if (params) {
        url += '?';
    }

}