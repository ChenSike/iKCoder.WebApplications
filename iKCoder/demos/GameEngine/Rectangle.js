'use strict';

var Vector = function (x, y) {
    this.x = x;
    this.y = y;

    this.add = function (v) {
        this.x += v.x;
        this.y += v.y;
    };

    this.remove = function (v) {
        this.x -= v.x;
        this.y -= v.y;
    };

    this.clone = function () {
        return new Vector(this.x, this.y);
    };
}

var Size = function (w, h) {
    this.width = w;
    this.height = h;
    this.scale = function (ws, hs) {
        if (arguments.length == 1) {
            this.width = this.width * ws;
            this.height = this.height * ws;
        } else if (arguments.length == 2) {
            this.width = this.width * ws;
            this.height = this.height * hs;
        }
    };

    this.clone = function () {
        return new Size(this.x, this.y);
    };
}

var Rectangle = function (x, y, w, h, a) {
    this._vector = new Vector(x, y);
    this._size = new Size(w, h);
    if (a) {
        this._angle = angle;
    }
}

Rectangle.prototype.rotate = function (a) {
    this._angle = a;
};

Rectangle.prototype.checkHit = function (rect) {
    var xFlag = Math.abs((this._vector.x + this._size.width / 2) - (rect._vector.x + rect._size.width / 2)) < (this._size.width + rect._size.width) / 2;
    var yFlag = Math.abs((this._vector.y + this._size.height / 2) - (rect._vector.y + rect._size.height / 2)) < (this._size.height + rect._size.height) / 2;
    if (xFlag && yFlag) {
        return true;
    } else {
        return false;
    }
}

Rectangle.prototype.checkContain = function (v) {
    if (v.x > this._vector.x && v.y > this._vector.y && v.x < this._vector.x + this._size.width && v.y < this._vector.y + this._size.height) {
        return true;
    } else {
        return false;
    }
}