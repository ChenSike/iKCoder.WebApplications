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
}

function siderBarExpand() {
    var tmpObj = $(".siderbar-wrap");
    var tmpLeft = $('body').width();
    if (tmpObj.hasClass('expanded')) {
        tmpLeft -= 25;
    } else {
        tmpLeft -= tmpObj.width();
    }

    tmpObj.toggleClass('expanded');
    tmpObj.animate({ left: tmpLeft + 'px' }, 'slow');
    $('#icon_SiderBar_Expand').toggleClass('fa-angle-double-left').toggleClass('fa-angle-double-right');
    $('.siderbar-drag').toggleClass('expanded');
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
            img: ""
        },
        course: {
            id: "1",
            name: "坦克大战",
            stage_count: 6,
            current_stage: 4,
            note: ""
        },
        tips: [
            { type: "", id: "" },
            { type: "", id: "" }
        ],
        blockly: {
            toolbox: {

            },
            default: {

            },
            lib: ""
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
}

function initPage() {
    var data = initDatas();
    buildStageHTML(data.course);
    initEvents();
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