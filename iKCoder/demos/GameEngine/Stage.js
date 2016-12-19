'use strict';

var Stage = function (params) {
    this._params = params || {};
    this._settings = {
        items:[]
    };

    this.resLoader = null;
    this.resources = [];
    this.map = null;
    this.npcs = [];
    this.player = null;

    _extend(this, this._settings, this._params);
};

Stage.prototype.init = function (game) {
    this.resLoader = new ResourceLoader(this.resources);
    this.game = game;
    this.map.setStage();
    this.player.setStage();
    for (var i = 0; i < this.npcs.length; i++) {
        this.npcs[i].setStage();
    }

    for (var i = 0; i < this.items.length; i++) {
        this.items[i].setStage();
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