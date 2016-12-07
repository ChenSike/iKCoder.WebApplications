var Stage = function (params) {
    this._params = params || {};
    this._settings = {
        map: null,
        items: null,
        player: null,
        npcs: []
    };

    _extend(this, this._settings, this._params);
};