'use strict';

function getCertificateBasicHTML() {
    var certHTMLStrArr = [];
    return certHTMLStrArr.join("");
};

function getCertificateCardHTML(cardObj) {
    var cardHTMLStrArr = [];
    return cardHTMLStrArr.join("");
};

function buildMyCertificates(certificateArr) {
    var parent = $('.page-content');
    parent.append($(getCertificateBasicHTML()));
    //var container = $('.mycertificate-part-content-container');
    //if (container) {
    //    container.css('width', (270 * learningArr.length) + 'px');
    //    for (var i = 0; i < learningArr.length; i++) {
    //        var htmlStr = getLessonCardHTML(learningArr[i]);
    //        container.append($(htmlStr));
    //    }
    //}
};
