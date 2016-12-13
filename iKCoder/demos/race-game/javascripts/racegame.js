'use strict';

var RaceGame = {};
RaceGame.workspace = null;
RaceGame.SCORE = 0;

RaceGame.loadBlocks = function (defaultXml) {
    try {
        var loadOnce = window.sessionStorage.loadOnceBlocks;
    } catch (e) {
        var loadOnce = null;
    }
    if ('BlocklyStorage' in window && window.location.hash.length > 1) {
        BlocklyStorage.retrieveXml(window.location.hash.substring(1));
    } else if (loadOnce) {
        delete window.sessionStorage.loadOnceBlocks;
        var xml = Blockly.Xml.textToDom(loadOnce);
        Blockly.Xml.domToWorkspace(xml, RaceGame.workspace);
    } else if (defaultXml) {
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, RaceGame.workspace);
    } else if ('BlocklyStorage' in window) {
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

RaceGame.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

RaceGame.importPrettify = function () {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../../styles/prettify.css');
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.setAttribute('src', '../../javascripts/common/prettify.js');
    document.head.appendChild(script);
};

RaceGame.getBBox_ = function (element) {
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
};

RaceGame.init = function () {
    var container = document.getElementById('content_area');
    var onresize = function (e) {
        var bBox = RaceGame.getBBox_(container);
        var el = document.getElementById('content_blocks');
        el.style.top = bBox.y + 'px';
        el.style.left = bBox.x + 'px';
        el.style.height = bBox.height + 'px';
        el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
        el.style.width = bBox.width + 'px';
        el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    };

    window.addEventListener('resize', onresize, false);
    var blocksXMLDoc = Blockly.Xml.textToDom(XMLToString(LoadXMLFile("xml/blocks.xml")));
    RaceGame.workspace = Blockly.inject('content_blocks',
        {
            collapse: true,
            media: '../../media/',
            rtl: false,
            toolbox: blocksXMLDoc,
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            zoom: {
                controls: true,
                wheel: true
            }
        }
    );

    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
    var defaultXml = XMLToString(LoadXMLFile("xml/default.xml"));
    RaceGame.loadBlocks(defaultXml);
    RaceGame.workspace.addChangeListener(RaceGame.outputCode);

    if ('BlocklyStorage' in window) {
        BlocklyStorage.backupOnUnload(RaceGame.workspace);
    }

    RaceGame.renderContent();
    RaceGame.workspace.setVisible(true);
    Blockly.svgResize(RaceGame.workspace);

    RaceGame.bindClick('trashButton',
        function () {
            RaceGame.discard();
            RaceGame.renderContent();
        }
    );

    RaceGame.bindClick('runButton', RaceGame.runJS);
    RaceGame.bindClick('resetButton', RaceGame.resetScene);
    onresize();
    Blockly.svgResize(RaceGame.workspace);
    window.setTimeout(RaceGame.importPrettify, 1);

    Scene.init();
    Scene.startRun();
    Scene.initLane();
    Scene.initPlayer();
    Scene.loadResource();    
};

RaceGame.startGame = function () {
    Scene.startGame();
};

RaceGame.endGame = function () {
    Scene.endGame();
};

RaceGame.runJS = function () {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function () {
        if (timeouts++ > 1000000) {
            throw 'timeout';
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(RaceGame.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
        Scene.loadCustomeCfg();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }
};

RaceGame.discard = function () {
    var count = RaceGame.workspace.getAllBlocks().length;
    if (count < 2 ||
        window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
        RaceGame.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

RaceGame.renderContent = function () {
    var content = document.getElementById('content_javascript');
    var code = Blockly.JavaScript.workspaceToCode(RaceGame.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
        code = content.innerHTML;
        code = prettyPrintOne(code, 'js');
        content.innerHTML = code;
    }
};

RaceGame.outputCode = function () {    
    var content = document.getElementById('content_javascript');
    var code = Blockly.JavaScript.workspaceToCode(RaceGame.workspace);
    content.textContent = code;
}

RaceGame.resetScene = function () {
    window.location.reload();
    //if(Scene.canvas){
    //    var sceneContainer = document.getElementById('canvas_content');
    //    sceneContainer.removeChild(sceneContainer.childNodes[0]);
    //}

    //var configs = {};
    //configs.lifeCount = 3;
    //configs.pacSpeed = 1;
    //configs.enemySpeed = 0;
    //configs.activeEnemyCount = 2;
    //Scene.Init('canvas_content', configs);
}

window.onload = function () {
    RaceGame.init();
}