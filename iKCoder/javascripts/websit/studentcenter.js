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
    tmpHtmlStrArr.push('                            <p>' + dataItem.keys + '</p>');
    tmpHtmlStrArr.push('                            <p>' + dataItem.diff + '</p>');
    tmpHtmlStrArr.push('                            <p>' + dataItem.times + '</p>');
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
}

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
}

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
}

function initHonorWallItems(userHonor) {
    var itemWidth = 150;
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
    var containerWidth = (itemWidth + 10) * data.length + 100;
    $('#container_HonorWall').css('width', containerWidth + 'px');
    var tmpFlag = false;
    for (var i = 0; i < data.length; i++) {
        tmpFlag = false;
        for (var j = 0; j < userHonor.length; j++) {
            if (data[i].map == userHonor[j]) {
                tmpFlag = true;
                break;
            }
        }

        $('#container_HonorWall').append($(buildHonorItemHTML(data[i].map, data[i].title, !tmpFlag)));
    }
}

function initHonorWall() {
    var user = {
        name: '可乐',
        honor: ['computerprofessor', 'shareexpert']
    };

    $('#title_HonorWall').text(user.name + '的荣誉墙');
    initHonorWallItems(user.honor);
}

function initPage() {
    initTopCarousel();
    initHonorWall();
}