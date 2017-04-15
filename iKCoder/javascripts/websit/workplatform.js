'use strict';

var _wordsData = [];
var _workspaceCfg = {};

function initEvents() {
    $('#btn_Footer_Logo').on('click', function (e) {
        window.location.href = "index.html";
    });

    $('#btn_SiderBar_Expand').on('click', function () {
        siderBarExpand();
    });

    $(document).mouseup(function () {
        $(document).unbind("mousemove");
        var dragProxy = $(".siderbar-drag-proxy")
        if (dragProxy.css("display") != "none") {
            var left = dragProxy.offset().left;
            var tmpWidth = $("body").width() - left - dragProxy.width() - $(".siderbar-drag").width() - $('#btn_SiderBar_Expand').width();
            if (tmpWidth < 425) {
                tmpWidth = 425;
            }

            $(".siderbar-wrap").width(tmpWidth);
            $(".siderbar-wrap").css("left", $("body").width() - tmpWidth + "px");
            $(".siderbar-drag-proxy").css("display", "none");
            $(".siderbar-drag-proxy").css("visibility", "hidden");
            adjustWorkSpaceTitle();
        }
    });

    $(document).keydown(function () {
        if (arguments[0].keyCode == '27' && $('.run-scene-fullscreen').css('display') != 'none') {
            $('.run-scene-fullscreen').hide("slow", function () {
                $('.siderbar-scene-container').append($('#game_container'));
            });
        }
    });

    $(".siderbar-drag").mousedown(function (e) {
        if ($(".siderbar-drag").hasClass('expanded')) {
            $(".siderbar-drag-proxy").css("display", "block");
            $(".siderbar-drag-proxy").css("visibility", "visible");
            $(".siderbar-drag-proxy").height($(".siderbar-drag").height());
            $(".siderbar-drag-proxy").css("top", $(".siderbar-drag").offset().top + "px");
            $(".siderbar-drag-proxy").css("left", $(".siderbar-drag").offset().left + "px");
            siderBarDrag(e);
        }
    });

    $('.footer-tool-item').on('click', function (e) {
        $('.footer-tool-item').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        if ($(e.currentTarget).attr('id') == 'btn_Footer_CodeMode') {
            showCodePanel(e);
        } else if ($(e.currentTarget).attr('id') == 'btn_Footer_WordMode') {
            showWordPanel(e);
        } else if ($(e.currentTarget).attr('id') == 'btn_Footer_KnowledgeMode') {
            showKnowledgePanel(e);
        } else {
            $('#panel_CodeMode').css('display', 'none');
        }
    });

    $('.footer-tool-item').on('mouseover ', function (e) {
        var tipObj = $('.modle-tip');
        var targetObj = $(e.target);
        tipObj.css('display', "block");
        var tmpLeft = targetObj.offset().left + (targetObj.width() - tipObj.width() - 20) / 2;
        tipObj.css('left', tmpLeft + "px");
        tipObj.text(targetObj.attr("data-tip"));
    });

    $('.footer-tool-item').on(' mouseout ', function (e) {
        $('.modle-tip').css('display', "none");
    });

    $('.code-panel-header-close').on('click', function (e) {
        //$('#panel_CodeMode').css('display', 'none');
        $('#panel_CodeMode').hide("slow");
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    });

    $('.word-panel-header-close').on('click', function (e) {
        //$('#panel_WordMode').css('display', 'none');
        $('#panel_WordMode').hide("slow");
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    });

    $('.knowledge-panel-header-close').on('click', function (e) {
        //$('#panel_WordMode').css('display', 'none');
        $('#panel_KnowledgeMode').hide("slow");
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    });

    $('.run-scene-fullscreen-close-button').on('click', function (e) {
        //$('.run-scene-fullscreen').css('display', 'none');
        $('.run-scene-fullscreen').hide("slow", function () {
            $('.siderbar-scene-container').append($('#game_container'));
        });
    });

    $('#panel_CodeMode').draggable({ containment: "body", scroll: false }).resizable();

    //$('#panel_WordMode').draggable({ containment: "body", scroll: false }).resizable();

    //$('#panel_KnowledgeMode').draggable({ containment: "body", scroll: false }).resizable();

    $(".link-button-block-example").click(hightlightExampleBlock);

    $(window).resize(function () {
        onWindowResize();
    });
}

function siderBarExpand() {
    var tmpObj = $(".siderbar-wrap");
    var tmpLeft = $('body').width();
    //if (tmpObj.hasClass('expanded')) {
    //    tmpLeft -= 25;
    //} else {
    //    tmpLeft -= tmpObj.width();
    //}
    if (!tmpObj.hasClass('expanded')) {
        tmpLeft -= tmpObj.width();
    }

    tmpObj.toggleClass('expanded');
    tmpObj.animate({ left: tmpLeft + 'px' }, 'slow', adjustWorkSpaceTitle);
    $('#icon_SiderBar_Expand').toggleClass('fa-angle-double-left').toggleClass('fa-angle-double-right');
    $('.siderbar-drag').toggleClass('expanded');
    //adjustWorkSpaceTitle();
}

function siderBarDrag(e) {
    var _sidebarDragStarX = e.pageX;
    $(document).bind("mousemove", function (ev) {
        $(".siderbar-drag-proxy").css("left", ev.pageX + "px");
    });
}

function initDatas() {
    _registerRemoteServer();
    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.bus.getworkspace, { symbol: 'tkwar' }),
        data: '<root></root>',
        success: function (data, status) {
            if ($(data).find('err').length > 0) {
                return;
            }
            alert('success');
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
        }
    });

    var data = {
        user: {
            id: "1",
            name: "Tom",
            img: "child_1.png"
        },
        course: {
            id: "1",
            name: "坦克大战",
            stage_count: 6,
            current_stage: 4,
            note: [
                {
                    text: '现在坦克战队已经可以在你的控制下移动了, 接下来为坦克增加"射击"能力吧. 请增加键盘事件, 使"空格"键按下时, 坦克可以发射炮弹',
                    key: "常量",
                    id: "race_roads_block_example"
                }
            ],
            words: [
                {
                    word: 'computer',
                    soundmark: [
                        ["英 [kəm'pjuːtə]", ''],
                        ["美 [kəm'pjutɚ]", '']
                    ],
                    star: 4,
                    note: '考研 / CET4 / CET6',
                    paraphrase: [
                        'n. 计算机；电脑；电子计算机'
                    ],
                    variant: {
                        '复数': 'computers'
                    }
                }, {
                    word: 'programming',
                    soundmark: [
                        ["英 ['prəʊɡræmɪŋ]", ''],
                        ["美 ['proɡræmɪŋ]", '']
                    ],
                    star: 5,
                    note: '',
                    paraphrase: [
                        'n. 设计，规划；编制程序，[计] 程序编制',
                        '训练(programme的现在分词); 培养; 预调;'
                    ],
                    variant: null
                }
            ]
        },
        blockly: {
            toolbox: "javascripts/scene/pacman/level1/toolbox.xml",
            workspace:"javascripts/scene/pacman/level1/default.xml",
            lib: [
                //"http://localhost/iKCoder/WorkStation/Scene/scripts/Race_Setting/Blocks/blocks.js",
                //"http://localhost/iKCoder/WorkStation/Scene/scripts/Race_Setting/Engine/game_engine.js",
                //"http://localhost/iKCoder/WorkStation/Scene/scripts/Race_Setting/Scene/scene.js",
            ]
        }
    }

    return data;
}

function buildStageHTML(data) {
    var container = $('#Course_Stage_Container');
    var isFuture = false;
    var labelClass = "";
    var itemClass = "";
    var innerTxt = "";
    var itemWidth = Math.floor(100 / data.stage_count);
    for (var i = 0; i < data.stage_count; i++) {
        labelClass = "";
        itemClass = "future-item";
        innerTxt = "";
        if (!isFuture) {
            if (i < data.current_stage - 1) {
                itemClass = "complete-item";
            } else if (i == data.current_stage - 1) {
                labelClass = "show-stage-index";
                itemClass = "current-item";
                innerTxt = data.current_stage;
            }
        }

        var tmpItem = $('<div class="head-stage-label ' + labelClass + '"><div class="' + itemClass + '">' + innerTxt + '</div></div>');
        tmpItem.css('width', itemWidth + "%");
        container.append(tmpItem);
    }

    $('.head-course-name').text(data.name);
    var tmpWidth = itemWidth * (data.stage_count - 1);
    $('.head-stage-background').css('width', tmpWidth + "%");
    tmpWidth = 100 / (data.stage_count - 1) * (data.current_stage - 1);
    $('.head-stage-space').css('width', tmpWidth + "%");
    for (var i = 0; i < data.note.length; i++) {
        var tmpStrArr = [];
        tmpStrArr.push((i + 1) + ". ");
        tmpStrArr.push('<strong>');
        tmpStrArr.push('   <a href="#" class="link-button-block-example" data-target="' + data.note[i].id + '" title="点击查看对应的块">');
        tmpStrArr.push(data.note[i].key);
        tmpStrArr.push(': </a>');
        tmpStrArr.push('</strong>');
        tmpStrArr.push(data.note[i].text);
        tmpStrArr.push('</br>');
        $('.course-stage-note').html(tmpStrArr.join(''));
    }
}

function initPage() {
    var data = initDatas();
    _wordsData = data.course.words;
    _workspaceCfg = data.blockly;
    buildStageHTML(data.course);
    updateUserInfo(data.user);
    initEvents();
    adjustWorkSpaceTitle();
    $("#txt_Code_Content").setTextareaCount({ color: "rgb(176,188,177)", });
    LaodSceneLib(data.blockly);
    var playBtn = $('.workspace-tool-item.glyphicon.glyphicon-play');
    var shareBtn = $('.workspace-tool-item.glyphicon.glyphicon-share-alt');
    var fullScreenBtn = $('.workspace-tool-item.glyphicon.glyphicon-fullscreen');
    var refereshBtn = $('.workspace-tool-item.glyphicon.glyphicon-repeat');
    bindEventsToScene(playBtn, shareBtn, fullScreenBtn, refereshBtn);
    //siderBarExpand();
}

function updateUserInfo(data) {
    $('.img-rounded.header-user-image').attr('src', 'images/children/' + data.img);
    $('.header-user-name-text').text(data.name);
    $('.header-user-name-text').text(data.name);
}

var _codePanelInit = false;
function showCodePanel(e) {
    var codePanel = $('#panel_CodeMode');
    if (codePanel.css('display') == 'none') {
        //$('#panel_WordMode').css('display', 'none');
        $('#panel_WordMode').hide("slow");
        $('#panel_KnowledgeMode').hide("slow");
        //codePanel.css('display', 'block');
        codePanel.show('slow');
        adjustCodePanelSize(codePanel, _codePanelInit);
        adjustCodePanelPosition(codePanel, e, _codePanelInit);
    } else {
        //codePanel.css('display', 'none');
        codePanel.hide("slow");
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    }
}

var _wordPanelInit = false;
function showWordPanel(e) {
    var wordPanel = $('#panel_WordMode');
    if (wordPanel.css('display') == 'none') {
        //$('#panel_CodeMode').css('display', 'none');
        $('#panel_CodeMode').hide("slow");
        $('#panel_KnowledgeMode').hide("slow");
        //wordPanel.css('display', 'block');
        wordPanel.show('slow');
        if (!_wordPanelInit) {
            $('.word-panel-content.container').append(buildWordListHTML());
        }

        adjustCodePanelSize(wordPanel, _wordPanelInit);
        adjustCodePanelPosition(wordPanel, e, _wordPanelInit);
    } else {
        //wordPanel.css('display', 'none');
        wordPanel.hide("slow");
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    }
}

var _knowledgePanelInit = false;
function showKnowledgePanel(e) {
    var knowledgePanel = $('#panel_KnowledgeMode');
    if (knowledgePanel.css('display') == 'none') {
        //$('#panel_CodeMode').css('display', 'none');
        $('#panel_CodeMode').hide("slow");
        $('#panel_WordMode').hide("slow");
        //wordPanel.css('display', 'block');
        knowledgePanel.show('slow');
        if (!_wordPanelInit) {
            $('.word-panel-content.container').append('waiting for create.');
        }

        adjustCodePanelSize(knowledgePanel, _knowledgePanelInit);
        adjustCodePanelPosition(knowledgePanel, e, _knowledgePanelInit);
    } else {
        //wordPanel.css('display', 'none');
        knowledgePanel.hide("slow");
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    }
}

function buildWordListHTML() {
    var data = _wordsData;
    var htmlStringArr = [];
    htmlStringArr.push('<div class="row">');
    for (var i = 0; i < data.length; i++) {
        htmlStringArr.push('<div class="col-xs-12 workspace-word-list-item">');
        htmlStringArr.push('    <div class="container padding-bottom20" style="padding: 0px;">');
        htmlStringArr.push('        <div class="row">');
        htmlStringArr.push('            <div class="col-xs-12 word-word">');
        htmlStringArr.push(data[i].word);
        htmlStringArr.push('            </div>');
        htmlStringArr.push('        </div>');
        htmlStringArr.push('        <div class="row word-soundmark">');
        for (var j = 0; j < data[i].soundmark.length; j++) {
            htmlStringArr.push('            <div class="col-xs-6" style="padding-right: 0px;">');
            htmlStringArr.push(data[i].soundmark[j][0]);
            htmlStringArr.push('                <i class="glyphicon glyphicon-volume-up play-soundmark-button" aria-hidden="true" data-target="' + data[i].soundmark[j][1] + '"></i>');
            htmlStringArr.push('            </div>');
        }

        htmlStringArr.push('        </div>');
        htmlStringArr.push('        <div class="row word-soundmark">');
        htmlStringArr.push('            <div class="col-xs-4" style="color: rgb(254,186,0);">');
        for (var j = 0; j < 5; j++) {
            if (j < data[i].star - 1) {
                htmlStringArr.push('<i class="glyphicon glyphicon-star" aria-hidden="true"></i>');
            } else {
                htmlStringArr.push('<i class="glyphicon glyphicon-star-empty" aria-hidden="true"></i>');
            }
        }

        htmlStringArr.push('            </div>');
        htmlStringArr.push('            <div class="col-xs-7">');
        htmlStringArr.push(data[i].note);
        htmlStringArr.push('            </div>');
        htmlStringArr.push('        </div>');
        htmlStringArr.push('        <div class="row word-paraphrase">');
        for (var j = 0; j < data[i].paraphrase.length; j++) {
            htmlStringArr.push('            <div class="col-xs-12">');
            htmlStringArr.push(data[i].paraphrase[j]);
            htmlStringArr.push('            </div>');
        }

        if (data[i].variant) {
            htmlStringArr.push('        </div>');
            htmlStringArr.push('        <div class="row">');
            htmlStringArr.push('            <div class="col-xs-12">');
            htmlStringArr.push('变形');
            htmlStringArr.push('            </div>');
            for (var key in data[i].variant) {
                htmlStringArr.push('            <div class="col-xs-3 word-variant-header">');
                htmlStringArr.push(key + ': ');
                htmlStringArr.push('            </div>');
                htmlStringArr.push('            <div class="col-xs-9 word-variant-content">');
                htmlStringArr.push(data[i].variant[key]);
                htmlStringArr.push('            </div>');
            }
        }

        htmlStringArr.push('        </div>');
        htmlStringArr.push('    </div>');
        htmlStringArr.push('</div>');
    }

    htmlStringArr.push('</div>');
    return htmlStringArr.join('');
}

function adjustCodePanelSize(codePanel, panelInited) {
    var minLeft = 20;
    var minTop = 20;
    var maxWidth = $('body').width() - minLeft * 2;
    var maxHeight = $('body').height() - $('header').height() - $('footer').height() - minTop * 2;
    var minWidth = 400;
    var minHeight = 300;
    if (!panelInited) {
        codePanel.height(minHeight);
        codePanel.width(minWidth);
    } else {
        if (codePanel.height() > maxHeight) {
            codePanel.height(maxHeight);
        } else if (codePanel.height() < minHeight) {
            codePanel.height(minHeight);
        }

        if (codePanel.width() > maxWidth) {
            codePanel.width(maxWidth);
        } else if (codePanel.width() < minWidth) {
            codePanel.width(minWidth);
        }
    }
}

function adjustCodePanelPosition(codePanel, e, panelInited) {
    var targetOffset = $(e.currentTarget).offset();
    var sourceOffset = codePanel.offset();
    var minLeft = 20;
    var minTop = 20;
    var maxLeft = $('body').width() - codePanel.width() - 20;
    var maxTop = $('body').height() - codePanel.height() - 20;
    if (!panelInited) {
        codePanel.css('top', (targetOffset.top - 20 - codePanel.height()) + "px");
        codePanel.css('left', (targetOffset.left - codePanel.width() / 4) + "px");
        panelInited = true;
    } else {
        if (sourceOffset.top < minTop) {
            codePanel.css('top', minTop + "px");
        } else if (sourceOffset.top > maxTop) {
            codePanel.css('top', maxTop + "px");
        }

        if (sourceOffset.left < minLeft) {
            codePanel.css('left', minLeft + "px");
        } else if (sourceOffset.left > maxLeft) {
            codePanel.css('left', maxLeft + "px");
        }
    }
}

function adjustWorkSpaceTitle() {
    var titleWrap = $('.workspace-title-2');
    if ($('.siderbar-wrap').hasClass('expanded')) {
        titleWrap.parent
        titleWrap.css('width', 'calc(100% - ' + ($('.siderbar-wrap').width() + 15) + 'px)');
    } else {
        titleWrap.css('width', 'calc(100% - 15px)');
    }
}

var _blockExample = null;
var _highlightCount = 0;
function hightlightExampleBlock() {
    var blocks = WorkScene.workspace.topBlocks_;
    var targetBtn = $(arguments[0].target);
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].id == targetBtn.attr("data-target")) {
            _blockExample = blocks[i];
            _highlightCount = 0;
            selectBlockExample();
            break;
        }
    }
}

function selectBlockExample() {
    if (_highlightCount < 4) {
        _blockExample.addSelect();
        setTimeout('unselectBlockExample();', 500);
    }
}

function unselectBlockExample() {
    _highlightCount++;
    _blockExample.removeSelect();
    setTimeout('selectBlockExample();', 500);
}

function onWindowResize() {
    var siderBarWrap = $('.siderbar-wrap');
    if (siderBarWrap.hasClass('expanded')) {
        siderBarWrap.css('left', ($('body').width() - siderBarWrap.width()) + 'px');
    } else {
        siderBarWrap.css('left', $('body').width() + 'px');
    }

    var header = $('header');
    siderBarWrap.css('top', header.height() + 'px');
    siderBarWrap.css('height', 'calc(100% - ' + header.height() + 'px - 60px)');
    siderBarWrap.css('height', '-moz-calc(100% - ' + header.height() + 'px - 60px)');
    siderBarWrap.css('height', '-webkit-calc(100% - ' + header.height() + 'px - 60px)');
}

(function ($) {
    var AutoRowsNumbers = function (element, config) {
        this.$element = $(element);
        this.$group = $('<div/>', { 'class': "textarea-group" });
        this.$ol = $('<div/>', { 'class': 'textarea-rows' });
        this.$wrap = $('<div/>', { 'class': 'textarea-wrap' });
        this.$group.css({
            //"width": this.$element.outerWidth(true) + 'px',
            "width": '100%',
            "height": '100%',
            "display": config.display,
            "background-color": 'transparent'
        });
        this.$ol.css({
            "color": 'rgb(106,103,101)',
            "width": config.width,
            //"height": this.$element.height(),
            "height": '100%',
            "font-size": this.$element.css("font-size"),
            "line-height": this.$element.css("line-height"),
            "position": "absolute",
            "overflow": "hidden",
            "margin": 0,
            "padding": 0,
            "padding-top": '5px',
            "text-align": "right",
            "font-family": this.$element.css("font-family")
        });
        this.$wrap.css({
            "padding": ((this.$element.outerHeight() - this.$element.height()) / 2) + 'px 0',
            "background-color": 'transparent',
            //"background-color": config.bgColor,
            "position": "absolute",
            "box-sizing": "border-box",
            "margin": 0,
            "width": config.width,
            //"height": this.$element.height() + 'px'
            "height": '100%'
        });
        this.$element.css({
            "white-space": "pre",
            "resize": "none",
            "margin": 0,
            "box-sizing": "border-box",
            "padding-left": (parseInt(config.width) - parseInt(this.$element.css("border-left-width")) + parseInt(this.$element.css("padding-left"))) + 'px',
            "padding-right": '10px',
            //"width": (this.$element.width() - parseInt(config.width)) + 'px'
            "width": '100%',
            "height": '100%',
            "background-color": 'transparent'
        });
    }

    AutoRowsNumbers.prototype = {
        constructor: AutoRowsNumbers,

        init: function () {
            var that = this;
            that.$element.wrap(that.$group);
            that.$ol.insertBefore(that.$element);
            this.$ol.wrap(that.$wrap)
            that.$element.on('keydown', { that: that }, that.inputText);
            that.$element.on('scroll', { that: that }, that.syncScroll);
            that.inputText({ data: { that: that } });
        },

        inputText: function (event) {
            var that = event.data.that;

            setTimeout(function () {
                var value = that.$element.val();
                value.match(/\n/g) ? that.updateLine(value.match(/\n/g).length + 1) : that.updateLine(1);
                that.syncScroll({ data: { that: that } });
            }, 0);
        },

        updateLine: function (count) {
            var that = this;
            that.$element;
            that.$ol.html('');

            for (var i = 1; i <= count; i++) {
                that.$ol.append("<div>" + i + "</div>");
            }
        },

        syncScroll: function (event) {
            var that = event.data.that;
            that.$ol.children().eq(0).css("margin-top", -(that.$element.scrollTop()) + "px");
        }
    }

    $.fn.setTextareaCount = function (option) {
        var config = {};
        var option = arguments[0] ? arguments[0] : {};
        config.color = option.color ? option.color : "#FFF";
        config.width = option.width ? option.width : "30px";
        config.bgColor = option.bgColor ? option.bgColor : "#999";
        config.display = option.display ? option.display : "block";

        return this.each(function () {
            var $this = $(this);
            var data = $this.data('autoRowsNumbers');
            if (!data) {
                $this.data('autoRowsNumbers', (data = new AutoRowsNumbers($this, config)));
            }

            if (typeof option === 'string') {
                return false;
            } else {
                data.init();
            }
        });
    }
})(jQuery);