'use strict';

var GameObject = function (params) {
    this.stage = params.stage ? params.stage : null;
    //0: fixed item; 1: floating item; 2: NPC; 3: Player
    this.type = params.type ? params.type : 0;
    //0: player; 1: enemy; 2: ally
    this.owner = params.owner ? params.owner : 0;
    //0: pause; 1: normal; 2: new creating; 3: removing; 4: fixing; 5: invincible; 6: weak；7: sforzato; 8: deleted
    this.status = params.status ? params.status : 1;
    //0: 4 orientation; 1: 8 orientations; 2: angle model
    this.orientation_type = params.orientation_type ? params.orientation_type : 0;
    //0: left; 1: up; 2: right; 3: down; 4: up-left; 5: up-right; 6: down-right; 7: down-left
    this.orientation = params.orientation ? params.orientation : 0;
    //speed base pixel/second
    this.speed_unit = params.speed_unit ? params.speed_unit : 1;
    this.speed = params.speed ? params.speed : 1;
    //just for the gridding games, like pac man.
    this.grid_map = params.gridMap ? params.gridMap : null;
    this.grid_position = null;
    //
    this.draw_config = params.drawCfg ? params.drawCfg : {
        //0: brush; 1: image
        type: 0,
        btushFun: function () { },
        imageFun: function () { }
    };

    EntityObject.call(this, p, s, a);
};

GameObject.prototype._update = function () {

};

GameObject.prototype._draw = function (context, styles) {

};

GameObject.prototype.bindEvent = function () {

};

GameObject.prototype.setStage = function (stage) {
    this.stage = stage;
};

_Inherits(GameObject, EntityObject);