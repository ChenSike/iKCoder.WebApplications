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
    });
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
            current_stage: 2,
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
}