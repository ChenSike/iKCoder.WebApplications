'use strict';

var WorkScene = {};
WorkScene.workspace = null;
WorkScene.SCORE = 0;

WorkScene.loadBlocks = function (defaultXml) {
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
        Blockly.Xml.domToWorkspace(xml, WorkScene.workspace);
    } else if (defaultXml) {
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, WorkScene.workspace);
    } else if ('BlocklyStorage' in window) {
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

WorkScene.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    //el.addEventListener('click', func, true);
    //el.addEventListener('touchend', func, true);
};

WorkScene.importPrettify = function () {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'styles/prettify.css');
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.setAttribute('src', 'javascripts/common/prettify.js');
    document.head.appendChild(script);
};

WorkScene.getBBox_ = function (element) {
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

WorkScene.init = function () {
    var container = document.getElementById('wrap_WorkSpace');
    var onresize = function (e) {
        var bBox = WorkScene.getBBox_(container);
        var el = document.getElementById('content_WorkSpace');
        el.style.top = bBox.y + 'px';
        el.style.left = bBox.x + 'px';
        el.style.height = bBox.height + 'px';
        el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
        el.style.width = bBox.width + 'px';
        el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    };

    window.addEventListener('resize', onresize, false);
    //var blocksXMLDoc = Blockly.Xml.textToDom(XMLToString(LoadXMLFile("xml/blocks.xml")));
    var blocksXMLDoc = Blockly.Xml.textToDom('<xml id="toolbox" style="display: none"></xml>');
    WorkScene.workspace = Blockly.inject('content_WorkSpace',
        {
            scrollbars: true,
            collapse: false,
            media: 'media/',
            rtl: false,
            toolbox: blocksXMLDoc,
            customCfg: {
                background_path: {
                    spacing: 10,
                    color: '#666666',
                    path: {
                        color: 'rgb(245,245,245)',
                        path: ''
                    }
                },
                toolbox_collapse: {
                    border: {
                        stroke: 'rgb(0,163,217)',
                        width: 1
                    },
                    fill: 'rgb(221, 221, 221)',
                    opacity: 1,
                    radius: 0
                }
            },
            zoom: {
                controls: true,
                wheel: false
            }
        }
    );

    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
    // var defaultXml = XMLToString(LoadXMLFile("xml/default.xml"));
    var defaultXml = '<xml>' +
                            '   <block type="race_roads" id="race_roads_block_example" deletable="false" x="20" y="20"/>' +
                            '   <block type="race_cars" id="race_cars_block_example" deletable="false" x="20" y="60"/>' +
                            '</xml>';

    WorkScene.loadBlocks(defaultXml);
    WorkScene.workspace.addChangeListener(WorkScene.outputCode);

    if ('BlocklyStorage' in window) {
        BlocklyStorage.backupOnUnload(WorkScene.workspace);
    }

    WorkScene.renderContent();
    WorkScene.workspace.setVisible(true);
    Blockly.svgResize(WorkScene.workspace);
    //WorkScene.bindClick('startRunBtn', WorkScene.runJS);
    //WorkScene.bindClick('resetButton', WorkScene.resetScene);
    onresize();
    Blockly.svgResize(WorkScene.workspace);
    window.setTimeout(WorkScene.importPrettify, 1);
    CheckSceneObject();
    Scene.init('game_container', 0);
};

WorkScene.runJS = function () {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function () {
        if (timeouts++ > 1000000) {
            throw 'timeout';
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(WorkScene.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
        Scene.UpdateConfig();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }
};

WorkScene.discard = function () {
    var count = WorkScene.workspace.getAllBlocks().length;
    if (count < 2 ||
        window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
        WorkScene.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

WorkScene.renderContent = function () {
    var content = document.getElementById('txt_Code_Content');
    var code = Blockly.JavaScript.workspaceToCode(WorkScene.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
        code = content.innerHTML;
        code = prettyPrintOne(code, 'js');
        content.innerHTML = code;
    }
};

WorkScene.changeSceneCfg = function (cfgObj) {
    Scene.changeConfig(cfgObj);
}

WorkScene.outputCode = function () {
    try{
        var content = $('#txt_Code_Content');
        var code = Blockly.JavaScript.workspaceToCode(WorkScene.workspace);
        content.text(code);
        content.data("autoRowsNumbers").updateLine(code.match(/\n/g).length + 1);
        eval(code);
        Scene.UpdateConfig();
    }
    catch (ex) {

    }
};

WorkScene.resetScene = function () {
    Scene.reset();
};

WorkScene.pauseScene = function () {
    Scene.pause();
};

WorkScene.startGame = function () {
    Scene.startGame();
};

WorkScene.endGame = function () {
    Scene.endGame();
};

function CheckSceneObject() {
    if (!Scene) {
        Scene = {};
    }

    if (!Scene.init) {
        Scene.init = function () { };
    }

    if (!Scene.changeConfig) {
        Scene.changeConfig = function () { };
    }

    if (!Scene.UpdateConfig) {
        Scene.UpdateConfig = function () { };
    }

    if (!Scene.reset) {
        Scene.reset = function () { };
    }

    if (!Scene.pause) {
        Scene.pause = function () { };
    }

    if (!Scene.startGame) {
        Scene.startGame = function () { };
    }

    if (!Scene.endGame) {
        Scene.endGame = function () { };
    }
}
