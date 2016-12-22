'use strict';

var Stage = function (params) {
    this._params = params || {};
    this._settings = {
        items: []
    };

    this.game = null;
    this.resLoader = null;
    this.resources = [];
    this.map = null;
    this.npcs = [];
    this.player = null;
    this.running = true;

    _extend(this, this._settings, this._params);
};

Stage.prototype.init = function (game) {
    this.resLoader = new ResourceLoader(this.resources);
    this.game = game;
    this.map.setStage(this);
    this.player.setStage(this);
    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].setStage(this);
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].setStage(this);
    }
};

Stage.prototype.update = function () {
    this.map.update();
    this.player.update();
    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].update();
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].update();
    }
};

Stage.prototype.start = function () {
    window.requestAnimationFrame(this.randerFrame);
};

Stage.prototype.randerFrame = function () {
    this.map.draw();
    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].draw();
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].draw();
    }

    this.player.draw();

    if (this.running) {
        window.requestAnimationFrame(this.randerFrame);
    }
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
