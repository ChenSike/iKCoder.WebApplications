'use strict';

function getLessonBasicHTML() {
    var basicHTMLStrArr = [];
    basicHTMLStrArr.push('<div class="mylessons-container">');
    basicHTMLStrArr.push('    <table>');
    basicHTMLStrArr.push('        <tr>');
    basicHTMLStrArr.push('            <td style="width:75px;"><div class="mylessons-symbol"></div></td>');
    basicHTMLStrArr.push('            <td style="width:225px;"><div class="text mylessons-title">我的课程 My Lessons</div></td>');
    basicHTMLStrArr.push('            <td style="width:135px;"><div id="lessonCatBasicBtn" class="text button mylessons-category current">Basic 基础</div></td>');
    basicHTMLStrArr.push('            <td style="width:135px;"><div id="lessonCatMathBtn" class="text button mylessons-category">Math 数学</div></td>');
    basicHTMLStrArr.push('            <td style="width:135px;"><div id="lessonCatEnglishBtn" class="text button mylessons-category">English 英语</div></td>');
    basicHTMLStrArr.push('            <td style="width:135px;"><div id="lessonCatLogicBtn" class="text button mylessons-category">Logic 逻辑</div></td>');
    basicHTMLStrArr.push('            <td style="width:135px;"><div id="lessonCatCompBtn" class="text button mylessons-category">Computer 计算机</div></td>');
    basicHTMLStrArr.push('            <td>');
    basicHTMLStrArr.push('                <div class="mylessons-level">');
    basicHTMLStrArr.push('                    <table>');
    basicHTMLStrArr.push('                        <tr>');
    basicHTMLStrArr.push('                            <td><div class="mylessons-level item level-g1"></div></td>');
    basicHTMLStrArr.push('                            <td><div class="mylessons-level item level-g2"></div></td>');
    basicHTMLStrArr.push('                            <td><div class="mylessons-level item level-g3"></div></td>');
    basicHTMLStrArr.push('                        </tr>');
    basicHTMLStrArr.push('                    </table>');
    basicHTMLStrArr.push('                </div>');
    basicHTMLStrArr.push('            </td>');
    basicHTMLStrArr.push('        </tr>');
    basicHTMLStrArr.push('        <tr>');
    basicHTMLStrArr.push('            <td colspan="8" style="height:30px;">');
    basicHTMLStrArr.push('                <div class="mylessons-part-title">');
    basicHTMLStrArr.push('                    <div class="text mylessons-part-title-item title">当前进行的课程</div>');
    basicHTMLStrArr.push('                    <div id="lessonCurrCmpBtn" class="text button mylessons-part-title-item selection selected">完成</div>');
    basicHTMLStrArr.push('                    <div id="lessonCurrUnCmpBtn" class="text button mylessons-part-title-item selection">未完成</div>');
    basicHTMLStrArr.push('                    <div class="text mylessons-part-title-item paging">');
    basicHTMLStrArr.push('                        <span id="lessonCurrCurrent">4</span>/<span id="lessonCurrTotal">16</span>');
    basicHTMLStrArr.push('                    </div>');
    basicHTMLStrArr.push('                </div>');
    basicHTMLStrArr.push('            </td>');
    basicHTMLStrArr.push('        </tr>');
    basicHTMLStrArr.push('        <tr>');
    basicHTMLStrArr.push('            <td colspan="8" style="height:410px;">');
    basicHTMLStrArr.push('                <div class="mylessons-part-content learning">');
    basicHTMLStrArr.push('                    <table>');
    basicHTMLStrArr.push('                        <tr>');
    basicHTMLStrArr.push('                            <td>');
    basicHTMLStrArr.push('                                <div id="lessonCurrPrevBtn" class="button trianglebutton container">');
    basicHTMLStrArr.push('                                    <div class="trianglebutton horizontal-back left">');
    basicHTMLStrArr.push('                                        <div class="trianglebutton horizontal-fore left"></div>');
    basicHTMLStrArr.push('                                    </div>');
    basicHTMLStrArr.push('                                </div>');
    basicHTMLStrArr.push('                            </td>');
    basicHTMLStrArr.push('                            <td>');
    basicHTMLStrArr.push('                                <div class="mylessons-part-content-screen learning">');
    basicHTMLStrArr.push('                                    <div class="mylessons-part-content-container learning">');
    basicHTMLStrArr.push('                                    </div>');
    basicHTMLStrArr.push('                                </div>');
    basicHTMLStrArr.push('                            </td>');
    basicHTMLStrArr.push('                            <td>');
    basicHTMLStrArr.push('                                <div id="lessonCurrNextBtn" class="button trianglebutton container">');
    basicHTMLStrArr.push('                                    <div class="trianglebutton horizontal-back right">');
    basicHTMLStrArr.push('                                        <div class="trianglebutton horizontal-fore right"></div>');
    basicHTMLStrArr.push('                                    </div>');
    basicHTMLStrArr.push('                                </div>');
    basicHTMLStrArr.push('                            </td>');
    basicHTMLStrArr.push('                        </tr>');
    basicHTMLStrArr.push('                    </table>');
    basicHTMLStrArr.push('                </div>');
    basicHTMLStrArr.push('            </td>');
    basicHTMLStrArr.push('        </tr>');
    basicHTMLStrArr.push('        <tr>');
    basicHTMLStrArr.push('            <td colspan="8" style="height:30px;">');
    basicHTMLStrArr.push('                <div class="mylessons-part-title">');
    basicHTMLStrArr.push('                    <div class="text mylessons-part-title-item title">历史课程</div>');
    basicHTMLStrArr.push('                </div>');
    basicHTMLStrArr.push('            </td>');
    basicHTMLStrArr.push('        </tr>');
    basicHTMLStrArr.push('        <tr>');
    basicHTMLStrArr.push('            <td colspan="8" style="height:410px;">');
    basicHTMLStrArr.push('                <div class="mylessons-part-content history">');
    basicHTMLStrArr.push('                    <table>');
    basicHTMLStrArr.push('                        <tr>');
    basicHTMLStrArr.push('                            <td>');
    basicHTMLStrArr.push('                                <div id="lessonHistPrevBtn" class="button trianglebutton container">');
    basicHTMLStrArr.push('                                    <div class="trianglebutton horizontal-back left">');
    basicHTMLStrArr.push('                                        <div class="trianglebutton horizontal-fore left"></div>');
    basicHTMLStrArr.push('                                    </div>');
    basicHTMLStrArr.push('                                </div>');
    basicHTMLStrArr.push('                            </td>');
    basicHTMLStrArr.push('                            <td>');
    basicHTMLStrArr.push('                                <div class="mylessons-part-content-screen history">');
    basicHTMLStrArr.push('                                    <div class="mylessons-part-content-container history">');
    basicHTMLStrArr.push('                                    </div>');
    basicHTMLStrArr.push('                                </div>');
    basicHTMLStrArr.push('                            </td>');
    basicHTMLStrArr.push('                            <td>');
    basicHTMLStrArr.push('                                <div id="lessonHistNextBtn" class="button trianglebutton container">');
    basicHTMLStrArr.push('                                    <div class="trianglebutton horizontal-back right">');
    basicHTMLStrArr.push('                                        <div class="trianglebutton horizontal-fore right"></div>');
    basicHTMLStrArr.push('                                    </div>');
    basicHTMLStrArr.push('                                </div>');
    basicHTMLStrArr.push('                            </td>');
    basicHTMLStrArr.push('                        </tr>');
    basicHTMLStrArr.push('                    </table>');
    basicHTMLStrArr.push('                </div>');
    basicHTMLStrArr.push('            </td>');
    basicHTMLStrArr.push('        </tr>');
    basicHTMLStrArr.push('    </table>');
    basicHTMLStrArr.push('</div>');
    return basicHTMLStrArr.join("");
};

function getLessonCardHTML(cardObj) {
    var cardHTMLStrArr = [];
    var status = cardObj.rate == 100 ? "完成" : "未完成";
    var rate = cardObj.rate + "%";
    cardHTMLStrArr.push('<div class="mylessons-part-content-item">');
    cardHTMLStrArr.push('    <div class="text mylessons-item-border">');
    cardHTMLStrArr.push('        <div class="mylessons-item-part item-title">');
    cardHTMLStrArr.push('            <div class="mylessons-item-part item-title-text">' + status + '</div>');
    cardHTMLStrArr.push('            <div class="mylessons-item-part item-title-progress">');
    cardHTMLStrArr.push('                <div class="item-title-progress-rate" style="width:' + cardObj.rate + '%"></div>');
    cardHTMLStrArr.push('                <div class="item-title-progress-rate-text">' + rate + '</div>');
    cardHTMLStrArr.push('            </div>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="mylessons-item-part screen-shot" style="background: url(' + cardObj.img + ');"></div>');
    cardHTMLStrArr.push('        <div class="mylessons-item-part item-name">');
    cardHTMLStrArr.push('               <table>');
    cardHTMLStrArr.push('                   <tr>');
    cardHTMLStrArr.push('                       <td>');
    cardHTMLStrArr.push('                           <div class="mylessons-item-part item-name chinese">' + cardObj.cname + '</div>');
    cardHTMLStrArr.push('                       </td>');
    cardHTMLStrArr.push('                       <td rowspan="2" style="width:100px;">');
    cardHTMLStrArr.push('                           <div class="button mylessons-item-part item-name moreinfo">更多信息</div>');
    cardHTMLStrArr.push('                       </td>');
    cardHTMLStrArr.push('                   </tr>');
    cardHTMLStrArr.push('                   <tr>');
    cardHTMLStrArr.push('                       <td>');
    cardHTMLStrArr.push('                           <div class="mylessons-item-part item-name english">' + cardObj.ename + '</div>');
    cardHTMLStrArr.push('                       </td>');
    cardHTMLStrArr.push('                   </tr>');
    cardHTMLStrArr.push('               </table>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="mylessons-item-part item-note">');
    cardHTMLStrArr.push('            <table>');
    cardHTMLStrArr.push('                <tr>');
    cardHTMLStrArr.push('                    <td style="width:60px;">');
    cardHTMLStrArr.push('                        <div class="item-note difficulty-icon-' + cardObj.diff + '"></div>');
    cardHTMLStrArr.push('                    </td>');
    cardHTMLStrArr.push('                    <td></td>');
    cardHTMLStrArr.push('                    <td style="width:80px;">');
    cardHTMLStrArr.push('                        <div class="item-note difficulty">场景 : <span>' + cardObj.scenecount + '</span></div>');
    cardHTMLStrArr.push('                    </td>');
    cardHTMLStrArr.push('                </tr>');
    cardHTMLStrArr.push('            </table>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="mylessons-item-part item-start">');
    cardHTMLStrArr.push('           <div class="button mylessons-item-part item-start">Start 开始</div>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('        <div class="mylessons-item-part item-split"></div>');
    cardHTMLStrArr.push('        <div class="mylessons-item-part item-recommend">');
    cardHTMLStrArr.push('            <div class="item-recommend container">');
    cardHTMLStrArr.push('                <div class="item-recommend fast-recommend">推荐给朋友</div>');
    cardHTMLStrArr.push('                <div class="item-recommend fast-remove">从课程中移除</div>');
    cardHTMLStrArr.push('            </div>');
    cardHTMLStrArr.push('        </div>');
    cardHTMLStrArr.push('    </div>');
    cardHTMLStrArr.push('</div>');

    return cardHTMLStrArr.join("");
};

function movePrevCard(eventObj) {
    var container = $('.mylessons-part-content-container.' + eventObj.data);
    var left = parseInt(container.css('left'));
    if (left < 0) {
        //$('div#libraryPrevPageBtn').unbind();
        //$('div#libraryNextPageBtn').unbind();
        container.css('left', (left + 270) + 'px');
        for (var i = 0; i < _cssPrefixArr.length; i++) {
            container.css(_cssPrefixArr[i] + 'transition', 'left 500ms');
        }

        if (left % 270 != 0) {
            left = 270 * Math.floor(left / 270);
        }

        //this.addEventListener("webkitTransitionEnd", function () {
        //    $('div#libraryPrevPageBtn').click(movePrevCard);
        //    $('div#libraryNextPageBtn').click(moveNextCard);
        //});
    }
};

function moveNextCard(eventObj) {
    var container = $('.mylessons-part-content-container.' + eventObj.data);
    var left = parseInt(container.css('left'));
    var width = parseInt(container.css('width'));
    if ((width - Math.abs(left)) / 270 > 4) {
        for (var i = 0; i < _cssPrefixArr.length; i++) {
            container.css(_cssPrefixArr[i] + 'transition', 'left 500ms');
        }

        if (left % 270 != 0) {
            if (left > 0) {
                left = 270 * Math.floor(left / 270);
            } else {
                left = 270 * Math.ceil(left / 270);
            }
        }

        container.css('left', (left - 270) + 'px');
    }
};

function buildLessons(learningArr, historyArr) {
    var parent = $('.page-content');
    parent.append($(getLessonBasicHTML()));
    var container = $('.mylessons-part-content-container.learning');
    if (container) {
        container.css('width', (270 * learningArr.length) + 'px');
        for (var i = 0; i < learningArr.length; i++) {
            var htmlStr = getLessonCardHTML(learningArr[i]);
            container.append($(htmlStr));
        }
    }

    container = $('.mylessons-part-content-container.history');
    if (container) {
        historyArr.reverse();
        container.css('width', (270 * historyArr.length) + 'px');
        for (var i = 0; i < historyArr.length; i++) {
            var htmlStr = getLessonCardHTML(historyArr[i]);
            container.append($(htmlStr));
        }
    }

    $('div#lessonCurrPrevBtn').click('learning', movePrevCard);
    $('div#lessonCurrNextBtn').click('learning', moveNextCard);
    $('div#lessonHistPrevBtn').click('history', movePrevCard);
    $('div#lessonHistNextBtn').click('history', moveNextCard);
};
