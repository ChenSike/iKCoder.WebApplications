'use strict';

var ResourceLoader = function () {
    this.resource = {};
};

ResourceLoader.prototype.initResource = function (resourceArr, ) {
    this.resource = {};
    var tmpFlag = 0;
    for (var i = 0; i < resourceArr.length; i++) {
        tmpFlag = this.checkResourceInfo(resourceArr[i]);
        if (tmpFlag == 1) {
            this.resource[resourceArr[i].name] = {
                src: resourceArr[i].src,
                obj: null
            };
        }
    }
};

ResourceLoader.prototype.loadResource = function (callBack) {
    var tmpCount = 0;
    for (var key in this.resource) {
        tmpCount++;
    }

    _LoadScreen.initCount(tmpCount, callBack);
    for (var key in this.resource) {
        this._loadResource(key);
    }
};

ResourceLoader.prototype._loadResource = function (key) {
    var item = null;
    if (typeof key == "object") {
        var tmpFlag = this.checkResourceInfo(key);
        if (tmpFlag == 0) {
            if (this.resource[key.name].obj) {
                return;
            } else {
                key = key.name;
            }
        } else if (tmpFlag == 1) {
            this.resource[key.name] = {
                src: resourceArr[i].src,
                obj: null
            };
            key = key.name;
        } else if (tmpFlag == 2) {
            this.resource[key.name] = { src: key.src, obj: null };
            key = key.name;
        } else {
            return;
        }
    }

    if (typeof key == "string") {
        item = this.resource[key];
    } else {
        window.console.log("The resource '" + key.tostring() + "' loading failed.");
        return;
    }

    var img = new Image();
    img.dataName = key;
    img.src = item.src;
    img.onload = function () {
        _LoadScreen.setProgress();
    };

    img.onerror = function () {
        window.console.log("The resource '" + key + "' " + item.src + " loading failed.");
    }

    this.resource[key].obj = img;
};

ResourceLoader.prototype.getResource = function (key) {
    if (!this.resource[key]) {
        window.console.log("The resource '" + key + "' is non-existent.");        
    } else if (this.resource[key].obj == null) {
        this._loadResource(key);
    }

    return this.resource[key].obj;
};

ResourceLoader.prototype.checkResourceInfo = function (info) {
    var flag = 1;
    if (info.src && info.name && typeof info.src == "string" && typeof info.name == "string") {
        if (this.resource[info.name]) {
            if (this.resource[info.name].src == info.src) {
                window.console.log("The resource '" + key + "' already exist.");
                flag = 0;
            } else {
                window.console.log("The resource '" + key + "' already exist. but src is different.");
                flag = 2;
            }
        }
    } else {
        window.console.log("The input resource information is invalid.");
        flag = -1;
    }

    return flag;
};

var _LoadScreen = {
    totalCount: 0,
    currentCount: 0,
    callBack: function(){},

    initCount: function (tmpCount , callBack) {
        this.totalCount = tmpCount;
        this.currentCount = 0;
        this.callBack = callBack;
    },

    setProgress: function () {
        this.currentCount++;
        callBack(this.currentCount, this.totalCount);
    }
};