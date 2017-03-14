'use strict';

function initEvents() {
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
        $('#panel_CodeMode').css('display', 'none');
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    });

    $('#panel_CodeMode').draggable({ containment: "body", scroll: false }).resizable();

    $(".link-button-block-example").click(hightlightExampleBlock);
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
            ]
        },
        blockly: {
            xml: "http://localhost/iKCoder/WorkStation/Scene/XML/testblocks.xml",
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
    buildStageHTML(data.course);
    updateUserInfo(data.user);
    initEvents();
    adjustWorkSpaceTitle();
    $("#txt_Code_Content").setTextareaCount({ color: "rgb(176,188,777)", });
    LaodSceneLib(data.blockly);
    var playBtn = $('.workspace-tool-item.glyphicon.glyphicon-play');
    var shareBtn = $('.workspace-tool-item.glyphicon.glyphicon-share-alt');
    var fullScreenBtn = $('.workspace-tool-item.glyphicon.glyphicon-fullscreen');
    var refereshBtn = $('.workspace-tool-item.glyphicon.glyphicon-repeat');
    bindEventsToScene(playBtn, shareBtn, fullScreenBtn, refereshBtn);
    siderBarExpand();
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
        codePanel.css('display', 'block');
        adjustCodePanelSize(codePanel);
        adjustCodePanelPosition(codePanel, e);
    } else {
        codePanel.css('display', 'none');
        $('.footer-tool-item').removeClass('selected');
        $('#btn_Footer_CreateMode').addClass('selected');
    }
}

function adjustCodePanelSize(codePanel) {
    var minLeft = 20;
    var minTop = 20;
    var maxWidth = $('body').width() - minLeft * 2;
    var maxHeight = $('body').height() - $('header').height() - $('footer').height() - minTop * 2;
    var minWidth = 400;
    var minHeight = 300;
    if (!_codePanelInit) {
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

function adjustCodePanelPosition(codePanel, e) {
    var targetOffset = $(e.currentTarget).offset();
    var sourceOffset = codePanel.offset();
    var minLeft = 20;
    var minTop = 20;
    var maxLeft = $('body').width() - codePanel.width() - 20;
    var maxTop = $('body').height() - codePanel.height() - 20;
    if (!_codePanelInit) {
        codePanel.css('top', (targetOffset.top - 20 - codePanel.height()) + "px");
        codePanel.css('left', (targetOffset.left - codePanel.width() / 4) + "px");
        _codePanelInit = true;
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