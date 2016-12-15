function onLoad() {
    PacMan.init();
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
    PacMan.pauseScene();
};

function startGame() {
    PacMan.runJS();
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
    PacMan.outputCode();
};

window.addEventListener('load', onLoad);