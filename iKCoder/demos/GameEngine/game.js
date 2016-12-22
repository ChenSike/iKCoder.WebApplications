﻿'use strict';

var Game = function (containerId) {
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
    if (this.container) {
        this.initCanvas();
    }
};

Game.ObjectGUID = 0;

Game.prototype.initCanvas = function () {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas_main";
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    this.container.appendChild(canvas);
    this.context = this.canvas.getContext("2d");
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

Game.prototype.goNextStage = function () {
    if (this.currentStageIndex < this.stages.length - 1) {
        this.currentStageIndex++;
        this.currentStage = this.stages[this.currentStageIndex];
        this.currentStage.init(this);
    }
};

Game.prototype.goPrevStage = function () {
    if (this.currentStageIndex > 0) {
        this.currentStageIndex--;
        this.currentStage = this.stages[this.currentStageIndex];
        this.currentStage.init(this);
    }
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