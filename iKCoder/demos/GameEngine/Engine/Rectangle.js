'use strict';

var Position = function (x, y) {
    this.x = x;
    this.y = y;

    this.add = function (p) {
        this.x += p.x;
        this.y += p.y;
    };

    this.remove = function (v) {
        this.x -= p.x;
        this.y -= p.y;
    };

    this.clone = function () {
        return new Position(this.x, this.y);
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
    this._position = new Position(x, y);
    this._size = new Size(w, h);
    if (a) {
        this._angle = angle;
    }
}

Rectangle.prototype.rotate = function (a) {
    this._angle = a;
};

Rectangle.prototype.checkHit = function (rect) {
    var xFlag = Math.abs((this._position.x + this._size.width / 2) - (rect._position.x + rect._size.width / 2)) < (this._size.width + rect._size.width) / 2;
    var yFlag = Math.abs((this._position.y + this._size.height / 2) - (rect._position.y + rect._size.height / 2)) < (this._size.height + rect._size.height) / 2;
    if (xFlag && yFlag) {
        return true;
    } else {
        return false;
    }
}

Rectangle.prototype.checkContain = function (position) {
    if (vposition.x > this._position.x && position.y > this._position.y && position.x < this._position.x + this._size.width && position.y < this._position.y + this._size.height) {
        return true;
    } else {
        return false;
    }
}

var EntityObject = function (p, s, a) {
    this.guid = Game.ObjectGUID++;
    this.clickable = false;
    this.hitable = false;
    this._events = {};
    var tmpSize = new Size(0, 0);
    if (s) {
        tmpSize = s;
    }

    Rectangle.call(this, p.x, p.y, tmpSize.width, tmpSize.height, a);
};

EntityObject.prototype._draw = function (context, styles) {
    if (!styles) {
        return false;
    }

    if (styles.border) {
        context.strokeStyle = styles.border.color;
        context.lineWidth = styles.border.width;
        context.strokeRect(this._position.x, this._position.y, this._size.width, this._size.height);
    }

    if (styles.fill) {
        context.fillStyle = styles.fill;
        context.fillRect(this._position.x, this._position.y, this._size.width, this._size.height);
    }
};

EntityObject.prototype._update = function () {
};

_Inherits(EntityObject, Rectangle);

var TextEntityObject = function (content, p, s, a, styles) {
    this.content = content;
    this.styles = styles;
    EntityObject.call(this, p, s, v);
};

TextEntityObject.prototype.setContent = function (content) {
    this.content = content;
};
//use attribute 'font' to define the font-size and font family, and use attribute 'fillStyle' to rander the text by color/shadow.
TextEntityObject.prototype.setStyle = function (s) {
    for (var attr in s) {
        this.styles[attr] = s[attr];
    }
};

TextEntityObject.prototype._draw = function (context) {
    for (var attr in this.styles) {
        context[attr] = this.styles[attr];
    }

    context.fillText(this.content, this._position.x, this._position.y);
};

_Inherits(TextEntityObject, EntityObject);

var ImageEntityObject = function (img, p, s, a) {
    this.image = img;
    EntityObject.call(this, p, s, a);
};

ImageEntityObject.prototype._draw = function (context) {
    context.drawImage(this.image, this._position.x, this._position.y);
};

_Inherits(ImageEntityObject, EntityObject);

var ContourEntityObject = function (p, s, a) {
    EntityObject.call(this, p, s, a);
};

ContourEntityObject.prototype._draw = function (context) {
    context.strokeStyle = "rgba(0,0,0,0)";
    context.lineWidth = "1px";
    context.strokeRect(this._position.x, this._position.y, this._size.width, this._size.height);
};

_Inherits(ContourEntityObject, EntityObject);

var ContourMap = function () {
    var objectsIds = [];
    var objects = {};
    this.add = function (o) {
        objectsIds.push(o.guid);
        objects[o.guid] = o;
    };

    this.remove = function (o) {
        var index = objectsIds.indexOf(o.guid);
        delete objects[o.guid];
        objectsIds.splice(index, 1);
    };

    this.checkContour = function (rect) {
        for (var i = 0, len = objectsIds.length; i < len; i++) {
            var co = objects[objectsIds[i]];
            if (co.checkHit(rect)) {
                return true;
            }
        }

        return false;
    };
};