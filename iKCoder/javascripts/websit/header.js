'use strict';

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
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Home">' + getLabel('首页') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_OnlineCourse">' + getLabel('线上体验课') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Parents">' + getLabel('家长') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Education">' + getLabel('教育工作者') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_About">' + getLabel('关于艾酷') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item" id="nav_SignUp_Item">');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_SignIn" data-toggle="modal" data-target="#mWindow_SignUp">');
    tmpHtmlStrArr.push('                        <span class="glyphicon glyphicon-user"></span>');
    tmpHtmlStrArr.push(getLabel('登录'));
    tmpHtmlStrArr.push('                   </a>');
    tmpHtmlStrArr.push('                </li>');
    tmpHtmlStrArr.push('                <li>');
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
    tmpHtmlStrArr.push('<div class="modal fade " id="mWindow_SignUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    tmpHtmlStrArr.push('    <div class="modal-dialog" id="mWindow_SignIn_Dialog">');
    tmpHtmlStrArr.push('        <div class="modal-content">');
    tmpHtmlStrArr.push('            <div class="modal-header">');
    tmpHtmlStrArr.push('                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">');
    tmpHtmlStrArr.push('                    &times;');
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <h4 class="modal-title" id="mwTitle_SignIn">');
    tmpHtmlStrArr.push(getLabel('创建新用户'));
    tmpHtmlStrArr.push('                </h4>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-body">');
    tmpHtmlStrArr.push('                <div class="container bg-white">');
    tmpHtmlStrArr.push('                    <form class="form-horizontal" role="form">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-10">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_UserName"  placeholder="' + getLabel('手机号') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-10">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_Password" placeholder="' + getLabel('密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-10">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_Confirm" placeholder="' + getLabel('确认密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-8 col-xs-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_CAPTCHA" placeholder="' + getLabel('验证码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-2 col-xs-12">');
    tmpHtmlStrArr.push('                                <img class="cursor-hand" id="img_SignIn_CAPTCHA" src="http://ikcoder.iok.la:24525/ikcoder/data/get_checkcodenua.aspx?length=8&name=signupcaptcha&width=150&height=40&rnd="+Date.now() title="点击刷新验证码">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-footer">');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-default" id="btn_SignInCancel" data-dismiss="modal">');
    tmpHtmlStrArr.push('                    取消');
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('                <button type="button" class="btn btn-primary" id="btn_SignInOK">');
    tmpHtmlStrArr.push('                    注册');
    tmpHtmlStrArr.push('                </button>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');
}

function initHeader() {
    BuildHeaderHTML();

}


//var headerBtn_Home;
//var headerBtn_OnlineCourse;
//var headerBtn_Parents;
//var headerBtn_Education;
//var headerBtn_About;
//var headerBtn_SignUp;
//var headerBtn_SignIn;
//var headerBtn_Search;
//var headerTxt_Search;
//var mwBtn_SignUpCalcel;
//var mwBtn_SignUpOK;
//var mwBtn_SignInCalcel;
//var mwBtn_SignInOK;
function initHeaderFields() {
    $("#linkBtn_Home").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_OnlineCourse").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Parents").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Education").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_About").on('click', function () {
        window.location.href = "index.html";
    });

    $("#linkBtn_Search").on('click', headerSearch);
    $("#btn_SignUpOK").on('click', signUp);
    $('#btn_SignUpCancel').on('click', function () {
        $("#signupAlert").alert('close');
    });

    $("#btn_SignInOK").on('click', signIn);
    $('#btn_SignInCancel').on('click', function () {
        $("#signinAlert").alert('close');
    });

    $("#img_SignIn_CAPTCHA").on('click', function () {
        $("#img_SignIn_CAPTCHA").attr("src", "http://ikcoder.iok.la:24525/ikcoder/data/get_checkcodenua.aspx?length=8&name=signincaptcha&width=150&height=40&rnd=" + Date.now());
    });

    $("#img_SignUp_CAPTCHA").on('click', function () {
        $("#img_SignUp_CAPTCHA").attr("src", "http://ikcoder.iok.la:24525/ikcoder/data/get_checkcodenua.aspx?length=8&name=signincaptcha&width=150&height=40&rnd=" + Date.now());
    });


    $('#linkBtn_ForgetPwd').on('click', function () {
        forgetPassword();
    });
}

function signUp() {
    $("#signupAlert").alert('close');
    if ($("#txt_SignUp_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入用户名!');
        return;
    }

    if ($("#txt_SignUp_Password").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入密码!');
        return;
    }

    if ($("#txt_SignUp_CAPTCHA").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入验证码!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: "http://10.86.17.204/PlatformAPI/Account/api_OperationUserAccount.aspx",
        data: '<root>' +
            '<operation>insert</operation>' +
            '<username>' + $("#txt_SignUp_UserName").val() + '</username>' +
            '<password>' + $("#txt_SignUp_Password").val() + '</password>' +
            '<checkcode>' + $("#txt_SignUp_CAPTCHA").val() + '</checkcode>' +
            '</root>',
        success: function (data, status) {
            $('#mWindow_SignUp').modal('hide');
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '注册失败, 请联系客服!');
        }
    });
}

function signIn() {
    $("#signinAlert").alert('close');
    if ($("#txt_SignIn_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入用户名!');
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
        url: "http://10.86.17.204/PlatformAPI/Account/api_OperationUserAccount.aspx",
        data: '<root>' +
            '<operation>insert</operation>' +
            '<username>' + $("#txt_SignIn_UserName").val() + '</username>' +
            '<password>' + $("#txt_SignIn_Password").val() + '</password>' +
            '<checkcode>' + $("#txt_SignIn_CAPTCHA").val() + '</checkcode>' +
            '</root>',
        success: function (data, status) {
            $('#mWindow_SignIn').modal('hide');
            updateUserInfor();
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '无法登录, 请联系客服!');
        }
    });
}

function headerSearch() {

}

function forgetPassword() {

}

function updateUserInfor() {
    $('li#nav_SignUp_Item').remove();
    $('li#nav_SignIn_Item').remove();
    $('#navbar_collapse_ul').prepend(
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
        window.location.href = "index.html";
    });
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