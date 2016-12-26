'use strict';

var _cssPrefixArr = ['', '-moz-', '-o-', '-webkit-', 'ms'];

function signIn() {
    var container = document.getElementById("signInContainer");
    var mask = document.getElementById("signInContainer");
    var pageSize = getPageSize();
    if (!container) {
        mask = document.createElement("div");
        mask.id = 'signInMaskDiv';
        setStyle(mask, 'width', pageSize.bw + 'px');
        setStyle(mask, 'height', pageSize.bh + 'px');
        document.body.appendChild(mask);

        container = document.createElement("div");
        container.id = 'signInContainer';        
        document.body.appendChild(container);        
        var tmpHTML = '<table style="width:100%; height:100%;">';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td colspan="2">登录</td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td style="width:120px;">用户名</td>';
        tmpHTML += '        <td><input id="signInUserNameTxt" type="text" class="sign-in-input-field" placeholder="手机号/E-Mail/用户名"/></td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td>密   码</td>';
        tmpHTML += '        <td><input id="signInPasswordTxt" type="password"  class="sign-in-input-field"/></td>';
        tmpHTML += '    </tr>';
        tmpHTML += '    <tr>';
        tmpHTML += '        <td colspan="2">';
        tmpHTML += '            <div class="sign-in-buttons-container">';
        tmpHTML += '                <div id="signInLoginBtn">登录</div>';
        tmpHTML += '                <div id="signInRegistBtn">注册</div>';
        tmpHTML += '            </div>';
        tmpHTML += '        </td>';
        tmpHTML += '    </tr>';
        tmpHTML += '</table>';
        container.innerHTML = tmpHTML;
    }

    setStyle(mask, 'display', 'block');
    setStyle(container, 'display', 'block');
    var containerHeight = container.offsetHeight;
    var containerWidth = container.offsetWidth;
    var tmpTop = (pageSize.h - containerHeight) / 2 + pageSize.t;
    var tmpLeft = (pageSize.w - containerWidth) / 2 + pageSize.l;
    setStyle(container, 'top', tmpTop + 'px');
    setStyle(container, 'left', tmpLeft + 'px');
};

function setStyle(element, key, value) {
    for (var i = 0; i < _cssPrefixArr.length; i++) {
        var vp = _cssPrefixArr[i];
        element.style[vp + key] = value;
    }
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