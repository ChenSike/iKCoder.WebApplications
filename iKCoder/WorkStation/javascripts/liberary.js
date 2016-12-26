'use strict';

function getLiberaryCardHTML(cardObj) {
    var cardHTMLStrArr = [];
    var status = cardObj.rate == 100 ? "完成" : "未完成";
    var rate = cardObj.rate + "%";
    cardHTMLStrArr.push('<div class="library-item-container">');
    cardHTMLStrArr.push('    <div class="text library-item-border">');
    cardHTMLStrArr.push('        <div class="library-item-part item-title">');
    cardHTMLStrArr.push('            <div class="library-item-part item-title-text">' + status + '</div>');
    cardHTMLStrArr.push('            <div class="library-item-part item-title-progress">');
    cardHTMLStrArr.push('                <div class="item-title-progress-rate" style="width:' + cardObj.rate + '%"></div>');
    cardHTMLStrArr.push('                <div class="item-title-progress-rate-text">' + rate + '</div>');
    cardHTMLStrArr.push('            </div>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="library-item-part screen-shot" style="background: url(' + cardObj.img + ');"></div>');
    cardHTMLStrArr.push('        <div class="library-item-part item-name">');
    cardHTMLStrArr.push('            <span style="line-height: 40px; padding-left: 10px;">' + cardObj.name + '</span>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="library-item-part item-note">');
    cardHTMLStrArr.push('            <table>');
    cardHTMLStrArr.push('                <tr>');
    cardHTMLStrArr.push('                    <td>');
    cardHTMLStrArr.push('                        <div class="item-note knowledge">' + cardObj.note + '</div>');
    cardHTMLStrArr.push('                    </td>');
    cardHTMLStrArr.push('                    <td rowspan="3" style="width:60px;">');
    cardHTMLStrArr.push('                        <div class="item-note difficulty-icon-' + cardObj.diff + '"></div>');
    cardHTMLStrArr.push('                    </td>');
    cardHTMLStrArr.push('                </tr>');
    cardHTMLStrArr.push('                <tr>');
    cardHTMLStrArr.push('                    <td>');
    cardHTMLStrArr.push('                        <div class="item-note difficulty">难度 <span>' + cardObj.diffName + '</span></div>');
    cardHTMLStrArr.push('                    </td>');
    cardHTMLStrArr.push('                </tr>');
    cardHTMLStrArr.push('                <tr>');
    cardHTMLStrArr.push('                    <td></td>');
    cardHTMLStrArr.push('                </tr>');
    cardHTMLStrArr.push('            </table>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="library-item-part item-point">');
    cardHTMLStrArr.push(cardObj.point);
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="library-item-part item-split"></div>');
    cardHTMLStrArr.push('        <div class="library-item-part item-begin">');
    cardHTMLStrArr.push('            <div class="item-begin container">');
    cardHTMLStrArr.push('                <div class="item-begin fast-begin">开始</div>');
    cardHTMLStrArr.push('                <div class="item-begin fast-delete">快速移除</div>');
    cardHTMLStrArr.push('            </div>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('    </div>');
    cardHTMLStrArr.push('</div>');

    return cardHTMLStrArr.join("");
}

function movePrevCard() {
    var container = $('.library-items-container');
    var left = parseInt(container.css('left'));
    if (left < 0) {
        //$('div#libraryPrevPageBtn').unbind();
        //$('div#libraryNextPageBtn').unbind();
        if (left % 295 != 0) {
            left = 295 * Math.floor(left / 295);
        }

        container.css('left', (left + 295) + 'px');
        for (var i = 0; i < _cssPrefixArr.length; i++) {
            container.css(_cssPrefixArr[i] + 'transition', 'left 500ms');
        }
        //this.addEventListener("webkitTransitionEnd", function () {
        //    $('div#libraryPrevPageBtn').click(movePrevCard);
        //    $('div#libraryNextPageBtn').click(moveNextCard);
        //});
    }
};

function moveNextCard() {
    var container = $('.library-items-container');
    var left = parseInt(container.css('left'));
    var width = parseInt(container.css('width'));
    if ((width - Math.abs(left)) / 295 > 4) {
        if (left % 295 != 0) {
            if (left > 0) {
                left = 295 * Math.floor(left / 295);
            } else {
                left = 295 * Math.ceil(left / 295);
            }
        }

        container.css('left', (left - 295) + 'px');
        for (var i = 0; i < _cssPrefixArr.length; i++) {
            container.css(_cssPrefixArr[i] + 'transition', 'left 500ms');
        }
    }
};

function buildLiberary(cardObjArr) {
    var parent = $('.page-content.library');
    var libraryHtmlStrArr = [];
    libraryHtmlStrArr.push('<table>');
    libraryHtmlStrArr.push('    <tr>');
    libraryHtmlStrArr.push('        <td style="height:50px;width:150px;">');
    libraryHtmlStrArr.push('            <div class="text library-title">Library 主题库</div>');
    libraryHtmlStrArr.push('        </td>');
    libraryHtmlStrArr.push('        <td style="width:50px;">');
    libraryHtmlStrArr.push('            <div id="libraryPrevPageBtn" class="button triangleBgButton container">');
    libraryHtmlStrArr.push('                <div class="triangleBgButton horizontal-fore left"></div>');
    libraryHtmlStrArr.push('            </div>');
    //libraryHtmlStrArr.push('            <div id="libraryPrevPageBtn"></div>');
    libraryHtmlStrArr.push('        </td>');
    libraryHtmlStrArr.push('        <td style="width:50px;">');
    libraryHtmlStrArr.push('            <div id="libraryNextPageBtn" class="button triangleBgButton container">');
    libraryHtmlStrArr.push('                <div class="triangleBgButton horizontal-fore right"></div>');
    libraryHtmlStrArr.push('            </div>');
    //libraryHtmlStrArr.push('            <div id="libraryNextPageBtn"></div>');
    libraryHtmlStrArr.push('        </td>');
    libraryHtmlStrArr.push('        <td></td>');
    libraryHtmlStrArr.push('    </tr>');
    libraryHtmlStrArr.push('    <tr>');
    libraryHtmlStrArr.push('        <td colspan="4">');
    libraryHtmlStrArr.push('            <div class="library-items-screen">');
    libraryHtmlStrArr.push('                <div class="library-items-container"></div>');
    libraryHtmlStrArr.push('            </div>');
    libraryHtmlStrArr.push('            <div class="library-background"></div>');
    libraryHtmlStrArr.push('        </td>');
    libraryHtmlStrArr.push('    </tr>');
    libraryHtmlStrArr.push('</table>');
    parent.append($(libraryHtmlStrArr.join('')));
    var container = $('.library-items-container');
    if (container) {
        container.css('width', (295 * cardObjArr.length) + 'px');
        for (var i = 0; i < cardObjArr.length; i++) {
            var htmlStr = getLiberaryCardHTML(cardObjArr[i]);
            container.append($(htmlStr));
        }
        //for transition load
        var left = parseInt(container.css('left'));
        container.css('left', (left - 1) + 'px');
        for (var i = 0; i < _cssPrefixArr.length; i++) {
            container.css(_cssPrefixArr[i] + 'transition', 'left 500ms');
        }
        container.css('left', (left + 1) + 'px');
    }

    $('div#libraryPrevPageBtn').click(movePrevCard);
    $('div#libraryNextPageBtn').click(moveNextCard);
};
