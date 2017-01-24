'use strict';

var _checkSigned = '';
var _checkCodeParams = {
    length: 8,
    name: 'signincode',
    width: 130,
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
    tmpHtmlStrArr.push('            <a href="#"><img src="images/logo.png" class="img-responsive"></a>');
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
    tmpHtmlStrArr.push('                                <input type="text" class="form-control" id="txt_SignIn_Password" placeholder="' + _getLabel('密码') + '">');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-12">');
    tmpHtmlStrArr.push('                                <div class="input-group" style="width:100%;">');
    tmpHtmlStrArr.push('                                    <input type="text" class="form-control" id="txt_SignIn_CheckCode" placeholder="' + _getLabel('验证码') + '" />');
    tmpHtmlStrArr.push('                                    <div class="input-group-addon" style="width:130px; padding:0px;">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand check-code-image" id="img_SignIn_CheckCode" src="' + _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams) + '" title="' + _getLabel('点击刷新验证码') + '">');
    tmpHtmlStrArr.push('                                    </div>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                        </div>');
    tmpHtmlStrArr.push('                        <div class="form-group">');
    tmpHtmlStrArr.push('                            <div class="col-sm-3">');
    tmpHtmlStrArr.push('                                <div class="checkbox">');
    tmpHtmlStrArr.push('                                    <label>');
    tmpHtmlStrArr.push('                                        <input type="checkbox" id="chk_SignIn_RememberMe" style="margin-top: 6px;">');
    tmpHtmlStrArr.push(_getLabel('记住我'));
    tmpHtmlStrArr.push('                                    </label>');
    tmpHtmlStrArr.push('                                </div>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-3">');
    tmpHtmlStrArr.push('                                <a id="linkBtn_ForgetPwd" href="#"><p class="text-signin-dialog-title padding-bottom0">' + _getLabel('忘记密码') + '</p></a>');
    tmpHtmlStrArr.push('                            </div>');
    tmpHtmlStrArr.push('                            <div class="col-sm-3 col-sm-offset-3">');
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
    tmpHtmlStrArr.push('                                    <span class="input-group-addon" style="width:130px; padding:0px;">');
    tmpHtmlStrArr.push('                                        <img class="cursor-hand check-code-image" id="img_SignUp_CheckCode" src="' + _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams) + '" title="' + _getLabel('点击刷新验证码') + '">');
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
    tmpHtmlStrArr.push(_getLabel('点击注册按钮, 即代表您同意'));
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
            /*
            $.ajax({
                type: 'POST',
                url: _getRequestURL(_gURLMapping.account.signsstatus),
                data: '<root></root>',
                success: function (data, status) {                    
                    window.location.href = "studentcenter.html?cid=" + _gCID;
                },
                dataType: 'xml',
                xhrFields: {
                    withCredentials: true
                },
                error: function () {
                    updateUserInfor(false);
                }
            });
            */
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
    $("#btn_SignUpOK").on('click', signUp);
    $("#img_SignUp_CheckCode").on('click', function () {
        $("#img_SignUp_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
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
        buttonId: 'btn_CheckPhoneNumber_CountDown',
        labelId: 'lb_CheckPhoneNumber_CountDown',
        textId: 'txt_ForgetPWD_PhoneNumber',
        alertId: 'checkPhoneAlert',
        containerId: 'mWindow_CheckPhone_Dialog'
    };
    $('#btn_CheckPhoneNumber_CountDown').on('click', cpnParames, sendNoteCode);
    $('#btn_CheckPhoneOK').on('click', passportEnter);
};

function initHeaderEvent() {
    initNavBarEvent();
    initSignInWindowEvent();
    initSignUpWindowEvent();
};

function signUp() {
    //$('#mWindow_CheckPhoneNumber').modal('show');
    //$('#txt_CheckPhoneNumber_Number').attr('placeholder', $("#txt_SignUp_PhoneNumber").val() + '');
    //return;
    $("#signupAlert").alert('close');
    if ($("#txt_SignUp_UserName").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入姓名!');
        return;
    }

    if ($("#txt_SignUp_PhoneNumber").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入手机号码!');
        return;
    } else if (!_checkPhoneNumber($("#txt_SignUp_PhoneNumber").val().trim())) {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '不正确的手机号码!');
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
        } else {
            if (checkVal == 1) {
            }
        }
    }

    if ($("#txt_SignUp_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_SignUp_Dialog', 'signupAlert', '请输入验证码!');
        return;
    }

    var params = {
        symbol: $("#txt_SignUp_PhoneNumber").val(),
        password: $("#txt_SignUp_Pwd").val(),
        codename: 'signincode',
        codevalue: $("#txt_SignUp_CheckCode").val()
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
            $('#txt_CheckPhoneNumber_Number').attr('placeholder', $("#txt_SignUp_PhoneNumber").val() + '');
        },
        dataType: 'text',
        xhrFields: {
            //withCredentials: true
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
            showAlertMessage('mWindow_SignIn_Dialog', 'signinAlert', '无法登录, 请联系客服!');
        }
    });
};

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

function passportEnter() {
    if ($("#txt_CheckPhoneNumber_CheckCode").val().trim() == "") {
        showAlertMessage('mWindow_CheckPhone_Dialog', 'checkPhoneAlert', '请输入获取到的验证码!');
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
            $("#checkPhoneAlert").alert('close');
            $('#mWindow_CheckPhoneNumber').modal('hide');
            updateUserInfor(true);
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            $("#checkPhoneAlert").alert('close');
            showAlertMessage('mWindow_CheckPhone_Dialog', 'checkPhoneAlert', '无法进入, 请联系客服!');
        }
    });
};

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
};

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
        window.location.href = "studentcenter.html?cid=" + _gCID;
    });
};

function reinitSignInFileds() {
    $("#txt_SignIn_UserName").val('');
    $("#txt_SignIn_Password").val('');
    $("#txt_ForgetPWD_PhoneNumber").val('');
    $("#txt_ForgetPWD_CheckCode").val('');
    $("#txt_ForgetPWD_NewPwd").val('');
    $("#txt_ForgetPWD_ConfirmPwd").val('');
    $("#img_SignIn_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
};

function reinitSignUpFileds() {
    $("#txt_SignUp_UserName").val('');
    $("#txt_SignUp_PhoneNumber").val('');
    $("#txt_SignUp_Pwd").val('');
    $("#txt_SignUp_CheckCode").val('');
    $("#img_SignUp_CheckCode").attr("src", _getRequestURL(_gURLMapping.account.checkcode, _checkCodeParams));
};

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