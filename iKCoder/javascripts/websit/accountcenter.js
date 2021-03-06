﻿'use strict';

var cityDatas = [
    { p: '北京', c: ['东城区', '西城区', '崇文区', '宣武区', '朝阳区', '海淀区', '丰台区', '石景山'] },
    { p: '上海', c: ['宝山', '金山', '南市', '长宁', '静安', '青浦', '崇明', '卢湾', '松江', '奉贤', '浦东', '杨浦', '虹口', '普陀', '闸北', '黄浦', '闵行', '徐汇', '嘉定', '南汇'] },
    { p: '重庆', c: ['渝中', '江北', '沙坪坝', '南岸', '九龙坡', '大渡口'] },
    { p: '天津', c: ['和平', '河北', '河西', '河东', '南开', '红桥', '塘沽', '汉沽', '大港', '东丽', '西青', '津南', '北辰', '武清', '滨海'] },
    { p: '广东', c: ['广州', '深圳', '珠海', '中山', '佛山', '东莞', '清远', '肇庆', '阳江', '湛江', '韶关', '惠州', '河源', '汕尾', '汕头', '梅州'] },
    { p: '河北', c: ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '张家口', '承德', '廊坊', '沧州', '保定', '衡水'] },
    { p: '山西', c: ['太原', '大同', '阳泉', '朔州', '长治', '临汾', '晋城'] },
    { p: '内蒙古', c: ['呼和浩特', '包头', '乌海', '临河', '东胜', '集宁', '锡林浩特', '通辽', '赤峰', '海拉尔', '乌兰浩特'] },
    { p: '辽宁', c: ['沈阳', '大连', '鞍山', '锦州', '丹东', '盘锦', '铁岭', '抚顺', '营口', '辽阳', '阜新', '本溪', '朝阳', '葫芦岛'] },
    { p: '吉林', c: ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边'] },
    { p: '黑龙江', c: ['哈尔滨', '齐齐哈尔', '牡丹江', '佳木斯', '大庆', '伊春', '黑河', '鸡西', '鹤岗', '双鸭山', '七台河', '绥化', '大兴安岭'] },
    { p: '江苏', c: ['南京', '苏州', '无锡', '常州', '镇江', '连云港 ', '扬州', '徐州 ', '南通', '盐城', '淮阴', '泰州', '宿迁'] },
    { p: '浙江', c: ['杭州', '湖州', '丽水', '温州', '绍兴', '舟山', '嘉兴', '金华', '台州', '衢州', '宁波'] },
    { p: '安徽', c: ['合肥  ', '芜湖 ', '蚌埠 ', '滁州 ', '安庆 ', '六安 ', '黄山 ', '宣城 ', '淮南 ', '宿州 ', '马鞍山 ', '铜陵', '淮北 ', '阜阳 ', '池州 ', '巢湖 ', '亳州'] },
    { p: '福建', c: ['福州 ', '厦门 ', '泉州 ', '漳州 ', '龙岩 ', '南平 ', '宁德 ', '莆田 ', '三明'] },
    { p: '江西', c: ['南昌', '景德镇', '九江', '萍乡', '新余', '鹰潭', '赣州', '宜春', '吉安', '上饶', '抚州'] },
    { p: '山东', c: ['济南', '青岛', '淄博', '德州', '烟台', '潍坊', '济宁', '泰安', '临沂', '菏泽', '威海', '枣庄', '日照', '莱芜', '聊城', '滨州', '东营'] },
    { p: '河南', c: ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '周口', '驻马店', '信阳', '济源'] },
    { p: '湖北', c: ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '恩施', '随州', '仙桃', '天门', '潜江', '神农架'] },
    { p: '湖南', c: ['长沙', '株州', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '郴州', '益阳', '永州', '怀化', '娄底', '湘西'] },
    { p: '广西', c: ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '贺州', '百色', '河池'] },
    { p: '海南', c: ['海口 ', '三亚', '通什', '琼海', '琼山', '文昌', '万宁', '东方', '儋州'] },
    { p: '四川', c: ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充  ', '宜宾', '广安', '达川', '巴中', '雅安', '眉山  ', '阿坝 ', '甘孜 ', '凉山'] },
    { p: '贵州', c: ['贵阳 ', '六盘水', '遵义', '铜仁', '毕节', '安顺', '黔西南 ', '黔东南', '黔南'] },
    { p: '云南', c: ['昆明', '东川', '曲靖', '玉溪', '昭通', '思茅', '临沧', '保山', '丽江', '文山 ', '红河 ', '西双版纳 ', '楚雄 ', '大理 ', '德宏 ', '怒江', '迪庆'] },
    { p: '西藏', c: ['拉萨', '那曲', '昌都', '山南', '日喀则', '阿里', '林芝'] },
    { p: '陕西', c: ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '商洛', '安康'] },
    { p: '甘肃', c: ['兰州', '金昌', '白银', '天水', '嘉峪关', '定西', '平凉', '庆阳', '陇南', '武威', '张掖', '酒泉', '甘南 ', '临夏'] },
    { p: '青海', c: ['西宁', '海东', ' 海北 ', '黄南', '海南', '果洛', '玉树', '海西'] },
    { p: '宁夏', c: ['银川', '石嘴山', '银南', '固原'] },
    { p: '新疆', c: ['乌鲁木齐', '克拉玛依', '石河子', '吐鲁番', '哈密', '和田', '阿克苏', '喀什', '克孜勒苏', '巴音郭楞', '昌吉', '博尔塔拉', '伊犁'] },
    { p: '香港', c: [] },
    { p: '澳门', c: [] },
    { p: '台湾', c: [] }
]

function initEvnets() {
    $("#btn_Item_Profile").click(function () {
        if (!$("#btn_Item_Profile").hasClass('bold')) {
            $("#btn_Item_Profile").toggleClass('bold');
            $("#btn_Item_Account").toggleClass('bold');
            $("#wrap_Item_Account").toggleClass('hidden');
            $("#wrap_Item_Profile").toggleClass('hidden');
        }
        adjustFooter();
    });

    $("#btn_Item_Account").click(function () {
        if (!$("#btn_Item_Account").hasClass('bold')) {
            $("#btn_Item_Profile").toggleClass('bold');
            $("#btn_Item_Account").toggleClass('bold');
            $("#wrap_Item_Account").toggleClass('hidden');
            $("#wrap_Item_Profile").toggleClass('hidden');
        }
        adjustFooter();
    });

    $("#select_User_Birthday_Year").change(function () {
        resetDaysSelect();
    });

    $("#select_User_Birthday_Month").change(function () {
        resetDaysSelect();
    });

    $("#select_User_City_Province").change(function () {
        resetCitySelect();
    });

    $("#btn_Save_Profile").click(function () {
        updateProfile();
    });

    $("#btn_Save_NewPWD").click(function () {
        updatePWD();
    });

    $("#btn_Upload_Header").click(function () {
        adjustFooter();
    });

    $("#txt_New_Password").on('blur', function () {
        checkPwdIntension($("#txt_New_Password"), $('#lb_New_Pwd_Intension'));
    });

    $(".js-password-change-btn").on('click', function () {
        if ($(".js-password-change-control").attr("type") == 'text') {
            $(".js-password-change-control").attr("type", "password");
            $("#btn_New_Show_Hide_Pwd").addClass('glyphicon-eye-close');
            $("#btn_New_Show_Hide_Pwd").removeClass('glyphicon-eye-open');
            $("#btn_Confirm_Show_Hide_Pwd").addClass('glyphicon-eye-close');
            $("#btn_Confirm_Show_Hide_Pwd").removeClass('glyphicon-eye-open');
        } else {
            $(".js-password-change-control").attr("type", "text");
            $("#btn_Confirm_Show_Hide_Pwd").addClass('glyphicon-eye-open');
            $("#btn_Confirm_Show_Hide_Pwd").removeClass('glyphicon-eye-close');
            $("#btn_New_Show_Hide_Pwd").addClass('glyphicon-eye-open');
            $("#btn_New_Show_Hide_Pwd").removeClass('glyphicon-eye-close');
        }
    });

    $('#mWindow_customHeaderModal').on('show.bs.modal', function () {
        adjustFooter();
        $('#progress_HeaderUpload').hide();
        $('#warnning_HeaderUpload').hide();
        $('#wrap_CropBox_Header').hide();
        initCustomHeaderImg();
    });

    $('#mWindow_customHeaderModal').on('hide.bs.modal', function () {
        adjustFooter();
        $('#progress_HeaderUpload').hide();
        $('#warnning_HeaderUpload').hide();
        $('#wrap_CropBox_Header').hide();
    });

    $('#linkBtn_Upload_HeaderFile').on('click', function () {
        $('#progress_HeaderUpload').hide();
        $('#warnning_HeaderUpload').hide();
        $('#wrap_CropBox_Header').hide();
        $('#file_Upload').click();
    });

    $('#file_Upload').on('change', function () {
        var regExp = /(\.|\/)(gif|jpe?g|png|bmp)$/i;
        var fileName = $(this).val();
        if (!regExp.test(fileName)) {
            $('#warnning_HeaderUpload').show();
            $('#warnning_HeaderUpload').text("仅支持.jpg .jpeg .gif .png .bmp格式的图片");
            return;
        } else if (this.files[0].size / 1024 > 512) {
            $('#warnning_HeaderUpload').show();
            $('#warnning_HeaderUpload').text("图片大小不能超过512K");
            return;
        } else {
            $('#progress_HeaderUpload').show();
            _registerRemoteServer();
            var fileType = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
            $('#form_Upload').attr('action', _getRequestURL(_gURLMapping.data.setbinresource, {
                sumitdata: 1,
                //callback: encodeURI("parent.uploadCallBack(JSPARAM)"),
                filetype: fileType,
                symbol: 'img_temp_header_' + $.cookie('logined_user_name'),
            }));
            $('#form_Upload').submit();
            _UploadHeaderHandle = setTimeout('initCustomHeaderImg("' + fileType + '")', 2000);
        }
    });

    $('#btn_CustomHeader_Save').on('click', function () {
        var tmpStr = $('#btn_CustomHeader_Save').attr('data-content');
        var tmpParams = tmpStr.split(',');
        if (tmpStr != '' && tmpParams.length == 4) {
            tmpParams = {
                tmpsymbol: 'img_temp_header_' + $.cookie('logined_user_name'),
                symbol: 'img_header_' + $.cookie('logined_user_name'),
                startx: tmpParams[0],
                starty: tmpParams[1],
                width: tmpParams[2],
                height: tmpParams[3]
            };
            _registerRemoteServer();
            $.ajax({
                type: 'POST',
                url: _getRequestURL(_gURLMapping.util.setclipimage, tmpParams),
                data: '',
                success: function (data, status) {
                    if ($(data).find('err').length > 0) {
                        showAlertMessage('mWindow_CustomHeader_Dialog', 'customHeaderAlert', $(data).find('err').attr('msg'));
                        return;
                    } else {
                        $("#customHeaderAlert").alert('close');
                        $('#mWindow_customHeaderModal').modal('hide');
                        loadHeaderImg();
                    }
                },
                dataType: 'xml',
                xhrFields: {
                    withCredentials: true
                },
                error: function () {

                }
            });
        }
    });
};

var _UploadHeaderHandle;

function initPage() {
    loadHeaderImg();
    initDateSelects();
    initCitySelects();
    initEvnets();
    adjustFooter();
};

function initDateSelects() {
    var currYear = (new Date()).getFullYear();
    var currSelect = $("#select_User_Birthday_Year");
    var tmpStr = "";
    for (var i = 1970; i < currYear; i++) {
        tmpStr = "<option>" + i + "</option>";
        if (i == 1970) {
            tmpStr = "<option selected>" + i + "</option>";
        }

        currSelect.append($(tmpStr));
    }

    currSelect = $("#select_User_Birthday_Day");
    for (var i = 1; i <= 31; i++) {
        tmpStr = "<option>" + i + "</option>";
        currSelect.append($(tmpStr));
    }
};

function initCitySelects() {
    var currSelect = $("#select_User_City_Province");
    var tmpStr = "";
    var index = 0;
    for (var i = 0; i < cityDatas.length; i++) {
        tmpStr = "<option>" + cityDatas[i].p + "</option>";
        if (i == 0) {
            tmpStr = "<option selected>" + cityDatas[i].p + "</option>";
        }

        currSelect.append($(tmpStr));
    }

    currSelect = $("#select_User_City_City");
    for (var i = 0; i < cityDatas[0].c.length; i++) {
        currSelect.append($("<option>" + cityDatas[0].c[i] + "</option>"));
    }
};

function resetDaysSelect() {
    var year = $("#select_User_Birthday_Year").val();
    var month = $("#select_User_Birthday_Month").val();
    var days = 31;
    if (month == 2) {
        days = 28;
        if (year % 4 == 0 && year % 100 != 0 && year % 400 == 0) {
            days = 29;
        }
    } else if ((month < 8 && month % 2 == 0) || (month >= 8 && month % 2 == 1)) {
        days = 30;
    }

    var currSelect = $("#select_User_Birthday_Day");
    currSelect.empty();
    for (var i = 1; i <= days; i++) {
        currSelect.append("<option selected>" + i + "</option>");
    }
};

function resetCitySelect() {
    var currProvince = $("#select_User_City_Province").val();
    for (var i = 0; i < cityDatas.length; i++) {
        if (currProvince == cityDatas[i].p) {
            var currSelect = $("#select_User_City_City");
            currSelect.empty();
            for (var j = 0; j < cityDatas[i].c.length; j++) {
                currSelect.append($("<option>" + cityDatas[i].c[j] + "</option>"));
            }

            break;
        }
    }

};

function adjustFooter() {
    var bodyHeight = $('html').height();
    var divHeight = $("#sector_Top_Title").height();
    var headerHeight = $("header").height();
    var footerHeight = $("footer").height();
    var tmpHeight = bodyHeight - divHeight - headerHeight - footerHeight - 20;
    $(".space-row-bottom").height(tmpHeight > 0 ? tmpHeight : 0);
};

function loadHeaderImg() {
    var tmpSrc = _getRequestURL(_gURLMapping.data.getimageheader);
    $('#img_Infor_Header').attr('src', tmpSrc);
    $('#img_Card_Header').attr('src', tmpSrc);
}

var _currentHeaderImageSrc = '';
function initCustomHeaderImg(uploadType) {
    var canvas = document.getElementById("canvas_CustomHeader");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 320, 320);
    $('#progress_HeaderUpload').hide();
    var image = new Image();
    if (!uploadType && _currentHeaderImageSrc == '') {
        image.src = _getRequestURL(_gURLMapping.data.getimageheader);
    } else if (typeof uploadType == 'string' && uploadType != '') {
        image.src = _getRequestURL(_gURLMapping.data.getimage, { symbol: 'img_temp_header_' + $.cookie('logined_user_name'), filetype: uploadType });
        //image.src = "images/head/head_11.jpg";
    } else {
        image.src = _currentHeaderImageSrc + "&rnd=" + Date.now();
    }

    image.onload = function () {
        var tmpSize = calcExhibitionSize(image);
        ctx.drawImage(image, 0, 0, tmpSize.w, tmpSize.h, (320 - tmpSize.nw) / 2, (320 - tmpSize.nh) / 2, tmpSize.nw, tmpSize.nh);
        fnImageCropRot(image, { w: tmpSize.nw, h: tmpSize.nh });
    };

    _currentHeaderImageSrc = image.src
    var tmpSize = calcExhibitionSize(image);
    fnImageCropRot(image, { w: tmpSize.nw, h: tmpSize.nh });
}

var _eventBinded = false;
var fnImageCropRot = function (o, newSize) {
    var ID = function (id) {
        return document.getElementById(id);
    };

    var oCanvas = ID("canvas_CustomHeader");
    oCanvas.onselectstart = function () {
        return false;
    };

    var oCreateImg = o;
    var iOrigWidth = (oCreateImg.width > 320 ? 320 : oCreateImg.width);
    var iOrigHeight = (oCreateImg.height > 320 ? 320 : oCreateImg.height);
    if ($('#wrap_CropBox_Header').length == 0) {
        var tmpHTMLArr = [];
        tmpHTMLArr.push('<div id="wrap_CropBox_Header" style="width:' + iOrigWidth + 'px; height:' + iOrigHeight + 'px;">');
        tmpHTMLArr.push('   <div id="CropBox_Header">');
        tmpHTMLArr.push('       <div id="DragBg_Header"></div>');
        tmpHTMLArr.push('       <div id="dragRightBot" ></div>');
        tmpHTMLArr.push('   </div>');
        tmpHTMLArr.push('</div>');
        $("#canvas_CustomHeader").after(tmpHTMLArr.join(""));
    }

    var tmpParams = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        currentX: 0,
        currentY: 0,
        flag: false,
        kind: "drag"
    };
    $('#wrap_CropBox_Header').show();
    var cropWidth = (iOrigWidth > 100 ? 100 : iOrigWidth);
    var cropHeight = (iOrigHeight > 100 ? 100 : iOrigHeight);
    var orgLeft = (320 - cropWidth) / 2;
    var orgTop = (320 - cropHeight) / 2;
    $("#CropBox_Header").width(cropWidth);
    $("#CropBox_Header").height(cropHeight);
    $("#CropBox_Header").css('top', orgTop + "px");
    $("#CropBox_Header").css('left', orgLeft + "px");
    showSampleImage(o, orgLeft, orgTop, cropWidth, cropHeight, newSize);
    startDrag.image = o;
    startDrag.newSize = newSize;
    if (!_eventBinded) {
        startDrag(ID("DragBg_Header"), ID("CropBox_Header"), "drag", tmpParams);
        startDrag(ID("dragRightBot"), ID("CropBox_Header"), "se", tmpParams);
        _eventBinded = true;
    }
};

var startDrag = function (point, target, kind, params) {
    params.width = $(target).width();
    params.height = $(target).height();
    params.left = $(target).position().left;
    params.top = $(target).position().top;

    point.onmousedown = function (event) {
        params.kind = kind;
        params.flag = true;
        if (!event) {
            event = window.event;
        }

        var e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;
        point.onselectstart = function () {
            return false;
        }

        return false;
    };

    document.onmouseup = function () {
        params.flag = false;
        params.left = $(target).position().left;
        params.top = $(target).position().top;
        params.width = $(target).width();
        params.height = $(target).height();
        showSampleImage(startDrag.image, params.left, params.top, params.width, params.height, startDrag.newSize);
    };

    document.onmousemove = function (event) {
        var e = event ? event : window.event;
        if (params.flag) {
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - params.currentX;
            var disY = nowY - params.currentY;
            var tmpWidth = parseInt(params.width);
            var tmpHeighth = parseInt(params.height);
            var tmpLeft = parseInt(params.left);
            var tmpTop = parseInt(params.top);
            if (params.kind === "se") {
                var newWidth = tmpWidth + disX;
                var newHeight = tmpHeighth + disY;
                newWidth = (newWidth + tmpLeft > 320 ? 320 - tmpLeft : newWidth); 320
                newHeight = (newHeight + tmpTop > 320 ? 320 - tmpTop : newHeight);
                $(target).width(newWidth);
                $(target).height(newHeight);
            } else {
                var newLeft = tmpLeft + disX;
                var newTop = tmpTop + disY;
                newLeft = (newLeft < 0 ? 0 : newLeft);
                newTop = (newTop < 0 ? 0 : newTop);
                newLeft = (newLeft + tmpWidth > 320 ? 320 - tmpWidth : newLeft);
                newTop = (newTop + tmpHeighth > 320 ? 320 - tmpHeighth : newTop);
                $(target).css('left', newLeft + "px");
                $(target).css('top', newTop + "px");
            }
        }
    }
}

startDrag.image = null;
startDrag.newSize = null;

function calcExhibitionSize(image) {
    var imgHeight = image.height;
    var imgWidth = image.width;
    var newWidth = imgWidth;
    var newHeight = imgHeight;
    var scaleX = imgWidth / 320;
    var scaleY = imgHeight / 320;
    if (imgHeight > imgWidth) {
        newHeight = 320;
        newWidth = imgWidth / imgHeight * newHeight;
    } else {
        newWidth = 320;
        newHeight = imgHeight / imgWidth * newWidth;
    }

    return { w: imgWidth, h: imgHeight, nw: newWidth, nh: newHeight };
};

function transCropBoxSizeToRealSize(image, left, top, width, height, newSize) {
    var tmpLeft = left - (320 - newSize.w) / 2;
    var tmpTop = top - (320 - newSize.h) / 2;
    var tmpWidth = width;
    var tmpHeight = height;
    if (tmpLeft < 0 && left + width > newSize.w) {
        tmpWidth = width + tmpLeft - (left + width - (320 + newSize.w) / 2);
        tmpLeft = 0;
    } else if (tmpLeft < 0) {
        tmpWidth = width + tmpLeft;
        tmpLeft = 0;
    } else if (left + width > newSize.w) {
        tmpWidth = (320 + newSize.w) / 2 - left;
    }

    if (tmpTop < 0 && top + height > newSize.h) {
        tmpHeight = height + tmpTop - (top + height - (320 + newSize.h) / 2);
        tmpTop = 0;
    } else if (tmpTop < 0) {
        tmpHeight = height + tmpTop;
        tmpTop = 0;
    } else if (top + height > newSize.h) {
        tmpHeight = (320 + newSize.h) / 2 - top;
    }

    var scaleX = image.width / newSize.w;
    var scaleY = image.height / newSize.h;
    left = tmpLeft * scaleX;
    top = tmpTop * scaleY;
    width = tmpWidth * scaleX;
    height = tmpHeight * scaleY;
    return { l: left, t: top, w: width, h: height };
};

function showSampleImage(image, left, top, width, height, newSize) {
    var sizeObj = transCropBoxSizeToRealSize(image, left, top, width, height, newSize)
    var ctx = document.getElementById("canvas_Sample_1").getContext('2d');
    ctx.clearRect(0, 0, 100, 100);
    ctx.drawImage(image, sizeObj.l, sizeObj.t, sizeObj.w, sizeObj.h, 0, 0, 100, 100);
    ctx = document.getElementById("canvas_Sample_2").getContext('2d');
    ctx.clearRect(0, 0, 64, 64);
    ctx.drawImage(image, sizeObj.l, sizeObj.t, sizeObj.w, sizeObj.h, 0, 0, 64, 64);
    ctx = document.getElementById("canvas_Sample_3").getContext('2d');
    ctx.clearRect(0, 0, 24, 24);
    ctx.drawImage(image, sizeObj.l, sizeObj.t, sizeObj.w, sizeObj.h, 0, 0, 24, 24);
    $('#btn_CustomHeader_Save').attr('data-content', sizeObj.l + ',' + sizeObj.t + ',' + sizeObj.w + ',' + sizeObj.h)
};

function updatePWD() {
    var oldPWD = $("#txt_Old_Password").val().trim();
    var newPWD = $("#txt_New_Password").val().trim();
    var confirmPWD = $("#txt_Confirm_Password").val().trim();
    if (oldPWD == "") {
        _showGlobalMessage('请输入旧密码!', 'danger', 'alert_Input_OldPWD');
        return;
    } else if (newPWD == "") {
        _showGlobalMessage('请输入新密码!', 'warning', 'alert_Input_NewPWD');
        return;
    } else if (confirmPWD == "") {
        _showGlobalMessage('请确认新密码!', 'warning', 'alert_Confirm_NewPWD');
        return;
    }


    if (_checkPassword(newPWD) < 0) {
        _showGlobalMessage('密码不符合要求，请重新输入!', 'danger', 'alert_Reset_NewPWD');
        return;
    } else if (newPWD != confirmPWD) {
        _showGlobalMessage('请确认新密码!', 'danger', 'alert_Confirm_NewPWD');
        return;
    }

    $.ajax({
        type: 'POST',
        url: _getRequestURL(_gURLMapping.account.updatepwd),
        data: '<root>' +
            '<symbol></symbol>' +
            '<newpassword>' + newPWD + '</newpassword>' +
            '<oldpassword>' + oldPWD + '</oldpassword>' +
            '</root>',
        success: function (data, status) {
            if ($(data).find('err').length > 0) {
                _showGlobalMessage($(data).find('err').attr('msg'), 'danger', 'alert_Error_ChangePWD');
                return;
            } else if ($(data).find('msg').length > 0) {
                _showGlobalMessage('修改登录密码成功', 'success', 'alert_Success_ChangePWD');
                return;
            }
        },
        dataType: 'xml',
        xhrFields: {
            withCredentials: true
        },
        error: function () {
            _showGlobalMessage('修改登录密码失败!', 'danger', 'alert_Error_ChangePWD');
        }
    });
};

function updateProfile() {

};