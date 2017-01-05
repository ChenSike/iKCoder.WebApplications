'use strict';

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