var JSON2XML = function (jsonObj) {
    this.dataObj = jsonObj;
    this.xmlStrArr = [];
}

JSON2XML.prototype.parseToXML = function (tagName, index) {
    this.xmlStrArr.push('<' + tagName + '>');
    if (this.dataObj === null) {
        this.xmlStrArr.push('NULL');
    } else if (typeof this.dataObj.splice == "function") {
        for (var i = 0; i < this.dataObj.length; i++) {
            var tmpParser = new JSON2XML(this.dataObj[i]);
            this.xmlStrArr.push(tmpParser.parseToXML(tagName + '_' + (i + 1)));
        }
    } else if (typeof this.dataObj == "object") {
        for (var key in this.dataObj) {
            var tmpParser = new JSON2XML(this.dataObj[key])();
            this.xmlStrArr.push(tmpParser.parseToXML(key));
        }
    } else {
        this.xmlStrArr.push(this.dataObj.toString());
    }

    this.xmlStrArr.push('</' + tagName + '>');
    return this.xmlStrArr.join('');
};