'use strict';

var _checkCodePage = 'ikcoder/data/get_checkcodenua.aspx';
var _signUpPage = 'iKCoder/Account/SET_Reg.aspx';
var _checkSigned = '';
var _checkCodeParams = {
    length: 8,
    name: 'signincode',
    width: 150,
    height: 50
};

function BuildHeaderHTML() {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<nav class="navbar navbar-default padding-top10 padding-bottom10" role="navigation">');
    tmpHtmlStrArr.push('    <div class="container-fluid">');
    tmpHtmlStrArr.push('        <div class="navbar-header padding-left10">');
    tmpHtmlStrArr.push('            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">');
    tmpHtmlStrArr.push('                <span class="icon-bar"></span>');
    tmpHtmlStrArr.push('                <span class="icon-bar"></span>');
    tmpHtmlStrArr.push('                <span class="icon-bar"></span>');
    tmpHtmlStrArr.push('            </button>');
    tmpHtmlStrArr.push('            <a href="#"><img src="images/logo.png" class="img-responsive"></a>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('        <div class="collapse navbar-collapse" id="example-navbar-collapse">');
    tmpHtmlStrArr.push('            <ul class="nav navbar-nav navbar-right" id="navbar_collapse_ul">');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Home">' + _getLabel('首页') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_OnlineCourse">' + _getLabel('线上体验课') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Parents">' + _getLabel('家长') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Education">' + _getLabel('教育工作者') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="dropdown">');
    tmpHtmlStrArr.push('                    <a href="#" class="dropdown-toggle" id="linkBtn_About" data-toggle="dropdown">' + _getLabel('关于艾酷') + '<b class="caret"></b></a>');
    tmpHtmlStrArr.push('                    <ul class="dropdown-menu">');
    tmpHtmlStrArr.push('                        <li><a href="#" id="linkBtn_Product">' + _getLabel('艾酷教育平台') + '</a></li>');
    tmpHtmlStrArr.push('                        <li><a href="#" id="linkBtn_AboutUs">' + _getLabel('关于我们') + '</a></li>');
    tmpHtmlStrArr.push('                    </ul>');
    tmpHtmlStrArr.push('                </li>');
    tmpHtmlStrArr.push('                <li class="nav-item" id="nav_SignIn_Item">');
    //tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_SignIn" data-toggle="modal" data-target="#mWindow_SignIn">');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_SignIn" data-toggle="modal" data-target="#mWindow_SignUp">');
    tmpHtmlStrArr.push('                        <span class="glyphicon glyphicon-user"></span>');
    tmpHtmlStrArr.push(_getLabel('登录'));
    tmpHtmlStrArr.push('                   </a>');
    tmpHtmlStrArr.push('                </li>');
    tmpHtmlStrArr.push('                <li id="nav_Search_Item">');
    tmpHtmlStrArr.push('                    <form class="navbar-form navbar-right" role="search">');
    tmpHtmlStrArr.push('                        <input class="form-control header-search-field" id="txt_Search" type="text" placeholder="Search">');
    tmpHtmlStrArr.push('                        <a href="#" class="dropdown-toggle header-search-field-icon" id="linkBtn_Search" data-toggle="dropdown">');
    tmpHtmlStrArr.push('                            <span class="glyphicon glyphicon-search"></span>');
    tmpHtmlStrArr.push('                        </a>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                <li>');
    tmpHtmlStrArr.push('            </ul>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</nav>');
    $('header').append($(tmpHtmlStrArr.join('')));
}

function BuildSignInWindowHTML() {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="modal fade " id="mWindow_SignIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    tmpHtmlStrArr.push('    <div class="modal-dialog" id="mWindow_SignIn_Dialog">');
    tmpHtmlStrArr.push('        <div class="modal-content">');
    tmpHtmlStrArr.push('            <div class="modal-header" style="border:none;">');
    tmpHtmlStrArr.push('                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    tmpHtmlStrArr.push('                <p style="line-height:10px;margin:0px;">&nbsp;</p>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-body">');
    tmpHtmlStrArr.push('                <div class="container bg-white">');
    tmpHtmlStrArr.push('                    <div class="row">');
    tmpHtmlStrArr.push('                        <div class="col-sm-12">');
    tmpHtmlStrArr.push('                            <img src="images/logo.png" />');
    tmpHtmlStrArr.push('                            <p class="text-signin-dialog-title">' + _getLabel('只要有梦想, 谁都可以创造非凡') + '</p>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <form class="form-horizontal sign-in-form" role="form">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_UserName" placeholder="' + _getLabel('手机号') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_Password" placeholder="' + _getLabel('密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignIn_CheckCode" placeholder="' + _getLabel('验证码') + '" />');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand" id="img_SignIn_CheckCode" src="' + _getRequestURL(_checkCodePage, _checkCodeParams) + '" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                                    </span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-3">');
    tmpHtmlStrArr.push('                                <div class="checkbox">');
    tmpHtmlStrArr.push('                                    <label>');
    tmpHtmlStrArr.push('                                        <input type="checkbox" id="chk_SignIn_RememberMe">');
    tmpHtmlStrArr.push(_getLabel('记住我'));
    tmpHtmlStrArr.push('                                    </label>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-3">');
    tmpHtmlStrArr.push('                                <a id="linkBtn_ForgetPwd" href="#"><p class="text-signin-dialog-title padding-bottom0">' + _getLabel('忘记密码') + '</p></a>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-2 col-sm-offset-4">');
    tmpHtmlStrArr.push('                                <button type="button" class="btn btn-default" id="btn_SignInOK" data-dismiss="modal">');
    tmpHtmlStrArr.push(_getLabel('登录'));
    tmpHtmlStrArr.push('                                </button>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                    <form class="form-horizontal sign-in-forget-pwd-form" role="form" style="display:none;">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_ForgetPWD_PhoneNumber" placeholder="' + _getLabel('申请通行证使用的手机号') + '" />');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_ForgetPWD_CheckCode" placeholder="' + _getLabel('6位数验证码') + '" />');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon js-password-btn">' + _getLabel('获取验证码') + '</span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input class="form-control js-password-control" id="txt_ForgetPWD_NewPwd" name="forget_pwd_new_pwd" type="password" placeholder="' + _getLabel('新密码(不少于6位)') + '" aria-describedby="basic-addon1">  ');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon js-password-btn"><i class="glyphicon glyphicon-eye-close" id="btn_Show_Hide_Pwd"></i></span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input class="form-control js-password-control" id="txt_ForgetPWD_ConfirmPwd" name="forget_pwd_confirm_pwd" type="password" placeholder="' + _getLabel('确认新密码') + '" aria-describedby="basic-addon1">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group has-feedback">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12 text-center">');
    tmpHtmlStrArr.push('                                <button type="button" class="btn btn-primary" id="btn_UpdatePwdOK">');
    tmpHtmlStrArr.push(_getLabel('修改密码'));
    tmpHtmlStrArr.push('                                </button>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-footer bg-grey" style="border:none;">');
    tmpHtmlStrArr.push('                <div class="container">');
    tmpHtmlStrArr.push('                    <div class="row">');
    tmpHtmlStrArr.push('                        <div class="col-sm-3">');
    tmpHtmlStrArr.push('                            <p class="text-signin-dialog-title padding-bottom0">' + _getLabel('还没有通行证?') + '</p>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="col-sm-3">');
    tmpHtmlStrArr.push('                            <a id="linkBtn_SignUp" href="#"><p class="text-signin-dialog-regist-link">' + _getLabel('立即申请') + '</p></a>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');

    $('body').append($(tmpHtmlStrArr.join('')));
}

function initHeader() {
    BuildHeaderHTML();
    BuildSignInWindowHTML();
    initHeaderEvent();
    updateUserInfor();
}

function initHeaderEvent() {
    $("#linkBtn_Home").on('click',
        function () {
            window.location.href = "index.html?cid=" + _gCID;
        });

    $("#linkBtn_OnlineCourse").on('click',
        function () {
            window.location.href = "index.html?cid=" + _gCID;
        });

    $("#linkBtn_Parents").on('click',
        function () {
            window.location.href = "parents.html?cid=" + _gCID;
        });

    $("#linkBtn_Education").on('click',
        function () {
            window.location.href = "index.html?cid=" + _gCID;
        });

    $("#linkBtn_Product").on('click',
        function () {
            window.location.href = "product.html?cid=" + _gCID;
        });
    $("#linkBtn_AboutUs").on('click',
        function () {
            window.location.href = "aboutus.html?cid=" + _gCID;
        });

    $("#linkBtn_Search").on('click', headerSearch);

    $("#linkBtn_ForgetPwd").on('click', function () {
        $('.sign-in-form').css('display', 'none');
        $('.sign-in-forget-pwd-form').css('display', 'block');
    });

    $("#btn_SignInOK").on('click', signIn);
    $("#linkBtn_SignUp").on('click', openSignUp);
    $('#btn_UpdatePwdOK').on('click', updatePassword);
    $("#img_SignIn_CheckCode").on('click', function () {
        $("#img_SignIn_CheckCode").attr("src", _getRequestURL(_checkCodePage, _checkCodeParams));
    });

    /*
    $("#btn_SignUpOK").on('click', signUp);
    $("#btn_GotoSignIn").on('click', gotoSignIn);
    $('#btn_SignInCancel').on('click',
        function () {
            $("#signinAlert").alert('close');
        });
   */

    var tmpField = $(".js-password-control");
    var tmpBtn = $("#btn_Show_Hide_Pwd");
    $(".js-password-btn").on('click', function () {
        if (tmpField.attr("type") == 'text') {
            tmpField.attr("type", "password");
            tmpBtn.addClass('glyphicon-eye-close');
            tmpBtn.removeClass('glyphicon-eye-open');
        } else {
            tmpField.attr("type", "text");
            tmpBtn.addClass('glyphicon-eye-open');
            tmpBtn.removeClass('glyphicon-eye-close');
        }
    });

    $('#mWindow_SignIn').on('show.bs.modal', reinitSignInFileds);
    $('#mWindow_SignIn').on('hide.bs.modal', function () {
        $("#signinAlert").alert('close');
        $('.sign-in-form').css('display', 'block');
        $('.sign-in-forget-pwd-form').css('display', 'none');
    });
}

function signUp() {
    $("#signinAlert").alert('close');
    if ($("#txt_SignIn_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_SignIn_UserName").val().trim())) {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '不正确的手机号码!');
        return;
    }

    if ($("#txt_SignIn_Password").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入密码!');
        return;
    }

    if ($("#txt_SignUp_Confirm").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请确认密码!');
        return;
    } else if ($("#txt_SignUp_Confirm").val().trim() != $("#txt_SignIn_Password").val().trim()) {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '两次输入的密码不一致!');
        return;
    }

    if ($("#txt_SignIn_CAPTCHA").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signinAlert', '请输入验证码!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: _getRequestURL(_signUpPage),
        data: '<root>' +
            '<symbol>' + $("#txt_SignIn_UserName").val() + '</symbol>' +
            '<password>' + $("#txt_SignIn_Password").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codevalue>' + $("#txt_SignIn_CAPTCHA").val() + '</codevalue>' +
            '</root>',
        success: function (data, status) {
            $("#signinAlert").alert('close');
            $('#mWindow_SignIn').modal('hide');
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            $("#signinAlert").alert('close');
            showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '注册失败, 请联系客服!');
        }
    });
}

function signIn() {
    $("#signinAlert").alert('close');
    if ($("#txt_SignIn_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_SignIn_UserName").val().trim())) {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '不正确的手机号码!');
        return;
    }

    if ($("#txt_SignIn_Password").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入密码!');
        return;
    }

    if ($("#txt_SignIn_CAPTCHA").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入验证码!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: _getRequestURL(_signUpPage),
        data: '<root>' +
            '<username>' + $("#txt_SignIn_UserName").val() + '</username>' +
            '<password>' + $("#txt_SignIn_Password").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codename>' + $("#txt_SignIn_CAPTCHA").val() + '</codename>' +
            '</root>',
        success: function (data, status) {
            $("#signinAlert").alert('close');
            $('#mWindow_SignIn').modal('hide');
            updateUserInfor(true);
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            $("#signinAlert").alert('close');
            showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '无法登录, 请联系客服!');
        }
    });
}

function openSignUp() {
    //$("#signinAlert").alert('close');
    //$("#mwTitle_SignIn").text(_getLabel('创建一个新用户'));
    //toggleSignInFields();
}

function updatePassword() {

}

function updateUserInfor(signed) {
    if (typeof signed != 'undefined') {
        if (signed) {
            $('li#nav_SignIn_Item').toggleClass('hidden');
            if ($("li##nav_UserInfo_Item").length <= 0) {
                createUserInfoItem();
            } else {
                $('li#nav_UserInfo_Item').toggleClass('hidden');
            }
        } else {
            if ($("li#nav_UserInfo_Item").length > 0) {
                $('li#nav_UserInfo_Item').toggleClass('hidden');
            }
        }
    } else {
        $.ajax({
            type: 'POST',
            url: _getRequestURL(_checkSigned),
            data: '<root></root>',
            success: function (data, status) {
                updateUserInfor(true);
            },
            dataType: 'xml',
            xhrFields: {
                withCredentials: true
            },
            error: function () {
                updateUserInfor(false);
            }
        });
    }
}

function createUserInfoItem() {
    $('#nav_Search_Item').before(
        $(
            '<li class="nav-item" id="nav_UserInfo_Item">' +
            '   <a href="#">' +
            '       Welcome back' +
            '       <span class="glyphicon glyphicon-user"></span>' +
            '       <span  id="linkBtn_UserInfo" class="text-header-userinfo">Alex</span>' +
            '   </a>' +
            '</li>'
        )
    );

    $("#linkBtn_UserInfo").on('click', function () {
        window.location.href = "studentcenter.html";
    });
}

function reinitSignInFileds() {
    $("#txt_SignIn_UserName").val('');
    $("#txt_SignIn_Password").val('');
    $("#txt_ForgetPWD_PhoneNumber").val('');
    $("#txt_ForgetPWD_CheckCode").val('');
    $("#txt_ForgetPWD_NewPwd").val('');
    $("#txt_ForgetPWD_ConfirmPwd").val('');
    $("#img_SignIn_CAPTCHA").attr("src", _getRequestURL(_checkCodePage, _checkCodeParams));
}

function showAlertMessage(containerId, alertId, message) {
    $('#' + containerId).prepend(
        $(
            '<div id="' + alertId + '" class="alert alert-danger alert-dismissable">' +
            '   <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                message +
            '</div>'
        )
    );
}

function headerSearch() {

}