'use strict';

var testData = [
        {
            word: 'computer',
            soundmark: [
                ["英 [kəm'pjuːtə]", ''],
                ["美 [kəm'pjutɚ]", '']
            ],
            star: 4,
            note: '考研 / CET4 / CET6',
            paraphrase: [
                'n. 计算机；电脑；电子计算机'
            ],
            variant: {
                '复数': 'computers'
            }
        }, {
            word: 'programming',
            soundmark: [
                ["英 ['prəʊɡræmɪŋ]", ''],
                ["美 ['proɡræmɪŋ]", '']
            ],
            star: 5,
            note: '',
            paraphrase: [
                'n. 设计，规划；编制程序，[计] 程序编制',
                '训练(programme的现在分词); 培养; 预调;'
            ],
            variant: null
        }
];
var data = [];
for (var i = 0; i < 12; i++) {
    data.push(testData[0]);
    data.push(testData[1]);
}

function initPage() {
    var container = $('#container_Words');
    var htmlStringArr = [];
    htmlStringArr.push('<div class="row">');
    for (var i = 0; i < data.length; i++) {
        htmlStringArr.push('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 word-list-item">');
        htmlStringArr.push('    <div class="container padding-bottom50" style="padding: 0px;">');
        htmlStringArr.push('        <div class="row">');
        htmlStringArr.push('            <div class="col-xs-12 word-word">');
        htmlStringArr.push(data[i].word);
        htmlStringArr.push('            </div>');
        htmlStringArr.push('        </div>');
        htmlStringArr.push('        <div class="row word-soundmark">');
        for (var j = 0; j < data[i].soundmark.length; j++) {
            htmlStringArr.push('            <div class="col-xs-5" style="padding-right: 0px;">');
            htmlStringArr.push(data[i].soundmark[j][0]);
            htmlStringArr.push('            </div>');
            htmlStringArr.push('            <div class="col-xs-1">');
            htmlStringArr.push(data[i].soundmark[j][1]);
            htmlStringArr.push('            </div>');
        }

        htmlStringArr.push('        </div>');
        htmlStringArr.push('        <div class="row word-soundmark">');
        htmlStringArr.push('            <div class="col-xs-5">');
        htmlStringArr.push(data[i].star);
        htmlStringArr.push('            </div>');
        htmlStringArr.push('            <div class="col-xs-7">');
        htmlStringArr.push(data[i].note);
        htmlStringArr.push('            </div>');
        htmlStringArr.push('        </div>');
        htmlStringArr.push('        <div class="row word-paraphrase">');
        for (var j = 0; j < data[i].paraphrase.length; j++) {
            htmlStringArr.push('            <div class="col-xs-12">');
            htmlStringArr.push(data[i].paraphrase[j]);
            htmlStringArr.push('            </div>');
        }

        if (data[i].variant) {
            htmlStringArr.push('        </div>');
            htmlStringArr.push('        <div class="row">');
            htmlStringArr.push('            <div class="col-xs-12">');
            htmlStringArr.push('变形');
            htmlStringArr.push('            </div>');
            for (var key in data[i].variant) {
                htmlStringArr.push('            <div class="col-xs-3 word-variant-header">');
                htmlStringArr.push(key + ': ');
                htmlStringArr.push('            </div>');
                htmlStringArr.push('            <div class="col-xs-9 word-variant-content">');
                htmlStringArr.push(data[i].variant[key]);
                htmlStringArr.push('            </div>');
            }
        }

        htmlStringArr.push('        </div>');
        htmlStringArr.push('    </div>');
        htmlStringArr.push('</div>');
    }

    htmlStringArr.push('</div>');
    container.append($(htmlStringArr.join('')));

    var items = $('.word-list-item');
    var maxHeight = 0;
    items.each(function (index, element) {
        maxHeight = Math.max(maxHeight, $(element).height());
    });

    items.each(function (index, element) {
        $(element).height(maxHeight);
    });
};