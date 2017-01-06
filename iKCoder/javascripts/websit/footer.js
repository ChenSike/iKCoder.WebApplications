'use strict';

function BuildFooterHTML() {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('    <div class="footer-txt" style="background-color: rgb(45,45,45);">');
    tmpHtmlStrArr.push('        <div class="container">');
    tmpHtmlStrArr.push('            <div>');
    tmpHtmlStrArr.push('                <p class="footer-hypelink">');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_Foot_About">' + _getLabel('关于艾酷') + '</a>');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_Foot_Product" style="padding-left:20px;">' + _getLabel('艾酷教育平台') + '</a>');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_Foot_OnlineCourse" style="padding-left:20px;">' + _getLabel('线上体验课') + '</a>');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_Foot_Parents" style="padding-left:20px;">' + _getLabel('家长') + '</a>');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_Foot_Education" style="padding-left:20px;">' + _getLabel('教育工作者') + '</a>');
    tmpHtmlStrArr.push('                </p>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('    <div class="footer-txt" style="background-color: rgb(23,23,23);">');
    tmpHtmlStrArr.push('        <div class="container">');
    tmpHtmlStrArr.push('            <div>');
    tmpHtmlStrArr.push('                <p class="copyright-txt">Designed By <span style="font-weight:bold">');
    tmpHtmlStrArr.push('                    iKCoder.Co (ShenZhen)</span> | ');
    tmpHtmlStrArr.push('                    Powered by ');
    tmpHtmlStrArr.push('                    <span style="font-weight:bold">iKCoder.Co (ShenZhen)</span>');
    tmpHtmlStrArr.push('                </p>');
    tmpHtmlStrArr.push('                <div class="socials">');
    //tmpHtmlStrArr.push('                    <a href="#" title="Facebook"><i class="ion ion-social-facebook"></i></a>');weibo.png
    tmpHtmlStrArr.push('                    <a href="#" title="' + _getLabel('微信') + '"><img src="images/icon/wechat.png"/></a>');
    tmpHtmlStrArr.push('                    <a href="#" title="' + _getLabel('新浪微博') + '"><img src="images/icon/weibo.png"/></a>');
    tmpHtmlStrArr.push('                    <a href="#" title="' + _getLabel('推特') + '"><i class="ion ion-social-twitter"></i></a>');
    tmpHtmlStrArr.push('                    <a href="#" title="' + _getLabel('谷歌+') + '"><i class="ion ion-social-google"></i></a>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('    <a href="#" class="scrollup" title="Back to Top!"><i class="ion ion-ios-arrow-up"></i></a>');
    $('footer').append($(tmpHtmlStrArr.join('')));
} 

function initFooter() {
    BuildFooterHTML();
    initFooterEvent();
}

function initFooterEvent() {
    $("#linkBtn_Foot_About").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Foot_OnlineCourse").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Foot_Parents").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Foot_Education").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Foot_Product").on('click', function () {
        window.location.href = "product.html";
    });
}

