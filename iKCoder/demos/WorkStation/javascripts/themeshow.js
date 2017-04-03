'use strict';

function buildThemeCard(themeData, index) {
    var price = parseInt(themeData.price);
    var favour = '';
    var member = '';
    if (!isNaN(price)) {
        price = "￥ " + price;
        member = '学员账户免费';
    } else {
        price = themeData.price;
        favour = '限时大优惠';
    }

    var themeHTMLStrArr = [];
    themeHTMLStrArr.push('<div class="theme-off-item-container">');
    themeHTMLStrArr.push('	<div class="text theme-off-item-border">');
    themeHTMLStrArr.push('		<div class="theme-off-item-part item-title">');
    themeHTMLStrArr.push('			<div id="theme_show_price_' + index + '" class="theme-off-item-part item-title-price">' + price + '</div>');
    themeHTMLStrArr.push('			<div id="theme_show_favour_' + index + '" class="theme-off-item-part item-title-favour" style="display">' + favour + '</div>');
    themeHTMLStrArr.push('			<div id="theme_show_member_' + index + '" class="theme-off-item-part item-title-favour">' + member + '</div>');
    themeHTMLStrArr.push('		</div>');
    themeHTMLStrArr.push('		<div  id="theme_show_screenshot_' + index + '" class="theme-off-item-part screen-shot" style="background:url(' + themeData.img + ')"></div>');
    themeHTMLStrArr.push('		<div class="text theme-off-item-part item-name">');
    themeHTMLStrArr.push('			<span id="theme_show_name_' + index + '" style="line-height: 40px; padding-left: 10px;">' + themeData.name + '</span>');
    themeHTMLStrArr.push('		</div>');
    themeHTMLStrArr.push('		<div class="text theme-off-item-part item-more">');
    themeHTMLStrArr.push('			<table>');
    themeHTMLStrArr.push('				<tr>');
    themeHTMLStrArr.push('					<td colspan="2">');
    themeHTMLStrArr.push('						<div id="theme_show_note_' + index + '">' + themeData.note + '</div>');
    themeHTMLStrArr.push('					</td>');
    themeHTMLStrArr.push('					<td rowspan="2" style="width:55px;">');
    themeHTMLStrArr.push('						<div id="theme_show_diff_icon_' + index + '" class="theme-off-item-part item-diff difficulty-icon-' + themeData.diff + '"></div>');
    themeHTMLStrArr.push('					</td>');
    themeHTMLStrArr.push('				</tr>');
    themeHTMLStrArr.push('				<tr>');
    themeHTMLStrArr.push('					<td colspan="2">');
    themeHTMLStrArr.push('						<div id="theme_show_diff_' + index + '">难度G' + themeData.diff + '</div>');
    themeHTMLStrArr.push('					</td>');
    themeHTMLStrArr.push('				</tr>');
    themeHTMLStrArr.push('				<tr>');
    themeHTMLStrArr.push('					<td style="width:60px;">');
    themeHTMLStrArr.push('						<div class="button theme-off-item-part item-buy">');
    themeHTMLStrArr.push('							<div class="item-buy-container">');
    themeHTMLStrArr.push('								<div class="item-buy-item icon-h-line"></div>');
    themeHTMLStrArr.push('								<div class="item-buy-item icon-v-line"></div>');
    themeHTMLStrArr.push('								<div class="item-buy-item split-line"></div>');
    themeHTMLStrArr.push('								<div class="text item-buy-item buy-text">购买</div>');
    themeHTMLStrArr.push('							</div>');
    themeHTMLStrArr.push('						</div>');
    themeHTMLStrArr.push('					</td>');
    themeHTMLStrArr.push('					<td colspan="2">');
    themeHTMLStrArr.push('						<div class="button text theme-off-item-part item-moreinfo">更多优惠</div>');
    themeHTMLStrArr.push('					</td>');
    themeHTMLStrArr.push('				</tr>');
    themeHTMLStrArr.push('			</table>');
    themeHTMLStrArr.push('		</div>');
    themeHTMLStrArr.push('	</div>');
    themeHTMLStrArr.push('</div>');
    return $(themeHTMLStrArr.join(''));
};

function buildThemesOff(themeDatas) {
    var container = $('.page-content.theme-off');
    var themesHtmlStrArr = [];
    themesHtmlStrArr.push('<div class="theme-off title-container">');
    themesHtmlStrArr.push('    <table>');
    themesHtmlStrArr.push('        <tr>');
    themesHtmlStrArr.push('            <td style="width:200px;"><div class="text theme-off title-text">最新主题以及优惠</div></td>');
    themesHtmlStrArr.push('            <td style="width:150px;"><div class="text button theme-off title-button" id="referashThemeBtn">更换一批</div></td>');
    themesHtmlStrArr.push('            <td><div></div></td>');
    themesHtmlStrArr.push('            <td style="width:170px;"><div class="text theme-off title-note">更多选择,请前往主题商店</div></td>');
    themesHtmlStrArr.push('            <td style="width:230px;"><div class="text button theme-off title-store" id="themeStoreBtn"></div></td>');
    themesHtmlStrArr.push('        </tr>');
    themesHtmlStrArr.push('    </table>');
    themesHtmlStrArr.push('</div>');
    container.append($(themesHtmlStrArr.join('')));
    var screener = container.append($('<div class="theme-off-screen"></div>'));

    for (var i = 0; i < 4; i++) {
        var themeCard = buildThemeCard(themeDatas[i], i);
        if (themeCard) {
            screener.append(themeCard);
        }
    }

    tmpStoredThemes = themeDatas;
    $('#referashThemeBtn').click(changeThemes);
};

var tmpStoredThemes = null;

var tmpRotationThemes = [
    {
        id: '6',
        name: '皮卡丘Show1',
        note: '炫酷的角色介绍效果演示',
        img: 'images/span/SoleTheme_PCShow.fw.png',
        diff: '3',
        price: '35.0'
    }, {
        id: '5',
        name: '数字秀1',
        note: '实现动画效果的数字',
        img: 'images/span/SoleTheme.fw.png',
        diff: '2',
        price: 'Free'
    }, {
        id: '8',
        name: '真假眼睛 3D Scene1',
        note: '真的假不了',
        img: 'images/span/SoleTheme_3DEyes.fw.png',
        diff: '2',
        price: 'Free'
    }, {
        id: '7',
        name: '月饼杀手1',
        note: '月饼将统治世界',
        img: 'images/span/SoleTheme_MCKiller.fw.png',
        diff: '3',
        price: '25'
    }
];

function getNewThemeDatas() {
    var themeDatas = null;
    if (_themesRotateCount % 2 == 1) {
        themeDatas = tmpRotationThemes;
    } else {
        themeDatas = tmpStoredThemes
    }

    return themeDatas;
}

function changeThemesData() {
    var themeDatas = getNewThemeDatas();
    var price = '';
    var favour = '';
    var member = '';
    for (var i = 0; i < themeDatas.length; i++) {
        price = parseInt(themeDatas[i].price);
        if (!isNaN(price)) {
            price = "￥ " + price;
            member = '学员账户免费';
        } else {
            price = themeDatas[i].price;
            favour = '限时大优惠';
        }

        $('#theme_show_price_' + i).html(price);
        $('#theme_show_favour_' + i).html(favour);
        $('#theme_show_member_' + i).html(member);
        $('#theme_show_screenshot_' + i).css('background', 'url(' + themeDatas[i].img + ')');
        $('#theme_show_name_' + i).html(themeDatas[i].name);
        $('#theme_show_note_' + i).html(themeDatas[i].note);
        $('#theme_show_diff_icon_' + i).removeClass();
        $('#theme_show_diff_icon_' + i).addClass('theme-off-item-part item-diff difficulty-icon-' + themeDatas[i].diff);
        $('#theme_show_diff_' + i).html('难度G' + themeDatas[i].diff);
    }
};

var _themesRotateCount = 1;
function changeThemes(themeDatas) {
    var containers = $('.theme-off-item-container');
    var transition = 'transform 2s';
    var transform = 'rotateY(90deg)';
    for (var i = 0; i < _cssPrefixArr.length; i++) {
        containers.css(_cssPrefixArr[i] + 'transition', transition);
        containers.css(_cssPrefixArr[i] + 'transform', transform);
    }

    changeThemesData(themeDatas);
    var transition = 'transform 2s';
    var transform = 'rotateY(' + (360 * _themesRotateCount) + 'deg)';
    for (var i = 0; i < _cssPrefixArr.length; i++) {
        containers.css(_cssPrefixArr[i] + 'transition', transition);
        containers.css(_cssPrefixArr[i] + 'transform', transform);
    }

    if (_themesRotateCount >= 2) {
        _themesRotateCount++;
    } else {
        _themesRotateCount++;
    }
};