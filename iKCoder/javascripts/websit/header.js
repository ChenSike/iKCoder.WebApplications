﻿'use strict';

var _checkSigned = '';
var _checkCodeParams = {
    length: 4,
    name: 'signincode',
    width: 70,
    height: 30
};

function buildHeaderHTML() {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<nav class="navbar navbar-default padding-top10 padding-bottom10" role="navigation">');
    tmpHtmlStrArr.push('    <div class="container-fluid">');
    tmpHtmlStrArr.push('        <div class="navbar-header padding-left10">');
    tmpHtmlStrArr.push('            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">');
    tmpHtmlStrArr.push('                <span class="icon-bar"></span>');
    tmpHtmlStrArr.push('                <span class="icon-bar"></span>');
    tmpHtmlStrArr.push('                <span class="icon-bar"></span>');
    tmpHtmlStrArr.push('            </button>');
    tmpHtmlStrArr.push('            <a href="index.html"><img src="images/logo-new-gray.png" class="img-responsive" style="width:150px;"></a>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('        <div class="collapse navbar-collapse" id="example-navbar-collapse">');
    tmpHtmlStrArr.push('            <ul class="nav navbar-nav navbar-right" id="navbar_collapse_ul">');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Home">' + _getLabel('首页') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_OnlineCourse">' + _getLabel('线上体验课') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Student">' + _getLabel('学习') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item"><a href="#" id="linkBtn_Parents">' + _getLabel('报告') + '</a></li>');
    tmpHtmlStrArr.push('                <li class="nav-item dropdown">');
    tmpHtmlStrArr.push('                    <a href="#" class="dropdown-toggle" id="linkBtn_About" data-toggle="dropdown">' + _getLabel('关于') + '<b class="caret"></b></a>');
    tmpHtmlStrArr.push('                    <ul class="dropdown-menu">');
    tmpHtmlStrArr.push('                        <li class="nav-item"><a href="#" id="linkBtn_Product" style="font-weight:100;">' + _getLabel('艾酷教育平台') + '</a></li>');
    tmpHtmlStrArr.push('                        <li class="nav-item"><a href="#" id="linkBtn_AboutUs" style="font-weight:100;">' + _getLabel('关于我们') + '</a></li>');
    tmpHtmlStrArr.push('                    </ul>');
    tmpHtmlStrArr.push('                </li>');
    tmpHtmlStrArr.push('                <li class="nav-item" id="nav_SignIn_Item">');
    tmpHtmlStrArr.push('                    <a href="#" id="linkBtn_SignIn" data-toggle="modal" data-target="#mWindow_SignIn">');
    tmpHtmlStrArr.push('                        <i class="fa fa-user fa-lg">&nbsp;</i></span>');
    tmpHtmlStrArr.push(_getLabel('登录'));
    tmpHtmlStrArr.push('                   </a>');
    tmpHtmlStrArr.push('                </li>');
    //tmpHtmlStrArr.push('                <li id="nav_Search_Item">');
    //tmpHtmlStrArr.push('                    <form class="navbar-form navbar-right" role="search" style="border: none;">');
    //tmpHtmlStrArr.push('                        <div class="form-group">');
    //tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    //tmpHtmlStrArr.push('                                <div class="input-group">');
    //tmpHtmlStrArr.push('                                    <input class="form-control header-search-field" id="txt_Search" type="text" placeholder="Search">');
    //tmpHtmlStrArr.push('                                    <a href="#" class="dropdown-toggle input-group-addon" id="linkBtn_Search" data-toggle="dropdown">');
    //tmpHtmlStrArr.push('                                        <span class="fa fa-search"></span>');
    //tmpHtmlStrArr.push('                                    </a>');
    //tmpHtmlStrArr.push('                                </div>');
    //tmpHtmlStrArr.push('                            </div>');
    //tmpHtmlStrArr.push('                        </div>');
    //tmpHtmlStrArr.push('                    </form>');
    //tmpHtmlStrArr.push('                <li>');
    tmpHtmlStrArr.push('            </ul>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</nav>');
    $('header').append($(tmpHtmlStrArr.join('')));
};

function buildSignInWindowHTML() {
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
    tmpHtmlStrArr.push('                                <input type="password" class="form-control" id="txt_SignIn_Password" placeholder="' + _getLabel('密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group" style="width:100%;">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignIn_CheckCode" placeholder="' + _getLabel('验证码') + '" />');
    tmpHtmlStrArr.push('                                    <div class="input-group-addon" style="width:70px; padding:0px;">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand check-code-image" id="img_SignIn_CheckCode" src="" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                                    </div>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-3 col-xs-6">');
    tmpHtmlStrArr.push('                                <div class="checkbox">');
    tmpHtmlStrArr.push('                                    <label>');
    tmpHtmlStrArr.push('                                        <input type="checkbox" id="chk_SignIn_RememberMe" style="margin-top: 6px;">');
    tmpHtmlStrArr.push(_getLabel('记住我'));
    tmpHtmlStrArr.push('                                    </label>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-3 col-xs-6">');
    tmpHtmlStrArr.push('                                <a id="linkBtn_ForgetPwd" href="#"><p class="text-signin-dialog-title padding-bottom0">' + _getLabel('忘记密码') + '</p></a>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-3  col-xs-12 col-sm-offset-3">');
    tmpHtmlStrArr.push('                                <div class="m-window-buttton" id="btn_SignInOK">' + _getLabel('登录') + '</div>');
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
    tmpHtmlStrArr.push('                                    <div class="input-group-addon" id="btn_ForgetPWD_CountDown">' + _getLabel('获取验证码') + '</div>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input class="form-control js-password-control" id="txt_ForgetPWD_NewPwd" name="forget_pwd_new_pwd" type="password" placeholder="' + _getLabel('新密码(不少于6位)') + '" aria-describedby="basic-addon1">  ');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon js-password-btn">');
    tmpHtmlStrArr.push('                                        <i class="label-pwd-intension" id="lb_FPwd_Pwd_Intension"></i>');
    tmpHtmlStrArr.push('                                        <i class="glyphicon glyphicon-eye-close" id="btn_Show_Hide_Pwd"></i>');
    tmpHtmlStrArr.push('                                    </span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input class="form-control js-password-control" id="txt_ForgetPWD_ConfirmPwd" name="forget_pwd_confirm_pwd" type="password" placeholder="' + _getLabel('确认新密码') + '" aria-describedby="basic-addon1">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group has-feedback">');
    tmpHtmlStrArr.push('                            <div class="col-sm-4 col-sm-offset-4 text-center">');
    tmpHtmlStrArr.push('                                <div class="m-window-buttton" id="btn_UpdatePwdOK">' + _getLabel('修改密码') + '</div>');
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
};

function buildSignUpWindowHTML() {
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
    tmpHtmlStrArr.push('                        <div class="col-sm-2 col-xs-4 col-sm-offset-3">');
    tmpHtmlStrArr.push('                            <img src="images/label/Addicon.png" />');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="col-sm-4 col-xs-7">');
    tmpHtmlStrArr.push('                            <h4 style="line-height:60px;">' + _getLabel('艾酷通行证') + '</h4>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </div>');
    tmpHtmlStrArr.push('                    <form class="form-horizontal" role="form">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignUp_PhoneNumber" placeholder="' + _getLabel('请输入用于登录的手机号码') + '" />');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group" style="width:100%;">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignUp_CheckCode" placeholder="' + _getLabel('图片识别码') + '" />');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon" style="width:70px; padding:0px;">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand check-code-image" id="img_SignUp_CheckCode" src="" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                                    </span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group" style="width:100%;">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignUp_NoteCode" placeholder="' + _getLabel('输入短信中的验证码') + '" />');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon" style="width:100px; padding:0px;margin-right:1px;">');
    tmpHtmlStrArr.push('                                        <div class="m-window-buttton" id="btn_SignUp_NoteCode">' + _getLabel('发送验证码') + '</div>');
    tmpHtmlStrArr.push('                                    </span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignUp_UserName" placeholder="' + _getLabel('起一个具有辨识度的用户名') + '" />');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input class="form-control js-password-signup-control" id="txt_SignUp_Pwd" name="signup_pwd_new_pwd" type="password" placeholder="' + _getLabel('输入8-16位密码，需包含字母及数字') + '" aria-describedby="basic-addon1">');
    tmpHtmlStrArr.push('                                    <span class="input-group-addon js-password-signup-btn">');
    tmpHtmlStrArr.push('                                        <i class="label-pwd-intension" id="lb_SignUp_Pwd_Intension"></i>');
    tmpHtmlStrArr.push('                                        <i class="glyphicon glyphicon-eye-close" id="btn_SignUp_Show_Hide_Pwd"></i>');
    tmpHtmlStrArr.push('                                    </span>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="m-window-buttton" id="btn_SignUpOK">' + _getLabel('注册艾酷通行证') + '</div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <p class="text-center">');
    tmpHtmlStrArr.push(_getLabel('已有艾酷通行证?'));
    tmpHtmlStrArr.push('                                    <a href="#" id="linkBtn_Goto_Login"> ' + _getLabel('登录') + '</a>');
    tmpHtmlStrArr.push('                                </p>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <p class="text-center">');
    tmpHtmlStrArr.push(_getLabel('同意'));
    tmpHtmlStrArr.push('                                    <a href="#" id="linkBtn_IKCoder_Agreement"> ' + _getLabel('《艾酷用户协议》') + '</a>');
    tmpHtmlStrArr.push('                                </p>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-footer bg-white" style="border:none; padding:0px;">');
    tmpHtmlStrArr.push('                <img src="images/background/footersub.png" />');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');

    $('body').append($(tmpHtmlStrArr.join('')));
};

function buildCheckPhoneWindowHTML() {
    var tmpHtmlStrArr = [];
    tmpHtmlStrArr.push('<div class="modal fade" id="mWindow_CheckPhoneNumber" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    tmpHtmlStrArr.push('    <div class="modal-dialog" id="mWindow_CheckPhone_Dialog">');
    tmpHtmlStrArr.push('        <div class="modal-content">');
    tmpHtmlStrArr.push('            <div class="modal-header" style="border:none; padding:0px;"></div>');
    tmpHtmlStrArr.push('            <div class="modal-body">');
    tmpHtmlStrArr.push('                <div class="container border-form-modal-dialog">');
    tmpHtmlStrArr.push('                    <form role="form">');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <h4 class="text-center">' + _getLabel('验证手机') + '</h4>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <p class="text-center">' + _getLabel('请输入您收到的6位数字手机验证码') + '</p>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12" style="padding-bottom: 15px;">');
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_CheckPhoneNumber_Number" disabled placeholder="">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_CheckPhoneNumber_CheckCode" placeholder="' + _getLabel('6位数字验证码') + '" />');
    tmpHtmlStrArr.push('                                    <div class="input-group-addon" id="btn_CheckPhoneNumber_CountDown">' + _getLabel('获取验证码') + '</div>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-4 col-sm-offset-4 padding-top30 padding-bottom30 text-center">');
    tmpHtmlStrArr.push('                                <div class="m-window-buttton" id="btn_CheckPhoneOK">' + _getLabel('进入艾酷') + '</div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                    </form>');
    tmpHtmlStrArr.push('                </div>');
    tmpHtmlStrArr.push('            </div>');
    tmpHtmlStrArr.push('            <div class="modal-footer" style="border:none; padding:0px;"></div>');
    tmpHtmlStrArr.push('        </div>');
    tmpHtmlStrArr.push('    </div>');
    tmpHtmlStrArr.push('</div>');
    $('body').append($(tmpHtmlStrArr.join('')));
};

function initHeader() {
    buildHeaderHTML();
    buildSignInWindowHTML();
    buildSignUpWindowHTML();
    buildCheckPhoneWindowHTML();
    initHeaderEvent();
    updateUserInfor();
};

function initNavBarEvent() {
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

    $("#linkBtn_Student").on('click',
        function () {
            window.location.href = "studentcenter.html?cid=" + _gCID;
        });

    $("#linkBtn_Product").on('click',
        function () {
            window.location.href = "product.html?cid=" + _gCID;
        });
    $("#linkBtn_AboutUs").on('click',
        function () {
            window.location.href = "aboutus.html?cid=" + _gCID;
        });

    //$("#linkBtn_Search").on('click', headerSearch);
};

function initSignInWindowEvent() {
    $("#img_SignIn_CheckCode").on('click', function () {
        $("#img_SignIn_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
    });

    $("#linkBtn_ForgetPwd").on('click', function () {
        $('.sign-in-form').css('display', 'none');
        $('.sign-in-forget-pwd-form').css('display', 'block');
    });

    $("#btn_SignInOK").on('click', signIn);
    $("#linkBtn_SignUp").on('click', openSignUp);

    $("#txt_ForgetPWD_NewPwd").on('blur', function () {
        checkPwdIntension($("#txt_ForgetPWD_NewPwd"), $('#lb_FPwd_Pwd_Intension'));
    });

    var fpParames = {
        buttonId: 'btn_ForgetPWD_CountDown',
        labelId: 'lb_ForgetPWD_CountDown',
        textId: 'txt_CheckPhoneNumber_Number',
        alertId: 'signinAlert',
        containerId: 'mWindow_SignIn_Dialog'
    };
    $('#btn_ForgetPWD_CountDown').on('click', fpParames, sendNoteCode);
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

    $('#btn_UpdatePwdOK').on('click', updatePassword);
    $('#mWindow_SignIn').on('show.bs.modal', reinitSignInFileds);
    $('#mWindow_SignIn').on('hide.bs.modal', function () {
        $("#signinAlert").alert('close');
        $('.sign-in-form').css('display', 'block');
        $('.sign-in-forget-pwd-form').css('display', 'none');
    });
};

function initSignUpWindowEvent() {
    $("#linkBtn_IKCoder_Agreement").on('click', openAgreement);
    $("#linkBtn_Goto_Login").on('click', openSignIn);
    $("#btn_SignUpOK").on('click', signUp);
    $("#img_SignUp_CheckCode").on('click', function () {
        $("#img_SignUp_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
    });

    $("#txt_SignUp_Pwd").on('blur', function () {
        checkPwdIntension($("#txt_SignUp_Pwd"), $('#lb_SignUp_Pwd_Intension'));
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

    $('#mWindow_SignUp').on('show.bs.modal', reinitSignUpFileds);
    $('#mWindow_SignUp').on('hide.bs.modal', function () {
        $("#signupAlert").alert('close');
    });

    var cpnParames = {
        buttonId: 'btn_SignUp_NoteCode',
        labelId: 'lb_SignUp_NoteCode_CountDown',
        textId: 'txt_SignUp_PhoneNumber',
        alertId: 'signupAlert',
        containerId: 'mWindow_SignUp_Dialog'
    };
    $('#btn_SignUp_NoteCode').on('click', cpnParames, sendNoteCode);
};

function initHeaderEvent() {
    initNavBarEvent();
    initSignInWindowEvent();
    initSignUpWindowEvent();
};

function checkPwdIntension(txtField, lbField) {
    var checkVal = _checkPassword(txtField.val().trim());
    if (checkVal == 1) {
        lbField.text('弱');
        lbField.css('color', 'rgb(255,0,0)');
    } else if (checkVal == 2) {
        lbField.text('中');
        lbField.css('color', 'rgb(255,215,0)');
    } else if (checkVal == 3) {
        lbField.text('强');
        lbField.css('color', 'rgb(50,205,50)');
    }
};

function signUp() {    
    //$('#mWindow_CheckPhoneNumber').modal('show');
    //$('#txt_CheckPhoneNumber_Number').attr('placeholder', $("#txt_SignUp_PhoneNumber").val() + '');
    //return;
    $("#signupAlert").alert('close');
    if ($("#txt_SignUp_PhoneNumber").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入用于登录的手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_SignUp_PhoneNumber").val().trim())) {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '不正确的手机号码!');
        return;
    }

    if ($("#txt_SignUp_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入图片识别码!');
        return;
    }

    if ($("#txt_SignUp_NoteCode").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入短信验证码!');
        return;
    }

    if ($("#txt_SignUp_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入用户名!');
        return;
    }

    if ($("#txt_SignUp_Pwd").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入密码!');
        return;
    } else {
        var checkVal = _checkPassword($("#txt_SignUp_Pwd").val().trim());
        if (checkVal < 0) {
            showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '密码不符合要求，请重新输入!');
            return;
        }
    }

    var params = {
        symbol: $("#txt_SignUp_PhoneNumber").val(),
        password: $("#txt_SignUp_Pwd").val(),
        codename: 'signincode',
        nickname: $("#txt_SignUp_UserName").val().trim(),
        codevalue: $("#txt_SignUp_CheckCode").val()
    }

    _registerRemoteServer();
    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.account.reg),
        data: '<root>' +
            '<symbol>' + $("#txt_SignUp_PhoneNumber").val() + '</symbol>' +
            '<password>' + $("#txt_SignUp_Pwd").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codevalue>' + $("#txt_SignUp_CheckCode").val() + '</codevalue>' +
            '<nickname>' + $("#txt_SignUp_UserName").val().trim() + '</nickname>' +
            '<notecode>' + $("#txt_SignUp_NoteCode").val() + '</notecode>' +
            '</root>',
        success: function (data, status) {
            if ($(data).find('err').length > 0) {
                showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', $(data).find('err').attr('msg'));
                return;
            } else if ($(data).find('msg').length > 0) {
                $("#signupAlert").alert('close');
                $('#mWindow_SignUp').modal('hide');
                $.ajax({
                    type: 'POST',
                    url: _getRequestURL(_gURLMapping.account.sign),
                    data: '<root>' +
                        '<symbol>' + $("#txt_SignUp_PhoneNumber").val() + '</symbol>' +
                        '<password>' + $("#txt_SignUp_Pwd").val() + '</password>' +
                        '</root>',
                    success: function (data, status) {
                        if ($(data).find('err').length > 0) {
                            openSignIn();
                            showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', $(data).find('err').attr('msg'));
                            return;
                        }

                        $.cookie('logined_user_name', $($(data).find('msg')[0]).attr('logined_user_name'));
                        $.cookie('logined_nick_name', $($(data).find('msg')[0]).attr('logined_nick_name'));
                        updateUserInfor(data);
                    },
                    dataType: 'xml',
                    xhrFields: {
                        withCredentials: true
                    },
                    error: function () {
                        openSignIn();
                        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '无法登录, 请联系客服!');
                    }
                });
            }
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            $("#signupAlert").alert('close');
            showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '注册失败, 请联系客服!');
        }
    });
};

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

    if ($("#txt_SignIn_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入验证码!');
        return;
    }

    _registerRemoteServer();
    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.account.signwithcode),
        data: '<root>' +
            '<symbol>' + $("#txt_SignIn_UserName").val() + '</symbol>' +
            '<password>' + $("#txt_SignIn_Password").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codevalue>' + $("#txt_SignIn_CheckCode").val() + '</codevalue>' +
            '</root>',
        success: function (data, status) {
            if ($(data).find('err').length > 0) {
                showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', $(data).find('err').attr('msg'));
                return;
            }

            $.cookie('logined_user_name', $($(data).find('msg')[0]).attr('logined_user_name'));
            $.cookie('logined_nick_name', $($(data).find('msg')[0]).attr('logined_nick_name'));
            $("#signinAlert").alert('close');
            $('#mWindow_SignIn').modal('hide');
            updateUserInfor(data);
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
};

function openSignIn() {
    $('#mWindow_SignIn').modal('show');
    $('#mWindow_SignUp').modal('hide');
}

function openSignUp() {
    $('#mWindow_SignIn').modal('hide');
    $('#mWindow_SignUp').modal('show');
};

function openAgreement() {

};

function updatePassword() {
    $("#signinAlert").alert('close');
    if ($("#txt_ForgetPWD_PhoneNumber").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_ForgetPWD_PhoneNumber").val().trim())) {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '不正确的手机号码!');
        return;
    }

    if ($("#txt_ForgetPWD_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入验证码!');
        return;
    }

    if ($("#txt_ForgetPWD_NewPwd").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请输入新密码!');
        return;
    }

    if ($("#txt_ForgetPWD_ConfirmPwd").val().trim() == "") {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '请确认新密码!');
        return;
    } else if ($("#txt_ForgetPWD_ConfirmPwd").val().trim() != $("#txt_ForgetPWD_NewPwd").val().trim()) {
        showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '两次输入的密码不一致!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.account.sign),
        data: '<root>' +
            '<username>' + $("#txt_ForgetPWD_PhoneNumber").val() + '</username>' +
            '<password>' + $("#txt_ForgetPWD_NewPwd").val() + '</password>' +
            '<codename>signincode</codename>' +
            '<codename>' + $("#txt_ForgetPWD_CheckCode").val() + '</codename>' +
            '</root>',
        success: function (data, status) {
            $("#signinAlert").alert('close');
            $('.sign-in-form').css('display', 'block');
            $('.sign-in-forget-pwd-form').css('display', 'none');
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
};

var intervalCode = {};
function sendNoteCode() {
    var data = arguments[0].data;
    if (!intervalCode[data.buttonId] || intervalCode[data.buttonId] == 0) {
        $('#' + data.buttonId).empty();
        $('#' + data.buttonId).append('<strong id="' + data.labelId + '">60</strong>' + _getLabel('秒后重发'));
        intervalCode[data.buttonId] = window.setInterval(function () {
            updateCountDown(data);
        }, 1000);
        $.ajax({
            type: 'POST',
            url: _getRequestURL(_gURLMapping.account.sign),
            data: '<root><username>' + $("#" + data.textId).val() + '</username></root>',
            success: function (data, status) {
                $("#" + data.alertId).alert('close');
            },
            dataType: 'xml',
            xhrFields: {
                withCredentials: true
            },
            error: function () {
                $("#" + data.alertId).alert('close');
                showAlertMessage(data.containerId, data.alertId, '发送验证码失败, 请重新尝试!');
            }
        });
    }
};

function updateCountDown(data) {
    var value = parseInt($('#' + data.labelId).text());
    if (value == 0) {
        $('#' + data.buttonId).empty();
        $('#' + data.buttonId).text(_getLabel('获取验证码'));
        window.clearInterval(intervalCode[data.buttonId]);
        intervalCode[data.buttonId] = 0;
    } else {
        value -= 1;
        $('#' + data.labelId).text(value + '');
    }
};

function updateUserInfor(responseData) {
    removeUserInfoItem();
    if (responseData) {
        createUserInfoItem(responseData);
    } else {
        _registerRemoteServer();
        $.ajax({
            type: 'GET',
            url: _getRequestURL(_gURLMapping.account.signsstatus),
            data: '<root></root>',
            success: function (data_1, status) {
                if ($(data_1).find('err').length > 0) {
                    openSignIn(true);
                    showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', $(data_1).find('err').attr('msg'));
                    return;
                } else {
                    if ($.cookie('logined_user_name') && $.cookie('logined_nick_name') && $.cookie('logined_user_name') != "" && $.cookie('logined_nick_name') != "") {
                        createUserInfoItem($.cookie('logined_nick_name'));
                    } else {
                        $.ajax({
                            type: 'GET',
                            url: _getRequestURL(_gURLMapping.account.nickname),
                            data: '<root></root>',
                            success: function (data_2, status) {
                                if ($(data_2).find('err').length > 0) {
                                    _showGlobalMessage($(data_2).find('err').attr('msg'), 'danger', 'alert_SignStatus_Error');
                                } else {
                                    createUserInfoItem(data_2);
                                }
                            },
                            dataType: 'xml',
                            xhrFields: {
                                withCredentials: true
                            },
                            error: function () {
                                removeUserInfoItem();
                            }
                        });
                    }
                }
            },
            dataType: 'xml',
            xhrFields: {
                withCredentials: true
            },
            error: function () {
                removeUserInfoItem();
            }
        });
    }
};

function removeUserInfoItem() {
    $('li#nav_UserInfo_Item').remove();
    if ($('li#nav_SignIn_Item').hasClass('hidden')) {
        $('li#nav_SignIn_Item').removeClass('hidden');
    }
}

function createUserInfoItem(data) {
    var nickName = '';
    if (typeof data == 'string') {
        nickName = data;
    } else {
        var tmpObject = $(data).find('msg');
        if (tmpObject.length > 0) {
            if (tmpObject.length > 1) {
                for (var i = 0; i < tmpObject.length; i++) {
                    if ($(tmpObject[i]).attr('type') != '1') {
                        nickName = $(tmpObject[i]).attr('msg');
                    }
                }
            } else {
                nickName = $(tmpObject[0]).attr('logined_nickname');
            }

            $.cookie('logined_nick_name', nickName);
        }
    }

    if (nickName != '') {
        /*
        $('#navbar_collapse_ul').append(
            $(
                '<li class="nav-item" id="nav_UserInfo_Item">' +
                '   <a href="#"  id="linkBtn_UserInfo" >' +
                '       Welcome back &nbsp;' +
                '       <span class="glyphicon glyphicon-user"></span>' +
                '       <span class="text-header-userinfo">' + nickName + '</span>' +
                '   </a>' +
                '</li>'
            )
        );
        */
        $('#navbar_collapse_ul').append(
            $(
                '<li class="nav-item dropdown" id="nav_UserInfo_Item">' +
                '   <a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
                '       Welcome back &nbsp;' +
                '       <span class="glyphicon glyphicon-user"></span>' +
                '       <span class="text-header-userinfo">' + nickName + '</span>' +
                '       <b class="caret"></b>' +
                '   </a>' +
                '   <ul class="dropdown-menu">' +
                '       <li class="nav-item"><a href="#" id="linkBtn_SignOut" style="font-weight:100;">退出登录</a></li>' +
                '       <li class="nav-item"><a href="#" id="linkBtn_UserInfo" style="font-weight:100;">用户信息</a></li>' +
                '   </ul>' +
                '</li>'
            )
        );

        if (!$('li#nav_SignIn_Item').hasClass('hidden')) {
            $('li#nav_SignIn_Item').addClass('hidden');
        }

        $("#linkBtn_UserInfo").on('click', function () {
            window.location.href = "accountcenter.html?cid=" + _gCID;
        });

        $("#linkBtn_SignOut").on('click', function () {
            _registerRemoteServer();
            $.ajax({
                type: 'GET',
                url: _getRequestURL(_gURLMapping.account.logout),
                data: '<root></root>',
                success: function (data_2, status) {
                    if ($(data_2).find('err').length > 0) {
                        _showGlobalMessage($(data_2).find('err').attr('msg'), 'danger', 'alert_Logout_Error');
                    } else {
                        removeUserInfoItem();
                        $.removeCookie('logined_user_name');
                        $.removeCookie('logined_nick_name');
                    }
                },
                dataType: 'xml',
                xhrFields: {
                    withCredentials: true
                },
                error: function () {
                    removeUserInfoItem();
                    $.removeCookie('logined_user_name');
                    $.removeCookie('logined_nick_name');
                }
            });
        });
    }
};

function reinitSignInFileds() {
    $("#txt_SignIn_UserName").val('');
    $("#txt_SignIn_Password").val('');
    $("#txt_ForgetPWD_PhoneNumber").val('');
    $("#txt_ForgetPWD_CheckCode").val('');
    $("#txt_ForgetPWD_NewPwd").val('');
    $("#txt_ForgetPWD_ConfirmPwd").val('');
    $("#lb_FPwd_Pwd_Intension").text('');
    refereshCheckCode('img_SignIn_CheckCode');
};

function reinitSignUpFileds() {
    $("#txt_SignUp_UserName").val('');
    $("#txt_SignUp_PhoneNumber").val('');
    $("#txt_SignUp_Pwd").val('');
    $("#lb_SignUp_Pwd_Intension").text('');
    $("#txt_SignUp_CheckCode").val('');
    refereshCheckCode('img_SignUp_CheckCode');
    $("#img_SignUp_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
};

function refereshCheckCode(checkCodeId) {
    $("#" + checkCodeId).attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
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
};

function headerSearch() {

};