'use strict';

var Map = function (p, s, type, drawConfig) {
    this.stage = null;
    //0: static, like pac man; 1: horizontal move; 2:vertical move; 3: personal point of view; 4: 3D
    this.type = type ? type : 0;
    this.draw_config = drawConfig ? drawConfig : {
        //0: brush; 1: image
        type: 0,
        //for static map, by pixel
        grid_unit: 20,
        brushFun: function () { },
        imageFun: function () { }
    };

    this.frame = 0;
    this.frameCount = 0;
    this.needRedraw = true;
    Rectangle.call(this, p.x, p.y, s.width, s.height, 0);
};

Map.prototype._update = function () {
    if (!(this.frameCount % this.frame)) {
        this.update();
        this.needRedraw = true;
    } else {
        this.needRedraw = false;
    }

    this.frameCount++;
};
//for inherit
Map.prototype.update = function () {

}

Map.prototype._draw = function (context) {
    if (this.needRedraw) {
        this.draw(context);
    }
};
//for inherit
Map.prototype.draw = function (context) {
};

Map.prototype.setStage = function (stage) {
    this.stage = stage;
};

_Inherits(EntityObject, Rectangle);