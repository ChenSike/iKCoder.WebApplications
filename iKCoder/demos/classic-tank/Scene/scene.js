'use strict';

// object used for configuration.
// should be called before the bootstrap.
var Scene = (function() {

    var constructGameWalls = function(rows, columns) {
        this.mapArray = [];
        this.rows = rows || 26;
        this.columns = columns || 26;
    };

    // FIXME need to take back the codes
    constructGameWalls.prototype.init = function() {
        // fill with 0
        for (var row = 0; row < this.rows; row++) {

            // create current row
            for (var column = 0; column < this.columns; column++) {
                curRow.push(0);
            }
        }
        this.repaintHome();
    };

    constructGameWalls.prototype.reset = function() {
        // fill with 0
        for (var row = 0; row < this.rows; row++) {
            for (var column = 0; column < this.columns; column++) {
                this.mapArray[row][column] = 0;
            }
        }
        this.repaintHome();
    };

    constructGameWalls.prototype.repaintHome = function() {
        // draw home

        // line up home
        this.mapArray[this.mapArray.length - 2 - 1][this.mapArray.length / 2] = 1;
        this.mapArray[this.mapArray.length - 2 - 1][this.mapArray.length / 2 - 1] = 1;
        this.mapArray[this.mapArray.length - 2 - 1][this.mapArray.length / 2 + 1] = 1;
        this.mapArray[this.mapArray.length - 2 - 1][this.mapArray.length / 2 + 2] = 1;

        // line where home is
        this.mapArray[this.mapArray.length - 2][this.mapArray.length / 2] = 9;
        this.mapArray[this.mapArray.length - 2][this.mapArray.length / 2 - 1] = 1;
        this.mapArray[this.mapArray.length - 2][this.mapArray.length / 2 + 1] = 8;
        this.mapArray[this.mapArray.length - 2][this.mapArray.length / 2 + 2] = 1;

        // line below home
        this.mapArray[this.mapArray.length - 2 + 1][this.mapArray.length / 2] = 8;
        this.mapArray[this.mapArray.length - 2 + 1][this.mapArray.length / 2 - 1] = 1;
        this.mapArray[this.mapArray.length - 2 + 1][this.mapArray.length / 2 + 1] = 8;
        this.mapArray[this.mapArray.length - 2 + 1][this.mapArray.length / 2 + 2] = 1;
    };

    constructGameWalls.prototype.setWall = function(wallType, x, min, max, x_or_y) {
        // draw multiple lines
        if (Object.prototype.toString.call(x) === '[object Array]') {
            for (var i = 0; i < x.length; i++)
                this.setWall(wallType, x[i], min, max, x_or_y);
        } else {
            // draw a line
            for (var i = min; i < max; i++) {
                if (x_or_y === 1) {
                    this.mapArray[i][x] = wallType;
                } else {
                    this.mapArray[x][i] = wallType;
                }
            }
        }

    };

    constructGameWalls.prototype.print = function() {
        var map2Print = '';
        for (var i = 0; i < this.rows; i++) {
            map2Print += '#' + i + 'line ===> ';
            for (var j = 0; j < this.columns; j++) {
                map2Print += this.mapArray[i][j] + ' ';
            }
            map2Print += '\n';
        }

        console.log(map2Print);
    };

    constructGameWalls.prototype.setMapWall = function() {
        this.repaintHome();
        // Set the map for first stage
        map1 = this.mapArray;
    };

    var mapUnderConstruct = new constructGameWalls(26, 26);

    return {
        setMaxEnemy: function(_maxEnemy) {
            maxEnemy = _maxEnemy;
        },

        setMaxAppearEnemy: function(_maxAppearEnemy) {
            maxAppearEnemy = _maxAppearEnemy;
        },

        clearWalls: function() {
            mapUnderConstruct.reset();
        },

        drawLine: function(_wallType, x, min, max, reverseFlag) {
            mapUnderConstruct.setWall(_wallType, x, min, max, reverseFlag);
        },
        init: function() {
            // clear canvases from engine
            // FIXME
            initScreen();
            // clear variables from engine
            // FIXME
            initObject();

            gameState = GAME_STATE_INIT;
            map.mapLevel = map1;
            stage.draw();
            map.draw();
        },

        startGame: function() {
            console.log('starting game');
            // mapUnderConstruct.setMapWall();
            Scene.Animate();
        },

        endGame: function() {},

        printMap: function() {
            mapUnderConstruct.print();
        },

        Animate: function() {
            // Scene.init();
            Engine.animate();
        },

        interpreter: function(interpreter, scope) {
            Engine.initInterpreter(interpreter);
            interpreter.setProperty(scope, 'moveForward', interpreter.createNativeFunction(function(id) {
                Engine.do('move', true);
            }));
            interpreter.setProperty(scope, 'turnLeft', interpreter.createNativeFunction(function(id) {
                Engine.do('turnLeft', true);
            }));
            interpreter.setProperty(scope, 'turnRight', interpreter.createNativeFunction(function(id) {
                Engine.do('turnRight', true);
            }));
            interpreter.setProperty(scope, 'isHitWall', interpreter.createNativeFunction(function(id) {
                Engine.do('isHitWall');
            }));
            interpreter.setProperty(scope, 'isHitIce', interpreter.createNativeFunction(function(id) {
                Engine.do('isHitIce');
            }));
            interpreter.setProperty(scope, 'isHitGrass', interpreter.createNativeFunction(function(id) {
                Engine.do('isHitGrass');
            }));
            interpreter.setProperty(scope, 'shoot', interpreter.createNativeFunction(function(id) {
                Engine.do('shoot', true);
            }));
            interpreter.setProperty(scope, 'enableKeyboardControl', interpreter.createNativeFunction(function(id) {
                Engine.do('enableKeyboardControl', true);
            }));
        }
    };
})();
