Scene = {};
Scene.Game = null;
Scene._DATA = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
Scene._COS = [1, 0, -1, 0];
Scene._SIN = [0, 1, 0, -1];
Scene._COLOR = ['#F00', '#F93', '#0CF', '#F9C'];
Scene._SCORE = 0;
Scene._LIFE = 500;
Scene._PacSpeed = 1;
Scene._EnemySpeed = 0;
Scene._ActiveEnemyCount = 0;

Scene.Init = function (containerId, configs) {    
    Scene._LIFE = configs.lifeCount;
    Scene._PacSpeed = configs.pacSpeed;
    Scene._EnemySpeed = configs.enemySpeed;
    Scene._ActiveEnemyCount = configs.activeEnemyCount;

    this.container = document.getElementById(containerId);
    var parentEl = this.container.parentElement;
    var height = parentEl.clientHeight;
    var width = parentEl.clientWidth;
    this.container.style.width = (width - 2) + "px";
    this.container.style.height = (height - 2) + "px";

    this.canvas;
    if (this.container != null) {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "game_canvas";
        this.container.appendChild(this.canvas);
        height = this.container.clientHeight;
        width = this.container.clientWidth;        
        this.canvas.style.backgroundColor = "#000000";
        this.canvas.style.height = height + "px";
        this.canvas.style.width = width + "px";
        var settings = {
            width: width,
            height: height
        };

        Scene.InitGame(this.canvas.id, settings);
    }
};

Scene.InitGame = function (currentId, sizeSetting) {
    Scene.Game = new Game(currentId, sizeSetting);
    Scene.CreateMainStage();
    Scene.CreateOverStage();
    Scene.Game.init();
};

Scene.CreateMainStage = function () {
    var game = Scene.Game;
    var stage, map, goods, beans, player, times;
    stage = game.createStage({
        update: function () {
            var stage = this;
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
    map = stage.createMap({
        x: 40,
        y: 20,
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
                            context.strokeStyle = value == 2 ? "#FFF" : "#09C";
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
                        }
                    }
                }
            }
        }
    });
    //normal bean
    goods = {
        '1,3': 1,
        '26,3': 1,
        '1,23': 1,
        '26,23': 1
    };
    //bomb bean
    beans = stage.createMap({
        x: 40,
        y: 20,
        data: Scene._DATA,
        frames: 8,
        draw: function (context) {
            for (var j = 0; j < this.y_length; j++) {
                for (var i = 0; i < this.x_length; i++) {
                    if (!this.get(i, j)) {
                        var pos = this.coord2position(i, j);
                        context.fillStyle = "#F5F5DC";
                        if (goods[i + ',' + j]) {
                            context.fillStyle = "#C33";
                            context.beginPath();
                            context.arc(pos.x, pos.y, 5 + this.times % 2, 0, 2 * Math.PI, true);
                            context.fill();
                            context.closePath();
                        } else {
                            context.fillRect(pos.x - 2, pos.y - 2, 4, 4);
                        }
                    }
                }
            }
        }
    });
    //score
    stage.createItem({
        x: 45,
        y: 700,
        draw: function (context) {
            context.font = 'bold 28px Helvetica';
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillStyle = '#C33';
            context.fillText('SCORE', this.x, this.y);
            context.font = '28px Helvetica';
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.fillStyle = '#FFF';
            context.fillText(Scene._SCORE, this.x + 12, this.y);
        }
    });
    //status
    stage.createItem({
        x: 250,
        y: 670,
        frames: 25,
        draw: function (context) {
            var running = false;
            stage.items.forEach(function (item) {
                if (item.actions.length > 0) {
                    running = true;
                }
            });

            if (running && stage.status == 1 && this.times % 2) {
                context.font = '24px Helvetica';
                context.textAlign = 'left';
                context.textBaseline = 'center';
                context.fillStyle = '#09F';
                context.fillText('RUNNING', this.x, this.y);
            } else if (!running) {
                context.font = '24px Helvetica';
                context.textAlign = 'left';
                context.textBaseline = 'center';
                context.fillStyle = '#09F';
                context.fillText('WAITING', this.x, this.y);
            } 
        }
    });
    //life
    stage.createItem({
        x: 500,
        y: 700,
        width: 30,
        height: 30,
        draw: function (context) {
            context.font = 'bold 28px Helvetica';
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            context.fillStyle = '#C33';
            context.fillText('LIFE', this.x, this.y);
            context.font = '28px Helvetica';
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.fillStyle = '#FFF';
            context.fillText(Scene._LIFE, this.x + 12, this.y);
        }
    });    
    //enemy
    var activeEnemyCount = 0;
    for (var i = 0; i < 4; i++) {
        var status = 1;
        if (activeEnemyCount >= Scene._ActiveEnemyCount) {
            status = 5;
        }

        stage.createItem({
            id: "pacman_enemy_" + i,
            width: 30,
            height: 30,
            orientation: 3,
            color: Scene._COLOR[i],
            location: map,
            coord: { x: 12 + i, y: 14 },
            vector: { x: 12 + i, y: 14 },
            type: 2,
            frames: 10,
            status: status,
            speed: Scene._EnemySpeed,
            timeout: Math.floor(Math.random() * 120),
            update: function () {
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
                } else if (this.status == 5) {
                    isSick = true;
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

        activeEnemyCount++;
    }

    items = stage.getItemsByType(2);
    //pac man
    player = stage.createItem({
        id: "pacman_player",
        width: 30,
        height: 30,
        type: 1,
        location: map,
        coord: { x: 12, y: 23 },
        orientation: 2,
        speed: Scene._PacSpeed,
        frames: 5,
        update: function (skip) {
            if (skip) {
                return;
            }

            var coord = this.coord;
            if (!coord.offset) {
                if (typeof this.control.orientation != 'undefined') {
                    if (!map.get(coord.x + Scene._COS[this.control.orientation], coord.y + Scene._SIN[this.control.orientation])) {
                        this.orientation = this.control.orientation;
                    }
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
            } else {
                if (!beans.get(this.coord.x, this.coord.y)) {
                    Scene._SCORE++;
                    beans.set(this.coord.x, this.coord.y, 1);
                    if (goods[this.coord.x + ',' + this.coord.y]) {
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
        draw: function (context, skip) {
            context.fillStyle = '#FFE600';
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
    
    //stage.bind('keydown', function (e) {
    //    switch (e.keyCode) {
    //        case 13:
    //        case 32:
    //            this.status = this.status == 2 ? 1 : 2;
    //            break;
    //        case 39:
    //            player.control = { orientation: 0 };
    //            break;
    //        case 40:
    //            player.control = { orientation: 1 };
    //            break;
    //        case 37:
    //            player.control = { orientation: 2 };
    //            break;
    //        case 38:
    //            player.control = { orientation: 3 };
    //            break;
    //    }
    //});
};

Scene.CreateOverStage = function () {
    var game = Scene.Game;
    var stage = game.createStage();
    stage.createItem({
        x: game.width / 2,
        y: game.height * .35,
        draw: function (context) {
            context.fillStyle = '#FFF';
            context.font = 'bold 48px Helvetica';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('GAME OVER', this.x, this.y);
        }
    });
    Scene._SCORE = 0;
    Scene._LIFE = 500;
    Scene.Game.setStage(0).reset();

    //stage.bind('keydown', function (e) {
    //    switch (e.keyCode) {
    //        case 13:
    //        case 32:
    //            _SCORE = 0;
    //            Scene._LIFE = 500;
    //            var st = game.setStage(0);
    //            st.reset();
    //            break;
    //    }
    //});
};

Scene.PacMan = {};

Scene.PacMan.start = function () {
    Scene.Game.start();
    Scene.Game.initItemsAction();
}

Scene.PacMan.turnTo = function (targetSymbol, orientation) {
    Scene.Game.setItemAction(0, targetSymbol, orientation);
}

Scene.PacMan.move = function (targetSymbol, steps) {
    Scene.Game.setItemAction(1, targetSymbol, steps);
}

Scene.PacMan.stop = function (targetSymbol) {
    Scene.Game.stop(targetSymbol);
}