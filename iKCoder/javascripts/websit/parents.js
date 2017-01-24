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

function buildPotentialItems(datas) {
    var container = $('#container_Report_Potential_Category');
    for (var i = 0; i < datas.length; i++) {
        container.append('<span class="text-report-content-data bigger">' + datas[i] + '</span>');
        if (i < datas.length - 1) {
            container.append('以及');
        }
    }
};

function buildWorksItems(datas) {
    var container = $('#container_Sector_Report_Works_Items');
    var hitsRule = _getCSSRule('.report-works-item-hits');
    var maskBeforeRule = _getCSSRule('.report-works-item-mask::before');
    var maskRule = _getCSSRule('.report-works-item-mask');
    var firstItem = null;
    for (var i = 0; i < datas.length; i++) {
        var tmpHTMLArr = [];
        tmpHTMLArr.push('<div class="col-sm-6 col-md-4 report-works-item">');
        tmpHTMLArr.push('   <div class="main-report-works-item">');
        tmpHTMLArr.push('       <div class="report-works-item-hits">' + datas[i].hits + '</div>');
        tmpHTMLArr.push('       <img src="images/works/' + datas[i].img + '" style="width:100%;" />');
        tmpHTMLArr.push('       <div class="text-report-works-item-footer">' + datas[i].content + '</div>');
        tmpHTMLArr.push('   </div>');
        tmpHTMLArr.push('</div>');
        var tmpItem = $(tmpHTMLArr.join(''));
        container.append(tmpItem);
        tmpItem.on('mouseenter', { maskRule: maskRule, maskBeforeRule: maskBeforeRule }, selectWorksItem);
        if (i == 0) {
            firstItem = tmpItem;
        }
    }

    var width = firstItem.width();
    var height = firstItem.height();
    var mask = $('.report-works-item-mask');
    var tmpSpace = Math.floor(width / 3);
    if (tmpSpace > 100) {
        $('.button-report-works-item.button_play').css('margin-right', tmpSpace - 100 + 'px');
    }

    var left = width - 45;
    if (width - Math.floor(width / 10 * 9) < 30) {
        left = width - 20;
    }

    var top = (width - left + 20);
    hitsRule.style['top'] = top + 'px';
    hitsRule.style['left'] = left + 'px';
};

function buildRecommendItems(datas) {
    var container = $('#container_Sector_Report_Recommend_Items');
    var hitsRule = _getCSSRule('.report-recommend-item-hits');
    var maskBeforeRule = _getCSSRule('.report-recommend-item-mask::before');
    var maskRule = _getCSSRule('.report-recommend-item-mask');
    var firstItem = null;
    for (var i = 0; i < datas.length; i++) {
        var tmpHTMLArr = [];
        tmpHTMLArr.push('<div class="col-sm-6 col-md-4 report-recommend-item">');
        tmpHTMLArr.push('   <div class="main-report-recommend-item">');
        tmpHTMLArr.push('       <div class="report-recommend-item-hits">' + datas[i].hits + '</div>');
        tmpHTMLArr.push('       <img src="images/works/' + datas[i].img + '" style="width:100%;" />');
        tmpHTMLArr.push('       <div class="text-report-works-item-footer">' + datas[i].content + '</div>');
        tmpHTMLArr.push('   </div>');
        tmpHTMLArr.push('</div>');
        var tmpItem = $(tmpHTMLArr.join(''));
        container.append(tmpItem);
        tmpItem.on('mouseenter', { maskRule: maskRule, maskBeforeRule: maskBeforeRule }, selectRecommendItem);
        if (i == 0) {
            firstItem = tmpItem;
        }
    }

    var width = firstItem.width();
    var height = firstItem.height();
    var mask = $('.report-recommend-item-mask');
    var left = width - 45;
    if (width - Math.floor(width / 10 * 9) < 30) {
        left = width - 20;
    }

    var top = (width - left + 20);
    hitsRule.style['top'] = top + 'px';
    hitsRule.style['left'] = left + 'px';
}

function selectWorksItem(params) {
    $('.main-report-works-item').removeClass('active');
    var mask = $('.report-works-item-mask');
    mask.css('display', 'block');
    var target = $(params.currentTarget);
    target.addClass('active');
    var maskRule = params.data.maskRule;
    var maskBeforeRule = params.data.maskBeforeRule;
    var pos = target.position();
    var left = pos.left - parseInt(target.css('padding-left'));
    var top = pos.top - parseInt(target.css('padding-top'));
    var targetWidth = target.width();
    var targetHeight = target.height();
    var maskWidth = mask.width();
    var maskHeight = mask.height();
    var paddingPos = _getOffsetPosition(target, 'wrap-sector-report-works-items');
    maskRule.style['top'] = paddingPos.top + top + (targetHeight - maskHeight - 45) / 2 - 30 + 'px';
    maskRule.style['left'] = paddingPos.left + left + (targetWidth - maskWidth) / 2 + 'px';
    maskBeforeRule.style['width'] = targetWidth + 'px';
    maskBeforeRule.style['height'] = targetHeight + 'px';
    maskBeforeRule.style['top'] = -1 * (targetHeight - maskHeight) / 2 + 22 + 'px';
    maskBeforeRule.style['left'] = -1 * (targetWidth - maskWidth) / 2 + 'px';
};

function selectRecommendItem(params) {
    $('.main-report-recommend-item').removeClass('active');
    var mask = $('.report-recommend-item-mask');
    mask.css('display', 'block');
    var target = $(params.currentTarget);
    target.addClass('active');
    var maskRule = params.data.maskRule;
    var maskBeforeRule = params.data.maskBeforeRule;
    var pos = target.position();
    var left = pos.left - parseInt(target.css('padding-left'));
    var top = pos.top - parseInt(target.css('padding-top'));
    var targetWidth = target.width();
    var targetHeight = target.height();
    var maskWidth = mask.width();
    var maskHeight = mask.height();
    var paddingPos = _getOffsetPosition(target, 'wrap-sector-report-recommend-items');
    maskRule.style['top'] = paddingPos.top + top + (targetHeight - maskHeight - 45) / 2 - 30 + 'px';
    maskRule.style['left'] = paddingPos.left + left + (targetWidth - maskWidth) / 2 + 'px';
    maskBeforeRule.style['width'] = targetWidth + 'px';
    maskBeforeRule.style['height'] = targetHeight + 'px';
    maskBeforeRule.style['top'] = -1 * (targetHeight - maskHeight) / 2 + 22 + 'px';
    maskBeforeRule.style['left'] = -1 * (targetWidth - maskWidth) / 2 + 'px';
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
    var barWidth = 30;
    var barSpace = 25;
    var lineWidth = 1;
    var canvas = document.getElementById('canvas_Report_Time_Month');
    var parent = $($(canvas).parent());
    var width = Math.floor((barWidth + barSpace) * datas.length) - 30;
    var height = 400;
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    var maxValue = datas[0];
    for (var i = 1; i < datas.length; i++) {
        maxValue = Math.max(maxValue, datas[i]);
    }

    var unit = Math.floor((height - 10 - 30) / maxValue);
    var startX = 10;
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
        tmpX = ltX + 10;
        tmpY = ltY - 2;
        context.font = "normal normal bold 11px \"微软雅黑\"";
        context.fillStyle = "rgb(97,97,97)";
        context.fillText(datas[i], tmpX, tmpY);
        //draw date label
        tmpX = startX + 5;
        tmpY = startY + 12;
        context.font = "normal normal 600 10px \"微软雅黑\"";
        context.fillStyle = "rgb(97,97,97)";
        context.fillText(month + '-' + (i + 1), tmpX, tmpY);
        //calculate next X
        startX = rtX + barSpace;
    }

    $('#arrow_Report_CodeTime_Left').css('top', Math.floor((height - 24) / 2) + 'px');
    $('#arrow_Report_CodeTime_Left').css('left', '0px');
    $('#arrow_Report_CodeTime_Right').css('top', (-1 * Math.floor((height - 24) / 2) - 50 - 7) + 'px');
    $('#arrow_Report_CodeTime_Right').css('left', (parent.width() - 15) + 'px');
}

function drawTimeCompleteRate(datas) {
    var lineWidth = 10;
    var rateFontSize = 28;
    var textFontSize = 16;
    for (var i = 0; i < datas.length; i++) {
        var id = 'canvas_Report_Time_' + datas[i].id + 'Rate';
        var canvas = document.getElementById(id);
        var parent = $($(canvas).parent());
        var width = parent.width() - 10;
        var height = parent.height() - 10;
        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height)
        var context = canvas.getContext('2d');
        var radius = Math.floor(Math.min(width, height) / 2) - lineWidth;
        var centerX = Math.floor(width / 2);
        var centerY = Math.floor(height / 2);
        var startRadian = 0
        var endRadian = Math.PI * 2;
        context.lineWidth = lineWidth;
        context.strokeStyle = 'rgb(230,230,230)';
        context.beginPath();
        context.arc(centerX, centerY, radius, startRadian, endRadian);
        context.stroke();
        context.closePath();
        startRadian = Math.PI * 2 * 3 / 4;
        endRadian = startRadian + datas[i].rate / 100 * Math.PI * 2;
        context.strokeStyle = 'rgb(124,218,36)';
        context.beginPath();
        context.arc(centerX, centerY, radius, startRadian, endRadian);
        context.stroke();
        context.closePath();
        //context.strokeStyle = 'rgb(230,230,230)';
        //context.moveTo(width/2, 0);
        //context.lineTo(width / 2, height);
        //context.stroke();
        var tmpX = centerX;
        if (datas[i].rate < 10) {
            tmpX = centerX - rateFontSize * 0.5;
        } else {
            tmpX = centerX - rateFontSize * 1;
        }

        var tmpY = centerY + rateFontSize / 2;
        context.font = "normal normal bolder " + rateFontSize + "px \"微软雅黑\"";
        context.fillStyle = "rgb(105,105,105)";
        context.fillText(datas[i].rate + '%', tmpX, tmpY);

        tmpX = centerX - textFontSize * 2;
        tmpY = height / 2 + radius + (height / 2 - radius) / 2;
        context.font = "normal normal bold " + 16 + "px \"微软雅黑\"";
        context.fillStyle = "rgb(61,61,61)";
        context.fillText(datas[i].name, tmpX, tmpY);
    }
}

function drawPotentialEvaluate(datas) {
    var mainLineWidth = 75;
    var shadowHeight = 5;
    var titleFontSize = 22;
    var valueFontSize = 16;
    var shadowStyles = [
        'rgb(158,163,168)',
        'rgb(178,182,186)',
        'rgb(194,196,199)',
        'rgb(209,211,213)',
        'rgb(244,244,244)'
    ];
    var height = (mainLineWidth + shadowHeight) * datas.length;
    var canvas = document.getElementById('canvas_Report_Potential_Evaluate');
    var parent = $($(canvas).parent());
    var width = parent.width();
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    var titleX, titleY, lineStartX, lineStartY, lineEndX, lineEndY;
    var startX = 10 + titleFontSize * 2 + 10;
    var lengthUnit = (width - startX - 10) / datas[0].value;
    var lineLength = [];
    for (var i = 0; i < datas.length; i++) {
        lineLength.push(lengthUnit * datas[i].value);
    }

    context.textBaseline = "middle";
    for (var i = 0; i < datas.length; i++) {
        titleX = 10;
        titleY = (mainLineWidth + shadowHeight) * i + (mainLineWidth + shadowHeight) / 2;
        context.fillStyle = "rgb(74,74,74)";
        context.font = titleFontSize + "px '微软雅黑'";
        context.fillText(datas[i].title, titleX, titleY);
        context.restore();
        context.lineWidth = mainLineWidth;
        context.strokeStyle = 'rgb(91,155,213)';
        lineStartX = startX + (width - 10 - lineLength[i] - startX) / 2;
        lineStartY = mainLineWidth / 2 + (mainLineWidth + shadowHeight) * i;
        lineEndX = lineStartX + lineLength[i];
        lineEndY = lineStartY;
        context.beginPath();
        context.moveTo(lineStartX, lineStartY);
        context.lineTo(lineEndX, lineEndY);
        context.closePath();
        context.stroke();
        var shadowY = mainLineWidth + (mainLineWidth + shadowHeight) * i;
        for (var j = 0; j < shadowStyles.length; j++) {
            context.strokeStyle = shadowStyles[j];
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(lineStartX, shadowY);
            context.lineTo(lineEndX, shadowY);
            context.closePath();
            context.stroke();
            shadowY++;
        }

        context.fillStyle = "rgb(255,255,255)";
        if (i == 0) {
            context.fillStyle = "rgb(237,125,49)";
        }

        titleX = startX + (width - startX) / 2 - 10;
        if (datas[i].value < 10) {
            titleX = titleX - valueFontSize * 0.5;
        } else {
            titleX = titleX - valueFontSize * 1;
        }

        titleY = (mainLineWidth + shadowHeight) * i + (mainLineWidth + shadowHeight) / 2;
        context.font = valueFontSize + "px '微软雅黑'";
        context.fillText(datas[i].value + '%', titleX, titleY);
        context.restore();
    }
}

function initTopWall() {
    var data = { id: 1, name: 'Tom', img: 'child_1.png' };
    $('#img_Top_Child_Img').attr('src', 'images/children/' + data.img);
    $('#lb_Top_Child_Name').text(data.name);
    loadChildReport({ data: { id: data.id } });

    //var data = [];
    //data.push({
    //    id: 1,
    //    name: 'Tom',
    //    img: 'child_1.png'
    //});

    //data.push({
    //    id: 2,
    //    name: 'Jerry',
    //    img: 'child_2.png'
    //});

    //var containerWidth = _childItemWidth * (data.length + 1);
    //var parentWidth = $($('#container_ChildrenList').parent()).width();
    //if (parentWidth > containerWidth) {
    //    $('#container_ChildrenList').width('100%');;
    //} else {
    //    $('#container_ChildrenList').width(containerWidth);
    //}

    //var firstItem = null;
    //var firstId = '';
    //for (var i = 0; i < data.length; i++) {
    //    var tmpItem = $(buildChildItemHTML(data[i]));
    //    //$('#container_ChildrenList').append(tmpItem);
    //    $('#btn_ChildrenList_Add').before(tmpItem);
    //    tmpItem.on('click', { id: data[i].id }, loadChildReport);
    //    if (i == 0) {
    //        firstItem = tmpItem;
    //        firstId = data[i].id;
    //    }
    //}

    //var funData = { id: "container_ChildrenList", step: _childItemWidth };
    //$('#arrow_Children_List_Left').on('click', funData, listMovePrev);
    //$('#arrow_Children_List_Right').on('click', funData, listMoveNext);
    //$('#btn_ChildrenList_Add').on('click', showAddSubAccountWindow);
    //if (firstItem) {
    //    firstItem.addClass('active');
    //}

    //loadChildReport({ data: { id: firstId } });
};

function initEvents() {
    var funData = { id: "canvas_Report_Time_Month", step: 55 };
    $('#arrow_Report_CodeTime_Left').on('click', funData, listMovePrev);
    $('#arrow_Report_CodeTime_Right').on('click', funData, listMoveNext);
    $('#btn_Sector_Attention_PDFReport').on('click', openReport);
}

function showAddSubAccountWindow() {
    $('#window_Add_New_SubAccount').modal({})
}

function addNewChild() {

};

function openReport() {
    alert('BUILDING');
}

function loadChildReport() {
    if (!arguments[0] || !arguments[0].data) {
        return;
    }

    var userId = arguments[0].data.id;
    var data = {
        id: 1,
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
            rate: [
                { name: '初级课程', id: 'Primary', rate: 85 },
                { name: '中级课程', id: 'Middle', rate: 11 },
                { name: '高级课程', id: 'Advance', rate: 5 }
            ]
        },
        potential: {
            top: ['数学', '科学'],
            evaluate: [
                { title: '科学', value: 40 },
                { title: '技术', value: 30 },
                { title: '工程', value: 15 },
                { title: '数学', value: 10 },
                { title: '语言', value: 5 }
            ]
        },
        worksitems: [
            { id: 1, hits: 8, img: 'works_1.png', content: 'CREATIVE, ENTERTAINMENT' },
            { id: 2, hits: 6, img: 'works_2.png', content: 'CORPORATE, CREATIVE, NEW' },
            { id: 3, hits: 10, img: 'works_3.png', content: 'CREATIVE, ENTERTAINMENT' },
            { id: 4, hits: 12, img: 'works_4.png', content: 'CORPORATE, ONE-PAGE, TECHNOLOGY' },
            { id: 5, hits: 5, img: 'works_5.png', content: 'NEW, CORPORATE, TECHNOLOGY' },
            { id: 6, hits: 7, img: 'works_6.png', content: 'BASE (MAIN DEMO)' }
        ],
        recommend: [
            { id: 1, hits: 8, img: 'works_1.png', content: 'CREATIVE, ENTERTAINMENT' },
            { id: 2, hits: 6, img: 'works_2.png', content: 'CORPORATE, CREATIVE, NEW' },
            { id: 3, hits: 10, img: 'works_3.png', content: 'CREATIVE, ENTERTAINMENT' }
        ]
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
    drawTimeCompleteRate(data.codetime.rate);
    buildPotentialItems(data.potential.top);
    drawPotentialEvaluate(data.potential.evaluate);
    buildWorksItems(data.worksitems);
    buildRecommendItems(data.recommend);
    $('#lb_Sector_Attention_Content_ChildName').text(data.name);
    $('#lb_Sector_Attention_PDF_ChildName').text(data.name);
    $('.report-focus-child-img-wrap').css('background-image', 'url(images/children/' + data.img + ')')
    $('#btn_Sector_Attention_PDFReport').attr('data-target', data.id);
};

function initPage() {
    initTopWall();
    initEvents();
};