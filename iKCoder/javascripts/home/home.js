'use strict';

var _cssPrefixArr = ['', '-moz-', '-o-', '-webkit-', 'ms'];

function signIn() {
    var container = jQuery("#signInContainer");
    var mask = jQuery("#signInMaskDiv");
    var pageSize = getPageSize();
    if (container.length < 1) {
        var tmpHTML = '<div id="signInContainer">';
        tmpHTML += '<table style="width:100%; height:100%;">';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td colspan="3"><span id="signInPopWinTitle">登录</span></td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td style="width:120px;">用户名</td>';
        tmpHTML += '        <td><input id="signInUserNameTxt" type="text" class="sign-in-input-field" placeholder="手机号/E-Mail/用户名"/></td>';
        tmpHTML += '        <td style="width:20px;"></td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td>密   码</td>';
        tmpHTML += '        <td><input id="signInPasswordTxt" type="password"  class="sign-in-input-field"/></td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td></td>';
        tmpHTML += '        <td><div id="signInForgetPwd">忘记密码</div></td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td colspan="3">';
        tmpHTML += '            <div class="sign-in-buttons-container">';
        tmpHTML += '                <div id="signInLoginBtn" class="sign-in-button">登录</div>';
        tmpHTML += '                <div id="signInRegistBtn" class="sign-in-button">注册</div>';
        tmpHTML += '                <div id="signInCancelBtn" class="sign-in-button">取消</div>';
        tmpHTML += '            </div>';
        tmpHTML += '        </td>';
        tmpHTML += '    </tr>';
        tmpHTML += '</table>';
        tmpHTML += '</div>';
        jQuery('body').append(jQuery(tmpHTML));
        container = jQuery("#signInContainer");
        jQuery("#signInLoginBtn").click(userLogin);
        jQuery("#signInRegistBtn").click(userRegist);
        jQuery("#signInCancelBtn").click(cancelSign);
        jQuery("#signInForgetPwd").click(forgetPwd);
        
        if (mask.length < 1) {
            jQuery('body').append(jQuery('<div id="signInMaskDiv"></div>'));
            mask = jQuery("#signInMaskDiv");
            mask.css('width', pageSize.bw + 'px');
            mask.css('height', pageSize.bh + 'px');
        }
        
        jQuery(window).scroll(
            function () {
                var container = jQuery("#signInContainer");
                if (container.css('display') != "none") {
                    var pageSize = getPageSize();
                    var tmpTop = (pageSize.h - container.outerHeight()) / 2 + pageSize.t;
                    var tmpLeft = (pageSize.w - container.outerWidth()) / 2 + pageSize.l;
                    container.css('top', tmpTop + 'px');
                    container.css('left', tmpLeft + 'px');
                }
            }
        );
    }

    mask.css('display', 'block');
    container.css('display', 'block');
    jQuery("#signInUserNameTxt").val(""),
    jQuery("#signInPasswordTxt").val("")

    var tmpTop = (pageSize.h - container.outerHeight()) / 2 + pageSize.t;
    var tmpLeft = (pageSize.w - container.outerWidth()) / 2 + pageSize.l;
    container.css('top', tmpTop + 'px');
    container.css('left', tmpLeft + 'px');
};

function getPageSize() {
    var bodyHeight = document.body.clientHeight;
    var bodyWidth = document.body.clientWidth;
    var bodyTop = document.body.scrollTop;
    var bodyLeft = document.body.scrollLeft;
    var innerHeight = window.innerHeight;
    var innerWidth = window.innerWidth;
    return { h: innerHeight, w: innerWidth, t: bodyTop, l: bodyLeft, bh: bodyHeight, bw: bodyWidth };
};

function userLogin() {
    jQuery("#signInPopWinTitle").text("登录");
    jQuery("#signInForgetPwd").css('display', "block");
    jQuery.post(
        "demo_test_post.asp",
        {
            name: jQuery("#signInUserNameTxt").val(),
            city: jQuery("#signInPasswordTxt").val()
        },
        function (data, status) {
            jQuery("#signInContainer").css('display', "none");
            jQuery("#signInMaskDiv").css('display', "none");
            alert("Data: " + data + "\nStatus: " + status);
        }
    );
}

function userRegist() {
    jQuery("#signInPopWinTitle").text("注册");
    jQuery("#signInForgetPwd").css('display', "none");
    jQuery.post(
        "demo_test_post.asp",
        {
            name: jQuery("#signInUserNameTxt").val(),
            city: jQuery("#signInPasswordTxt").val()
        },
        function (data, status) {
            jQuery("#signInContainer").css('display', "none");
            jQuery("#signInMaskDiv").css('display', "none");
            alert("Data: " + data + "\nStatus: " + status);
        }
    );
}

function cancelSign() {
    jQuery("#signInPopWinTitle").text("登录");
    jQuery("#signInContainer").css('display', "none");
    jQuery("#signInMaskDiv").css('display', "none");
}

function forgetPwd() {

}