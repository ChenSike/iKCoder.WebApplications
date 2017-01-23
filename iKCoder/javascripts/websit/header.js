'use strict';

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
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_SignIn" data-toggle="modal" data-target="#mWindow_SignIn">');
    tmpHtmlStrArr.push('                        <span class="glyphicon glyphicon-user"></span>');
    tmpHtmlStrArr.push(_getLabel('登录'));
    tmpHtmlStrArr.push('                   </a>');
    tmpHtmlStrArr.push('                </li>');
    tmpHtmlStrArr.push('                <li id="nav_Search_Item">');
    tmpHtmlStrArr.push('                    <form class="navbar-form navbar-right" role="search">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input class="form-control header-search-field" id="txt_Search" type="text" placeholder="Search">');
    tmpHtmlStrArr.push('                                    <a href="#" class="dropdown-toggle input-group-addon" id="linkBtn_Search" data-toggle="dropdown">');
    tmpHtmlStrArr.push('                                        <span class="glyphicon glyphicon-search"></span>');
    tmpHtmlStrArr.push('                                    </a>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
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
    tmpHtmlStrArr.push('                                <div class="input-group" style="width:100%;">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignIn_CheckCode" placeholder="' + _getLabel('验证码') + '" />');
    tmpHtmlStrArr.push('                                    <div class="input-group-addon" style="width:auto; padding:0px;">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand check-code-image" id="img_SignIn_CheckCode" src="' + _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams) + '" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                                    </div>');
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
    tmpHtmlStrArr.push('                                <button type="button" class="btn btn-default" id="btn_SignInOK">');
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

function BuildSignUpWindowHTML() {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="modal fade " id="mWindow_SignUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    tmpHtmlStrArr.push('    <div class="modal-dialog" id="mWindow_SignUp_Dialog">');
    tmpHtmlStrArr.push('        <div class="modal-content">');
    tmpHtmlStrArr.push('            <div class="modal-header" style="border:none;">');
    tmpHtmlStrArr.push('                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    tmpHtmlStrArr.push('                <p style="line-height:10px;margin:0px;">&nbsp;</p>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-body">');
    tmpHtmlStrArr.push('                <div class="container bg-white">');
    tmpHtmlStrArr.push('                    <div class="row padding-bottom30">');
    tmpHtmlStrArr.push('                        <div class="col-sm-2 col-sm-offset-3">');
    tmpHtmlStrArr.push('                            <img src="images/label/Addicon.png" />');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="col-sm-4">');
    tmpHtmlStrArr.push('                            <h4 style="line-height:60px;">' + _getLabel('艾酷通行证') + '</h4>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <form class="form-horizontal" role="form">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignUp_UserName" placeholder="' + _getLabel('姓名') + '" />');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignUp_PhoneNumber" placeholder="' + _getLabel('手机号码(仅支持中国大陆)') + '" />');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input class="form-control js-password-signup-control" id="txt_SignUp_Pwd" name="signup_pwd_new_pwd" type="password" placeholder="' + _getLabel('密码(不少于6位)') + '" aria-describedby="basic-addon1">');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon js-password-signup-btn"><i class="glyphicon glyphicon-eye-close" id="btn_SignUp_Show_Hide_Pwd"></i></span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group" style="width:100%;">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignUp_CheckCode" placeholder="' + _getLabel('验证码') + '" />');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon" style="width:auto; padding:0px;">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand check-code-image" id="img_SignUp_CheckCode" src="' + _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams) + '" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                                    </span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <button type="button" class="btn btn-default" id="btn_SignUpOK">' + _getLabel('注册艾酷通行证') + ' </button>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <p>' + _getLabel('点击注册按钮, 即代表您同意《艾酷用户协议》') + ' </p>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-footer bg-white" style="border:none;">');
    tmpHtmlStrArr.push('                <img src="images/background/footersub.png" />');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');

    $('body').append($(tmpHtmlStrArr.join('')));
}

function initHeader() {
    BuildHeaderHTML();
    BuildSignInWindowHTML();
    BuildSignUpWindowHTML();
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
        $("#img_SignIn_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
    });

    $("#btn_SignUpOK").on('click', signUp);
    $("#img_SignUp_CheckCode").on('click', function () {
        $("#img_SignUp_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
    });

    $(".js-password-btn").on('click', function () {
        if ($(".js-password-control").attr("type") == 'text') {
            $(".js-password-control").attr("type", "password");
            $("#btn_Show_Hide_Pwd").addClass('glyphicon-eye-close');
            $("#btn_Show_Hide_Pwd").removeClass('glyphicon-eye-open');
        } else {
            $(".js-password-control").attr("type", "text");
            $("#btn_Show_Hide_Pwd").addClass('glyphicon-eye-open');
            $("#btn_Show_Hide_Pwd").removeClass('glyphicon-eye-close');
        }
    });

    $(".js-password-signup-btn").on('click', function () {
        if ($(".js-password-signup-control").attr("type") == 'text') {
            $(".js-password-signup-control").attr("type", "password");
            $("#btn_SignUp_Show_Hide_Pwd").addClass('glyphicon-eye-close');
            $("#btn_SignUp_Show_Hide_Pwd").removeClass('glyphicon-eye-open');
        } else {
            $(".js-password-signup-control").attr("type", "text");
            $("#btn_SignUp_Show_Hide_Pwd").addClass('glyphicon-eye-open');
            $("#btn_SignUp_Show_Hide_Pwd").removeClass('glyphicon-eye-close');
        }
    });

    $('#mWindow_SignIn').on('show.bs.modal', reinitSignInFileds);
    $('#mWindow_SignIn').on('hide.bs.modal', function () {
        $("#signinAlert").alert('close');
        $('.sign-in-form').css('display', 'block');
        $('.sign-in-forget-pwd-form').css('display', 'none');
    });

    $('#mWindow_SignUp').on('show.bs.modal', reinitSignUpFileds);
    $('#mWindow_SignUp').on('hide.bs.modal', function () {
        $("#signupAlert").alert('close');
    });
}

function signUp() {
    $("#signupAlert").alert('close');
    if ($("#txt_SignUp_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignUp', 'signupAlert', '请输入姓名!');
        return;
    }

    if ($("#txt_SignUp_PhoneNumber").val().trim() == "") {
        showAlertMessage('mWindow_SignUp', 'signupAlert', '请输入手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_SignUp_PhoneNumber").val().trim())) {
        showAlertMessage('mWindow_SignUp', 'signupAlert', '不正确的手机号码!');
        return;
    }

    if ($("#txt_SignUp_Pwd").val().trim() == "") {
        showAlertMessage('mWindow_SignUp', 'signupAlert', '请输入密码!');
        return;
    }

    if ($("#txt_SignUp_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_SignUp', 'signupAlert', '请输入验证码!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.account.reg),
        data: '<root>' +
            '<symbol>' + $("#txt_SignUp_PhoneNumber").val() + '</symbol>' +
            '<password>' + $("#txt_SignUp_Pwd").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codevalue>' + $("#txt_SignUp_CheckCode").val() + '</codevalue>' +
            '</root>',
        success: function (data, status) {
            $("#signupAlert").alert('close');
            $('#mWindow_SignUp').modal('hide');
            $('#mWindow_CheckPhoneNumber').modal('show');
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            $("#signupAlert").alert('close');
            showAlertMessage('mWindow_SignUp', 'signupAlert', '注册失败, 请联系客服!');
        }
    });
}

function signIn() {
    $("#signinAlert").alert('close');
    if ($("#txt_SignIn_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignIn', 'signinAlert', '请输入手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_SignIn_UserName").val().trim())) {
        showAlertMessage('mWindow_SignIn', 'signinAlert', '不正确的手机号码!');
        return;
    }

    if ($("#txt_SignIn_Password").val().trim() == "") {
        showAlertMessage('mWindow_SignIn', 'signinAlert', '请输入密码!');
        return;
    }

    if ($("#txt_SignIn_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_SignIn', 'signinAlert', '请输入验证码!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.account.sign),
        data: '<root>' +
            '<username>' + $("#txt_SignIn_UserName").val() + '</username>' +
            '<password>' + $("#txt_SignIn_Password").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codename>' + $("#txt_SignIn_CheckCode").val() + '</codename>' +
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
            showAlertMessage('mWindow_SignIn', 'signinAlert', '无法登录, 请联系客服!');
        }
    });
}

function openSignUp() {
    $('#mWindow_SignIn').modal('hide');
    $('#mWindow_SignUp').modal('show');
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
            url: _getRequestURL(_gURLMapping.account.signsstatus),
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
    $("#img_SignIn_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
}

function reinitSignUpFileds() {
    $("#txt_SignUp_UserName").val('');
    $("#txt_SignUp_PhoneNumber").val('');
    $("#txt_SignUp_Pwd").val('');
    $("#txt_SignUp_CheckCode").val('');
    $("#img_SignUp_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
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