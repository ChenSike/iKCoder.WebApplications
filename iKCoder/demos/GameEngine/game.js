'use strict';

var Game = function (containerId) {
    this.container = document.getElementById(containerId);
    this.canvas = null;
    this.context = null;
    this.stage = null;

    if (this.container) {
        this.initCanvas();
    }
};

Game.coordTransition = function (x, y) {

}

Game.prototype.initCanvas = function () {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas_main";
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    this.container.appendChild(canvas);
    this.context = this.canvas.getContext("2d");
};

Game.prototype.initObjects = function () {
    this.stage.init();
};