'use strict';

var GameObject = function (params) {
    this._params = params || {};
    this._settings = {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        type: 0,                    //0: fixed item; 1: floating item; 2: NPC; 3: Player
        color: '#F00',
        status: 1,                  //0: pause; 1: normal; 2: new creating; 3: Removing; 4: fixing
        orientation_type: 0,    //0: 4 orientation; 1: 8 orientations; 2: angle model
        orientation: 0,             //0: left; 1: up; 2: right; 3: down; 4: up-left; 5: up-right; 6: down-right; 7: down-left
        speed_unit: 1,              //speed base pixel/second
        speed: 1,                     //
        location: null,
        coord: null,
        path: [],
        vector: null,
        size: null,
        stage: null,
        draw_type: 0,    //0: path; 1: image
        images: []
    };

    _Extend(this, this._settings, this._params);
};

GameObject.prototype.update = function () {

};

GameObject.prototype.draw = function () {

};

GameObject.prototype.bindEvent = function () {

};

_Inherits(GameObject, Rectangle);