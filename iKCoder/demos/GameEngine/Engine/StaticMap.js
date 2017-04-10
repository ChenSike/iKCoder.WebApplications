var StaticMap = function (p, s, type, drawConfig, coordSize) {
    this.type = 0;
    this.defaultData = [];
    this.coordSize = coordSize;
    this.data = [];
    this.leftSpace = 0;
    this.topSpace = 0;
    this.draw_config = drawConfig ? drawConfig : {
        //0: brush; 1: image
        type: 0,
        //for static map, by pixel
        grid_unit: 20,
        brushFun: function () { },
        imageFun: function () { }
    };

    Map.call(this, p.x, p.y, s.width, s.height, 0);
    this.initDefaultData();
    this.adjustGrid();
};

StaticMap.prototype.adjustGrid = function () {
    var spaceW = Math.floor(this._size.width / this.coordSize.width);
    var spaceH = Math.floor(this._size.height / this.coordSize.height);
    this.draw_config.grid_unit = Math.min(spaceH, spaceW);
    this.leftSpace = Math.floor((this._size.width - this.draw_config.grid_unit * this.coordSize.width) / 2);
    this.topSpace = Math.floor((this._size.height - this.draw_config.grid_unit * this.coordSize.height) / 2);
};

StaticMap.prototype.initDefaultData = function () {
    for (var i = 0; i < this.coordSize.width; i++) {
        var tmpRow = [1];
        for (var j = 0; j < this.coordSize.height; j++) {
            tmpRow.push(0);
        }

        tmpRow.push(1);
        this.defaultData.push(tmpRow);
    }

    this.data = this.defaultData.concat([]);
};

StaticMap.prototype.loadData = function (data) {
    this.data = data;
};

StaticMap.prototype.get = function (x, y) {
    if (this.data) {
        if (this.data[y] && typeof this.data[y][x] != 'undefined') {
            return this.data[y][x];
        }

        return -1;
    }

    return -1;
};

StaticMap.prototype.set = function (x, y, value) {
    if (this.data) {
        if (this.data[y]) {
            this.data[y][x] = value;
        }
    }
};

StaticMap.prototype.coord2position = function (cx, cy) {
    var x = 0;
    var y = 0;
    if (this.type == 0) {
        if (this.data) {
            x = cx * this.draw_config.grid_unit;
            y = cy * this.draw_config.grid_unit;
        }
    }

    return { x: x, y: y };
};

StaticMap.prototype.position2coord = function (x, y) {
    var x = 0;
    var y = 0;
    if (this.type == 0) {
        if (this.data) {
            x = Math.floor(Math.abs(x) / this.draw_config.grid_unit);
            y = Math.floor(Math.abs(y) / this.draw_config.grid_unit);
        }
    }

    return { x: x, y: y };
};

StaticMap.prototype.finder = function (params) {
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

_Inherits(StaticMap, Map);