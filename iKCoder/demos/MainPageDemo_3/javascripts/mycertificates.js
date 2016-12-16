'use strict';

window.addEventListener('load', onLoad);

function onLoad() {
    var advertsArray = [
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png",
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png",
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png"
    ];
    var certificateArray = [];
    buildHeader(false, advertsArray);
    buildMyCertificates(certificateArray);
    buildFooter();
};