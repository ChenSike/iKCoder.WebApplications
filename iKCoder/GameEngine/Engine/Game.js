'use strict';

var Game = function (containerId, width, height) {
    this.container = document.getElementById(containerId);
    this.canvas = null;
    this.context = null;
    this.stages = [];
    this.openingScene = null;
    this.overScene = null;
    this.endScene = null;
    this.statusFun = null;
    //0: pause; 1: normal; 2:...
    this.status = 1;
    //0: static, like pac man; 1: horizontal move; 2:vertical move; 3: personal point of view; 4: 3D
    this.type = 0;
    this.score = 0;
    //1: single player; 2: two players; 3...
    this.model = 1;
    this.currentStage = this.stages[0];
    this.currentStageIndex = 0;
    this.scale = 1;
    this.originalHeight = height;
    this.originalWidth = width;
    if (this.container) {
        this.initCanvas();
    }
};

Game.ObjectGUID = 0;

Game.prototype.initCanvas = function () {
    var parentHeight = this.container.clientHeight;
    var parentWidth = this.container.clientWidth;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas_main";
    this.container.appendChild(canvas);
    this.canvas.width = parentWidth;
    this.canvas.height = parentHeight;
    this.context = this.canvas.getContext("2d");
    if (this.originalHeight != parentHeight || this.originalWidth != parentWidth) {
        var heightScale = parentHeight / this.originalHeight;
        var widthScale = parentWidth / this.originalWidth;
        this.scale = Math.min(heightScale, widthScale);
        var offsetTop = (parentHeight - this.originalHeight * this.scale) / 2;
        var offsetLeft = (parentWidth - this.originalWidth * this.scale) / 2;
        this.context.translate(offsetLeft, offsetTop);
        this.context.scale(this.scale, this.scale);
    }
};

Game.prototype.init = function (stages, openingScene, endScene, overScene, statusFunctions) {
    this.openingScene = openingScene;
    this.stages = stages;
    this.endScene = endScene;
    this.overScene = overScene;
    this.currentStageIndex = 0;
    this.currentStage = stages[0];
    this.currentStage.init(this);
    this.statusFun = statusFunctions;
};

Game.prototype.goStage = function (index) {
    if (index >= 0 && index < this.stages.length) {
        this.currentStageIndex = index;        
        this.currentStage = this.stages[this.currentStageIndex];
        this.currentStage.init(this);
    }
};

Game.prototype.goNextStage = function () {
    this.goStage(this.currentStageIndex + 1);
};

Game.prototype.goPrevStage = function () {
    this.goStage(this.currentStageIndex - 1);
};

Game.prototype.start = function () {
    this.openingScene.init(this);
    this.openingScene.load();
}

Game.prototype.end = function () {
    this.endScene.init(this);
    this.endScene.load();
}

Game.prototype.over = function () {
    this.overScene.init(this);
    this.overScene.load();
}

Game.prototype.pause = function () {
    this.currentStage.pause();
}

Game.prototype.run = function () {
    this.currentStage.run();
}

Game.prototype.restart = function () {
    this.currentStageIndex = 0;
    this.currentStage = this.stages[this.currentStageIndex];
    this.currentStage.init(this);
    this.currentStage.start();
}