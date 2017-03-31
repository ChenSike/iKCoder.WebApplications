'use strict';

var courseItemWidth = 222;
var courseItemSpace = 20;
var honerItemWidth = 140;
var honerItemSpace = 30;

function buildCarouselItemHTML(dataItem, index) {
    var active = '';
    if (index == 0) {
        active = ' active';
    }

    var symbol = index + 1;
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="item' + active + '">');
    tmpHtmlStrArr.push('    <div class="container padding-H6565" style="background-color:rgb(' + dataItem.bgColor + ');">');
    tmpHtmlStrArr.push('        <div class="row padding-H5050">');
    tmpHtmlStrArr.push('            <div class="col-sm-6">');
    tmpHtmlStrArr.push('                <div class="container padding-top50">');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom30">');
    tmpHtmlStrArr.push('                        <div class="col-sm-12">');
    tmpHtmlStrArr.push('                            <h1 class="text-white">' + dataItem.title + '</h1>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom30">');
    tmpHtmlStrArr.push('                        <div class="col-sm-12 text-white text-size-20">');
    tmpHtmlStrArr.push('                            <p>' + dataItem.content + '</p>');
    tmpHtmlStrArr.push('                            <p>知识点: ' + dataItem.keys + '</p>');
    tmpHtmlStrArr.push('                            <p>难度: ' + dataItem.diff + '</p>');
    tmpHtmlStrArr.push('                            <p>预计学习时间: ' + dataItem.times + '</p>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom20">');
    tmpHtmlStrArr.push('                        <div class="col-xs-12 col-sm-6 col-md-4">');
    tmpHtmlStrArr.push('                            <button type="button" class="btn btn-default btn-lg btn-block" id="btn_Top_Carousel_Item" data-target="' + dataItem.symbol + '" style="background-color:rgb(' + dataItem.btnColor + ');">开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;始</button>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="col-sm-6 padding-top50 padding-bottom20">');
    tmpHtmlStrArr.push('                <img src="' + dataItem.img + '" alt="First slide"/>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');
    return tmpHtmlStrArr.join('');
};

function buildTopCarousel(data) {
    var active = '';
    for (var i = 0; i < data.length; i++) {
        active = '';
        if (i == 0) {
            active = ' class="active"';
        }

        $('#carousel_Top_Indicators').append($('<li data-target="#carousel_Top" data-slide-to="' + i + '"' + active + '></li>'));
        $('#carousel_Top_Inner').append($(buildCarouselItemHTML(data[i], i)));
    }
};

function buildCourseItemHTML(data, needPlay) {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="container learning-course-item bg-white">');
    tmpHtmlStrArr.push('    <div class="row">');
    tmpHtmlStrArr.push('        <div class="col-sm-12 learning-course-item" style="background-image: url(images/course/course_' + data.img + ')">');
    if (needPlay) {
        tmpHtmlStrArr.push('            <img class="learning-course-item-play-btn" src="images/course/play.png"/>');
    }

    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('    <div class="row">');
    tmpHtmlStrArr.push('        <div class="col-sm-12 padding-top20">');
    tmpHtmlStrArr.push('            <h4>' + data.title + '</h4>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('    <div class="row">');
    tmpHtmlStrArr.push('        <div class="col-sm-12 padding-bottom20">');
    tmpHtmlStrArr.push('            <p>' + data.content + '</p>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');
    return tmpHtmlStrArr.join('');
}

function initTopCarousel(_data) {
    var dataItems = $(_data).find("carousel").find('item');
    var data = [];
    for (var i = 0; i < dataItems.length; i++) {
        var tmpItem = $(dataItems[i]);
        data.push({
            bgColor: tmpItem.attr('color'),
            title: tmpItem.attr('title'),
            content: tmpItem.attr('content'),
            keys: tmpItem.attr('keys'),
            diff: tmpItem.attr('diff'),
            times: tmpItem.attr('times'),
            img: 'images/carousel/' + tmpItem.attr('img'),
            btnColor: tmpItem.attr('btnColor'),
            symbol: tmpItem.attr('symbol')
        });
    }

    buildTopCarousel(data);
    $("#myCarousel").carousel('cycle');
};

function buildHonorItemHTML(imgSrc, title, disabled) {
    var titleClass = '';
    var displayed = '';
    if (disabled) {
        imgSrc += '.d';
        titleClass = ' unreached';
        displayed = 'display:none;';
    }

    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="honor-wall-item">');
    tmpHtmlStrArr.push('    <div class="text-center-white">');
    tmpHtmlStrArr.push('        <img src="images/honor/' + imgSrc + '.png"/>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('    <div>');
    tmpHtmlStrArr.push('        <p class="honor-item-title' + titleClass + '">' + title + '</p>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('    <div class="honor-item-reached" style="' + displayed + '"></div>');
    tmpHtmlStrArr.push('</div>');
    return tmpHtmlStrArr.join('');
};

function buildCourseClassifyTHItemHTML(id, title, isActive) {
    var active = isActive ? ' class="active"' : '';
    return '<li' + active + '><a href="#course_Classify_' + id + '" data-toggle="tab">' + title + '</a></li>';
}

function buildCourseClassifyTCItemHTML(data, isActive) {
    var active = isActive ? 'active' : '';
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="tab-pane fade in ' + active + ' border-1-edede5" id="course_Classify_' + data.id + '">');
    tmpHtmlStrArr.push('    <div class="container learning-course-wrap">');
    tmpHtmlStrArr.push('        <table class="list-container">');
    tmpHtmlStrArr.push('            <tr>');
    tmpHtmlStrArr.push('                <td style="width:30px;">');
    var tmpId = 'container_Course_Classify_' + data.id + '_List';
    tmpHtmlStrArr.push('                    <div class="learning-course-list-arrow" id="arrow_Course_Classify_' + data.id + '_List_Left" data-target="' + tmpId + '">');
    tmpHtmlStrArr.push('                        <span class="glyphicon glyphicon-chevron-left"></span>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                </td>');
    tmpHtmlStrArr.push('                <td style="overflow:hidden;">');
    tmpHtmlStrArr.push('                    <div class="learning-course-contianer items-list-container" id="' + tmpId + '"></div>');
    tmpHtmlStrArr.push('                </td>');
    tmpHtmlStrArr.push('                <td style="width:30px;">');
    tmpHtmlStrArr.push('                    <div class="learning-course-list-arrow margin-top-10" id="arrow_Course_Classify_' + data.id + '_List_Right" style="margin-left:5px;" data-target="' + tmpId + '">');
    tmpHtmlStrArr.push('                        <span class="glyphicon glyphicon-chevron-right"></span>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                </td>');
    tmpHtmlStrArr.push('            </tr>');
    tmpHtmlStrArr.push('        </table>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');
    return tmpHtmlStrArr.join('');
}

function buildDistributionLegendItemHTML(data) {
    return '<li><div class="user-course-legend" style="background-color:' + data.color + ';"></div>' + data.title + '</li>';
}

function initHonorWall(_data) {
    var dataItems = $(_data).find("honorwall").find('item');
    var user = { name: $($(_data).find("userinfo").find('user')[0]).attr('name'), honor: [] };
    var data = [];
    for (var i = 0; i < dataItems.length; i++) {
        var tmpItem = $(dataItems[i]);
        data.push({
            map: tmpItem.attr('map'),
            title: tmpItem.attr('title'),
            condition: tmpItem.attr('condition'),
            isused: tmpItem.attr('isused')
        });

        if (data[data.length - 1].isused == '1') {
            user.honor.push(data[data.length - 1].map);
        }
    }

    $('#title_HonorWall').text(user.name + '的荣誉墙');
    $('#container_HonorWall').width((honerItemWidth + honerItemSpace) * data.length);
    var tmpFlag = false;
    for (var i = 0; i < data.length; i++) {
        tmpFlag = false;
        for (var j = 0; j < user.honor.length; j++) {
            if (data[i].map == user.honor[j]) {
                tmpFlag = true;
                break;
            }
        }

        $('#container_HonorWall').append($(buildHonorItemHTML(data[i].map, data[i].title, !tmpFlag)));
    }
    var funData = { id: "container_HonorWall", step: honerItemWidth + honerItemSpace };
    $('#arrow_HonorWall_List_Left').on('click', funData, listMovePrev);
    $('#arrow_HonorWall_List_Right').on('click', funData, listMoveNext);
};

function initUserInfo(_data) {
    var userItem = $($(_data).find("userinfo").find('user')[0]);
    var user = {
        name: userItem.attr('name'),
        level: userItem.attr('level'),
        works: userItem.attr('works'),
        course: userItem.attr('course'),
        friend: userItem.attr('friend'),
        head: userItem.attr('head')
    };

    $('#icon_UserInfo_Head').attr('src', 'images/head/head_' + user.head + '.png');
    $('#lb_UserInfo_UserName').text(user.name);
    $('#lb_UserInfo_UserLevel').text(user.level);
    $('#lb_UserInfo_WorksCount').text(user.works);
    $('#lb_UserInfo_CourseCount').text(user.course);
    $('#lb_UserInfo_FriendCount').text(user.friend);
    $('#btn_UserInfo_ChangeHeader').on('click', changeUserHead);
    $('#btn_UserInfo_Share').on('click', userShare);
};

function initUserCourse(_data) {
    var courseItem = $($(_data).find("userinfo").find('course')[0]);
    var userCourse = {
        rank: courseItem.attr('rank'),
        emp: courseItem.attr('emp'),
        works: courseItem.attr('works'),
        works_rank: courseItem.attr('works_rank'),
        code_time: courseItem.attr('code_time'),
        code_time_exceed: courseItem.attr('code_time_exceed'),
        primary_rate: courseItem.attr('primary_rate'),
        middel_rate: courseItem.attr('middel_rate'),
        advanced_rate: courseItem.attr('advanced_rate'),
        distribution: [],
        codetimes: []
    };

    var distributionItems = $(_data).find("userinfo").find('distribution').find('item');
    for (var i = 0; i < distributionItems.length; i++) {
        var tmpItem = $(distributionItems[i]);
        userCourse.distribution.push(
            {
                id: tmpItem.attr('id'),
                title: tmpItem.attr('title'),
                color: tmpItem.attr('color'),
                exp: tmpItem.attr('exp')
            }
        );
    }

    var codetimesItems = $(_data).find("userinfo").find('codetimes').find('item');
    for (var i = 0; i < codetimesItems.length; i++) {
        var tmpItem = $(codetimesItems[i]);
        userCourse.codetimes.push({ date: tmpItem.attr('date'), time: tmpItem.attr('time') });
    }

    for (var i = 0; i < userCourse.distribution.length; i++) {
        $('#ul_User_Course_Distribution_Legend').append($(buildDistributionLegendItemHTML(userCourse.distribution[i])));
    }

    $('#lb_User_Course_CourseRank').text(userCourse.rank);
    $('#lb_User_Course_Empirical').text(userCourse.emp);
    $('#lb_User_Course_Works').text(userCourse.works);
    $('#lb_User_Course_WorksRank').text(userCourse.works_rank);
    $('#lb_User_Course_CodeTime').text(userCourse.code_time);
    $('#lb_User_Course_CodeTime_Exceed').text(userCourse.code_time_exceed + "%");
    $('#lb_User_Course_Primary_Rate').text(userCourse.primary_rate + "%");
    $('#lb_User_Course_Middel_Rate').text(userCourse.middel_rate + "%");
    $('#lb_User_Course_Advanced_Rate').text(userCourse.advanced_rate + "%");
    drawDistribution(userCourse.distribution);
    drawCodeTime(userCourse.codetimes);
};

function initLearningCourseList(_data) {
    var dataItems = $(_data).find("learning").find('item');
    var data = [];
    for (var i = 0; i < dataItems.length; i++) {
        var tmpItem = $(dataItems[i]);
        data.push(
            {
                id: tmpItem.attr('id'),
                title: tmpItem.attr('title'),
                content: tmpItem.attr('content'),
                img: tmpItem.attr('img')
            }
        );
    }

    for (var i = 0; i < data.length; i++) {
        $('#container_Learning_Course_List').append($(buildCourseItemHTML(data[i], true)));
    }

    var tmpWidth = (courseItemWidth + courseItemSpace) * data.length;
    $('#container_Learning_Course_List').width(tmpWidth);
    var funData = { id: "container_Learning_Course_List", step: courseItemWidth + courseItemSpace };
    $('#arrow_Learning_Course_List_Left').on('click', funData, listMovePrev);
    $('#arrow_Learning_Course_List_Right').on('click', funData, listMoveNext);
}

function initCourseClassifyList(_data) {
    var categoryItems = $(_data).find("classify").find('category');
    var data = [];
    for (var i = 0; i < categoryItems.length; i++) {
        var cateItem = $(categoryItems[i]);
        var tmpItems = cateItem.find('item');
        var cateData = [];
        for (var j = 0; j < tmpItems.length; j++) {
            var tmpItem = $(tmpItems[j]);
            cateData.push({
                id: tmpItem.attr('id'),
                title: tmpItem.attr('title'),
                content: tmpItem.attr('content'),
                img: tmpItem.attr('img')
            });
        }

        data.push({
            id: cateItem.attr('id'),
            symbol: cateItem.attr('symbol'),
            title: cateItem.attr('title'),
            data: cateData
        });
    }

    var isActive = false;
    var tmpItem = null;
    var tmpWidth = 0;
    var tmpId = '';
    for (var j = 0; j < data.length; j++) {
        isActive = (j == 0 ? true : false);
        tmpItem = data[j];
        $('#container_Course_Classify_TabHeader').append($(buildCourseClassifyTHItemHTML(tmpItem.id, tmpItem.title, isActive)));
        $('#container_Course_Classify_TabContent').append($(buildCourseClassifyTCItemHTML(tmpItem, isActive)));
        tmpId = 'container_Course_Classify_' + tmpItem.id + '_List';
        for (var i = 0; i < tmpItem.data.length; i++) {
            $('#' + tmpId).append($(buildCourseItemHTML(tmpItem.data[i], false)));
        }

        tmpWidth = (courseItemWidth + courseItemSpace) * tmpItem.data.length;
        $('#' + tmpId).width(tmpWidth);
        var funData = { id: tmpId, step: courseItemWidth + courseItemSpace };
        $('#arrow_Course_Classify_' + tmpItem.id + '_List_Left').on('click', funData, listMovePrev);
        $('#arrow_Course_Classify_' + tmpItem.id + '_List_Right').on('click', funData, listMoveNext);
    }
}

function changeUserHead() {

};

function userShare() {

};

function drawDistribution(datas) {
    var lineWidth = 30;
    var canvas = document.getElementById('canvas_User_Course_Distribution');
    var parent = $($(canvas).parent());
    var width = parent.width();
    var height = parent.height();
    canvas.width = Math.floor(width - 5);
    canvas.height = Math.floor(height - 10)
    var context = canvas.getContext('2d');
    var radius = Math.floor(Math.min(width, height) / 2) - lineWidth;
    var centerX = Math.floor(width / 2);
    var centerY = Math.floor(height / 2) - 5;
    var total = 0;
    for (var i = 0; i < datas.length; i++) {
        total += datas[i].exp;
    }

    var startRadian = 0;
    var endRadian = 0;
    var tmpRadian = 0;
    var tmpX = 0;
    var tmpY = 0;
    for (var i = 0; i < datas.length; i++) {
        startRadian = endRadian;
        tmpRadian = datas[i].exp / total * Math.PI * 2;
        endRadian += tmpRadian;
        context.beginPath();
        context.strokeStyle = datas[i].color;
        context.arc(centerX, centerY, radius, startRadian, endRadian);
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();

        tmpX = centerX + radius * Math.cos(startRadian + tmpRadian / 2) - 8;
        tmpY = centerY + radius * Math.sin(startRadian + tmpRadian / 2);
        context.font = "normal normal bold 11px \"微软雅黑\"";
        context.fillStyle = "rgb(255,255,255)";
        context.fillText(datas[i].exp, tmpX, tmpY);
    }
}

function drawCodeTime(datas) {
    var barWidth = 15;
    var barSpace = 10;
    var lineWidth = 1;
    var canvas = document.getElementById('canvas_User_Course_CodeTime');
    var parent = $($(canvas).parent());
    var width = parent.width();
    var height = parent.height();
    canvas.width = Math.floor((barWidth + barSpace) * datas.length);
    canvas.height = Math.floor(height - 10)
    var context = canvas.getContext('2d');
    var maxValue = datas[0].time;
    for (var i = 0; i < datas.length; i++) {
        maxValue = Math.max(maxValue, datas[i].time);
    }

    var unit = Math.floor((height - 10 - 30) / maxValue);
    var startX = barSpace;
    var startY = height - 30;
    var ltX, ltY, rtX, rtY, rbX, rbY, linearGradient, bHeight, bWidth, tmpX, tmpY, tmpArr;
    for (var i = 0; i < datas.length; i++) {
        if (datas[i].time <= 0) {
            startX = rtX + barSpace;
            continue;
        }

        ltX = startX;
        ltY = startY - datas[i].time * unit - lineWidth * 2;
        rtX = startX + barWidth + lineWidth;
        rtY = ltY;
        rbX = rtX;
        rbY = startY;
        bHeight = datas[i].time * unit + lineWidth * 2;
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
        context.fillText(datas[i].time, tmpX, tmpY);
        //draw date label
        tmpX = startX;
        tmpY = startY + 12;
        context.font = "normal normal 600 8px \"微软雅黑\"";
        context.fillStyle = "rgb(97,97,97)";
        tmpArr = datas[i].date.split('-');
        context.fillText(tmpArr[1] + '-' + tmpArr[2], tmpX, tmpY);
        //calculate next X
        startX = rtX + barSpace;
    }

    $('#arrow_User_Course_CodeTime_Left').css('top', Math.floor((height - 24) / 2) + 'px');
    $('#arrow_User_Course_CodeTime_Left').css('left', '0px');
    $('#arrow_User_Course_CodeTime_Right').css('top', (-1 * Math.floor((height - 24) / 2) - 40 - 7) + 'px');
    $('#arrow_User_Course_CodeTime_Right').css('left', (width - 15) + 'px');
    var funData = { id: 'canvas_User_Course_CodeTime', step: barWidth + barSpace };
    $('#arrow_User_Course_CodeTime_Left').on('click', funData, listMovePrev);
    $('#arrow_User_Course_CodeTime_Right').on('click', funData, listMoveNext);
}

function initPage() {
    _registerRemoteServer();
    $.ajax({
        type: 'GET',
        url: _getRequestURL(_gURLMapping.data.studentcenter, { symbol: 'config_student_index' }),
        data: '<root></root>',
        success: function (data, status) {
            initTopCarousel(data);
            initHonorWall(data);
            initUserInfo(data);
            initUserCourse(data);
            initLearningCourseList(data);
            initCourseClassifyList(data);
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
        }
    });
};