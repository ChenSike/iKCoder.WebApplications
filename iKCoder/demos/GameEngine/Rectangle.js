var Rectangle = function (param) {
    this._params = params || {};
    this._settings = {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        angle: 0
    };

    _extend(this, this._params);
}

