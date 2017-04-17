(function() {
    'use strict';
    Konva.ConnectionPoint = function(config) {
        this.___init(config);
        this._direction = config.direction;
        this._componentsLayer = config.componentsLayer;
        this._inc = config.inc;
        // an object that represent the (x, y, width, height) for the target point
        this._target = config.target;
        this._targetX = this._target.x() + this._target.width() / 2;
        this._targetY = this._target.y() + this._target.height();
        this._remainingSteps = 0;
        this._tmpX = config.tmpX;
        this._tmpY = config.tmpY;

        // this.points(this.points().concat[this._tmpX, this._tmpY]);
        console.log('targetX ' + this._targetX + ' targetY ' + this._targetY);
    };

    Konva.ConnectionPoint.DOWN = "DOWN";
    Konva.ConnectionPoint.UP = "UP";
    Konva.ConnectionPoint.LEFT = "LEFT";
    Konva.ConnectionPoint.RIGHT = "RIGHT";

    Konva.ConnectionPoint.prototype = {
        // constructor: Konva.ConnectionPoint,
        ___init: function(config) {
            var defaultConfig = {
                innerRadius: 2,
                outerRadius: 4,
                angle: 360,
                opacity: 0.8,
                fill: 'white',
                stroke: 'black',
                shadowColor: '#FFFFFF',
                shadowBlur: 0.3,
                shadowOffsetX: -1,
                shadowOffsetY: -1,
                strokeWidth: 3
            };

            for (var k in defaultConfig) {
                config[k] = config[k] || defaultConfig[k];
            };
            Konva.Line.prototype.___init.call(this, config);
        },

        ___doMove(direction, inc) {
            var points = this.points();
            inc = Math.min(inc, this._remainingSteps);

            if (direction === Konva.ConnectionPoint.UP) {
                this._tmpY -= inc;
                this.points(points.concat([this._tmpX, this._tmpY]));
                this.moveUp();
            } else if (direction === Konva.ConnectionPoint.DOWN) {
                this._tmpY += inc;
                this.points(points.concat([this._tmpX, this._tmpY]));
            } else if (direction === Konva.ConnectionPoint.LEFT) {
                this._tmpX -= inc;
                this.points(points.concat([this._tmpX, this._tmpY]));
            } else if (direction === Konva.ConnectionPoint.RIGHT) {
                this._tmpX += inc;
                this.points(points.concat([this._tmpX, this._tmpY]));
            } else {
                return;
            }

            this._remainingSteps -= inc;
        },

        // calculate _direction and _inc
        ___calculateMove(componentsLayer) {
            // finish remaining steps with previous direction
            if (this._remainingSteps > 0) {
                return;
            }

            var diffX = this._targetX - this._tmpX;
            var diffY = this._targetY - this._tmpY;


            // stop when reached the target point
            if (this.isDone()) {
                return;
            }

            // inital step -- create deviates
            if (Math.abs(diffY) < 1 && Math.abs(diffX) > 1) {
                this._remainingSteps = 20;
                this._direction = Konva.ConnectionPoint.DOWN;
                return;
            }

            // draw x axis
            if (Math.abs(diffY) >= 20 &&
                (Konva.ConnectionPoint.UP === this._direction || Konva.ConnectionPoint.DOWN === this._direction)) {
                if (diffX > 0) {
                    this._direction = Konva.ConnectionPoint.RIGHT;
                    this._remainingSteps = Math.abs(diffX);
                } else {
                    this._direction = Konva.ConnectionPoint.LEFT;
                    this._remainingSteps = Math.abs(diffX);
                }

                return;
            }

            // draw y axis
            if (Math.abs(diffX) >= 0 &&
                (Konva.ConnectionPoint.LEFT === this._direction || Konva.ConnectionPoint.RIGHT === this._direction)) {
                if (diffY > 0) {
                    this.direction = Konva.ConnectionPoint.DOWN;
                    this._remainingSteps = Math.abs(diffY);
                } else {
                    this._direction = Konva.ConnectionPoint.UP;
                    this._remainingSteps = Math.abs(diffY);
                }
            }
        },

        moveAction: function() {
            this.___calculateMove(this._componentsLayer);
            this.___doMove(this._direction, this._inc);
        },

        isDone: function() {
            return (Math.abs(this._tmpX - this._targetX) <= 1) && (Math.abs(this._tmpY - this._targetY) <= 1);
        }

    };

    Konva.Util.extend(Konva.ConnectionPoint, Konva.Line);
})();


// Extend Image
(function() {
    var RESULT_WIDTH = 20,
        RESULT_HEIGHT = 20;

    Konva.Ccomponent = function(config) {
        this.___init(config);
        this._isAssigned = false;
        this._isAssignedCorrectly = false;
        this.className = 'Ccomponent';
        this.en = config.en;
        this.cn = config.en;
    };

    Konva.Ccomponent.prototype = {
        ___init: function(config) {
            Konva.Image.prototype.___init.call(this, config);
            this.resultImage = new Konva.Image({
                x: config.x + 5,
                y: config.y,
                width: RESULT_WIDTH,
                height: RESULT_HEIGHT
            });
        },

        draw: function() {
            Konva.Image.prototype.draw.apply(this);

            var that = this;

            var imageObj = new Image();
            imageObj.src = !this._isAssigned ? null : this._isAssignedCorrectly ? 'svg/success.svg' : 'svg/error.svg';
            that.resultImage.image(imageObj);

            this.parent.draw();
            that.resultImage.draw();
        }
    };

    Konva.Util.extend(Konva.Ccomponent, Konva.Image);

    // extend component group
    Konva.ComponentGroup = function(config) {
        this.___init(config);
        this._group = config.group;
    };

    Konva.ComponentGroup.prototype = {
        ___init: function(config) {
            Konva.Rect.prototype.___init.call(this, config);
        }
    };

    Konva.Util.extend(Konva.ComponentGroup, Konva.Rect);
})();
