'use strict';

var Game = {
    default: {
        roadCount: 8,
        carCount: 8,
        playerCount: 1,
        canvasSize: { w: 500, h: 580 },
        backgroundSize: { w: 500, h: 580 },
        itemSize: { w: 40, h: 85 },
        space: { l: 25, r: 25, t: 10, b: 10, line: 5, cs: 1 },
        min: { w: 150, h: null },
        speed: { n: 80, min: 80, max: 180 },
        playerCfg: { position: 4 }
    },
    scale: 1,
    current: {}
};

/*
{
    roadCount: 8,
    carCount: 8,
    playerCount: 1,
    canvasSize: { w: 500, h: 580 },
    speed: { n: 80, min: 80, max: 180 }
}
*/
function SetGameConfig(cfgObj) {
    Game.current = $.extend(true, {}, Game.default);
    var ws = cfgObj.canvasSize.w / Game.default.canvasSize.w;
    var hs = cfgObj.canvasSize.h / Game.default.canvasSize.h;
    Game.scale = ws;
    Game.current.canvasSize = { w: cfgObj.canvasSize.w, h: cfgObj.canvasSize.h };
    Game.current.backgroundSize = { w: cfgObj.canvasSize.w, h: Game.default.backgroundSize.h * hs };
    Game.current.itemSize = { w: Game.default.itemSize.w * Game.scale, h: Game.default.itemSize.h * Game.scale };
    Game.current.roadCount = cfgObj.roadCount;
    Game.current.carCount = cfgObj.carCount;
    Game.current.playerCount = cfgObj.playerCount;
    Game.current.speed.n = (cfgObj.speed.n ? cfgObj.speed.n : Game.default.speed.n);
    Game.current.speed.min = (cfgObj.speed.min ? cfgObj.speed.min : Game.default.speed.min);
    Game.current.speed.max = (cfgObj.speed.max ? cfgObj.speed.max : Game.default.speed.max);
    Game.current.space.l = Game.default.space.l * Game.scale;
    Game.current.space.r = Game.default.space.r * Game.scale;
    var tmpS = Game.current.backgroundSize.w - Game.current.space.l - Game.current.space.r - Game.current.space.line * (Game.current.roadCount - 1);
    tmpS = tmpS / Game.current.roadCount;
    Game.current.space.cs = Math.floor((tmpS - Game.current.itemSize.w) / 2);
}

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

var Rect = function (v, width, height) {
    this.position = v;
    this.width = width;
    this.height = height;

    this.checkHit = function (rect) {
        if (Math.abs((this.position.x + this.width / 2) - (rect.position.x + rect.width / 2)) < (this.width + rect.width) / 2 && Math.abs((this.position.y + this.height / 2) - (rect.position.y + rect.height / 2)) < (this.height + rect.height) / 2) {
            return true;
        }
        return false;
    };

    this.checkContain = function (v) {
        if (v.x > this.position.x && v.y > this.position.y && v.x < this.position.x + this.width && v.y < this.position.y + this.height) {
            return true;
        }
        return false;
    }
};

var EntityObject = function (type) {
    this.itemType = (type ? type : "");
    this.guid = EntityObject.guid++;
    this.clickable = false;
    this.hitable = false;
    this.collisionMap = null;
    this._events = {};
    this._draw = function (context) { };
    this._update = function () { };
    this.draw = function (context) {
        this._update();
        this._draw(context);
    };

    this.setCollisionMap = function (map) {
        this.collisionMap = map;
    };
};

EntityObject.guid = 1;

var TextEntityObject = function (content, v, styles, width, height) {
    this.content = content;
    !!width || (width = 0);
    !!height || (height = 0);

    EntityObject.call(this);
    Rect.call(this, v, width, height);

    this.setContent = function (content) {
        this.content = content;
    };

    this.setStyle = function (s) {
        for (var attr in s) {
            styles[attr] = s[attr];
        }
    };

    this._draw = function (context) {
        for (var attr in styles) {
            context[attr] = styles[attr];
        }

        context.fillText(this.content, v.x, v.y);
    }
}

var RectEntityObject = function (v, width, height, styles, type) {
    Rect.call(this, v, width, height);
    EntityObject.call(this, (type ? type : ""));

    this._draw = function (context) {
        if (!styles) {
            return false;
        }

        if (styles.border) {
            context.strokeStyle = styles.border.color
            context.lineWidth = styles.border.width;
            context.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }

        if (styles.fill) {
            context.fillStyle = styles.fill;
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
};

var ImageEntityObject = function (img, v, width, height) {
    EntityObject.call(this);
    Rect.call(this, v, width, height);

    this._draw = function (context) {
        context.drawImage(img, this.position.x, this.position.y);
    };
};

var CollisionEntityObject = function (pos, width, height) {
    RectEntityObject.call(this, pos, width, height, { border: { color: '#06c', width: 1 } });
};

var CollistionMap = function () {
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

    this.checkCollide = function (rect) {
        for (var i = 0, len = objectsIds.length; i < len; i++) {
            var co = objects[objectsIds[i]];
            if (co.checkHit(rect)) {
                return true;
            }
        }

        return false;
    };
};

var Car = function (v, style, resource, speed, laneCfg) {
    this.width = Game.current.itemSize.w;
    this.height = Game.current.itemSize.h;
    this.laneConfig = null;
    this.resource = resource;
    this.speed = speed ? speed : { min: Game.current.speed.min, max: Game.current.speed.max };
    if (laneCfg) {
        this.laneConfig = laneCfg;
        this.resource = laneCfg.resource;
    }

    this.speedVector = null;
    this.img = this.resource[0].obj;
    if (this.resource[0].type == "player") {
        this.speed = { min: 0, max: 0 };
    } else {
        this.speed = this.resource[0].speed ? this.resource[0].speed : { min: Game.current.speed.min, max: Game.current.speed.max };
    }

    //this.width = this.img.width;
    //this.height = this.img.height;
    this.speedVector = new Vector(0, Math.ceil(Util.random(this.speed.min, this.speed.max)));
    RectEntityObject.call(this, v, this.width, this.height, {}, 'CAR');

    this._update = function () {
        var oldPos = this.position.clone();
        var diffY = Scene.diffTime * this.speedVector.y / 1000;
        var diffX = Scene.diffTime * this.speedVector.x / 1000;
        this.position.x += diffX;
        this.position.y += diffY;

        if (this.collisionMap) {
            if (this.collisionMap.checkCollide(this)) {
                this.position = oldPos;
            }
        }
        if (this.position.y > Game.current.canvasSize.h) {
            this.position.y = Util.random(-Game.current.canvasSize.h, 0);
            this.speedVector = new Vector(0, Math.ceil(Util.random(this.speed.min, this.speed.max)));
            if (this.laneConfig) {
                if (this.resource.length > 1) {
                    var currentRes = this.resource[Math.ceil(Util.random(0, this.resource.length - 1))];
                    this.img = currentRes.obj;
                    if (currentRes.type == "block") {
                        this.speed = { min: Game.current.speed.min, max: Game.current.speed.min };
                    } else {
                        this.speed = currentRes.speed ? currentRes.speed : { min: Game.current.speed.min, max: Game.current.speed.max };
                    }
                }
            }
        }
    };

    this._draw = function (context) {
        //if (this.position.y < 280) {
        //context.drawImage(this.img, this.position.x - 3, this.position.y - 3);
        //context.drawImage(this.img, this.position.x - 3, this.position.y - 3, this.img.width * 0.78, this.img.height * 0.78);
        context.drawImage(this.img, this.position.x + Game.current.space.cs, this.position.y, this.width, this.height);
        // if (this.index) {
        //    context["fillStyle"] ="#900";
        //    context["font"] ="bold 16px Verdana";
        //    context["textBaseline"] ="top";
        //    context.fillText(this.index, this.position.x - 3 + 15, this.position.y - 3 + 8);
        //}
        //}
    };

};

var Magic = function (v, img, animType, split, speed) {
    this.img = img;
    this.animType = animType;
    if (animType === Magic.ANIM_TYPE.VERTICAL) {
        this.width = img.width;
        this.height = split;
        this.frames = ~~(img.height / split);
    } else if (animType === Magic.ANIM_TYPE.HORIZONTAL) {
        this.width = split;
        this.height = img.height;
        this.frames = ~~(img.width / split);
    }

    !!speed ? (this.speed = speed) : (this.speed = new Vector(0, 0));

    this.currFrame = 0;

    RectEntityObject.call(this, v, this.width, this.height, {});

    this._update = function () {
        this.currFrame += (Scene.nowTime - Scene.startTime) * 10 / 1000;
        this.currFrame %= this.frames;

        this.position.x += (Scene.nowTime - Scene.startTime) * this.speed.x / 1000;
        if (this.position.x > Game.current.canvasSize.w) {
            this.position.x = 0;
        }
    };

    this._draw = function (context) {
        var f = ~~this.currFrame;
        if (img) {
            if (this.animType === Magic.ANIM_TYPE.VERTICAL) {
                context.drawImage(img, 0, f * this.height, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
            } else if (this.animType === Magic.ANIM_TYPE.HORIZONTAL) {
                context.drawImage(img, f * this.width, 0, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
            }
        }
    }
};

Magic.ANIM_TYPE = {
    VERTICAL: 1,
    HORIZONTAL: 2
}

var GameScore = function (s, p) {
    EntityObject.call(this);
    this.score = s;
    var text = new TextEntityObject(s, p, { fillStyle: '#fff', font: 'bold 32px Verdana', 'textBaseline': 'top' }, 100, 35);

    this._update = function () {
        this.score += (Scene.nowTime - Scene.startTime) * 10 / 1000;
        Scene.SCORE = ~~this.score;
        text.setContent(~~this.score);
    }

    this._draw = function (context) {
        text.draw(context);
    }
};