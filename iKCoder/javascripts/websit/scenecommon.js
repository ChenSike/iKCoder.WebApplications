'use strict';

var currSceneSymbol = '';

function LoadSceneLib(data) {
    if (data.lib.length == 1) {
        $.getScript(data.lib[0], function () {
            WorkScene.init();
        });
    } else if (data.lib.length == 3) {
        $.getScript(data.lib[0], function () {
            $.getScript(data.lib[1], function () {
                $.getScript(data.lib[2], function () {
                    WorkScene.init();
                });
            });
        });
    } else {
        WorkScene.init();
        return;
    }
}

function bindEventsToScene(playBtn, shareBtn, fullScreenBtn, refereshBtn) {
    playBtn.click(_playScene);
    shareBtn.click(_shareScene);
    fullScreenBtn.click(_fullScreen);
    refereshBtn.click(_refereshScene);
}

function _shareScene() {
    alert("'Share' will coming soon!");
};

function _fullScreen() {
    $('.run-scene-fullscreen').append($('#game_container'));
    $('.run-scene-fullscreen').show("slow");
};

function _playScene() {
    //alert("'Play' will coming soon!");
    WorkScene.startGame();
};

function _refereshScene() {
    WorkScene.workspace.clear();
};

var _blockExample = [];
var _highlightCount = 0;
function hightlightExampleBlock() {
    var blocks = WorkScene.workspace.topBlocks_;
    var targetBtn = $(arguments[0].target);
    _highlightCount = 0;
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].type == targetBtn.attr("data-target")) {
            _blockExample.push(blocks[i]);
            blocks[i].removeSelect();
        }
    }

    selectBlockExample();
};


function selectBlockExample() {
    if (_highlightCount < 3) {
        for (var i = 0; i < _blockExample.length; i++) {
            _blockExample[i].addSelect();
        }

        setTimeout('unselectBlockExample();', 500);
    }
};

function unselectBlockExample() {
    _highlightCount++;
    for (var i = 0; i < _blockExample.length; i++) {
        _blockExample[i].removeSelect();
    }


    setTimeout('selectBlockExample();', 500);
};