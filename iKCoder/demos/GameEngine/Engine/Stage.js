'use strict';

var Stage = function () {
    this.game = null;
    this.resLoader = null;
    this.resources = [];
    this.map = null;
    this.players = [];
    this.npcs = [];
    this.items = [];
    this.scoreBoard = null;
    this.lifeBorad = null;
    this.statusBoard = null;
    this.running = true;
};

Stage.prototype.setMap = function (map) {
    this.map = map;
};

Stage.prototype.addPlayer = function (palyer) {
    this.palyers.push(palyer);
};

Stage.prototype.addNPC = function (npc) {
    this.npcs.push(npc);
};

Stage.prototype.addItem = function (item) {
    this.items.push(item);
};

Stage.prototype.removeItem = function (item) {
    this.items.push(item);
};

Stage.prototype.init = function (game) {
    this.resLoader = new ResourceLoader(this.resources);
    this.game = game;
    this.map.setStage(this);
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].setStage(this);
    }

    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].setStage(this);
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].setStage(this);
    }
};

Stage.prototype.update = function () {
    this.map.update();
    for (var i = 0; i < this.players.length; i++) {
        this.players[i].update();
    }

    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].update();
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].update();
    }
};

Stage.prototype.draw = function () {
    this.map.draw();
    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].draw();
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].draw();
    }

    for (var i = 0; i < this.players.length; i++) {
        this.players[i].draw();
    }
};

Stage.prototype.randerFrame = function () {
    this.update();
    this.draw();
    if (this.running) {
        window.requestAnimationFrame(this.randerFrame);
    }
};

Stage.prototype.start = function () {
    window.requestAnimationFrame(this.randerFrame);
};

Stage.prototype.pause = function () {
    this.running = false;
};

Stage.prototype.run = function () {
    this.running = true;
    window.requestAnimationFrame(this.randerFrame);
};

Stage.prototype.restart = function () {
    window.cancelAnimationFrame(this.randerFrame);
    this.init(this.game);
    window.requestAnimationFrame(this.randerFrame);
};
