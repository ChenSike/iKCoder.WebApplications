﻿function loadAdverts(advertsArray) {
    var advertsArray = [
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png",
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png",
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png"
    ];

    var imgContainer = $("#header_adverts_images_container");
    var idxContainer = $("#header_adverts_images_index_container");
    if (imgContainer && idxContainer) {
        imgContainer[0].style.width = (1175 * advertsArray.length) + "px";
        var timeStep = Math.floor(100 / advertsArray.length);
        var animationArray = [];
        animationArray.push("0% {left: 0px;}");
        var currPerc = 0;
        var currLeft = 0;
        for (var i = 0; i < advertsArray.length; i++) {
            var newImg = $('<div id="header_adverts_' + i + '" class="page-header adverts image" style="background:url(' + advertsArray[i] + ')"></div>');
            var newIdx = $('<div id="header_adverts_index_' + i + '" class="text page-header adverts image index" index="' + (i + 1) + '"></div>');
            imgContainer.append(newImg);
            idxContainer.append(newIdx);
            //if (i < advertsArray.length - 1) {
            currPer = timeStep * (i + 1);
            animationArray.push[(currPer - 2) + "% {left: " + currLeft + "px;}"];
            currLeft += 1175;
            animationArray.push[currPer + "% {left: " + currLeft + "px;}"];
            //}
        }

        if (currPer != 100) {
            animationArray.push["100% {left: " + (1175 * advertsArray.length) + "px;}"];
        }

        var animationStr = animationArray.join(" ");
        var currRule = null;
        var currRules = null;
        var currentSheet = null;
        for (var i = 0; i < document.styleSheets.length; i++) {
            currentSheet = document.styleSheets[i];
            currRules = currentSheet.rules;
            for (var j = currRules.length - 1; j >= 0 ; j--) {
                currRule = document.styleSheets[i].rules[j];
                if (currRule.type == 7 && currRule.name == "advertsroll") {
                    currentSheet.deleteRule(j);
                }
            }
        }

        currentSheet.addRule("@keyframes advertsroll", animationStr);
    }
};