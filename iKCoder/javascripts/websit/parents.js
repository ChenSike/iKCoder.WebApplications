'use strict';

var _childItemWidth = 240;

function buildChildItemHTML(data) {
    var tmpHTMLArr = [];
    tmpHTMLArr.push('<div class="children-item">');
    tmpHTMLArr.push('   <div class="text-center-white">');
    tmpHTMLArr.push('       <img class="children-item-img" src="images/children/' + data.img + '" />');
    tmpHTMLArr.push('       <div class="children-item-img-mask"></div>');
    tmpHTMLArr.push('   </div>');
    tmpHTMLArr.push('   <div>');
    tmpHTMLArr.push('       <p class="children-item-title">' + data.name + '</p>');
    tmpHTMLArr.push('   </div>');
    tmpHTMLArr.push('</div>');
    return tmpHTMLArr.join('');
};

function initTopWall() {
    var data = [];
    data.push({
        id: 1,
        name: 'Tom',
        img: 'child_1.png'
    });

    data.push({
        id: 2,
        name: 'Jerry',
        img: 'child_2.png'
    });

    var containerWidth = _childItemWidth * (data.length + 1);
    var parentWidth = $($('#container_ChildrenList').parent()).width();
    if (parentWidth > containerWidth) {
        $('#container_ChildrenList').css('width', '100%');
    } else {
        $('#container_ChildrenList').css('width', containerWidth + 'px');
    }

    for (var i = 0; i < data.length; i++) {
        var tmpItem = $(buildChildItemHTML(data[i]));
        $('#container_ChildrenList').append(tmpItem);
        tmpItem.on('click', { id: data[i].id }, loadChildReport);
    }

    var tmpHTMLArr = [];
    tmpHTMLArr.push('<div class="children-item">');
    tmpHTMLArr.push('   <div class="text-center-white" style="height:150px;">');
    tmpHTMLArr.push('       <div class="children-add-item-wrap">');
    tmpHTMLArr.push('           <div class="children-add-item-h-line"></div>');
    tmpHTMLArr.push('           <div class="children-add-item-v-line"></div>');
    tmpHTMLArr.push('       </div>');
    tmpHTMLArr.push('   </div>');
    tmpHTMLArr.push('   <div>');
    tmpHTMLArr.push('       <p class="children-item-title">添加</p>');
    tmpHTMLArr.push('   </div>');
    tmpHTMLArr.push('</div>');
    var addItem = $(tmpHTMLArr.join(''));
    $('#container_ChildrenList').append(addItem);
    var funData = { id: "container_ChildrenList", step: _childItemWidth };
    $('#arrow_Children_List_Left').on('click', funData, listMovePrev);
    $('#arrow_Children_List_Right').on('click', funData, listMoveNext);

    loadChildReport({ data: { id: data[0].id } });
}

function loadChildReport() {
    if (!arguments[0] || !arguments[0].data) {
        return;
    }

    var userId = arguments[0].data.id;
    var data = {
        date: '2017-1-1',
        beyond: 88,
        name: 'Tom',
        title: '实习工程师',
        img: 'child_1.png',
        exp: 2600,
        works: 18,
        course: 25,
        friend: 30
    };

    $('#lb_Report_Overview_Date').text('报告生成日期: ' + data.date);
    $('.text-report-overview-beyond-data').text(data.beyond + '%');
    $('#lb_Report_Overview_NameTitle').text(data.name + ', ' + data.title);
    $('#lb_Report_Overview_Exp').text(data.exp);
    $('#lb_Report_Overview_Work_Count').text(data.works);
    $('#lb_Report_Overview_Course_Count').text(data.course);
    $('#lb_Report_Overview_Friend_Count').text(data.friend);
};

function listMovePrev() {
    if (arguments[0] && arguments[0].data) {
        var targetId = arguments[0].data.id;
        var step = arguments[0].data.step;
        var container = $('#' + targetId);
        var wrap = container.parent();
        var left = parseInt(container.css('left').replace('px', ''));
        var width = parseInt(container.css('width').replace('px', ''));
        var wrapWidth = parseInt(wrap.css('width').replace('px', ''));
        if (left < 0) {
            var tmpStep = step;
            if (Math.abs(left) < step) {
                tmpStep = Math.abs(left);
            }

            container.animate({ left: left + tmpStep + 'px', });
        }
    }
}

function listMoveNext() {
    if (arguments[0] && arguments[0].data) {
        var targetId = arguments[0].data.id;
        var step = arguments[0].data.step;
        var container = $('#' + targetId);
        var wrap = container.parent();
        var left = parseInt(container.css('left').replace('px', ''));
        var width = parseInt(container.css('width').replace('px', ''));
        var wrapWidth = parseInt(wrap.css('width').replace('px', ''));
        if (width + left > wrapWidth) {
            var tmpStep = step;
            if (width + left - wrapWidth < step) {
                tmpStep = width + left - wrapWidth;
            }

            container.animate({ left: left - tmpStep + 'px', });
        }
    }
}

function initPage() {
    initTopWall();
}
