'use strict';

var courseItemWidth = 222;
var courseItemSpace = 20;
var honerItemWidth = 140;
var honerItemSpace = 0;

function buildCarouselItemHTML(dataItem, index) {
    var active = '';
    if (index == 0) {
        active = ' active';
    }

    var symbol = index + 1;
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="item' + active + '">');
    tmpHtmlStrArr.push('    <div class="container" style="background-color:rgb(' + dataItem.bgColor + ');">');
    tmpHtmlStrArr.push('        <div class="row padding-H5050">');
    tmpHtmlStrArr.push('            <div class="col-sm-6">');
    tmpHtmlStrArr.push('                <div class="container padding-top50">');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom30">');
    tmpHtmlStrArr.push('                        <div class="col-sm-12">');
    tmpHtmlStrArr.push('                            <h1 class="text-white">' + dataItem.title + '</h1>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom30">');
    tmpHtmlStrArr.push('                        <div class="col-sm-12 text-white text-size-25">');
    tmpHtmlStrArr.push('                            <p>' + dataItem.content + '</p>');
    tmpHtmlStrArr.push('                            <p>知识点: ' + dataItem.keys + '</p>');
    tmpHtmlStrArr.push('                            <p>难度: ' + dataItem.diff + '</p>');
    tmpHtmlStrArr.push('                            <p>预计学习时间: ' + dataItem.times + '</p>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom20">');
    tmpHtmlStrArr.push('                        <div class="col-xs-12 col-sm-6 col-md-4">');
    tmpHtmlStrArr.push('                            <button type="button" class="btn btn-default btn-lg btn-block" id="btn_Top_Carousel_Item" style="background-color:rgb(' + dataItem.btnColor + ');">开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;始</button>');
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
    tmpHtmlStrArr.push('        <div class="col-sm-12 learning-course-item" style="background-image: url(images/course/course_' + data.img + '.png)">');
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

function initTopCarousel() {
    var data = [];
    data.push({
        bgColor: '27,189,140',
        title: '1. 吃豆人大冒险',
        content: '控制黄色小英雄，吃掉所有的豆子，小心邪恶小怪兽哦！',
        keys: '键盘指令，空间移动',
        diff: '中等',
        times: '45分钟',
        img: 'images/carousel/pacmanbanner.png',
        btnColor: '25,161,121'
    });

    data.push({
        bgColor: '27,189,140',
        title: '2. 吃豆人大冒险',
        content: '控制黄色小英雄，吃掉所有的豆子，小心邪恶小怪兽哦！',
        keys: '键盘指令，空间移动',
        diff: '中等',
        times: '45分钟',
        img: 'images/carousel/pacmanbanner.png',
        btnColor: '25,161,121'
    });

    data.push({
        bgColor: '27,189,140',
        title: '3. 吃豆人大冒险',
        content: '控制黄色小英雄，吃掉所有的豆子，小心邪恶小怪兽哦！',
        keys: '键盘指令，空间移动',
        diff: '中等',
        times: '45分钟',
        img: 'images/carousel/pacmanbanner.png',
        btnColor: '25,161,121'
    });

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

function initHonorWall() {
    var data = [];
    data.push({ map: 'computerprofessor', title: '计算机小专家', condition: '' });
    data.push({ map: 'shareexpert', title: '分享达人', condition: '' });
    data.push({ map: 'mathematician', title: '小小数学家', condition: '' });
    data.push({ map: 'arithmeticprofessor', title: '算法小达人', condition: '' });
    data.push({ map: 'languagemaster', title: '语言大师', condition: '' });
    data.push({ map: 'musician', title: '音乐家', condition: '' });
    data.push({ map: 'sciencemastermind', title: '科学智多星', condition: '' });
    data.push({ map: 'littlepinter', title: '小画家', condition: '' });
    data.push({ map: 'UAVpilot', title: '无人机小飞手', condition: '' });

    var user = {
        name: '可乐',
        honor: ['computerprofessor', 'shareexpert']
    };

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

function initUserInfo() {
    var user = {
        name: '可乐',
        level: '实习工程师',
        works: 18,
        course: 25,
        friend: 30,
        head: 1,
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

function initUserCourse() {
    var userCourse = {
        rank: 1,
        emp: 2600,
        works: 18,
        works_rank: 2,
        code_time: 175,
        code_time_exceed: 92,
        primary_rate: 85,
        middel_rate: 11,
        advanced_rate: 5,
        distribution: [
            { id: 'science', title: '科学', color: 'rgb(36,90,186)', exp: 250 },
            { id: 'skill', title: '技术', color: 'rgb(236,15,33)', exp: 400 },
            { id: 'engineering', title: '工程', color: 'rgb(165,165,165)', exp: 550 },
            { id: 'math', title: '数学', color: 'rgb(255,191,0)', exp: 700 },
            { id: 'language', title: '语言', color: 'rgb(71,143,208)', exp: 700 },
        ],
        codetimes: [
            { date: '2017-1-1', time: 3 },
            { date: '2017-1-2', time: 2 },
            { date: '2017-1-3', time: 4 },
            { date: '2017-1-4', time: 1 },
            { date: '2017-1-5', time: 3 },
            { date: '2017-1-6', time: 2 },
            { date: '2017-1-7', time: 4 },
            { date: '2017-1-8', time: 5 },
            { date: '2017-1-9', time: 6 },
            { date: '2017-1-10', time: 7 },
            { date: '2017-1-11', time: 2 },
            { date: '2017-1-12', time: 1 },
            { date: '2017-1-13', time: 3 },
            { date: '2017-1-14', time: 2 },
            { date: '2017-1-15', time: 4 },
            { date: '2017-1-16', time: 1 },
            { date: '2017-1-17', time: 2 },
            { date: '2017-1-18', time: 3 },
            { date: '2017-1-19', time: 5 },
            { date: '2017-1-20', time: 2 },
            { date: '2017-1-21', time: 4 },
            { date: '2017-1-22', time: 1 },
            { date: '2017-1-23', time: 3 },
            { date: '2017-1-24', time: 2 },
            { date: '2017-1-25', time: 1 }
        ]
    };

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

function initLearningCourseList() {
    var data = [];
    data.push({
        title: 'Star Wars',
        content: 'Learn to program droids, and create your own Star Wars game in a galaxy far, far away.',
        img: '1'
    });
    data.push({
        title: 'Frozen',
        content: 'Let\'s use code to join Anna and Elsa as they explore the magic and beauty of ice.',
        img: '2'
    });
    data.push({
        title: 'Flappy Code',
        content: 'Wanna write your own game in less than 10 minutes? Try our Flappy Code tutorial!',
        img: '3'
    });
    data.push({
        title: 'Infinity Play Lab',
        content: 'Use Play Lab to create a story or game starring Disney Infinity characters.',
        img: '4'
    });
    data.push({
        title: 'Play Lab',
        content: 'Create a story or game with Play Lab.',
        img: '5'
    });

    for (var i = 0; i < data.length; i++) {
        $('#container_Learning_Course_List').append($(buildCourseItemHTML(data[i], true)));
    }

    var tmpWidth = (courseItemWidth + courseItemSpace) * data.length;
    $('#container_Learning_Course_List').width(tmpWidth);
    var funData = { id: "container_Learning_Course_List", step: courseItemWidth + courseItemSpace };
    $('#arrow_Learning_Course_List_Left').on('click', funData, listMovePrev);
    $('#arrow_Learning_Course_List_Right').on('click', funData, listMoveNext);
}

function initCourseClassifyList() {
    var tmpData = [];
    tmpData.push({
        title: 'Star Wars',
        content: 'Learn to program droids, and create your own Star Wars game in a galaxy far, far away.',
        img: '1'
    });
    tmpData.push({
        title: 'Frozen',
        content: 'Let\'s use code to join Anna and Elsa as they explore the magic and beauty of ice.',
        img: '2'
    });
    tmpData.push({
        title: 'Flappy Code',
        content: 'Wanna write your own game in less than 10 minutes? Try our Flappy Code tutorial!',
        img: '3'
    });
    tmpData.push({
        title: 'Infinity Play Lab',
        content: 'Use Play Lab to create a story or game starring Disney Infinity characters.',
        img: '4'
    });
    tmpData.push({
        title: 'Play Lab',
        content: 'Create a story or game with Play Lab.',
        img: '5'
    });
    var dataCmp = { id: 'Computer', title: '计算机基础', data: tmpData };
    var dataMath = { id: 'Math', title: '数学', data: tmpData };
    var dataPhy = { id: 'Physics', title: '物理', data: tmpData };
    var dataPaint = { id: 'Paint', title: '绘图', data: tmpData };
    var dataLang = { id: 'Language', title: '语言学', data: tmpData };
    var data = [];
    data.push(dataCmp);
    data.push(dataMath);
    data.push(dataPhy);
    data.push(dataPaint);
    data.push(dataLang);
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
    for (var i = 1; i < datas.length; i++) {
        maxValue = Math.max(maxValue, datas[i].time);
    }

    var unit = Math.floor((height - 10 - 30) / maxValue);
    var startX = barSpace;
    var startY = height - 30;
    var ltX, ltY, rtX, rtY, rbX, rbY, linearGradient, bHeight, bWidth, tmpX, tmpY, tmpArr;
    for (var i = 1; i < datas.length; i++) {
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
    initTopCarousel();
    initHonorWall();
    initUserInfo();
    initUserCourse();
    initLearningCourseList();
    initCourseClassifyList();
};