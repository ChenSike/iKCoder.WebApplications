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
    tmpHtmlStrArr.push('            <div class="modal-header">');
    tmpHtmlStrArr.push('                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">');
    tmpHtmlStrArr.push('                    &times;');
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <h4 class="modal-title" id="mwTitle_SignIn">');
    tmpHtmlStrArr.push(_getLabel('用户登录'));
    tmpHtmlStrArr.push('                </h4>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-body">');
    tmpHtmlStrArr.push('                <div class="container bg-white">');
    tmpHtmlStrArr.push('                    <form class="form-horizontal" role="form">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_UserName"  placeholder="' + _getLabel('手机号') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-10 col-xs-12"  id="txt_SignIn_Password_Container" >');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_Password" placeholder="' + _getLabel('输入密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-2 col-xs-12" id="linkBtn_ForgetPwd_Container">');
    tmpHtmlStrArr.push('                                <a href="#" id="linkBtn_ForgetPwd"><label class="control-label text-underline cursor-hand">' + _getLabel('忘记密码') + '</label></a>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group hidden" id="txt_SignUp_Confirm_Container">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignUp_Confirm" placeholder="' + _getLabel('确认密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-10 col-xs-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_CAPTCHA" placeholder="' + _getLabel('验证码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-2 col-xs-12">');
    tmpHtmlStrArr.push('                                <img class="cursor-hand" id="img_SignIn_CAPTCHA" src="' + _getRequestURL(_checkCodePage, _checkCodeParams) + '" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-footer">');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-default" id="btn_SignInCancel" data-dismiss="modal">');
    tmpHtmlStrArr.push(_getLabel('取消'));
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-primary" id="btn_SignInOK">');
    tmpHtmlStrArr.push(_getLabel('登录'));
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-primary" id="btn_GotoSignUp">');
    tmpHtmlStrArr.push(_getLabel('注册'));
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-primary hidden" id="btn_SignUpOK">');
    tmpHtmlStrArr.push(_getLabel('注册'));
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-primary hidden" id="btn_GotoSignIn">');
    tmpHtmlStrArr.push(_getLabel('登录'));
    tmpHtmlStrArr.push('                </button>');

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
            window.location.href = "index.html?cid=" + _gCID;
        });

    $("#linkBtn_Education").on('click',
        function () {
            window.location.href = "index.html?cid=" + _gCID;
        });

    //$("#linkBtn_About").on('click',
    //    function () {
    //        window.location.href = "index.html";
    //    });

    $("#linkBtn_Product").on('click',
        function () {
            window.location.href = "product.html?cid=" + _gCID;
        });

    $("#linkBtn_Search").on('click', headerSearch);
    $("#btn_SignInOK").on('click', signIn);
    $("#btn_GotoSignUp").on('click', gotoSignUp);
    $("#btn_SignUpOK").on('click', signUp);
    $("#btn_GotoSignIn").on('click', gotoSignIn);
    $('#linkBtn_ForgetPwd').on('click', forgetPassword);

    $('#btn_SignInCancel').on('click',
        function () {
            $("#signinAlert").alert('close');
        });

    $("#img_SignIn_CAPTCHA").on('click',
        function () {
            $("#img_SignIn_CAPTCHA").attr("src", _getRequestURL(_checkCodePage, _checkCodeParams));
        });

    $('#mWindow_SignIn').on('show.bs.modal', reinitSignInFileds);
    $('#mWindow_SignIn').on('hide.bs.modal',
        function () {
            $("#signinAlert").alert('close');
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

function gotoSignUp() {
    $("#signinAlert").alert('close');
    $("#mwTitle_SignIn").text(_getLabel('创建一个新用户'));
    toggleSignInFields();
}

function gotoSignIn() {
    $("#signinAlert").alert('close');
    $("#mwTitle_SignIn").text(_getLabel('用户登录'));
    toggleSignInFields();
}

function toggleSignInFields() {
    $("#txt_SignIn_Password_Container").toggleClass("col-sm-10");
    $("#linkBtn_ForgetPwd_Container").toggleClass("hidden");
    $("#txt_SignUp_Confirm_Container").toggleClass("hidden");
    $("#btn_SignInOK").toggleClass("hidden");
    $("#btn_GotoSignUp").toggleClass("hidden");
    $("#btn_SignUpOK").toggleClass("hidden");
    $("#btn_GotoSignIn").toggleClass("hidden");
}

function forgetPassword() {

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
    $("#txt_SignIn_Password_Container").addClass("col-sm-10");
    $("#linkBtn_ForgetPwd_Container").removeClass("hidden");
    $("#txt_SignUp_Confirm_Container").addClass("hidden");
    $("#btn_SignInOK").removeClass("hidden");
    $("#btn_GotoSignUp").removeClass("hidden");
    $("#btn_SignUpOK").addClass("hidden");
    $("#btn_GotoSignIn").addClass("hidden");
    $("#txt_SignIn_UserName").val('');
    $("#txt_SignIn_Password").val('');
    $("#txt_SignIn_CAPTCHA").val('');
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