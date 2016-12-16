'use strict';

window.addEventListener('load', onLoad);

function onLoad() {
    var advertsArray = [
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png",
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png",
        "images/TmpAdv/Adv1.fw.png",
        "images/TmpAdv/Adv2.fw.png"
    ];

    var lessonsArray = [
        {
            id: '1',
            cname: '弹球控制',
            ename: 'Ball Control',
            rate: 100,
            img: 'images/span/Theme_Ball.fw.png',
            diff: '1',
            scenecount:5
        }, {
            id: '2',
            cname: '吃豆子',
            ename: 'Pac Man',
            rate: 90,
            img: 'images/span/Theme_Beans.fw.png',
            diff: '2',
            scenecount: 5
        }, {
            id: '3',
            cname: '字母大作战',
            ename: 'War Of The Chars',
            rate: 80,
            img: 'images/span/Theme_Chars.fw.png',
            diff: '3',
            scenecount: 5
        }, {
            id: '4',
            cname: '石头剪刀布',
            ename: '',
            rate: 50,
            img: 'images/span/Theme_Wins.fw.png',
            diff: '1',
            scenecount: 5
        }, {
            id: '5',
            cname: '弹球控制2',
            ename: 'Ball Control2',
            rate: 20,
            img: 'images/span/Theme_Ball.fw.png',
            diff: '3',
            scenecount: 5
        }
        , {
            id: '6',
            cname: '吃豆子 2',
            ename: 'Pac Man 2',
            rate: 0,
            img: 'images/span/Theme_Beans.fw.png',
            diff: '1',
            scenecount: 5
        }
    ];

    buildHeader(false, advertsArray);
    buildLessons(lessonsArray, lessonsArray);
    buildFooter();
}