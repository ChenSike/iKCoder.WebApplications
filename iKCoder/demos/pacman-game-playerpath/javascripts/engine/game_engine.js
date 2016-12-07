'use strict';

if (!Date.now) {
    Date.now = function () {
        return new Date().getTime();
    };
}

(function () {
    'use strict';
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(
                function () {
                    callback(lastTime = nextTime);
                },
                nextTime - now
            );
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

function Game(id, params) {
    var _ = this;
    params = params || {};
    var settings = {
        width: 960,
        height: 640
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
    var _context = $canvas.getContext('2d');
    var _stages = [];
    var _events = {};
    var _index = 0;
    var _hander = null;
    var _startTimeStamp = null;
    var _progress = 0;
    var _stillRunning = false;
    var Item = function (params) {
        this._params = params || {};
        this._settings = {
            id: "",
            actions: [],
            nx: 0,                   //object next position x
            ny: 0,                   //object next position y
            x: 0,                     //object position x
            y: 0,                     //object position y
            width: 20,              //object width
            height: 20,				//object height
            type: 0,					//type of object, 0: normal, 1: control by user,2: control by programe
            color: '#F00',			//object color
            status: 1,				//state of object, 0: inactive/over; 1: normal; 2: pause; 3: temporary; 4: exception; 5: inactive
            orientation: 0,         //orientation, 0: right; 1: down; 2: left; 3: up
            speed: 0,				//speed
            //about map
            location: null,			//map
            coord: null,				//if bind to map, set as map coordinates; else set as position coordinates
            path: [],                //NPC path
            vector: null,			//target coordinates
            //about layout
            stage: null,				//binding object bind to the scenery that object belong to
            index: 0,				    //the index of the object
            frames: 1,				//speed level, how much frames when times change
            times: 0,				    //count of referesh canvas
            timeout: 0,				//Countdown(Used in the process of animation state judgment)
            control: {},				//cache of control, deal with On arrival at the anchor point
            update: function () { }, 	//update the settings
            draw: function () { }		//drawing
        };
        _extend(this, this._settings, this._params);
    };

    Item.prototype.bind = function (eventType, callback) {
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
    };

    Item.prototype.matchPosition = function () {
        if (this.type > 0) {
            var nextPosition = this.location.coord2position(this.nx, this.ny);
            if (nextPosition.x == this.x && nextPosition.y == this.y) {
                return true;
            }
        }
        return false;
    }

    var Map = function (params) {
        this._params = params || {};
        this._settings = {
            x: 0,						        //the begin coordinates of map
            y: 0,
            size: 20,					        //the unit size of map
            data: [],					        //data of map
            stage: null,
            x_length: 0,
            y_length: 0,
            frames: 1,					    //speed level, how much frames when times change
            times: 0,					        //count of referesh canvas
            cache: false,    			    //whethew is static(set cache when static)
            update: function () { },		//update map data
            draw: function () { },		//draw map
        };
        _extend(this, this._settings, this._params);
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

    var Stage = function (params) {
        this._params = params || {};
        this._settings = {
            status: 0,                      //status, 0: inactive/over; 1: normal; 2: pause; 3:	temporary; 4: exception
            maps: [],					    //map queue
            audio: [],						//audio source
            images: [],					    //image source
            items: [],						//object queue
            timeout: 0,					    //Countdown(Used in the process of animation state judgment)
            update: function () { }		//Sniffer, processing layout under the relative relations between different objects
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

    Stage.prototype.getItemBySymbol = function (itemSymbol) {
        var itemType = 0;
        switch (itemSymbol) {
            case "E1":
            case "E2":
            case "E3":
            case "E4":
                itemType = 2;
                break;
            case "P":
                itemType = 1;
                break;
            default:
                itemType = 0;
                break;
        }

        var items = this.getItemsByType(itemType);
        var item = null;
        if (itemType == 1)
        {
            item = items[0];
        } else {
            item = items[parseInt(itemSymbol.substr(1)) - 1];
        }
                
        return item;
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
        if (!_events[eventType]) {
            _events[eventType] = {};
            window.addEventListener(eventType, function (e) {
                var key = 's' + _index;
                if (_events[eventType][key]) {
                    _events[eventType][key](e);
                }
                e.preventDefault();
            });
        }
        _events[eventType]['s' + this.index] = callback.bind(this);
    };

    Stage.prototype.setItemNextPosition = function (item, steps) {
        item.nx = item.coord.x;
        item.ny = item.coord.y;
        //0: right; 1: down; 2: left; 3: up
        var newOrientation = item.orientation;
        if (item.control != null && item.control.orientation != null) {
            newOrientation = item.control.orientation;
        }

        if (newOrientation == 0) {
            item.nx = item.coord.x + steps;
        } else if (newOrientation == 1) {
            item.ny = item.coord.y + steps;
        } else if (newOrientation == 2) {
            item.nx = item.coord.x - steps;
        } else if (newOrientation == 3) {
            item.ny = item.coord.y - steps;
        }
    };
    
    var _animationFrameFunction = function (timeStamp) {
        var stage = _stages[_index];
        if (_startTimeStamp == null) {
            _startTimeStamp = timeStamp;
        }

        if (timeStamp == _startTimeStamp) {
            _progress = 0;
        }

        _context.clearRect(0, 0, _.width, _.height);
        _progress++;
        if (stage.timeout) {
            stage.timeout--;
        }

        if (stage.update() != false) {
            stage.maps.forEach(function (map) {
                if (!(_progress % map.frames)) {
                    map.times = _progress / map.frames;
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

            var skipUpdate = false;
            stage.items.forEach(function (item) {
                skipUpdate = false;
                if (!(_progress % item.frames)) {
                    item.times = _progress / item.frames;
                }

                if (stage.status == 1 && item.status != 2) {
                    if (item.location) {
                        item.coord = item.location.position2coord(item.x, item.y);
                    }

                    if (item.timeout) {
                        item.timeout--;
                    }

                    if (item.actions.length > 0) {
                        while ((item.actions[0] && item.actions[0][0] == 0) && (item.nx == null || item.matchPosition())) {
                            if (item.nx == null || item.matchPosition()) {
                                item.control = { orientation: item.actions[0][1] };
                                item.actions.shift();
                            }
                        }

                        if (item.actions.length > 0 && (item.nx == null || item.matchPosition())) {
                            stage.setItemNextPosition(item, item.actions[0][1]);
                            item.actions.shift();
                        }
                    }

                    if (item.actions.length == 0 && item.matchPosition()) {
                        skipUpdate = true;
                    }

                    item.update(skipUpdate);
                }

                item.draw(_context, skipUpdate);
            });
        }

        _hander = requestAnimationFrame(_animationFrameFunction);
    };

    this.start = function () {
        _hander && cancelAnimationFrame(_hander);
        this._startTimeStamp = null;
        _stages[_index].status = 1;
        _stillRunning = true;
        _hander = requestAnimationFrame(_animationFrameFunction);
    };

    this.stop = function () {
        _hander && cancelAnimationFrame(_hander);
        _startTimeStamp = null;        
    };

    this.initItemsAction = function () {
        _stages[_index].items.forEach(function (item) {
            if (item.type == 1 || item.type == 2) {
                item.actions = [];
                item.nx = null;
                item.ny = null;
            }
        });
    };

    this.setItemAction = function (action, targetSymbol, actionValue) {
        //0: right; 1: down; 2: left; 3: up
        var item = _stages[_index].getItemBySymbol(targetSymbol);
        item.actions.push([action, actionValue]);
    };

    this.getPosition = function (e) {
        var box = $canvas.getBoundingClientRect();
        return {
            x: e.clientX - box.left * (_.width / box.width),
            y: e.clientY - box.top * (_.height / box.height)
        };
    };

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
        _hander && cancelAnimationFrame(_hander);
        _index = 0;
        this.start();
        _stages[_index].status = 2;
    };
};