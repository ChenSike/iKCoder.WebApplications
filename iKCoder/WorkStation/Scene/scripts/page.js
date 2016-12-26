var currSceneSymbol = 'pacman';

function onLoad() {
    var scenes = {
        'pacman': 'PacMan_Setting',
        'race': 'Race_Setting'
    };

    var params = window.location.search.replace("?", "").split("&");
    for (var i = 0; i < params.length; i++) {
        var tmpParaArr = params[i].split("=");
        if (tmpParaArr.length == 2) {
            if (tmpParaArr[0] == "scene") {
                currSceneSymbol = tmpParaArr[1];
                break;
            }
        }
    }

    if (scenes[currSceneSymbol]) {
        $.getScript("scripts/" + scenes[currSceneSymbol] + "/Blocks/blocks.js", function () {
            $.getScript("scripts/" + scenes[currSceneSymbol] + "/Engine/game_engine.js", function () {
                $.getScript("scripts/" + scenes[currSceneSymbol] + "/Scene/scene.js", function () {
                    $.getScript("scripts/" + scenes[currSceneSymbol] + "/WorkScene.js", function () {
                        WorkScene.init();
                    });
                });
            });
        });
    } else {
        $.getScript("scripts/" + scenes['pacman'] + "/Blocks/blocks.js", function () {
            $.getScript("scripts/" + scenes['pacman'] + "/Engine/game_engine.js", function () {
                $.getScript("scripts/" + scenes['pacman'] + "/Scene/scene.js", function () {
                    $.getScript("scripts/" + scenes['pacman'] + "/WorkScene.js", function () {
                        WorkScene.init();
                    });
                });
            });
        });
    }

    bindEvents();
}

function bindEvents() {
    $("#shareBtn").click(shareScene);
    $("#homeBtn").click(goHomePage)
    $("#sceneNewBtn").click(createNew);
    //$("#sceneSaveBtn").click(saveCurrent);
    //$("#sceneLoadBtn").click(loadSaved);
    $("#loginBtn").click(login);
    $("#fullScreenBtn").click(fullScreen);
    $("#pauseBtn").click(pauseGame);
    $("#startRunBtn").click(startGame);
    $("#tutorialUpBtn").click(tutorialPrevRow);
    $("#tutorialDownBtn").click(tutorialNextRow);
    $("#editCodeBtn").click(editCode);
    $("#restoreCodeBtn").click(restoreCode);
}

function shareScene() {
    alert("'Share' will coming soon!");
};

function goHomePage() {
    alert("'Home' will coming soon!");
};

function login() {
    alert("'Login' will coming soon!");
};

function tutorialPrevRow() {
    var textEl = $('#tutorial_content_detail')[0];
    var height = textEl.offsetHeight;
    var rows = Math.ceil(height / 20);
    if (rows > 2) {
        var currentTop = textEl.offsetTop;
        var hiddenRows = Math.abs(Math.round(currentTop / 20));
        if (currentTop < 0 && hiddenRows <= rows - 2) {
            textEl.style.top = (currentTop + 20) + 'px';
        }
    }
};

function tutorialNextRow() {
    var textEl = $('#tutorial_content_detail')[0];
    var height = textEl.offsetHeight;
    var rows = Math.ceil(height / 20);
    if (rows > 2) {
        var currentTop = textEl.offsetTop;
        var hiddenRows = Math.abs(Math.round(currentTop / 20));
        if (hiddenRows < rows - 2) {
            textEl.style.top = (currentTop - 20) + 'px';
        }
    }
};

function createNew() {
    alert("'Create New' will coming soon!");
};

function saveCurrent() {
    alert("'Save' will coming soon!");
};

function loadSaved() {
    var container = $('#sceneLoadBtn')[0];
    var recordsDiv = $('#savedRecords')[0];
    if (!recordsDiv) {
        recordsDiv = document.createElement('div');
        recordsDiv.id = "savedRecords";
        recordsDiv.className = "saved-records";
        recordsDiv.style.display = "none";
        recordsUl = document.createElement('ul');
        recordsUl.id = "savedRecordsList";
        recordsUl.className = "records-list";
        recordsDiv.appendChild(recordsUl);
        container.appendChild(recordsDiv);
        var listItems = [
           (new Date()).toLocaleString(),
           (new Date()).toLocaleString(),
           (new Date()).toLocaleString(),
           (new Date()).toLocaleString(),
           (new Date()).toLocaleString(),
           (new Date()).toLocaleString()
        ];
        for (var i = 0; i < listItems.length; i++) {
            var index = i + 1;
            if (index < 10) {
                index = '0' + index;
            }
            var newItem = $('<li class="text records-list-item" data="' + i + '">' + index + ". " + listItems[i] + '</li>');
            newItem.click(loadSavedItem);
            $('#savedRecordsList').append(newItem);
        }
    }

    if (recordsDiv.style.display.toUpperCase() == "NONE") {
        //$('#savedRecords').fadeIn(2000);
        $('#savedRecords').slideDown(500);
    } else {
        //$('#savedRecords').fadeOut(2000);
        $('#savedRecords').slideUp(500);
    }

};

function loadSavedItem() {
    var index = this.attributes.getNamedItem('data').value;
    alert('Load Saved Item: ' + index + ' will coming soon!');
}

function fullScreen() {
    alert("'Full Screen' will coming soon!");
};

function pauseGame() {
    WorkScene.pauseScene();
};

function startGame() {
    WorkScene.runJS();
};

function editCode() {
    var text = this.innerText;
    if (text == "编辑") {
        this.innerText = "锁定";
        $('#codeContentTxt')[0].readOnly = false;
    } else {
        this.innerText = "编辑";
        $('#codeContentTxt')[0].readOnly = true;
    }
};

function restoreCode() {
    WorkScene.outputCode();
};

window.addEventListener('load', onLoad);