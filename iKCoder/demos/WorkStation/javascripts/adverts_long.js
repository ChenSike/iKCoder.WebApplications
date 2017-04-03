'use strict';

function buildAdverts(advertsArray) {
    var _constWidth = 1175;
    var _constDuration = 5;
    var _constDelay = 4;
    var _constAnimStr = _constDuration + 's linear ' + _constDelay + 's 1 normal running';
    var _constImeAnimStr = _constDuration + 's linear 0s 1 normal running';
    var rootEl = $(".page-header.adverts");
    if (rootEl[0]) {
        var tmpHTMLStrArr = [];
        tmpHTMLStrArr.push('<div class="page-header adverts content">');
        tmpHTMLStrArr.push('    <div class="page-header adverts content container">');
        tmpHTMLStrArr.push('        <div id="header_adverts_images_container" class="page-header adverts images container">');
        tmpHTMLStrArr.push('            <div id="header_adverts_images_index_container">');
        tmpHTMLStrArr.push('            </div>');
        tmpHTMLStrArr.push('        </div>');
        tmpHTMLStrArr.push('    </div>');
        tmpHTMLStrArr.push('</div>');
        rootEl[0].innerHTML = tmpHTMLStrArr.join("");
    }

    var imgContainer = $("#header_adverts_images_container");
    var idxContainer = $("#header_adverts_images_index_container");
    if (imgContainer && idxContainer) {
        var timeStep = Math.floor(100 / advertsArray.length);
        var animationArray = [];
        animationArray.push("0% {left: 0px;}");
        var currPerc = 0;
        var currLeft = 0;
        for (var i = 0; i < advertsArray.length; i++) {
            var newImgId = 'header_adverts_item_' + i;
            var newIdxId = 'header_adverts_index_' + i;
            var newImg = $('<div id="' + newImgId + '" class="page-header adverts image item" style="background:url(' + advertsArray[i] + ')"></div>');
            var newIdx = $('<div id="' + newIdxId + '" class="text page-header adverts image index" index="' + (i + 1) + '"></div>');

            newIdx.mouseover(function () {
                $('.page-header.adverts.image.index').removeClass("hover");
                //var items = $('.page-header.adverts.image.item');
                //for (var i = 0; i < items.length; i++) {
                //}
                $('.page-header.adverts.image.item').css('animation', '');
                $('.page-header.adverts.image.item').css('left', _constWidth + 'px');
                var tmpArr = arguments[0].target.id.split('_');
                var currIdx = parseInt(tmpArr[tmpArr.length - 1]);
                //$('#header_adverts_item_' + currIdx).css('transition', 'left 1s');
                $('#header_adverts_item_' + currIdx).css('left', '0px');
            });

            newIdx.mouseout(function () {
                //$('.page-header.adverts.image.item').css('animationPlayState', 'running');
                $('.page-header.adverts.image.item').css('left', _constWidth + 'px');
                var tmpArr = arguments[0].target.id.split('_');
                var currIdx = parseInt(tmpArr[tmpArr.length - 1]);
                $('#header_adverts_item_' + currIdx).css('animation', 'advertsroll_0 ' + _constImeAnimStr);
            });

            imgContainer.append(newImg);
            idxContainer.append(newIdx);
            var animationFun = function () {
                var tmpArr = arguments[0].target.id.split('_');
                var tmpIdx = parseInt(tmpArr[tmpArr.length - 1]);
                var nextIdx = tmpIdx + 1;
                if (tmpIdx >= $('.page-header.adverts.image.item').length - 1) {
                    nextIdx = 0;
                }

                var nextImg = $('#header_adverts_item_' + nextIdx);
                if (nextImg.css('animationName') == "advertsroll_1" || nextImg.css('animationName') == "advertsroll_0") {
                    nextImg.css("animation", "advertsroll_2 " + _constAnimStr);
                } else {
                    nextImg.css("animation", "advertsroll_1 " + _constAnimStr);
                }

                $('.page-header.adverts.image.index').removeClass("hover");
                $('#header_adverts_index_' + tmpIdx).addClass("hover");
            };

            $('#' + newImgId)[0].addEventListener("webkitAnimationStart", animationFun);
        }

        $('#header_adverts_item_0').css("animation", "advertsroll_0 " + _constImeAnimStr);
    }
};