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

    var liberaryArray = [
        {
            id: '1',
            name: '弹球控制 Ball Control',
            rate: 100,
            note: '入门物理, 入门数学',
            img: 'images/span/Theme_Ball.fw.png',
            diff: '1',
            diffName: 'G1',
            point: '边界设定, 速度设定'
        }, {
            id: '2',
            name: '吃豆子 Pac Man',
            rate: 90,
            note: '入门物理, 入门数学',
            img: 'images/span/Theme_Ball.fw.png',
            diff: '2',
            diffName: 'G2',
            point: 'NPC设定, 路径设定'
        }, {
            id: '3',
            name: '字母大作战 War Of The Chars',
            rate: 80,
            note: '入门英语, 打字',
            img: 'images/span/Theme_Ball.fw.png',
            diff: '3',
            diffName: 'G3',
            point: '字母设定, 单词设定, 分数设定'
        }, {
            id: '4',
            name: '石头剪刀布',
            rate: 50,
            note: '入门逻辑判断',
            img: 'images/span/Theme_Ball.fw.png',
            diff: '1',
            diffName: 'G1',
            point: '条件判定'
        }, {
            id: '5',
            name: '弹球控制2 Ball Control2',
            rate: 20,
            note: '入门物理, 入门数学',
            img: 'images/span/Theme_Ball.fw.png',
            diff: '3',
            diffName: 'G3',
            point: '边界设定, 速度设定'
        }
        , {
            id: '6',
            name: '吃豆子2 Pac Man2',
            rate: 0,
            note: '入门物理, 入门数学',
            img: 'images/span/Theme_Ball.fw.png',
            diff: '1',
            diffName: 'G1',
            point: '边界设定, 速度设定'
        }
    ];

    buildHeader(true, advertsArray);
    buildLiberary(liberaryArray);
    buildFooter();
}