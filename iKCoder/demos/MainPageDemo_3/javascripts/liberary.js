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
        container.css('transition', 'left 500ms');
        if (left % 295 != 0) {
            left = 295 * Math.floor(left / 295);
        }

        container.css('left', (left + 295) + 'px');
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
        container.css('transition', 'left 500ms');
        if (left % 295 != 0) {
            if (left > 0) {
                left = 295 * Math.floor(left / 295);
            } else {
                left = 295 * Math.ceil(left / 295);
            }
        }

        container.css('left', (left - 295) + 'px');
    }
};

function buildLiberary(cardObjArr) {
    var container = $('.library-items-container');
    if (container) {
        container.css('width', (295 * cardObjArr.length) + 'px');
        for (var i = 0; i < cardObjArr.length; i++) {
            var htmlStr = getLiberaryCardHTML(cardObjArr[i]);
            container.append($(htmlStr));
        }
    }

    $('div#libraryPrevPageBtn').click(movePrevCard);
    $('div#libraryNextPageBtn').click(moveNextCard);
};
