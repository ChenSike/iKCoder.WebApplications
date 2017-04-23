(function() {
    'use strict';
    Konva.ConnectionPoint = function(config) {
        this.___init(config);
        this._direction = config.direction;
        this._componentsLayer = config.componentsLayer;
        this._inc = config.inc;
        this._remainingSteps = 0;
        this._turnings = config.turnings;

        var start = this._turnings.splice(0, 1)[0];
        this._tmpX = start[0];
        this._tmpY = start[1];

        this.points(start);

        this._end = this._turnings[this._turnings.length - 1];
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
            if (inc >= this._remainingSteps) {
                inc = this._remainingSteps;
            }

            if (direction === Konva.ConnectionPoint.UP) {
                this._tmpY -= inc;
                this.points(points.concat([this._tmpX, this._tmpY]));
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
            if (this._remainingSteps > 0 || this._turnings.length === 0) {
                return;
            }

            var nextTurning = this._turnings[0],
                nextX = nextTurning[0],
                nextY = nextTurning[1],
                diffX = nextX - this._tmpX,
                diffY = nextY - this._tmpY,
                prevDirection = this._direction;

            if (diffY === 0 && diffX === 0) {
                this._turnings.splice(0, 1);
                if (this._turnings) {
                    nextTurning = this._turnings[0];
                    nextX = nextTurning[0];
                    nextY = nextTurning[1];
                    diffX = nextX - this._tmpX;
                    diffY = nextY - this._tmpY;
                    prevDirection = this._direction;
                } else {
                    return;
                }
            }

            if (diffY === 0) {
                this._direction = diffX > 0 ?
                    Konva.ConnectionPoint.RIGHT : Konva.ConnectionPoint.LEFT;
                this._remainingSteps = Math.abs(diffX);
            }

            if (diffX === 0) {
                this._direction = diffY > 0 ?
                    Konva.ConnectionPoint.DOWN : Konva.ConnectionPoint.UP;
                this._remainingSteps = Math.abs(diffY);
            }
        },

        moveAction: function() {
            this.___calculateMove(this._componentsLayer);
            this.___doMove(this._direction, this._inc);
        },

        isDone: function() {
            return (Math.abs(this._tmpX - this._end[0]) <= 1) && (Math.abs(this._tmpY - this._end[1]) <= 1);
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
        },

        componentPosition() {
            if (arguments && arguments.length === 2) {
                this.row = arguments[0];
                this.column = arguments[1];
            }
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
