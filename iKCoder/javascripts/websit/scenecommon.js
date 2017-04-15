'use strict';

var currSceneSymbol = '';

function LaodSceneLib(data) {
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

var _blockExample = null;
var _highlightCount = 0;
function selectExampleBlock() {
    var blocks = WorkScene.workspace.topBlocks_;
    var targetBtn = $(arguments[0].target);
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].id == targetBtn.attr("data-target")) {
            _blockExample = blocks[i];
            _highlightCount = 0;
            selectBlockExample();
            break;
        }
    }
}

function selectBlockExample() {
    if (_highlightCount < 4) {
        _blockExample.addSelect();
        setTimeout('unselectBlockExample();', 500);
    }
}

function unselectBlockExample() {
    _highlightCount++;
    _blockExample.removeSelect();
    setTimeout('selectBlockExample();', 500);
}
//after running all blockly steps, check the player at end point(eat goods) or not
function CheckStageCompleted (){
    if (targetPos.x == Scene._Player.coord.x && targetPos.y == Scene._Player.coord.y) {
        alert("Congratulations, you are eat the goods successful!");

    } else {
        alert("Sorry, you may miss some stpes or goto wrong direction!");
    }
}