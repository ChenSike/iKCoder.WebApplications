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

function buildOverViewRankGraph(rank) {
    var position = Math.floor(rank / 5);
    var fCount = (position - 1 < 0 ? 0 : position - 1);
    var bCount = 20 - position;
    if (position == 0) {
        $('.report-overview-rank-current-wrap').addClass('hidden');
    } else {
        $('.report-overview-rank-current-wrap').removeClass('hidden');
    }

    buildOverViewRankGraphItem('beyond', fCount)
    buildOverViewRankGraphItem('unreached', bCount)
    $('#container_Overview_RankMap').width(50 * fCount + 100);
};

function buildOverViewRankGraphItem(symbol, count) {
    var wrap = $('.report-overview-rank-' + symbol + '-wrap');
    if (count == 0) {
        wrap.addClass('hidden');
    } else {
        wrap.removeClass('hidden');
    }

    wrap.empty();
    wrap.append('<div class="report-overview-rank-' + symbol + '-space"></div>');
    for (var i = 0; i < count; i++) {
        wrap.append('<img class="report-overview-rank-' + symbol + '-img" src="images/label/smlperson.png" />');
    }

    var width = 50 * count;
    wrap.width(width);
    $('.report-overview-rank-' + symbol + '-space').width(width + 1);
};

function buildAchieveItemHTML(data, offsetFlag) {
    var offset = (offsetFlag ? ' col-sm-offset-1' : '');
    var tmpHTMLArr = [];
    tmpHTMLArr.push('    <div class="col-sm-5' + offset + '">');
    tmpHTMLArr.push('        <div class="container">');
    tmpHTMLArr.push('            <div class="row">');
    tmpHTMLArr.push('                <div class="col-sm-5">');
    tmpHTMLArr.push('                    <p class="text-report-achieve-number">' + data.id + '</p>');
    tmpHTMLArr.push('                </div>');
    tmpHTMLArr.push('                <div class="col-sm-7 padding-top20">');
    tmpHTMLArr.push('                    <p class="text-report-subsector-title">' + data.title + '</p>');
    tmpHTMLArr.push('                    <p class="text-report-content">' + data.content + '</p>');
    tmpHTMLArr.push('                </div>');
    tmpHTMLArr.push('            </div>');
    tmpHTMLArr.push('        </div>');
    tmpHTMLArr.push('    </div>');
    return tmpHTMLArr.join('');
};

function buildAchieveHTML(datas) {
    var tmpHTMLArr = [];
    var offsetFlag = false;
    for (var i = 0; i < datas.length; i++) {
        offsetFlag = true;
        if (i % 2 == 0) {
            tmpHTMLArr.push('<div class="row">');
            offsetFlag = false;
        }

        tmpHTMLArr.push(buildAchieveItemHTML(datas[i], offsetFlag));
        if (i % 2 != 0) {
            tmpHTMLArr.push('</div>');
        }
    }
    $('#container_Report_Achieve_Items').empty();
    $('#container_Report_Achieve_Items').append($(tmpHTMLArr.join('')));
};

function buildAbilityCompCourseHTML(datas) {
    var tmpHTMLArr = [];
    for (var i = 0; i < datas.length; i++) {
        if (i % 3 == 0) {
            tmpHTMLArr.push('<div class="row">');
        }

        tmpHTMLArr.push('<div class="col-sm-4"><p class="text-report-content"><strong>[' + datas[i].id + ']</strong> ' + datas[i].name + '</p></div>');
        if (i % 3 == 2) {
            tmpHTMLArr.push('</div>');
        }
    }

    $('#container_Report_Ability_CompleteCourse').empty();
    $('#container_Report_Ability_CompleteCourse').append($(tmpHTMLArr.join('')));
};

function drawAbilityGraph(datas) {
    var fontSize = 28;
    var valFontSize = 20;
    var canvas = document.getElementById('canvas_Report_Ability');
    var parent = $($(canvas).parent());
    var height = parent.height() - 10;
    var width = parent.width();
    var tmpSize = (height > width ? width : (width > 500) ? 500 : width);
    canvas.width = tmpSize;
    canvas.height = tmpSize;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, tmpSize, tmpSize);
    var tmpSpaceUnit = Math.ceil(fontSize / 10) * 10;
    var tmpCtxWidth = tmpSize - tmpSpaceUnit * 4;
    //var border = (tmpCtxWidth / 2) / Math.sin(Math.PI / 180 * 54);
    var radius = (tmpCtxWidth / 2) / Math.sin(Math.PI / 180 * 72);
    var lightStyle = 'rgb(247,247,247)';
    var boldStyle = 'rgb(230,230,230)';
    var centerX = tmpSize / 2;
    var centerY = tmpSize / 2;
    var maxValue = datas[0].value;
    for (var i = 0; i < datas.length; i++) {
        maxValue = (maxValue < datas[i].value ? datas[i].value : maxValue);
    }

    maxValue = Math.ceil(maxValue / 100) * 100;
    var tmpSteps = maxValue / 20;
    var tmpRadius = radius / tmpSteps;
    var vertex = [];
    for (var i = 1; i < 36; i++) {
        var tmpStyle = lightStyle;
        if (i % 5 == 0) {
            tmpStyle = boldStyle;
        }

        vertex.push(drawPolygon(context, datas.length, centerX, centerY, tmpRadius * i, 0, false, null, tmpStyle));
    }

    var tmpX, tmpY;
    for (var i = 0; i < datas.length; i++) {
        tmpX = vertex[vertex.length - 1][i].x;
        tmpY = vertex[vertex.length - 1][i].y;
        switch (i) {
            case 0:
                tmpX -= fontSize;
                tmpY -= fontSize / 2;
                break;
            case 1:
                tmpX += 2;
                tmpY += fontSize / 2;
                break;
            case 2:
                tmpY += fontSize;
                break;
            case 3:
                tmpX -= tmpSpaceUnit * 2;
                tmpY += fontSize;
                break;
            case 4:
                tmpX -= fontSize * 2;
                tmpY += fontSize / 2;
                break;
        }

        context.font = fontSize + "px '微软雅黑'";
        context.fillStyle = "rgb(86,86,86)";
        context.fillText(datas[i].name, tmpX, tmpY);
        context.restore();
    }

    var tmpVertex = [];
    for (var i = 0; i < datas.length; i++) {
        var tmpIdx = Math.floor(datas[i].value / 20);
        tmpVertex.push(vertex[tmpIdx - 1][i]);
    }

    context.strokeStyle = 'rgb(64,112,196)';
    context.lineWidth = 3;
    context.font = valFontSize + "px '微软雅黑'";
    context.fillStyle = "rgb(252,136,35)";
    context.beginPath();
    context.moveTo(tmpVertex[0].x, tmpVertex[0].y);
    context.fillText(datas[0].value, tmpVertex[0].x, tmpVertex[0].y);
    for (var i = 1; i < tmpVertex.length; i++) {
        context.lineTo(tmpVertex[i].x, tmpVertex[i].y);
        context.fillText(datas[i].value, tmpVertex[i].x, tmpVertex[i].y);
    }
    context.closePath();
    context.stroke();
};

function drawTimeMonthGraph(datas, month) {
    var canvas = document.getElementById('canvas_Report_Time_Month');
    var parent = $($(canvas).parent());
    var width = parent.width() - 50;
    var height = 400;
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    var barWidth = 30;
    var barSpace = 25;
    var lineWidth = 1;
    var maxValue = datas[0];
    for (var i = 1; i < datas.length; i++) {
        maxValue = Math.max(maxValue, datas[i]);
    }

    var unit = Math.floor((height - 10 - 30) / maxValue);
    var startX = barSpace;
    var startY = height - 30;
    var ltX, ltY, rtX, rtY, rbX, rbY, linearGradient, bHeight, bWidth, tmpX, tmpY;
    for (var i = 1; i < datas.length; i++) {
        if (datas[i] <= 0) {
            startX = rtX + barSpace;
            continue;
        }

        ltX = startX;
        ltY = startY - datas[i] * unit - lineWidth * 2;
        rtX = startX + barWidth + lineWidth;
        rtY = ltY;
        rbX = rtX;
        rbY = startY;
        bHeight = datas[i] * unit + lineWidth * 2;
        bWidth = barWidth + lineWidth * 2;
        //draw bar
        linearGradient = context.createLinearGradient(ltX, ltY, 0, bHeight);
        linearGradient.addColorStop(0, "rgb(98,163,54)");
        linearGradient.addColorStop(1, "rgb(128,184,95)");
        context.fillStyle = linearGradient;
        context.fillRect(ltX, ltY, bWidth, bHeight);
        //draw border
        context.strokeStyle = 'rgb(167,196,150)';
        context.lineWidth = 1;
        context.moveTo(startX, startY);
        context.lineTo(ltX, ltY);
        context.lineTo(rtX, rtY);
        context.lineTo(rbX, rbY);
        context.lineTo(startX, startY);
        context.stroke();
        //draw time label
        tmpX = ltX + 4;
        tmpY = ltY - 2;
        context.font = "normal normal bold 11px \"微软雅黑\"";
        context.fillStyle = "rgb(97,97,97)";
        context.fillText(datas[i], tmpX, tmpY);
        //draw date label
        tmpX = startX;
        tmpY = startY + 12;
        context.font = "normal normal 600 8px \"微软雅黑\"";
        context.fillStyle = "rgb(97,97,97)";
        context.fillText(month + '-' + (i + 1), tmpX, tmpY);
        //calculate next X
        startX = rtX + barSpace;
    }
}

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
        $('#container_ChildrenList').width('100%');;
    } else {
        $('#container_ChildrenList').width(containerWidth);
    }

    var firstItem = null;
    var firstId = '';
    for (var i = 0; i < data.length; i++) {
        var tmpItem = $(buildChildItemHTML(data[i]));
        //$('#container_ChildrenList').append(tmpItem);
        $('#btn_ChildrenList_Add').before(tmpItem);
        tmpItem.on('click', { id: data[i].id }, loadChildReport);
        if (i == 0) {
            firstItem = tmpItem;
            firstId = data[i].id;
        }
    }

    var funData = { id: "container_ChildrenList", step: _childItemWidth };
    $('#arrow_Children_List_Left').on('click', funData, listMovePrev);
    $('#arrow_Children_List_Right').on('click', funData, listMoveNext);
    $('#btn_ChildrenList_Add').on('click', addNewChild);
    if (firstItem) {
        firstItem.addClass('active');
    }

    loadChildReport({ data: { id: firstId } });
};

function addNewChild() {

};

function loadChildReport() {
    if (!arguments[0] || !arguments[0].data) {
        return;
    }

    var userId = arguments[0].data.id;
    var data = {
        date: '2017-1-1',
        rank: 80,
        name: 'Tom',
        title: '实习工程师',
        img: 'child_1.png',
        exp: 2600,
        works: 18,
        course: 25,
        friend: 30,
        achieve: [
        { id: '01', title: '计算机小专家', content: '顺利完成了计算机原理的所有基础课程, 对现代计算机的系统组成, 运行方式和编程原理有了系统性的认知.' },
        { id: '02', title: '分享小达人', content: '分享了18个已完成作品, 这些作品已被565人次浏览.' }
        ],
        ability: {
            categoryCount: 5,
            courseCount: 25,
            courseTime: 125,
            promoteCategory: ['科学', '技术', '工程', '数学', '语言'],
            completeCourse: [
                { id: 1, name: '计算机原理' },
                { id: 2, name: '空间概念和有序移动' },
                { id: 3, name: '基础数据结构' },
                { id: 4, name: '键盘及鼠标控制' },
                { id: 5, name: '数学输入与输出' },
                { id: 6, name: '条件循环' },
                { id: 7, name: '条件判断语句' },
                { id: 8, name: '音乐播放原理' },
                { id: 9, name: '基本绘图指令' }
            ],
            graph: [
                { name: '科学', value: 700 },
                { name: '技术', value: 400 },
                { name: '工程', value: 550 },
                { name: '数学', value: 700 },
                { name: '语言', value: 450 }
            ]
        },
        codetime: {
            total: 195,
            beyond: 92,
            month: 1,
            times: [3, 2, 4, 1, 3, 2, 4, 5, 6, 7, 2, 5, 3, 7, 4, 1],
            course: [
                { name: '初级课程', rate: 85 },
                { name: '中级课程', rate: 11 },
                { name: '高级课程', rate: 5 },
            ]
        }
    };

    $('#lb_Report_Overview_Date').text('报告生成日期: ' + data.date);
    $('.text-report-overview-beyond-data').text(data.rank + '%');
    $('#img_Report_Overview_Child').attr('src', 'images/children/' + data.img);
    $('#lb_Report_Overview_NameTitle').text(data.name + ', ' + data.title);
    $('#lb_Report_Overview_Exp').text(data.exp);
    $('#lb_Report_Overview_Work_Count').text(data.works);
    $('#lb_Report_Overview_Course_Count').text(data.course);
    $('#lb_Report_Overview_Friend_Count').text(data.friend);
    buildOverViewRankGraph(data.rank);
    buildAchieveHTML(data.achieve);
    $('#lb_Report_Ability_CategoryCount').text(data.ability.categoryCount);
    $('#lb_Report_Ability_CourseCount').text(data.ability.courseCount);
    $('#lb_Report_Ability_CourseTime').text(data.ability.courseTime);
    $('#lb_Report_Ability_PromoteCategory').text(data.ability.promoteCategory.join('、'));
    buildAbilityCompCourseHTML(data.ability.completeCourse);
    drawAbilityGraph(data.ability.graph);
    $('#lb_Report_Time_Total').text(data.codetime.total);
    $('#lb_Report_Time_Beyond').text(data.codetime.beyond + '%');
    drawTimeMonthGraph(data.codetime.times, data.codetime.month);
};

function initPage() {
    initTopWall();
};
