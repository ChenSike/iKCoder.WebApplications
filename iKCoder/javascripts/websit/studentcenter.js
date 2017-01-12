'use strict';

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

        $('#carousel_Top_Indicators').append($('<li data-target="#myCarousel" data-slide-to="0"' + active + '></li>'));
        $('#carousel_Top_Inner').append($(buildCarouselItemHTML(data[i], i)));
    }
};

function buildCourseItemHTML(data) {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="container learning-course-item bg-white">');
    tmpHtmlStrArr.push('    <div class="row">');
    tmpHtmlStrArr.push('        <div class="col-sm-12 learning-course-item" style="background-image: url(images/course/course_' + data.img + '.png)">');
    tmpHtmlStrArr.push('            <img class="learning-course-item-play-btn" src="images/course/play.png"/>');
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

    var itemWidth = 150;
    var containerWidth = (itemWidth + 10) * data.length;
    $('#container_HonorWall').css('width', containerWidth + 'px');
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
        distribution: {},
        codetime_bar: []
    };

    $('#lb_User_Course_CourseRank').text(userCourse.rank);
    $('#lb_User_Course_Empirical').text(userCourse.emp);
    $('#lb_User_Course_Works').text(userCourse.works);
    $('#lb_User_Course_WorksRank').text(userCourse.works_rank);
    //$('#canvas_User_Course_Distribution');
    //$('#canvas_User_Course_CodeTime');
    $('#lb_User_Course_CodeTime').text(userCourse.code_time);
    $('#lb_User_Course_CodeTime_Exceed').text(userCourse.code_time_exceed + "%");
    $('#lb_User_Course_Primary_Rate').text(userCourse.primary_rate + "%");
    $('#lb_User_Course_Middel_Rate').text(userCourse.middel_rate + "%");
    $('#lb_User_Course_Advanced_Rate').text(userCourse.advanced_rate + "%");
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
        $('#container_Learning_Course_List').append($(buildCourseItemHTML(data[i])));
    }

    var tmpWidth = (222 + 20) * data.length;
    $('#container_Learning_Course_List').css('width', tmpWidth + 'px');
}

function changeUserHead() {

};

function userShare() {

};

function initPage() {
    initTopCarousel();
    initHonorWall();
    initUserInfo();
    initUserCourse();
    initLearningCourseList();
};