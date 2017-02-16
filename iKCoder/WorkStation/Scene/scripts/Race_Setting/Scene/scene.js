'use strict';

var startTime = null;
var KEY_LOCK = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false
};
var defaultResources = {
    car: [
        { 'name': 'car1', src: 'images/race/car1.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car2', src: 'images/race/car2.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car3', src: 'images/race/car3.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car4', src: 'images/race/car4.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car5', src: 'images/race/car5.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car6', src: 'images/race/car6.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car7', src: 'images/race/car7.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car8', src: 'images/race/car8.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } },
        { 'name': 'car9', src: 'images/race/car9.png', type: 'images', obj: null, type: 'car', speed: { min: 80, max: 180 } }
    ],
    block: [
        { 'name': 'block1', src: 'images/race/block1.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block2', src: 'images/race/block2.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block3', src: 'images/race/block3.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block4', src: 'images/race/block4.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block5', src: 'images/race/block5.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block6', src: 'images/race/block6.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block7', src: 'images/race/block7.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block8', src: 'images/race/block8.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } },
        { 'name': 'block9', src: 'images/race/block9.png', type: 'images', obj: null, type: 'block', speed: { min: 80, max: 80 } }
    ],
    player: [
        { 'name': 'car_p1', src: 'images/race/car_p1.png', type: 'images', obj: null, type: 'player' },
        { 'name': 'car_p2', src: 'images/race/car_p2.png', type: 'images', obj: null, type: 'player' },
        { 'name': 'car_p3', src: 'images/race/car_p3.png', type: 'images', obj: null, type: 'player' },
        { 'name': 'car_p4', src: 'images/race/car_p4.png', type: 'images', obj: null, type: 'player' },
        { 'name': 'car_p5', src: 'images/race/car_p5.png', type: 'images', obj: null, type: 'player' }
    ],
    saint: { 'name': 'saint', src: 'images/race/saint.png', type: 'images', obj: null },
    soldier: { 'name': 'soldier', src: 'images/race/soldier.png', type: 'images', obj: null },
    road: { 'name': 'road', src: 'images/race/road.png', type: 'images', obj: null }
};

var Util = {
    random: function (min, max) {
        return (~~(Math.random() * (max - min + 1)) + min);
    },

    randomColor: function () {
        var red = this.random(0, 255);
        var green = this.random(0, 255);
        var blue = this.random(0, 255);
        return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    },

    getScroll: function () {
        var scrollx, scrolly;
        if (typeof (window.pageXOffset) == 'number') {
            scrollx = window.pageXOffset;
            scrolly = window.pageYOffset;
        } else {
            scrollx = document.documentElement.scrollLeft;
            scrolly = document.documentElement.scrollTop;
        }
        return {
            left: scrollx,
            top: scrolly
        };
    },

    getPosInDoc: function (target) {
        if (!target) {
            return null;
        }
        var left = 0,
            top = 0;

        do {
            left += target.offsetLeft || 0;
            top += target.offsetTop || 0;
            target = target.offsetParent;
        } while (target);

        return {
            left: left,
            top: top
        };
    }
};

var ScreenObjPool = {
    objects: {},
    objectsIds: [],
    add: function (entityObj) {
        var objects = this.objects, objectsIds = this.objectsIds;
        if (!this.objects[entityObj.guid]) {
            this.objects[entityObj.guid] = entityObj;
            this.objectsIds.push(entityObj.guid);
        }
    },

    remove: function (entityObj) {
        var objects = this.objects, objectsIds = this.objectsIds;
        delete this.objects[entityObj.guid];
        for (var i = 0, len = objectsIds.length; i < len; i++) {
            if (this.objectsIds[i] === entityObj.guid) {
                this.objectsIds.splice(i, 1);
            }
        }
    },

    empty: function () {
        this.objects = {};
        this.objectsIds = [];
    },

    foreach: function (context) {
        var objects = this.objects, objectsIds = this.objectsIds;
        for (var i = 0, len = objectsIds.length; i < len; i++) {
            var o = objects[objectsIds[i]];
            o.draw(context);
            if (o.hitable) {
                Scene.checkHit(o);
            }
        }
    }
};

var Scene = {
    container: null,
    startTime: null,
    nowTime: null,
    diffTime: null,
    canvasId: 'game_canvas',
    canvas: 'game_canvas',
    context: null,
    runStatus: false,
    runable: true,
    INPUT: {
        KEY: {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ENTER: 13
        },

        KEY_LOCK: {
            UP: false,
            DOWN: false,
            LEFT: false,
            RIGHT: false
        }
    },
    screenObjPool: ScreenObjPool,
    config: {
        roadCount: 8,
        carCount: 8,
        playerCount: 1,
        canvasSize: { w: 500, h: 580 },
        speed: { n: 80, min: 80, max: 180 }
    },
    resource: { car: [], block: [], player: [], saint: null, soldier: null, road: null },
    laneCfg: [],
    playerCfg: { index: 0, change: 4, resource: [defaultResources.player[0]] },
    randomLane: false,
    SCORE: 0,
    eventsPool: {
        keydown: [],
        keyup: [],
        //click: [],
        keypress: [],
        //mousemove: [],
        //mouseover: [],
        //mouseout: [],
        collide: [],
        hit: []
    },

    init: function (containerId, runable) {
        //for (var attr in config) {
        //    this[attr] = config[attr];
        //}        
        //this.container = document.getElementById(containerId);
        //this.canvas = document.createElement("canvas");
        //this.canvas.id = this.canvasId;
        //this.container.appendChild(this.canvas);
        //this.canvas.style.backgroundColor = "#000000";
        //var height = this.container.clientHeight;
        //var width = this.container.clientWidth;
        //this.canvas.style.height = height + "px";
        //this.canvas.style.width = width + "px";
        this.container = $("#" + containerId);
        var height = this.container.height();
        var width = this.container.width();
        this.config.canvasSize.w = parseInt(width);
        this.config.canvasSize.h = parseInt(height);
        this.container.append($('<canvas id="' + this.canvasId + '" height="' + height + '" width="' + width + '">aaaaaaaa</canvas>'))
        this.canvas = document.getElementById(this.canvasId);
        this.canvas.style.backgroundColor = "#999";
        this.context = this.canvas.getContext('2d');
        //this.context.scale(0.78, 1.2);
        this.canvasPos = Util.getPosInDoc(this.canvas);
        SetGameConfig(this.config);
        this.runable = (runable === false ? false : true);
        this.loadResource();
        this.renderRoad();
        if (this.runable) {
            this.initEvent();
            this.pause(true);
        }
    },

    initEvent: function () {
        var self = this;
        var KEY = this.INPUT.KEY;
        var LOCK = this.INPUT.KEY_LOCK;
        document.onkeydown = function (e) {
            /*
            switch (e.which) {
                case KEY.UP:
                    if (!LOCK.UP) {
                    }
            }
            */

            for (var i = 0, len = Scene.eventsPool.keydown.length; i < len; i++) {
                var event = Scene.eventsPool.keydown[i];
                event.callback.call(event.target, e);
            }
        };

        document.onkeyup = function (e) {
            for (var i = 0, len = Scene.eventsPool.keyup.length; i < len; i++) {
                var event = Scene.eventsPool.keyup[i];
                event.callback.call(event.target, e);
            }
        };

        document.onkeypress = function (e) {
            if (e.which == KEY.ENTER) {
                for (var i = 0, len = Scene.eventsPool.keypress.length; i < len; i++) {
                    var event = Scene.eventsPool.keypress[i];
                    event.callback.call(event.target, e);
                }
            }
        };

        /*
        document.onclick = function (e) {
            var scroll = Util.getScroll();
            e.relX = e.clientX - self.canvasPos.left + scroll.left;
            e.relY = e.clientY - self.canvasPos.top + scroll.top;
            var mPos = new Vector(e.relX, e.relY);
            for (var i = 0, len = Scene.eventsPool.click.length; i < len; i++) {
                var event = Scene.eventsPool.click[i];
                if (event.target.checkContain(mPos)) {
                    event.callback.call(event.target, e);
                }
            }
        };
        */

        /*
        this.canvas.addEventListener('mousemove', function (e) {
            var scroll = Util.getScroll();
            e.relX = e.clientX - self.canvasPos.left + scroll.left;
            e.relY = e.clientY - self.canvasPos.top + scroll.top;
            var mPos = new Vector(e.relX, e.relY);

            for (var i = 0, len = Scene.eventsPool.mouseover.length; i < len; i++) {
                var event = Scene.eventsPool.mouseover[i];
                var status = event.target.checkContain(mPos);

                if (event.target.mouseStatus === undefined) {
                    event.target.mouseStatus = status;

                    status && event.callback.call(event.target, e);
                } else {
                    if (!event.target.mouseStatus) {
                        status && event.callback.call(event.target, e);
                        event.target.mouseStatus = status;
                    }
                }
            }

            for (var i = 0, len = Scene.eventsPool.mouseout.length; i < len; i++) {
                var event = Scene.eventsPool.mouseout[i];
                var status = event.target.checkContain(mPos);

                if (event.target.mouseStatus === undefined) {
                    event.target.mouseStatus = status;
                    if (!status) {
                        event.callback.call(event.target, e);
                    }

                } else {
                    if (event.target.mouseStatus) {
                        status || event.callback.call(event.target, e);
                        event.target.mouseStatus = status;
                    }
                }
            }

        }, false);
        */
    },

    loadResource: function () {
        this.resource = { car: [], block: [], player: [], saint: null, soldier: null, road: null };
        var totalCount = 0;
        for (var key in this.resource) {
            if (typeof defaultResources[key].splice == "function") {
                for (var i = 0; i < defaultResources[key].length; i++) {
                    this.resource[key].push(defaultResources[key][i]);
                    totalCount++;
                }
            } else {
                this.resource[key] = defaultResources[key];
                totalCount++;
            }
        }

        var LoadScreen = function (tCount) {
            this.loadedCount = 0;
            this.totalCount = tCount;
            EntityObject.call(this);
            var backgroundRect = new RectEntityObject(new Vector(197, 260), 106, 10, { border: { color: '#ccc', width: '2' } });
            var forgroundRect = new RectEntityObject(new Vector(200, 263), 0, 4, { fill: '#999' });
            var text = Scene.getTextEntityObject('LOADING...', { x: 211, y: 240 }, '#000', 12);
            this._draw = function (context) {
                backgroundRect.draw(context);
                forgroundRect.draw(context);
                text.draw(context);
            }

            this.setProgress = function () {
                this.loadedCount++;
                forgroundRect.width = 100 * this.loadedCount / this.totalCount;
                if (this.loadedCount == this.totalCount) {
                    Scene.screenObjPool.remove(this);
                    Scene.referesh();
                    //Scene.showWelcome();
                }
            }
        };
        var loadScreen = new LoadScreen(totalCount);
        this.screenObjPool.add(loadScreen);

        var loadIMG = function (item) {
            var img = new Image();
            img.dataName = item.name;
            img.src = item.src;
            img.onload = function () {
                loadScreen.setProgress();
            };
            item.obj = img;
        }

        try {
            for (var key in this.resource) {
                if (typeof this.resource[key].shift == "function") {
                    for (var i = 0; i < this.resource[key].length; i++) {
                        loadIMG(this.resource[key][i]);
                    }
                } else {
                    loadIMG(this.resource[key]);
                }
            }

            //this.screenObjPool.remove(loadScreen);
        }
        catch (ex) {
        }
    },

    renderRoad: function () {
        var road = new ImageEntityObject(this.resource.road.obj, new Vector(0, 0), Game.current.canvasSize.w, Game.current.canvasSize.h);
        this.screenObjPool.add(road);
        var tmpSpace = (Game.current.canvasSize.w - Game.current.space.l - Game.current.space.r) / Game.current.roadCount;
        for (var i = 0; i < Game.current.roadCount - 1; i++) {
            var tmpX = Game.current.space.l + Math.floor(tmpSpace * (i + 1) - Game.current.space.line / 2);
            var newVector = new Vector(tmpX, 0);
            var newRect = new RectEntityObject(newVector, Game.current.space.line, Game.current.canvasSize.h, { fill: '#FFFFFF' });
            this.screenObjPool.add(newRect);
        }
    },

    pause: function (forcePause) {
        if (this.runStatus || forcePause === true) {
            var pauseTxt = this.getTextEntityObject('Pause, Press Enter To Start.', { x: 80, y: 260 }, '#333', 24);
            this.screenObjPool.add(pauseTxt);
            var self = this;
            this.addEventListener(pauseTxt, 'keypress', function (e) {
                self.runStatus = true;
                self.screenObjPool.remove(pauseTxt);
                self.referesh();
                self.startGame();
            });
        }
    },

    referesh: function () {
        this.context.clearRect(0, 0, Game.current.canvasSize.w, Game.current.canvasSize.h);
        Scene.screenObjPool.foreach(this.context);
    },

    renderCar: function () {
        var objects = this.screenObjPool.objects, objectsIds = this.screenObjPool.objectsIds;
        for (var i = 0, len = objectsIds.length; i < len; i++) {
            var obj = objects[objectsIds[i]]
            if (obj.itemType && obj.itemType == 'CAR') {
                delete objects[objectsIds[i]];
                objectsIds.splice(i, 1);
            }
        }

        this.referesh();
        this.renderLane(Game.current.carCount);
        this.referesh();
    },
















    collisionPool: (function () {
        var objectsIds = [];
        var objects = {};
        return {
            add: function () { },
            remove: function (obj) {
                delete objects[obj.guid];
                for (var i = 0, len = objectsIds.length; i < len; i++) {
                    if (objectsIds[i] === obj.guid) {
                        this.objectsIds.splice(i, 1);
                    }
                }
            },
            foreach: function (callback) {
                for (var i = 0, len = objectsIds.length; i < len; i++) {
                    callback.call(objects[objectsIds[i]], index);
                }
            }
        };
    })(),

    emptyEventsPool: function () {
        this.eventsPool = {
            keydown: [],
            keyup: [],
            click: [],
            keypress: [],
            mousemove: [],
            mouseover: [],
            mouseout: [],
            collide: [],
            hit: []
        }
    },

    addEventListener: function (target, eventType, callback) {
        var event = {
            target: target,
            callback: callback,
            init: false
        };

        if (eventType == 'mouseover' || eventType == 'mouseout') {
            event.target.mouseover = false;
        }

        this.eventsPool[eventType].push(event);
    },

    checkHit: function (target) {
        for (var i = 0, len = Scene.eventsPool.hit.length; i < len; i++) {
            var event = Scene.eventsPool.hit[i];
            if (event.target.guid === target.guid) {
                continue;
            }

            if (event.target.checkHit(target)) {
                event.callback.call(event.target, { relatedTarget: target });
            }
        }
    },

    startRun: function () {
        this.startTime = new Date().getTime();
        var self = this;
        window.requestAnimationFrame(function () {
            self.renderFrame();
        });
    },

    stopRun: function () {
        this.runStatus = false;
    },

    renderFrame: function () {
        var self = this;
        this.nowTime = new Date().getTime();
        this.context.clearRect(0, 0, 500, 580);
        this.diffTime = this.nowTime - this.startTime;
        Scene.screenObjPool.foreach(this.context);
        this.startTime = this.nowTime;
        if (self.runStatus)
            window.requestAnimationFrame(function () {
                self.renderFrame();
            });
    },

    getTextEntityObject: function (text, position, color, size) {
        var vector = new Vector(position.x, position.y);
        var style = { fillStyle: color, font: 'bold ' + size + 'px Verdana', 'textBaseline': 'top' };
        var obj = new TextEntityObject(text, vector, style, 100, 35);
        return obj;
    },

    showWelcome: function () {
        var logo = this.getTextEntityObject('CAR RACE', { x: 80, y: 200 }, '#900', 64);
        var welcome = this.getTextEntityObject('Click To Start', { x: 187, y: 360 }, '#333', 24);
        var magic = new Magic(new Vector(140, 210), this.resource.saint.obj, Magic.ANIM_TYPE.VERTICAL, 56, new Vector(20, 0));
        var magic2 = new Magic(new Vector(140, 310), this.resource.soldier.obj, Magic.ANIM_TYPE.VERTICAL, 48, new Vector(20, 0));
        this.screenObjPool.add(logo);
        this.screenObjPool.add(welcome);
        this.screenObjPool.add(magic);
        this.screenObjPool.add(magic2);

        this.addEventListener(welcome, 'mouseover', function (e) {
            welcome.setStyle({ fillStyle: '#999' });
        });

        this.addEventListener(welcome, 'mouseout', function (e) {
            welcome.setStyle({ fillStyle: '#333' });
        });

        var self = this;
        this.addEventListener(welcome, 'click', function (e) {
            self.screenObjPool.remove(logo);
            self.screenObjPool.remove(welcome);
            self.screenObjPool.remove(magic);
            self.screenObjPool.remove(magic2);
            self.startGame();
        });
    },

    initPlayer: function () {
        this.playerCfg.resource = [defaultResources.player[0]];
    },

    initLane: function () {
        this.laneCfg = [];
        for (var i = 0; i < 9; i++) {
            var item = {
                index: i,
                resource: [defaultResources.car[i]]
            }

            this.laneCfg.push(item);
        }
    },

    renderLane: function (carCount) {
        var tmpSpace = (Game.current.canvasSize.w - Game.current.space.l - Game.current.space.r) / Game.current.roadCount;
        var tmpY = Game.current.canvasSize.h - Game.current.space.b - Game.current.itemSize.h - 50;//Util.random(-580, -80);
        for (var i = 0; i < carCount; i++) {
            var lanCfg = this.laneCfg[this.randomLane ? Util.random(0, carCount) : i];
            var tmpX = Game.current.space.l + tmpSpace * i + Game.current.space.cs;
            var newCar = new Car(new Vector(tmpX, tmpY), Util.randomColor(), null, false, lanCfg);
            newCar.hitable = true;
            this.screenObjPool.add(newCar);
        }
    },

    startGame: function () {
        this.SCORE = 0;
        this.screenObjPool.empty();
        this.renderLane();
        var leftC = new CollisionEntityObject(new Vector(0, 0), 25, 580);
        var rightC = new CollisionEntityObject(new Vector(475, 0), 25, 580);
        var topC = new CollisionEntityObject(new Vector(0, 0), 500, 20);
        var bottomC = new CollisionEntityObject(new Vector(0, 580), 500, 10);
        var cMap = new CollistionMap();
        cMap.add(leftC);
        cMap.add(rightC);
        cMap.add(topC);
        cMap.add(bottomC);

        var self = this;
        var player = new Car(new Vector(225, 490), Util.randomColor(), this.playerCfg.resource, { min: 0, max: 0 }, this.playerCfg);
        player.setCollisionMap(cMap);
        var speedChange = this.playerCfg.change * 50;
        this.addEventListener(player, 'keyup', function (e) {
            var KEY = self.INPUT.KEY;
            switch (e.which) {
                case KEY.UP:
                    if (KEY_LOCK.UP) {
                        this.speedVector.remove(new Vector(0, -1 * speedChange));
                        KEY_LOCK.UP = false;
                    }
                    break;
                case KEY.DOWN:
                    if (KEY_LOCK.DOWN) {
                        this.speedVector.remove(new Vector(0, speedChange));
                        KEY_LOCK.DOWN = false;
                    }
                    break;
                case KEY.LEFT:
                    if (KEY_LOCK.LEFT) {
                        this.speedVector.remove(new Vector(-1 * speedChange, 0));
                        KEY_LOCK.LEFT = false;
                    }
                    break;
                case KEY.RIGHT:
                    if (KEY_LOCK.RIGHT) {
                        this.speedVector.remove(new Vector(speedChange, 0));
                        KEY_LOCK.RIGHT = false;
                    }
                    break;
            }
        });

        this.addEventListener(player, 'keydown', function (e) {
            var KEY = self.INPUT.KEY;
            switch (e.which) {
                case KEY.UP:
                    if (!KEY_LOCK.UP) {
                        player.speedVector.add(new Vector(0, -1 * speedChange));
                        KEY_LOCK.UP = true;
                    }
                    break;
                case KEY.DOWN:
                    if (!KEY_LOCK.DOWN) {
                        player.speedVector.add(new Vector(0, speedChange));
                        KEY_LOCK.DOWN = true;
                    }
                    break;
                case KEY.LEFT:
                    if (!KEY_LOCK.LEFT) {
                        player.speedVector.add(new Vector(-1 * speedChange, 0));
                        KEY_LOCK.LEFT = true;
                    }
                    break;
                case KEY.RIGHT:
                    if (!KEY_LOCK.RIGHT) {
                        player.speedVector.add(new Vector(speedChange, 0));
                        KEY_LOCK.RIGHT = true;
                    }
                    break;
            }
        });

        this.addEventListener(player, 'hit', function (e) {
            self.screenObjPool.empty();
            self.emptyEventsPool();
            KEY_LOCK = {
                LEFT: false,
                RIGHT: false,
                UP: false,
                DOWN: false
            }
            self.endGame(score.score);
        });
        this.screenObjPool.add(player);

        var scorePre = this.getTextEntityObject('Score: ', { x: 50, y: 5 }, '#fff', 32);
        this.screenObjPool.add(scorePre);
        var score = new GameScore(0, new Vector(160, 5));
        this.screenObjPool.add(score);
    },

    endGame: function () {
        var end = this.getTextEntityObject('GAME OVER', { x: 50, y: 200 }, '#900', 64);
        var score = this.getTextEntityObject('Score ' + this.SCORE, { x: 170, y: 290 }, '#000', 32);
        var restart = this.getTextEntityObject('Click To Restart', { x: 147, y: 360 }, '#333', 24);
        var magic = new Magic(new Vector(0, 210), this.resource.saint.obj, Magic.ANIM_TYPE.VERTICAL, 56, new Vector(20, 0));
        var magic2 = new Magic(new Vector(0, 310), this.resource.soldier.obj, Magic.ANIM_TYPE.VERTICAL, 48, new Vector(20, 0));
        this.screenObjPool.add(end);
        this.screenObjPool.add(score);
        this.screenObjPool.add(restart);
        this.screenObjPool.add(magic);
        this.screenObjPool.add(magic2);

        this.addEventListener(restart, 'mouseover', function (e) {
            restart.setStyle({ fillStyle: '#999' });
        });

        this.addEventListener(restart, 'mouseout', function (e) {
            restart.setStyle({ fillStyle: '#333' });
        });

        var self = this;
        this.addEventListener(restart, 'click', function (e) {
            self.screenObjPool.remove(end);
            self.screenObjPool.remove(restart);
            self.screenObjPool.remove(score);
            self.screenObjPool.remove(magic);
            self.screenObjPool.remove(magic2);
            self.startGame();
        });
    },

    setConfig_Road: function (src) {
        this.resource.road = defaultResources.road;
        this.resource.road.src = src;
    },

    setConfig_Player: function (speedChange, imageSrc) {
        this.playerCfg.change = speedChange;
        var success = false;
        for (var i = 0; i < this.resource.player.length; i++) {
            if (imageSrc.indexOf(this.resource.player[i].src) >= 0) {
                this.playerCfg.resource = [this.resource.player[i]];
                success = true;
                break;
            }
        }

        if (!success) {
            this.playerCfg.resource = [this.resource.player[0]];
        }
    },

    setConfig_RoadCount: function (count) {
        this.config.roadCount = count;
    },

    setConfig_CarCount: function (count) {
        this.config.carCount = count;
        Game.current.carCount = count;
    },

    setRandomLane: function (randomFlag) {
        this.randomLane = randomFlag;
    },

    initConfig: function () {
        this.resource = {
            car: [],
            block: [],
            player: [],
            saint: defaultResources.saint,
            soldier: defaultResources.soldier,
            road: defaultResources.road
        };

        this.laneCfg = [];
        this.playerCfg = { index: 0, change: 4, resource: [defaultResources.player[0]] };
        this.randomLane = false;
    },

    //model, 0:fixed car 1: random car 2: random item 3: fixed car and random block
    //speed: {min:80, max: 180}
    setLaneConfig: function (index, config) {
        this.laneCfg[index - 1] = {};
        var cfg = this.laneCfg[index - 1];
        cfg.index = index - 1;
        cfg.resource = [];
        var found = false;
        for (var i = 0 ; i < config.length; i++) {
            found = false;
            for (var j = 0; j < this.resource.car.length; j++) {
                if (this.resource.car[j].src.indexOf(config[i].src) >= 0) {
                    this.resource.car[j].speed = config[i].speed;
                    cfg.resource.push(this.resource.car[j]);
                    found = true;
                    break;
                }
            }

            if (!found) {
                for (var j = 0; j < this.resource.block.length; j++) {
                    if (this.resource.block[j].src.indexOf(config[i].src) >= 0) {
                        this.resource.block[j].speed = config[i].speed;
                        cfg.resource.push(this.resource.block[j]);
                        break;
                    }
                }
            }
        }

        if (cfg.resource.length == 0) {
            cfg.resource.push(this.resource.car[index]);
        }

        //this.laneCfg.push(cfg);
    },

    loadCustomeCfg: function () {
        this.screenObjPool.empty();
        this.emptyEventsPool();
        KEY_LOCK = {
            LEFT: false,
            RIGHT: false,
            UP: false,
            DOWN: false
        }
        this.startRun();
        //this.showWelcome();
    }
};