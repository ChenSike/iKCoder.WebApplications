'use strict';

function Game(id, params) {
    var _ = this;
    params = params || {};
    var settings = {
        width: 400,
        height: 480,
        movePaths: [],
		movePathsBuild: false,
        model: '1',
        rowCount: 15,
        colCount: 15,
        stepUnit: 28
    };
    var _extend = function (target, settings, params) {
        for (var i in settings) {
            target[i] = params[i] || settings[i];
        }
        return target;
    };

    _extend(this, settings, params);
    var $canvas = document.getElementById(id);
    $canvas.width = _.width;
    $canvas.height = _.height;
    var rowUnit = Math.floor(_.height / _.rowCount);
    var colUnit = Math.floor(_.width / _.colCount);
    _.stepUnit = Math.min(rowUnit, colUnit);
    var _context = $canvas.getContext('2d');
	_.gamecontext = _context;
    var _stages = [];
    var _events = {};
    var _index = 0, _hander;
    var Item = function (params) {
        this._params = params || {};
        this._settings = {
            x: 0,
            y: 0,
            width: _.stepUnit,
            height: _.stepUnit,
            type: 0,
            color: '#F00',
            status: 1,
            orientation: 0,
            speed: 0,
            location: null,
            coord: null,
            path: [],
            vector: null,
            stage: null,
            index: 0,
            frames: 1,
            times: 0,
            timeout: 0,
            control: {},
            update: function () { },
            draw: function () { }
        };
        _extend(this, this._settings, this._params);
    };
    Item.prototype.bind = function (eventType, callback) {
        if (_.model != '0') {
            if (!_events[eventType]) {
                _events[eventType] = {};
                $canvas.addEventListener(eventType, function (e) {
                    var position = _.getPosition(e);
                    _stages[_index].items.forEach(function (item) {
                        if (Math.abs(position.x - item.x) < item.width / 2 && Math.abs(position.y - item.y) < item.height / 2) {
                            var key = 's' + _index + 'i' + item.index;
                            if (_events[eventType][key]) {
                                _events[eventType][key](e);
                            }
                        }
                    });
                    e.preventDefault();
                });
            }
            _events[eventType]['s' + this.stage.index + 'i' + this.index] = callback.bind(this);
        }
    };

    var Map = function (params) {
        this._params = params || {};
        this._settings = {
            x: 0,
            y: 0,
            size: _.stepUnit,
            data: [],
            stage: null,
            x_length: 0,
            y_length: 0,
            frames: 1,
            times: 0,
            cache: false,
            update: function () { },
            draw: function () { },
        };
        _extend(this, this._settings, this._params);
    };

    Map.prototype.updateData = function (newData) {
        this.data = newData;
    }

    Map.prototype.get = function (x, y) {
        if (this.data[y] && typeof this.data[y][x] != 'undefined') {
            return this.data[y][x];
        }
        return -1;
    };

    Map.prototype.set = function (x, y, value) {
        if (this.data[y]) {
            this.data[y][x] = value;
        }
    };

    Map.prototype.coord2position = function (cx, cy) {
        return {
            x: this.x + cx * this.size + this.size / 2,
            y: this.y + cy * this.size + this.size / 2
        };
    };

    Map.prototype.position2coord = function (x, y) {
        var fx = Math.abs(x - this.x) % this.size - this.size / 2;
        var fy = Math.abs(y - this.y) % this.size - this.size / 2;
        return {
            x: Math.floor((x - this.x) / this.size),
            y: Math.floor((y - this.y) / this.size),
            offset: Math.sqrt(fx * fx + fy * fy) < 2.12 ? 0 : Math.sqrt(fx * fx + fy * fy)
        };
    };

    Map.prototype.finder = function (params) {
        var defaults = {
            map: null,
            start: {},
            end: {},
            type: 'path'
        };
        var options = _extend({}, defaults, params);
        if (options.map[options.start.y][options.start.x] || options.map[options.end.y][options.end.x]) {
            return [];
        }
        var finded = false;
        var result = [];
        var y_length = options.map.length;
        var x_length = options.map[0].length;
        var steps = [];
        for (var y = y_length; y--;) {
            steps[y] = [];
            for (var x = x_length; x--;) {
                steps[y][x] = 0;
            }
        }

        var _getValue = function (x, y) {
            if (options.map[y] && typeof options.map[y][x] != 'undefined') {
                return options.map[y][x];
            }
            return -1;
        };

        var _next = function (to) {
            var value = _getValue(to.x, to.y);
            if (value < 1) {
                if (value == -1) {
                    to.x = (to.x + x_length) % x_length;
                    to.y = (to.y + y_length) % y_length;
                    to.change = 1;
                }
                if (!steps[to.y][to.x]) {
                    result.push(to);
                }
            }
        };

        var _render = function (list) {
            var new_list = [];
            var next = function (from, to) {
                var value = _getValue(to.x, to.y);
                if (value < 1) {
                    if (value == -1) {
                        to.x = (to.x + x_length) % x_length;
                        to.y = (to.y + y_length) % y_length;
                        to.change = 1;
                    }
                    if (to.x == options.end.x && to.y == options.end.y) {
                        steps[to.y][to.x] = from;
                        finded = true;
                    } else if (!steps[to.y][to.x]) {
                        steps[to.y][to.x] = from;
                        new_list.push(to);
                    }
                }
            };
            list.forEach(function (current) {
                next(current, { y: current.y + 1, x: current.x });
                next(current, { y: current.y, x: current.x + 1 });
                next(current, { y: current.y - 1, x: current.x });
                next(current, { y: current.y, x: current.x - 1 });
            });
            if (!finded && new_list.length) {
                _render(new_list);
            }
        };
        _render([options.start]);
        if (finded) {
            var current = options.end;
            if (options.type == 'path') {
                while (current.x != options.start.x || current.y != options.start.y) {
                    result.unshift(current);
                    current = steps[current.y][current.x];
                }
            } else if (options.type == 'next') {
                _next({ x: current.x + 1, y: current.y });
                _next({ x: current.x, y: current.y + 1 });
                _next({ x: current.x - 1, y: current.y });
                _next({ x: current.x, y: current.y - 1 });
            }
        }
        return result;
    };

    var Stage = function (params) {
        this._params = params || {};
        this._settings = {
            status: 0,
            maps: [],
            audio: [],
            images: [],
            items: [],
            timeout: 0,
            update: function () { }
        };
        _extend(this, this._settings, this._params);
    };

    Stage.prototype.resetItems = function () {
        this.status = 1;
        this.items.forEach(function (item, index) {
            _extend(item, item._settings, item._params);
            item.index = index;
            item.stage = this;
            if (item.location) {
                var position = item.location.coord2position(item.coord.x, item.coord.y);
                item.x = position.x;
                item.y = position.y;
            }
        }.bind(this));
    };

    Stage.prototype.resetMaps = function () {
        this.status = 1;
        this.maps.forEach(function (map) {
            _extend(map, map._settings, map._params);
            map.data = JSON.parse(JSON.stringify(map._params.data));
            map.stage = this;
            map.y_length = map.data.length;
            map.x_length = map.data[0].length;
        }.bind(this));
    };

    Stage.prototype.reset = function () {
        _extend(this, this._settings, this._params);
        this.resetItems();
        this.resetMaps();
    };

    Stage.prototype.createItem = function (options) {
        var item = new Item(options);
        item.stage = this;
        item.index = this.items.length;
        if (item.location) {
            var position = item.location.coord2position(item.coord.x, item.coord.y);
            item.x = position.x;
            item.y = position.y;
        }
        this.items.push(item);
        return item;
    };

    Stage.prototype.getItemsByType = function (type) {
        var items = this.items.filter(function (item) {
            if (item.type == type) {
                return item;
            }
        });
        return items;
    };

    Stage.prototype.createMap = function (options) {
        var map = new Map(options);
        map.data = JSON.parse(JSON.stringify(map._params.data));
        map.stage = this;
        map.y_length = map.data.length;
        map.x_length = map.data[0].length;
        map.imageData = null;
        this.maps.push(map);
        return map;
    };

    Stage.prototype.bind = function (eventType, callback) {
        if (_.model != 0) {
            if (!_events[eventType]) {
                _events[eventType] = {};
                window.addEventListener(eventType, function (e) {
                    if (e.keyCode == 13 || e.keyCode == 32 || (e.keyCode > 36 && e.keyCode < 41)) {
                        var key = 's' + _index;
                        if (_events[eventType][key]) {
                            _events[eventType][key](e);
                            e.preventDefault();
                        }
                    }
                });
            }
            _events[eventType]['s' + this.index] = callback.bind(this);
        }
    };

    this.start = function (fromInit) {
        var f = 0;
		var alreadyCheckComplete = false;
        if (_stages[_index].status == 1) {
            if (!fromInit) {
                this.stop();
                _stages[_index].reset();
                _stages[_index].status = 0;
                return true;
            }
        } else {
            _stages[_index].status = 1;
        }

        var fn = function () {
            var stage = _stages[_index];
            _context.clearRect(0, 0, _.width, _.height);
            f++;
            if (stage.timeout) {
                stage.timeout--;
            }
            if (stage.update() != false) {
                stage.maps.forEach(function (map) {
                    if (!(f % map.frames)) {
                        map.times = f / map.frames;
                    }
                    if (map.cache) {
                        if (!map.imageData) {
                            _context.save();
                            map.draw(_context);
                            map.imageData = _context.getImageData(0, 0, _.width, _.height);
                            _context.restore();
                        } else {
                            _context.putImageData(map.imageData, 0, 0);
                        }
                    } else {
                        map.update();
                        map.draw(_context);
                    }
                });
                stage.items.forEach(function (item) {
                    if (!(f % item.frames)) {
                        item.times = f / item.frames;
                    }
                    if (stage.status == 1 && item.status != 2) {
                        if (item.location) {
                            item.coord = item.location.position2coord(item.x, item.y);
                        }
                        if (item.timeout) {
                            item.timeout--;
                        }

                        if (item.type == 1) {
                            if (_.movePaths.length > 0) {
								item.orientation = _.movePaths[0].orientation;
								if (Math.floor(Math.abs(item.x - _.movePaths[0].x)) <= 2 && Math.floor(Math.abs(item.y - _.movePaths[0].y)) <= 2) {
									_.movePaths.shift();
								}else if ((_.movePaths[0].x > _.width ||_.movePaths[0].y > _.height)) {
									_.movePaths.shift();
								}else{
									item.update();
								}
								
                            } else {
                                if (!alreadyCheckComplete && _.movePathsBuild && Game.completeCheckFn) {
                                    Game.completeCheckFn(stage, item);
                                    alreadyCheckComplete = true;
                                }
                            }
                        }else if (item.type != 1) {
                            item.update();
                        }
                    }

                    item.draw(_context);
                });
            }

            if (fromInit === true) {
                _stages[_index].status = 0;
                fromInit = false;
            }
            _hander = requestAnimationFrame(fn);
        };

        this.calcPaths();
        _hander = requestAnimationFrame(fn);
    };

    this.stop = function () {
        _hander && cancelAnimationFrame(_hander);
    };

    this.pause = function () {
        _stages[_index].status = 2;
    };

    this.restart = function () {
        _stages[_index].status = 1;
    };

    this.getPosition = function (e) {
        var box = $canvas.getBoundingClientRect();
        return {
            x: e.clientX - box.left * (_.width / box.width),
            y: e.clientY - box.top * (_.height / box.height)
        };
    }

    this.createStage = function (options) {
        var stage = new Stage(options);
        stage.index = _stages.length;
        _stages.push(stage);
        return stage;
    };

    this.setStage = function (index) {
        _stages[_index].status = 0;
        _index = index;
        _stages[_index].status = 1;
        return _stages[_index];
    };

    this.nextStage = function () {
        if (_index < _stages.length - 1) {
            _stages[_index].status = 0;
            _index++;
            _stages[_index].status = 1;
            return _stages[_index];
        } else {
            throw new Error('unfound new stage.');
        }
    };

    this.init = function () {
        _index = 0;
        this.start(true);
    };

    this.getCurentStage = function () {
        return _stages[_index];
    };

    this.setMovePath = function (pathItems) {
        _.movePaths = [];
        for (var i = 0; i < pathItems.length; i++) {
            _.movePaths.push(pathItems[i]);
        }
    }

    this.calcPaths = function () {
        var tmpMovePaths = [];
        var player = this.getCurentStage().getItemsByType(1)[0];
        player.coord = player.location.position2coord(player.x, player.y);
        var x = player.coord.x;
        var y = player.coord.y;
        var prevOrientation = player.orientation;
        var tmpPos = null;
        var currItem = null;
        var currOrientation = '';
        for (var i = 0; i < _.movePaths.length; i++) {
            currItem = _.movePaths[i];
            if (currItem.turn === true || currItem.steps > 0) {
                if (currItem.turn === true) {
                    currOrientation = prevOrientation + currItem.orientation;
                    if (currOrientation == 4) {
                        currOrientation = 0;
                    } else if (currOrientation == -1) {
                        currOrientation = 3;
                    }

                    prevOrientation = currOrientation;
                    x += 0;
                    y += 0;
                } else {
                    switch (prevOrientation) {
                        case 0:
                        case 2:
                            x += (prevOrientation == 0 ? 1 : -1) * currItem.steps;
                            y += 0;
                            break;
                        case 1:
                        case 3:
                            x += 0;
                            y += (prevOrientation == 1 ? 1 : -1) * currItem.steps;
                            break;
                    }
                    currOrientation = prevOrientation;//just move steps, orientation not change
                }
            } else {
                currOrientation = currItem.orientation;
                x += _.movePaths[i].x;
                y += _.movePaths[i].y;
            }

            tmpPos = player.location.coord2position(x, y);
            var pathItem = {
                orientation: currOrientation,
                x: tmpPos.x,
                y: tmpPos.y
            };
            tmpMovePaths.push(pathItem);
        }

        _.movePaths = tmpMovePaths;
		if (_.movePaths.length != 0){
			_.movePathsBuild = true;
		}
    }
}

function Maze(rowCount, colCount, startPos, endPos) {
    this.cells = [null];
    this.queue = [];
    this.rowCount = Math.floor(rowCount / 2);
    this.colCount = Math.floor(colCount / 2);
    this.startX = Math.ceil(startPos.y / 2);
    this.startY = Math.ceil(startPos.x / 2);
    this.endX = Math.ceil(endPos.y / 2);
    this.endY = Math.ceil(endPos.x / 2);

    for (var i = 1; i <= this.rowCount; i++) {
        for (var j = 1; j <= this.colCount; j++) {
            var cell = { x: i, y: j, visited: 0, wall: [0, 0, 0, 0], index: (i - 1) * this.colCount + j };
            if (i == 1) {
                cell.wall[1] = 1;
            }

            if (i == this.rowCount) {
                cell.wall[3] = 1;
            }

            if (j == 1) {
                cell.wall[0] = 1;
            }

            if (j == this.colCount) {
                cell.wall[2] = 1;
            }

            this.cells.push(cell);
        }
    }

    this.createMaze();
};

Maze.prototype.createMaze = function () {
    var startCell = this.cells[(this.startX - 1) * this.colCount + this.startY];
    startCell.visited = 2;
    this.addQueue(startCell);
    while (true) {
        var tmpCell = this.queue.pop();
        if (!tmpCell) {
            break;
        }

        this.getThrough(tmpCell);
    }
}

Maze.prototype.addQueue = function (currCell) {
    if (currCell) {
        currCell.visited = 1;
        this.queue.push(currCell);
    }
}

Maze.prototype.getThrough = function (currCell) {
    var x = currCell.x;
    var y = currCell.y;
    var tmpQueue = new Array();
    if (currCell.visited == 2) {
        return;
    } else {
        currCell.visited = 2;
    }

    var tmpCell = null;
    for (var i = 0; i < 4; i++) {
        switch (i) {
            case 0:
                tmpCell = this.cells[currCell.index - 1];
                if (tmpCell && !tmpCell.visited) {
                    tmpCell.wall[2] = 1;
                }
                break;
            case 1:
                tmpCell = this.cells[currCell.index - this.colCount];
                if (tmpCell && !tmpCell.visited) {
                    tmpCell.wall[3] = 1;
                }
                break;
            case 2:
                tmpCell = this.cells[currCell.index + 1];
                if (tmpCell && !tmpCell.visited) {
                    tmpCell.wall[0] = 1;
                }
                break;
            case 3:
                tmpCell = this.cells[currCell.index + this.colCount];
                if (tmpCell && !tmpCell.visited) {
                    tmpCell.wall[1] = 1;
                }
                break;
        }

        if (tmpCell && !currCell.wall[i] && !tmpCell.visited) {
            currCell.wall[i] = 1;
            tmpQueue.push(tmpCell);
        }
    }

    var seed = 0;
    if (tmpQueue.length > 0) {
        seed = Math.floor(Math.random() * 10);
        for (var i = 0; i < tmpQueue.length; i++) {
            this.addQueue(tmpQueue[seed % tmpQueue.length]);
            seed++;
        }

        seed = Math.floor(Math.random() * tmpQueue.length);
    }
}

Maze.prototype.cellToCooder = function () {
    var tmpRowCount = this.rowCount * 2 + 1;
    var tmpColCount = this.colCount * 2 + 1;
    var coord = [];
    for (var i = 0; i < tmpRowCount; i++) {
        var row = [];
        for (var j = 0; j < tmpColCount; j++) {
            row.push(1);
        }

        coord.push(row);
    }

    var cell, x, y, wall, tmpX, tmpY;
    for (var i = 1; i < this.cells.length; i++) {
        cell = this.cells[i];
        wall = cell.wall;
        tmpX = cell.y * 2 - 1;
        tmpY = cell.x * 2 - 1;
        coord[tmpY][tmpX] = 0;
        if (wall[0] == 1) {
            coord[tmpY][tmpX - 1] = 0;
            if (wall[1] == 1) {
                coord[tmpY-1][tmpX - 1] = 0;
            }

            if (wall[3] == 1) {
                coord[tmpY + 1][tmpX - 1] = 0;
            }
        }

        if (wall[1] == 1) {
            coord[tmpY - 1][tmpX] = 0;
            if (wall[0] == 1) {
                coord[tmpY - 1][tmpX - 1] = 0;
            }

            if (wall[2] == 1) {
                coord[tmpY - 1][tmpX + 1] = 0;
            }
        }

        if (wall[2] == 1) {
            coord[tmpY][tmpX + 1] = 0;
            if (wall[1] == 1) {
                coord[tmpY - 1][tmpX + 1] = 0;
            }

            if (wall[3] == 1) {
                coord[tmpY + 1][tmpX + 1] = 0;
            }
        }

        if (wall[3] == 1) {
            coord[tmpY + 1][tmpX] = 0;
            if (wall[0] == 1) {
                coord[tmpY + 1][tmpX - 1] = 0;
            }

            if (wall[2] == 1) {
                coord[tmpY + 1][tmpX + 1] = 0;
            }
        }
    }

    for (var i = 0; i < coord.length; i++) {
        for (var j = 0; j < coord[i].length; j++) {
            if (i == 0 || j == 0 || i == coord.length - 1 || j == coord[i].length - 1) {
                coord[i][j] = 1;
            } else {
                //if (coord[i - 1][j] == 1 && coord[i][j - 1] == 1) {
                //    coord[i][j] = 1;
                //}else if (coord[i - 1][j] == 1 && coord[i][j + 1] == 1) {
                //    coord[i][j] = 1;
                //}else if (coord[i + 1][j] == 1 && coord[i][j - 1] == 1) {
                //    coord[i][j] = 1;
                //}else if (coord[i + 1][j] == 1 && coord[i][j + 1] == 1) {
                //    coord[i][j] = 1;
                //}
            }
        }
    }

    return coord;
}
