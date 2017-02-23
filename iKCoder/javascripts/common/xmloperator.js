function LoadXMLFile(fileName) {
    var xmlDom = null;
    if (window.ActiveXObject) {
        xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.async = "false";
        xmlDom.load(fileName);
    } else if (document.implementation && document.implementation.createDocument) {
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", fileName, false);
        xmlhttp.send(null);
        xmlDom = xmlhttp.responseXML;
    } else {
        xmlDom = null;
    }
    return xmlDom;
};

function XMLToString(xmlDoc) {
    if (window.ActiveXObject) {
        return xmlDoc.xml;
    } else {
        return (new XMLSerializer()).serializeToString(xmlDoc);
    }
};