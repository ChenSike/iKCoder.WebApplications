'use strict';

var Map = function (params) {
    this._params = params || {};
    this._settings = {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        stage: null,
        type: 0, //0: fixed; 1: horizontal ; 2: vertical 
        draw_type: 0, //0: path; 1: image
        images: []
    };

    _extend(this, this._settings, this._params);
};

Map.prototype.setStage = function (stage) {
    this.stage = stage;
};

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
        offset: Math.sqrt(fx * fx + fy * fy)
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