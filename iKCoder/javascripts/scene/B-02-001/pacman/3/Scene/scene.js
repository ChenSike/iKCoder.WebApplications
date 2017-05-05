Scene = {};
Scene.Game = null;
var useDefaultMap =true;

var _defaultDATA = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var _defaultNPC = [
    { c: '#F00', x: 12, y: 14 },
    { c: '#F93', x: 13, y: 14 },
    { c: '#0CF', x: 14, y: 14 },
    { c: '#F9C', x: 15, y: 14 }
];

var _defaultGoods = { '1,3': 1, '26,3': 1, '1,23': 1, '26,23': 1 };

Scene._DATA = _defaultDATA;
Scene._ROWCOL = { row: _defaultDATA.length, col: _defaultDATA[0].length };
Scene._Goods = {};
Scene._IsWallS = {x:5, y: 9};
Scene._IsWall = {x:3 ,y: 11};
Scene._COS = [1, 0, -1, 0];
Scene._SIN = [0, 1, 0, -1];
Scene._NPC = [];
Scene._LIFE = 3;
Scene._SCORE = 0;
Scene._PLAYER = { c: '#FEFE27', x: 6, y: 12 };
Scene._PLAYERSPEED = 2;
Scene._NPCSPEED = 0.5;
Scene._MODEL = '1'; //0:static; 1: dynamic
Scene._MOVEPATHS = [];
Scene._UNKNOWN = new Image();
Scene.ORANGEIMG = new Image();
Scene.NPC = new Image();
//Scene.APPLEIMG.src = "data:image/svg+xml;base64," + window.btoa(svg_xml);
Scene.ORANGEIMG.src = "images/scene/PACOrange.svg";
Scene._UNKNOWN.src = "images/scene/Question.svg";
Scene.NPC.src = "images/scene/NPC.svg";
Scene.initValue = '';
Scene.initValue2 = '';
Scene.timer = '1';
Scene.startTick = 0;
Scene._CALCMOVEPATH = [];

Scene.init = function (containerId, model, configs) {
    Scene._MODEL = model;
    Scene._LIFE = configs.lifeCount || Scene._LIFE;
    Scene._PLAYERSPEED = configs.playerSpeed || Scene._PLAYERSPEED;
    Scene._NPCSPEED = configs.NPCSpeed || Scene._NPCSPEED;
   // Scene._ROWCOL = configs.RowCol || Scene._ROWCOL;
	 if(!useDefaultMap){//update by Simon, when useDefaultMap=false, create map by configs that pass from blocklyCommon.js ->Scene.init('game_container', '0', { RowCol: { row: 7, col: 7 } });
	Scene._ROWCOL=configs.RowCol;
	}

    this.container = document.getElementById(containerId);
    this.canvas;
    if (this.container != null) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "game_canvas";
        this.container.appendChild(this.canvas);
        var height = this.container.clientHeight;
        var width = this.container.clientWidth;
        var newSize = Scene.adjustSize(width, height);
        this.canvas.style.backgroundColor = "#000000";
        this.canvas.style.height = newSize.h + "px";
        this.canvas.style.width = newSize.w + "px";
        var settings = {
            width: newSize.w,
            height: newSize.h,
            model: Scene._MODEL,
            rowCount: Scene._ROWCOL.row,
            colCount: Scene._ROWCOL.col
        };

        Scene.InitGame(this.canvas.id, settings);
    }
};

Scene.InitGame = function (currentId, settings, model) {
    //Scene.randomPlayerPos();
	Scene._PLAYER = { c: Scene._PLAYER.c, x: 1, y: 3};
    var targetPos = Scene.randomGoodsPos();
    Scene.initData(targetPos);
    Scene.Game = new Game(currentId, settings, model);
    Scene.CreateMainStage();
    Scene.CreateOverStage();
    Scene.Game.init();
	Scene.initValue = Scene.setWallsValue();
	Scene.initValue2 = Scene.setWallsValue2();
    Scene.removeBeansUnderPlayer();
	
	 var tmpFn = function (stage, item) {
	if (item.type == '1') {
		if (targetPos.x == Scene._Player.coord.x && targetPos.y == Scene._Player.coord.y) {
			Scene.stepComplete();
		}else {
			Scene.stepFaild();
		}
	}
}

Game.completeCheckFn = tmpFn;
	
};

Scene.adjustSize = function (width, height) {
    var maxRate = Math.max(400 / width, 480 / height);
    width = 400 / maxRate;
    height = 480 / maxRate;
    return { w: width, h: height };
};

Scene.CreateMainStage = function () {
    var game = Scene.Game;
    var stage, map, goods, beans, player, times, iswall;
    stage = game.createStage({
        update: function () {
            var stage = this;
            var items = stage.getItemsByType(2);
            if (stage.status == 1) {
                items.forEach(function (item) {
                    var dx = item.x - player.x;
                    var dy = item.y - player.y;
                    if (dx * dx + dy * dy < 750 && item.status != 4) {
                        if (item.status == 3) {
                            item.status = 4;
                            _SCORE += 10;
                        } else {
                            stage.status = 3;
                            stage.timeout = 30;
                        }
                    }
                });
                if (JSON.stringify(beans.data).indexOf(0) < 0) {
                    game.nextStage();
                }
            } else if (stage.status == 3) {
                if (!stage.timeout) {
                    Scene._LIFE--;
                    if (Scene._LIFE) {
                        stage.resetItems();
                    } else {
                        game.nextStage();
                        return false;
                    }
                }
            }
        }
    });
    //map
    var tmpX = 3;
    var tempY = 3;
    map = stage.createMap({
        x: tmpX,
        y: tempY,
        data: Scene._DATA,
        cache: true,
        draw: function (context) {
            for (var j = 0; j < this.y_length; j++) {
                for (var i = 0; i < this.x_length; i++) {
                    var value = this.get(i, j);
                    if (value) {
                        var code = 0;
                        if (this.get(i, j - 1) && !(this.get(i - 1, j - 1) && this.get(i + 1, j - 1) && this.get(i - 1, j) && this.get(i + 1, j))) {
                            if (j) {
                                code += 1000;
                            }
                        }
                        if (this.get(i + 1, j) && !(this.get(i + 1, j - 1) && this.get(i + 1, j + 1) && this.get(i, j - 1) && this.get(i, j + 1))) {
                            if (i < this.x_length - 1) {
                                code += 100;
                            }
                        }
                        if (this.get(i, j + 1) && !(this.get(i - 1, j + 1) && this.get(i + 1, j + 1) && this.get(i - 1, j) && this.get(i + 1, j))) {
                            if (j < this.y_length - 1) {
                                code += 10;
                            }
                        }
                        if (this.get(i - 1, j) && !(this.get(i - 1, j - 1) && this.get(i - 1, j + 1) && this.get(i, j - 1) && this.get(i, j + 1))) {
                            if (i) {
                                code += 1;
                            }
                        }
                        if (code) {
                            context.lineWidth = 2;
                            context.strokeStyle = value == 2 ? "#FFF" : "#0834DC";
                            var pos = this.coord2position(i, j);
                            switch (code) {
                                case 1100:
                                    context.beginPath();
                                    context.arc(pos.x + this.size / 2, pos.y - this.size / 2, this.size / 2, .5 * Math.PI, 1 * Math.PI, false);
                                    context.stroke();
                                    context.closePath();
                                    break;
                                case 110:
                                    context.beginPath();
                                    context.arc(pos.x + this.size / 2, pos.y + this.size / 2, this.size / 2, Math.PI, 1.5 * Math.PI, false);
                                    context.stroke();
                                    context.closePath();
                                    break;
                                case 11:
                                    context.beginPath();
                                    context.arc(pos.x - this.size / 2, pos.y + this.size / 2, this.size / 2, 1.5 * Math.PI, 2 * Math.PI, false);
                                    context.stroke();
                                    context.closePath();
                                    break;
                                case 1001:
                                    context.beginPath();
                                    context.arc(pos.x - this.size / 2, pos.y - this.size / 2, this.size / 2, 0, .5 * Math.PI, false);
                                    context.stroke();
                                    context.closePath();
                                    break;
                                default:
                                    var arr = String.prototype.split.call(code, '');
                                    if (+arr.pop()) {
                                        context.beginPath();
                                        context.moveTo(pos.x, pos.y);
                                        context.lineTo(pos.x - this.size / 2, pos.y);
                                        context.stroke();
                                        context.closePath();
                                    }
                                    if (+arr.pop()) {
                                        context.beginPath();
                                        context.moveTo(pos.x, pos.y);
                                        context.lineTo(pos.x, pos.y + this.size / 2);
                                        context.stroke();
                                        context.closePath();
                                    }
                                    if (+arr.pop()) {
                                        context.beginPath();
                                        context.moveTo(pos.x, pos.y);
                                        context.lineTo(pos.x + this.size / 2, pos.y);
                                        context.stroke();
                                        context.closePath();
                                    }
                                    if (+arr.pop()) {
                                        context.beginPath();
                                        context.moveTo(pos.x, pos.y);
                                        context.lineTo(pos.x, pos.y - this.size / 2);
                                        context.stroke();
                                        context.closePath();
                                    }
                            }
                        } else {
                            context.lineWidth = 2;
                            context.strokeStyle = value == 2 ? "#FFF" : "#0834DC";
                            var pos = this.coord2position(i, j);
                            context.beginPath();
                            context.arc(pos.x, pos.y, this.size / 2, 0, 2 * Math.PI, false);
                            context.stroke();
                            context.closePath();
                        }
                    }
                }
            }
        }
    });
    //Goods
    goods = Scene._Goods
    beans = stage.createMap({
        x: tmpX,
        y: tempY,
        data: Scene._DATA,
        frames: 8,
        draw: function (context) {
            for (var j = 0; j < this.y_length; j++) {
                for (var i = 0; i < this.x_length; i++) {
                    if (!this.get(i, j)) {
                        var pos = this.coord2position(i, j);
                        context.fillStyle = "#F5F5DC";
                        if (Scene._Goods[i + ',' + j]) {
                            context.fillStyle = "rgb(233,139,58)";//"#FFFF00";
                            context.beginPath();
                            context.arc(pos.x, pos.y, game.stepUnit / 4 + this.times % 4, 0, 2 * Math.PI, true);
                            context.fill();
                            context.closePath();
						} else if ((Scene._IsWall.x == i && Scene._IsWall.y == j) ||(Scene._IsWallS.x == i && Scene._IsWallS.y == j)){
							if (Scene.startTick == 0) {
								
							}else {
								context.drawImage(Scene.ORANGEIMG, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
							}
						}else{
                            context.drawImage(Scene.ORANGEIMG, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
                        }
                    }
                }
            }
        }
    });
	
	//unknown--wall or not
	iswall = stage.createMap({
        x: tmpX,
        y: tempY,
        data: Scene._DATA,
        frames: 8,
        draw: function (context) {
			//Scene.initValue = Scene.setWallsValue();
            for (var j = 0; j < this.y_length; j++) {
                for (var i = 0; i < this.x_length; i++) {
                        var pos = this.coord2position(i, j);
                        context.fillStyle = "#F5F5DC";
                        if (Scene._IsWall.x == i && Scene._IsWall.y == j){
							if (Scene.startTick == 1){
								if (Scene.initValue == 1) {
									context.drawImage(Scene.NPC, 0, 0, 20, 20, pos.x - game.stepUnit / 3, pos.y - game.stepUnit / 3, game.stepUnit , game.stepUnit );
								}else if (Scene.initValue == 0) {
									context.drawImage(Scene.ORANGEIMG, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
									Scene.startTick++;
								}
								
							}else if (Scene.startTick == 0){
								context.drawImage(Scene._UNKNOWN, 0, 0, 15, 15, pos.x - game.stepUnit / 3, pos.y - game.stepUnit / 3, game.stepUnit , game.stepUnit );
							}
								
							}else if (Scene._IsWallS.x == i && Scene._IsWallS.y == j) {
								if (Scene.startTick == 2){
									if (Scene.initValue == 1) {
									context.drawImage(Scene.NPC, 0, 0, 20, 20, pos.x - game.stepUnit / 3, pos.y - game.stepUnit / 3, game.stepUnit , game.stepUnit );
								}else if (Scene.initValue == 0) {
									context.drawImage(Scene.ORANGEIMG, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
									Scene.startTick++;
								}
								
								}else if (Scene.startTick == 0){
								context.drawImage(Scene._UNKNOWN, 0, 0, 15, 15, pos.x - game.stepUnit / 3, pos.y - game.stepUnit / 3, game.stepUnit  , game.stepUnit );
							}
							}
                        }
                }
            }
    });

    //Score Board
    stage.createItem({
        x: 20,
        y: 450,
        draw: function (context) {
            context.font = 'bold 20px 微软雅黑';
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillStyle = '#FFFFFF';
            context.fillText('SCORE', this.x, this.y);
            context.font = '20px 微软雅黑';
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillStyle = '#FEFE27';
            context.fillText(Scene._SCORE, this.x + 80, this.y);
        }
    });
    //Status Board
    if (Scene._MODEL != 0) {
        stage.createItem({
            x: 160,
            y: 450,
            frames: 25,
            draw: function (context) {
                if (stage.status == 2 && this.times % 2) {
                    context.font = '20px 微软雅黑';
                    context.textAlign = 'left';
                    context.textBaseline = 'center';
                    context.fillStyle = '#FEFE27';
                    context.fillText('PAUSE', this.x, this.y);
                }
            }
        });
    }
	
    //NPC
    var npcItems = [];
    for (var i = 0; i < Scene._NPC.length; i++) {
        npcItems.push(Scene.CreateNPC(stage, Scene._NPC[i]));
    }
    //pac man
    player = stage.createItem({
        id: "pacman_player",
        width: game.stepUnit,
        height: game.stepUnit,
        type: 1,
        location: map,
        coord: { x: Scene._PLAYER.x, y: Scene._PLAYER.y },
        orientation: 0,
        speed: Scene._PLAYERSPEED,
        frames: 10,
        update: function (force) {
            //Scene.Game._movePaths
            var coord = this.coord;
            if (!coord.offset) {
                if (typeof this.control.orientation != 'undefined') {
                    //if (!map.get(coord.x + Scene._COS[this.control.orientation], coord.y + Scene._SIN[this.control.orientation])) {
                        this.orientation = this.control.orientation;
                    //}
                }
                this.control = {};
                var value = map.get(coord.x + Scene._COS[this.orientation], coord.y + Scene._SIN[this.orientation]);
                if (value == 0) {
                    this.x += this.speed * Scene._COS[this.orientation];
                    this.y += this.speed * Scene._SIN[this.orientation];
                } else if (value < 0) {
                    this.x -= map.size * (map.x_length - 1) * Scene._COS[this.orientation];
                    this.y -= map.size * (map.y_length - 1) * Scene._SIN[this.orientation];
                }

                if (force) {
                    var tmpPos = map.coord2position(this.coord.x, this.coord.y);
                    this.x = tmpPos.x;
                    this.y = tmpPos.y;
                }
            } else {
                if (!beans.get(this.coord.x, this.coord.y)) {
                    Scene._SCORE++;
                    beans.set(this.coord.x, this.coord.y, 1);
                    var items = stage.getItemsByType(2);
                    if (Scene._Goods[this.coord.x + ',' + this.coord.y]) {
                        items.forEach(function (item) {
                            if (item.status == 1 || item.status == 3) {
                                item.timeout = 450;
                                item.status = 3;
                            }
                        });
                    }
                }
                this.x += this.speed * Scene._COS[this.orientation];
                this.y += this.speed * Scene._SIN[this.orientation];
            }
			
        },
        draw: function (context) {
            context.fillStyle = Scene._PLAYER.c;
            context.beginPath();
            if (stage.status != 3) {
                if (this.times % 2) {
                    context.arc(this.x, this.y, this.width / 2, (.5 * this.orientation + .20) * Math.PI, (.5 * this.orientation - .20) * Math.PI, false);
                } else {
                    context.arc(this.x, this.y, this.width / 2, (.5 * this.orientation + .01) * Math.PI, (.5 * this.orientation - .01) * Math.PI, false);
                }
            } else {
                if (stage.timeout) {
                    context.arc(this.x, this.y, this.width / 2, (.5 * this.orientation + 1 - .02 * stage.timeout) * Math.PI, (.5 * this.orientation - 1 + .02 * stage.timeout) * Math.PI, false);
                }
            }
            context.lineTo(this.x, this.y);
            context.closePath();
            context.fill();
        }
    });

    Scene._Player = player;

    if (Scene._MODEL != 0) {
        stage.bind('keydown', function (e) {
            switch (e.keyCode) {
                case 13:
                case 32:
                    this.status = this.status == 2 ? 1 : 2;
                    break;
                case 39:
                    player.control = { orientation: 0 };
                    break;
                case 40:
                    player.control = { orientation: 1 };
                    break;
                case 37:
                    player.control = { orientation: 2 };
                    break;
                case 38:
                    player.control = { orientation: 3 };
                    break;
            }
        });
    }
};

Scene.CreateNPC = function (stage, npcCfg) {
    var map = stage.maps[0];
    var player = stage.getItemsByType(1)[0];
    return stage.createItem({
        width: 21,
        height: 21,
        orientation: 3,
        color: npcCfg.c,
        location: map,
        coord: { x: npcCfg.x, y: npcCfg.y },
        vector: { x: npcCfg.x, y: npcCfg.y },
        type: 2,
        frames: 10,
        speed: Scene._NPCSPEED,
        timeout: Math.floor(Math.random() * 120),
        update: function () {
            var items = stage.getItemsByType(2);
			var player = stage.getItemsByType(1)[0];
            var new_map;
            if (this.status == 3 && !this.timeout) {
                this.status = 1;
            }
            if (!this.coord.offset) {
                if (this.status == 1) {
                    if (!this.timeout) {
                        new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g, 0));
                        var index = this.index;
                        items.forEach(function (item) {
                            if (item.index != index && item.status == 1) {
                                new_map[item.coord.y][item.coord.x] = 1;
                            }
                        });
                        this.path = map.finder({
                            map: new_map,
                            start: this.coord,
                            end: player.coord
                        });
                        if (this.path.length) {
                            this.vector = this.path[0];
                        }
                    }
                } else if (this.status == 3) {
                    new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g, 0));
                    var index = this.index;
                    items.forEach(function (item) {
                        if (item.index != index) {
                            new_map[item.coord.y][item.coord.x] = 1;
                        }
                    });
                    this.path = map.finder({
                        map: new_map,
                        start: player.coord,
                        end: this.coord,
                        type: 'next'
                    });
                    if (this.path.length) {
                        this.vector = this.path[Math.floor(Math.random() * this.path.length)];
                    }
                } else if (this.status == 4) {
                    new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g, 0));
                    this.path = map.finder({
                        map: new_map,
                        start: this.coord,
                        end: this._params.coord
                    });
                    if (this.path.length) {
                        this.vector = this.path[0];
                    } else {
                        this.status = 1;
                    }
                }

                if (this.vector.change) {
                    this.coord.x = this.vector.x;
                    this.coord.y = this.vector.y;
                    var pos = map.coord2position(this.coord.x, this.coord.y);
                    this.x = pos.x;
                    this.y = pos.y;
                }

                if (this.vector.x > this.coord.x) {
                    this.orientation = 0;
                } else if (this.vector.x < this.coord.x) {
                    this.orientation = 2;
                } else if (this.vector.y > this.coord.y) {
                    this.orientation = 1;
                } else if (this.vector.y < this.coord.y) {
                    this.orientation = 3;
                }
            }
            this.x += this.speed * Scene._COS[this.orientation];
            this.y += this.speed * Scene._SIN[this.orientation];
        },
        draw: function (context) {
            var isSick = false;
            if (this.status == 3) {
                isSick = this.timeout > 80 || this.times % 2 ? true : false;
            }
            if (this.status != 4) {
                context.fillStyle = isSick ? '#BABABA' : this.color;
                context.beginPath();
                context.arc(this.x, this.y, this.width * .5, 0, Math.PI, true);
                switch (this.times % 2) {
                    case 0:
                        context.lineTo(this.x - this.width * .5, this.y + this.height * .4);
                        context.quadraticCurveTo(this.x - this.width * .4, this.y + this.height * .5, this.x - this.width * .2, this.y + this.height * .3);
                        context.quadraticCurveTo(this.x, this.y + this.height * .5, this.x + this.width * .2, this.y + this.height * .3);
                        context.quadraticCurveTo(this.x + this.width * .4, this.y + this.height * .5, this.x + this.width * .5, this.y + this.height * .4);
                        break;
                    case 1:
                        context.lineTo(this.x - this.width * .5, this.y + this.height * .3);
                        context.quadraticCurveTo(this.x - this.width * .25, this.y + this.height * .5, this.x, this.y + this.height * .3);
                        context.quadraticCurveTo(this.x + this.width * .25, this.y + this.height * .5, this.x + this.width * .5, this.y + this.height * .3);
                        break;
                }
                context.fill();
                context.closePath();
            }
            context.fillStyle = '#FFF';
            if (isSick) {
                context.beginPath();
                context.arc(this.x - this.width * .15, this.y - this.height * .21, this.width * .08, 0, 2 * Math.PI, false);
                context.arc(this.x + this.width * .15, this.y - this.height * .21, this.width * .08, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
            } else {
                context.beginPath();
                context.arc(this.x - this.width * .15, this.y - this.height * .21, this.width * .12, 0, 2 * Math.PI, false);
                context.arc(this.x + this.width * .15, this.y - this.height * .21, this.width * .12, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
                context.fillStyle = '#000';
                context.beginPath();
                context.arc(this.x - this.width * (.15 - .04 * Scene._COS[this.orientation]), this.y - this.height * (.21 - .04 * Scene._SIN[this.orientation]), this.width * .07, 0, 2 * Math.PI, false);
                context.arc(this.x + this.width * (.15 + .04 * Scene._COS[this.orientation]), this.y - this.height * (.21 - .04 * Scene._SIN[this.orientation]), this.width * .07, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
            }
        }
    });
}

Scene.CreateOverStage = function () {
    var game = Scene.Game;
    var stage = game.createStage();
    stage.createItem({
        x: game.width / 2,
        y: game.height * .35,
        draw: function (context) {
            context.fillStyle = '#FFF';
            context.font = 'bold 18px 微软雅黑';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('GAME OVER', this.x, this.y);
        }
    });
    Scene._SCORE = 0;
    Scene._LIFE = 4;
    Scene.Game.setStage(0).reset();

    stage.bind('keydown', function (e) {
        switch (e.keyCode) {
            case 13:
            case 32:
                _SCORE = 0;
                _LIFE = 4;
                var st = game.setStage(1);
                st.reset();
                break;
        }
    });
};

Scene.startGame = function () {
	Scene.startTick = '1';
	var code = Blockly.JavaScript.workspaceToCode(WorkScene.workspace);
	Scene.checkBlockly(code);
//	Scene.initDrawImage();
    Scene.UpdateConfig();
    if (Scene.Game.start() === true) {
        Scene._SCORE = 0;
    }
};

Scene.restart = function () {
    Scene.Game.restart();
};

Scene.pause = function () {
    Scene.Game.pause();
};

Scene.checkPointUsedByPlayer = function (x, y) {
    if (Scene._PLAYER.x == x && Scene._PLAYER.y == y) {
        return true;
    }

    return false;
};

Scene.checkPointUsedByNPC = function (x, y) {
    for (var i = 0 ; i < Scene._NPC.length; i++) {
        if (Scene._NPC[i].x == x && Scene._NPC[i].y == y) {
            return true;
        }
    }

    return false;
};

Scene.checkPointUsedByWall = function (x, y) {
    if (Scene._DATA[y][x] == 1) {
        return true;
    }

    return false;
};

Scene.checkPointAvailable = function (type, x, y) {
    var pointFlag = true;
    if (type == "W") {
        if (Scene.checkPointUsedByPlayer(x, y) || Scene.checkPointUsedByNPC(x, y)) {
            pointFlag = false;
        }
    } else if (type == "P") {
        if (Scene.checkPointUsedByWall(x, y) || Scene.checkPointUsedByNPC(x, y)) {
            pointFlag = false;
        }
    } else if (type == "N") {
        if (Scene.checkPointUsedByWall(x, y) || Scene.checkPointUsedByPlayer(x, y)) {
            pointFlag = false;
        }
    } else if (type == "G") {
        if (Scene.checkPointUsedByWall(x, y)) {
            pointFlag = false;
        } else if (Scene.checkPointUsedByPlayer(x, y)) {
            pointFlag = false;
        }
    }

    return pointFlag;
};

Scene.initWall = function () {
    Scene._DATA = _defaultDATA;
    var stage = Scene.Game.getCurentStage();
    var map = stage.maps[0];
    var beans = stage.maps[1];
    for (var i = 1; i < 29; i++) {
        for (var j = 1; j < 27; j++) {
            map.set(j, i, 0);
            beans.set(j, i, 0);
        }
    }
};

Scene.setWall = function (xs, xe, ys, ye) {
    var tmpValue = 1;
    var stage = Scene.Game.getCurentStage();
    var map = stage.maps[0];
    var beans = stage.maps[1];
    if (xs > 0 && xe > 1 && ys > 0 && ye > 1) {
        if (xs < 25 && xe < 26 && ys < 27 && ye < 28) {
            for (i = ys; i <= ye; i++) {
                for (j = xs; j <= xe; j++) {
                    if (Scene.checkPointAvailable('W', j, i)) {
                        tmpValue = 1;
                    } else {
                        tmpValue = 0;
                    }

                    map.set(j, i, tmpValue);
                    beans.set(j, i, tmpValue);
                }
            }
        }
    }

    map.cache = false;
    var context = document.getElementById('game_canvas').getContext('2d');
    map.draw(context);
};

Scene.redrawWall = function (x, y) {
    var stage = Scene.Game.getCurentStage();
    var map = stage.maps[0];
    map.cache = false;
    var context = document.getElementById('game_canvas').getContext('2d');
    map.draw(context);
};

Scene.initGoods = function (x, y) {
    Scene._Goods = {};
};

Scene.setGoods = function (x, y) {
    if (Scene.checkPointAvailable('G', x, y)) {
        Scene._Goods[y + "," + x] = 1;
        var stage = Scene.Game.getCurentStage();
        stage.maps[1].draw(document.getElementById('game_canvas').getContext('2d'));
    }
};

Scene.initNPC = function (x, y) {
    Scene._NPC = [];
    var stage = Scene.Game.getCurentStage();
    for (var i = stage.items.length - 1; i >= 0 ; i--) {
        if (stage.items[i].type == 2) {
            stage.items[i].update = {};
            stage.items[i].draw = {};
            stage.items.splice(i, 1);
        }
    }
};

Scene.setNPC = function (color, x, y) {
    if (x > 0 && y > 0 && x < 27 && y < 30) {
        if (Scene.checkPointAvailable('N', x, y)) {
            for (var i = 0 ; i < Scene._NPC.length; i++) {
                if (Scene._NPC[i].c == color) {
                    return;
                }
            }

            var npcCfg = { c: color, x: x, y: y };
            Scene._NPC.push(npcCfg);
            var stage = Scene.Game.getCurentStage();
            var newNPC = Scene.CreateNPC(stage, npcCfg);
            stage.items.push(newNPC);
            newNPC.update(true);
            newNPC.draw(document.getElementById('game_canvas').getContext('2d'));
        }
    }
};

Scene.setPlayer = function (color, x, y) {
    if (x > 0 && y > 0 && x < 27 && y < 30) {
        if (Scene.checkPointAvailable('P', x, y)) {
            for (var i = 0 ; i < Scene._NPC.length; i++) {
                if (Scene._NPC[i].c == color) {
                    return;
                }
            }

            Scene._PLAYER = { c: color || Scene._PLAYER.c, x: x || Scene._PLAYER.x, y: y || Scene._PLAYER.y };
            var player = Scene.Game.getCurentStage().getItemsByType(1)[0];
            player.coord.x = x;
            player.coord.y = y;
            player.update(true);
            player.draw(document.getElementById('game_canvas').getContext('2d'));
        }
    }
};

Scene.randomPlayerPos = function () {
    var tmpX = randomInt(1, Math.floor(Scene._ROWCOL.col / 2));
    var tmpY = randomInt(1, Math.floor(Scene._ROWCOL.row / 2));
    Scene._PLAYER = { c: Scene._PLAYER.c, x: tmpX * 2 - 1, y: tmpY * 2 - 1 };
    //var player = Scene.Game.getCurentStage().getItemsByType(1)[0];
    //player._params.coord = { x: Scene._PLAYER.x, y: Scene._PLAYER.y };
    //player.coord.x = Scene._PLAYER.x;
    //player.coord.y = Scene._PLAYER.y;
    //player.update(true);
    //player.draw(document.getElementById('game_canvas').getContext('2d'));

    //var beans = Scene.Game.getCurentStage().maps[1];
    //beans.set(Scene._PLAYER.x, Scene._PLAYER.y, 1);
    //beans._params.data[Scene._PLAYER.y][Scene._PLAYER.x] = 1;
};

Scene.move = function (direction, step) {
    var pathItem = {
        orientation: 0,
        x: 0,
        y: 0,
        turn: false,
        steps: 0
    };
    var pathItemOri = {
        x : Scene._Player.coord.x,
        y : Scene._Player.coord.y,
        orientation : Scene._Player.orientation
    };
    if (Scene._CALCMOVEPATH.length == 0){
        Scene._CALCMOVEPATH.push(pathItemOri);
    }
    var pathItemNext = {
        x : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].x,
        y : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].y,
        orientation : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].orientation
    };

    if (direction == "") {
        pathItem.orientation = "";
        pathItem.steps = step;
        pathItemNext.orientation = pathItemNext.orientation;

        switch (pathItemNext.orientation) {
            case 0:
            case 2:
                pathItemNext.x = (pathItemNext.orientation == 0 ? 1 : -1) * step + pathItemNext.x;
                pathItemNext.y = pathItemNext.y;
                break;
            case 1:
            case 3:
                pathItemNext.x = pathItemNext.x;
                pathItemNext.y = (pathItemNext.orientation == 1 ? 1 : -1) * step + pathItemNext.y;
                break;
        }


    } else {
        switch (direction) {
            case 'L':
                pathItem.orientation = 2;
                break;
            case 'U':
                pathItem.orientation = 3;
                break;
            case 'R':
                pathItem.orientation = 0;
                break;
            case 'D':
                pathItem.orientation = 1;
                break;
        }

        switch (pathItem.orientation) {
            case 0:
            case 2:
                pathItem.x = (pathItem.orientation == 0 ? 1 : -1) * step;
                pathItem.y = 0;
                pathItemNext.x = (pathItem.orientation == 0 ? 1 : -1) * step + pathItemNext.x;
                pathItemNext.y = pathItemNext.y;
                break;
            case 1:
            case 3:
                pathItem.x = 0;
                pathItem.y = (pathItem.orientation == 1 ? 1 : -1) * step;
                pathItemNext.x = pathItemNext.x;
                pathItemNext.y = (pathItem.orientation == 1 ? 1 : -1) * step + pathItemNext.y;
                break;
        }
        pathItemNext.orientation = pathItem.orientation;
    }

    Scene._CALCMOVEPATH.push(pathItemNext);

    Scene._MOVEPATHS.push(pathItem);
};

Scene.UpdateConfig = function (playerCfg, targetPos, wallCfg) {
    Scene.Game.setMovePath(Scene._MOVEPATHS);
};

Scene.ResetConfig = function () {
    Scene._MOVEPATHS = [];
	Scene._CALCMOVEPATH = [];
	Scene.startTick = 0;
	//Scene.initValue = Scene.setWallsValue();
	
};

Scene.randomGoodsPos = function () {
	/*
    var tmpX = randomInt(1, Math.floor(Scene._ROWCOL.col / 2));
    var tmpY = randomInt(1, Math.floor(Scene._ROWCOL.row / 2));
    var checkNumberX = Math.floor(Math.floor(Scene._ROWCOL.col / 2) / 2);
    var checkNumberY = Math.floor(Math.floor(Scene._ROWCOL.row / 2) / 2);
    var playerX = Math.ceil(Scene._PLAYER.x / 2);
    var playerY = Math.ceil(Scene._PLAYER.x / 2);
    while (Math.abs(playerX - tmpX) < checkNumberX || Math.abs(playerY - tmpY) < checkNumberY) {
        tmpX = randomInt(1, Math.floor(Scene._ROWCOL.col / 2));
        tmpY = randomInt(1, Math.floor(Scene._ROWCOL.row / 2));
    }

    tmpX = tmpX * 2 - 1;
    tmpY = tmpY * 2 - 1;
	*/
	tmpX = 1;
	tmpY = 7;
    Scene._Goods[tmpX + "," + tmpY] = 1;
    return { x: tmpX, y: tmpY };
};

Scene.initData = function (targetPos) {
    if (Scene._ROWCOL.row != Scene._DATA.length || Scene._ROWCOL.col != Scene._DATA[0].length) {
        _defaultDATA = [];
        for (var i = 0; i < Scene._ROWCOL.row; i++) {
            var tmpItems = [];
            for (var j = 0; j < Scene._ROWCOL.col; j++) {
                if (i == 0 || j == 0 || i == Scene._ROWCOL.row - 1 || j == Scene._ROWCOL.col - 1 ) {
					tmpItems.push(1);
                } else {
                    tmpItems.push(0);
                }
            }
            _defaultDATA.push(tmpItems);
            Scene._DATA = _defaultDATA;
        }
    }

    //var maze = new Maze(Scene._ROWCOL.row, Scene._ROWCOL.col, { x: Scene._PLAYER.x, y: Scene._PLAYER.y }, { x: targetPos.x, y: targetPos.y });
    //Scene._DATA = maze.cellToCooder();
};

Scene.removeBeansUnderPlayer = function () {
    var beans = Scene.Game.getCurentStage().maps[1];
    beans.set(Scene._PLAYER.x, Scene._PLAYER.y, 1);
    beans._params.data[Scene._PLAYER.y][Scene._PLAYER.x] = 1;
};

Scene.setWallsValue = function () {
    var iswall = Scene.Game.getCurentStage().maps[1];
//	var randomNum = Math.floor(Math.random()*2);
var randomNum = 1;
    iswall.set(Scene._IsWall.x, Scene._IsWall.y, randomNum);
    iswall._params.data[Scene._IsWall.y][Scene._IsWall.x] = randomNum;
	return randomNum;

};

Scene.setWallsValue2 = function () {
    var iswall = Scene.Game.getCurentStage().maps[1];
//	var randomNum = Math.floor(Math.random()*2);
var randomNum = 0;
    iswall.set(Scene._IsWallS.x, Scene._IsWallS.y, randomNum);
    iswall._params.data[Scene._IsWallS.y][Scene._IsWallS.x] = randomNum;
	return randomNum;

};

Scene.TurnLeft = function () {
    Scene._MOVEPATHS.push({ orientation: -1, x: 0, y: 0, turn: true, steps: 0 });

    var pathItemOri = {
        x : Scene._Player.coord.x,
        y : Scene._Player.coord.y,
        orientation : Scene._Player.orientation
    };
    if (Scene._CALCMOVEPATH.length == 0){
        Scene._CALCMOVEPATH.push(pathItemOri);
    }
    var pathItemNext = {
        x : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].x,
        y : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].y,
        orientation : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].orientation
    };
    var prevOrientation = pathItemNext.orientation;
    var currOrientation = '';
    currOrientation = prevOrientation - 1;
    if (currOrientation == -1){
        currOrientation = 3;
    }
    pathItemNext.orientation = currOrientation;
    Scene._CALCMOVEPATH.push(pathItemNext);
};

Scene.TurnRight = function () {
    Scene._MOVEPATHS.push({ orientation: 1, x: 0, y: 0, turn: true, steps: 0 });
    var pathItemOri = {
        x : Scene._Player.coord.x,
        y : Scene._Player.coord.y,
        orientation : Scene._Player.orientation
    };
    if (Scene._CALCMOVEPATH.length == 0){
        Scene._CALCMOVEPATH.push(pathItemOri);
    }
    var pathItemNext = {
        x : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].x,
        y : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].y,
        orientation : Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].orientation
    };
    var prevOrientation = pathItemNext.orientation;
    var currOrientation = '';
    currOrientation = prevOrientation + 1;
    if (currOrientation == 4){
        currOrientation = 0;
    }
    pathItemNext.orientation = currOrientation;
    Scene._CALCMOVEPATH.push(pathItemNext);
};

Scene.isWall = function () {
    var nextX, nextY, currentX, currentY, currentOrientation;
    if (Scene._CALCMOVEPATH.length !=0){
        currentX = Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].x;
        currentY = Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].y;
        currentOrientation = Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].orientation;
    }else{
		var player = Scene.Game.getCurentStage().getItemsByType(1)[0];
		currentX = player.coord.x;
        currentY = player.coord.y;
        currentOrientation = Scene._Player.orientation;
	}
    switch (currentOrientation) {
		case 0:
			nextX = currentX + 1;
			nextY = currentY;
			break;
		case 2:
			nextX = currentX - 1;
			nextY = currentY;
			break;
		case 1:
			nextX = currentX;
			nextY = currentY + 1;
			break;
		case 3:
			nextX = currentX;
			nextY = currentY - 1;
			break;
	}
	if (Scene.checkPointUsedByWall (nextX, nextY))
	{
		return true;
	}else{
		return false;
	}
};

Scene.isNPC = function () {
   var nextX, nextY, currentX, currentY, currentOrientation;
    if (Scene._CALCMOVEPATH.length !=0){
        currentX = Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].x;
        currentY = Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].y;
        currentOrientation = Scene._CALCMOVEPATH[Scene._CALCMOVEPATH.length-1].orientation;
    }else{
		var player = Scene.Game.getCurentStage().getItemsByType(1)[0];
		currentX = player.coord.x;
        currentY = player.coord.y;
        currentOrientation = Scene._Player.orientation;
	}
    switch (currentOrientation) {
		case 0:
			nextX = currentX + 1;
			nextY = currentY;
			break;
		case 2:
			nextX = currentX - 1;
			nextY = currentY;
			break;
		case 1:
			nextX = currentX;
			nextY = currentY + 1;
			break;
		case 3:
			nextX = currentX;
			nextY = currentY - 1;
			break;
	}
	if (Scene.checkPointUsedByWall (nextX, nextY))
	{
		return true;
	}else{
		return false;
	}
};

Scene.eatBeans = function () {
	Scene._TARGETBEANS = 3;
	return true;
};

Scene.playerStatus = function () {
	return true;
};

Scene.checkBlockly = function (code) {
	var strtmp = code.replace(/"/, "\"");
	var strtmp1 = strtmp.replace(/  /,'');
	var strtmp2 = strtmp1.replace(/ /,'');
	var sourceStr = strtmp2.replace(/\n/g,'');
	
	var x1 =  findStringPostion(sourceStr, "{", 0) + 1;
	var x2 =  findStringPostion(sourceStr, "{", 1) + 1;
	var y1 =  findStringPostion(sourceStr, "}", 0);
	var y2 =  findStringPostion(sourceStr, "}", 1);
	
	var ifx = sourceStr.indexOf("if");
	var tarStr1 = sourceStr.substring(x1, y1);
	var tarStr2 = sourceStr.substring(x2, y2);
	
	if (ifx  == -1){
		Scene.ResetConfig();
		alert("请使用If语句完成本节!");
	}else {
		if (tarStr1 == ""){
			Scene.ResetConfig();
			alert("请确保If语句内有要执行的语句!");
		}
	/*
		if (tarStr2 == ""){
		Scene.ResetConfig();
		alert("请确保else语句内有要执行的语句!");
		}
		*/
	}
};
/*
Scene.initDrawImage = function () {
	var game = Scene.Game;
    
    var stage, map, goods, beans, player, times, iswall;
    stage = game.createStage({
        update: function () {
            var stage = this;
            var items = stage.getItemsByType(2);
            if (stage.status == 1) {
                items.forEach(function (item) {
                    var dx = item.x - player.x;
                    var dy = item.y - player.y;
                    if (dx * dx + dy * dy < 750 && item.status != 4) {
                        if (item.status == 3) {
                            item.status = 4;
                            _SCORE += 10;
                        } else {
                            stage.status = 3;
                            stage.timeout = 30;
                        }
                    }
                });
                if (JSON.stringify(beans.data).indexOf(0) < 0) {
                    game.nextStage();
                }
            } else if (stage.status == 3) {
                if (!stage.timeout) {
                    Scene._LIFE--;
                    if (Scene._LIFE) {
                        stage.resetItems();
                    } else {
                        game.nextStage();
                        return false;
                    }
                }
            }
        }
    });
    //map
    var tmpX = 3;
    var tempY = 3;
	
	removeImage = stage.createMap({
        x: tmpX,
        y: tempY,
        data: Scene._DATA,
        frames: 8,
        draw: function (context) {
            for (var j = 0; j < this.y_length; j++) {
                for (var i = 0; i < this.x_length; i++) {
                        var pos = this.coord2position(i, j);
                        context.fillStyle = "#000000";
                        if (Scene._IsWall.x == i && Scene._IsWall.y == j){
							
//                            context.drawImage(Scene.APPLEIMG, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
							context.fillRect(pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
//								context.fillRect(142.75, 185.75, 21.5, 21.5);
                        }
                }
            }
        }
    });
	
		reDrawImage = stage.createMap({
        x: tmpX,
        y: tempY,
        data: Scene._DATA,
        frames: 8,
        draw: function (context) {
            for (var j = 0; j < this.y_length; j++) {
                for (var i = 0; i < this.x_length; i++) {
                        var pos = this.coord2position(i, j);
                        context.fillStyle = "#000000";
                        if (Scene._IsWall.x == i && Scene._IsWall.y == j){
							if (Scene.initValue == 1) {
								context.drawImage(Scene.wallimg, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
							}else if (Scene.initValue == 0) {
								context.drawImage(Scene.ORANGEIMG, 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
							}
//                            context.drawImage(Scene.wallimg , 0, 0, 15, 15, pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
	//						context.fillRect(pos.x - game.stepUnit / 4, pos.y - game.stepUnit / 4, game.stepUnit / 2, game.stepUnit / 2);
//								context.fillRect(142.75, 185.75, 21.5, 21.5);
                        }
                }
            }
        }
    });
	
	removeImage.draw(game.gamecontext);
	reDrawImage.draw(game.gamecontext);
};
*/
function findStringPostion (searchString, searchedString, num) {
	var x = searchString.indexOf(searchedString);
    for (var i = 0; i < num; i++) {
        x = searchString.indexOf(searchedString, x + 1);
    }
return x;
}
