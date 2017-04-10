'use strict';

// object used for configuration.
// should be called before the bootstrap.
var Scene = (function () {

    var constructGameWalls = function (rows, columns) {
        this.mapArray = [];
        this.rows = rows || 26;
        this.columns = columns || 26;
    };

    constructGameWalls.prototype.init = function () {
        // fill with 0
        for (var row = 0; row < this.rows; row++) {

            // create current row
            var curRow = new Array();
            this.mapArray.push(curRow);

            for (var column = 0; column < this.columns; column++) {
                curRow.push(0);
            }
        }
        this.repaintHome();
    };

    constructGameWalls.prototype.reset = function () {
        // fill with 0
        for (var row = 0; row < this.rows; row++) {
            for (var column = 0; column < this.columns; column++) {
                this.mapArray[row][column] = 0;
            }
        }
        this.repaintHome();
    };

    constructGameWalls.prototype.repaintHome = function () {
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

    constructGameWalls.prototype.setWall = function (wallType, x, min, max, x_or_y) {
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

    constructGameWalls.prototype.print = function () {
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

    constructGameWalls.prototype.setMapWall = function () {
        this.repaintHome();
        // Set the map for first stage
        map1 = this.mapArray;
    };

    var mapUnderConstruct = new constructGameWalls(26, 26);

    return {
        setMaxEnemy: function (_maxEnemy) {
            maxEnemy = _maxEnemy;
        },

        setMaxAppearEnemy: function (_maxAppearEnemy) {
            maxAppearEnemy = _maxAppearEnemy;
        },

        clearWalls: function () {
            mapUnderConstruct.reset();
        },

        drawLine: function (_wallType, x, min, max, reverseFlag) {
            mapUnderConstruct.setWall(_wallType, x, min, max, reverseFlag);
        },

        init: function (containerId) {
            this.createCanvas(containerId);
            initScreen(containerId);
            initObject();

            mapUnderConstruct.init();

            gameState = GAME_STATE_MENU;
            setInterval(gameLoop, 20);
        },

        startGame: function () {
            console.log('starting game');
            mapUnderConstruct.setMapWall();
        },

        endGame: function () {
        },

        printMap: function () {
            mapUnderConstruct.print();
        },

        createCanvas: function(containerId){
            this.container = document.getElementById(containerId);
            this.canvas={};
            if (this.container != null) {
                var idsArr = ["game_canvas","wallCanvas","tankCanvas","grassCanvas","overCanvas","stageCanvas"];
                for(var i=0;i<idsArr.length;i++){
                    var tmpCanvas = document.createElement("canvas");
                    tmpCanvas.id = idsArr[i];
                    tmpCanvas.style.position = 'absolute';
                    tmpCanvas.style.top = '0px';
                    tmpCanvas.style.left = '0px';
                    tmpCanvas.id = idsArr[i];
                    tmpCanvas.id = idsArr[i];
                    this.container.appendChild(tmpCanvas);
                    var height = this.container.clientHeight;
                    var width = this.container.clientWidth;
                    //var newSize = Scene.adjustSize(width, height);
                    //this.canvas.style.backgroundColor = "#000000";
                    //this.canvas.style.height = newSize.h + "px";
                    //this.canvas.style.width = newSize.w + "px";
                    tmpCanvas.style.height = height + "px";
                    tmpCanvas.style.width = width + "px";
                    this.canvas[idsArr[i]] = tmpCanvas;
                }
            }
        }
    };
})();
