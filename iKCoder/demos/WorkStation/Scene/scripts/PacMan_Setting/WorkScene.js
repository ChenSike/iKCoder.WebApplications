﻿'use strict';

var WorkScene = {};

WorkScene.workspace = null;

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
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

WorkScene.importPrettify = function () {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../../styles/prettify.css');
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.setAttribute('src', '../../javascripts/common/prettify.js');
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
    var container = document.getElementById('content_area');
    var onresize = function (e) {
        var bBox = WorkScene.getBBox_(container);
        var el = document.getElementById('content_blocks');
        el.style.top = bBox.y + 'px';
        el.style.left = bBox.x + 'px';
        el.style.height = bBox.height + 'px';
        el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
        el.style.width = bBox.width + 'px';
        el.style.width = (2 * bBox.width - el.offsetWidth-1) + 'px';
    };

    window.addEventListener('resize', onresize, false);
    //var blocksXMLDoc = Blockly.Xml.textToDom(XMLToString(LoadXMLFile("xml/blocks.xml")));
    var tempXMLStr = '<xml id="toolbox" style="display: none">' +
        '   <block type="pacman_map_wall_detail"></block>' +
        '   <block type="pacman_map_goods_detail"></block>' +
        '   <block type="pacman_npc_detail"></block>' +
        '   <block type="pacman_coord_number"></block>' +
        '   <block type="pacman_coord_random"></block>' +
        '</xml>';
    var blocksXMLDoc = Blockly.Xml.textToDom(tempXMLStr);

    WorkScene.workspace = Blockly.inject('content_blocks',
        {
            scrollbars: true,
            collapse: false,
            media: '../../media/',
            rtl: false,
            toolbox: blocksXMLDoc,
            //grid: {
            //    spacing: 25,
            //    length: 3,
            //    colour: '#ccc',
            //    snap: false
            //},
            customCfg: {
                background_path: {
                    spacing: 10,
                    color: '#666666',
                    path: {
                        color: '#757575',
                        path: 'M 5,0 L 10,5 5,10 0,5 5,0'
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
    var defaultXml =
      '<xml>' +
      '  <block type="pacman_map_wall" deletable="false" x="50" y="30"></block>' +
      '  <block type="pacman_map_goods" deletable="false" x="50" y="60"></block>' +
      '  <block type="pacman_npc" deletable="false" x="50" y="90"></block>' +
      '  <block type="pacman_player" deletable="false" x="50" y="120">' +
      '    <field name="pacman_player_color">#ffff33</field>' +
      '    <value name="pacman_player_x">' +
      '        <block type="pacman_coord_number">' +
      '            <field name="NUM">12</field>' +
      '        </block>' +
      '   </value>' +
      '    <value name="pacman_player_y">' +
      '        <block type="pacman_coord_number">' +
      '            <field name="NUM">23</field>' +
      '        </block>' +
      '   </value>' +
      '</block>' +
      '</xml>';
    WorkScene.loadBlocks(defaultXml);
    WorkScene.workspace.addChangeListener(WorkScene.outputCode);

    if ('BlocklyStorage' in window) {
        BlocklyStorage.backupOnUnload(WorkScene.workspace);
    }

    WorkScene.renderContent();
    WorkScene.workspace.setVisible(true);
    Blockly.svgResize(WorkScene.workspace);

    //WorkScene.bindClick('trashButton',
    //    function () {
    //        WorkScene.discard();
    //        WorkScene.renderContent();
    //    }
    //);

    WorkScene.bindClick('startRunBtn', WorkScene.runJS);
    //WorkScene.bindClick('resetButton', WorkScene.resetScene);
    onresize();
    Blockly.svgResize(WorkScene.workspace);
    window.setTimeout(WorkScene.importPrettify, 1);

    var configs = {};
    configs.lifeCount = 4;
    configs.playerSpeed = 1;
    configs.NPCSpeed = 1;
    Scene.Init('game_container', configs);
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
        Scene.restart();
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
    var content = document.getElementById('codeContentTxt');
    var code = Blockly.JavaScript.workspaceToCode(WorkScene.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
        code = content.innerHTML;
        code = prettyPrintOne(code, 'js');
        content.innerHTML = code;
    }
};

WorkScene.outputCode = function () {
    Scene.pause();
    var content = document.getElementById('codeContentTxt');
    var code = Blockly.JavaScript.workspaceToCode(WorkScene.workspace);
    content.value = code;
}

WorkScene.pauseScene = function () {
    Scene.pause();
}

WorkScene.resetScene = function () {
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

