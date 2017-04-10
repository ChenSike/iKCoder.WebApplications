'use strict';

var TankGame = {};
TankGame.workspace = null;
TankGame.SCORE = 0;

TankGame.loadBlocks = function (defaultXml) {
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
        Blockly.Xml.domToWorkspace(xml, TankGame.workspace);
    } else if (defaultXml) {
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, TankGame.workspace);
    } else if ('BlocklyStorage' in window) {
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

TankGame.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

TankGame.importPrettify = function () {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../../styles/prettify.css');
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.setAttribute('src', '../../javascripts/common/prettify.js');
    document.head.appendChild(script);
};

TankGame.getBBox_ = function (element) {
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

TankGame.init = function () {
    var container = document.getElementById('content_area');
    var onresize = function (e) {
        var bBox = TankGame.getBBox_(container);
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
    TankGame.workspace = Blockly.inject('content_blocks',
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
    TankGame.loadBlocks(defaultXml);
    TankGame.workspace.addChangeListener(TankGame.outputCode);

    if ('BlocklyStorage' in window) {
        BlocklyStorage.backupOnUnload(TankGame.workspace);
    }

    TankGame.renderContent();
    TankGame.workspace.setVisible(true);
    Blockly.svgResize(TankGame.workspace);

    TankGame.bindClick('trashButton',
        function () {
            TankGame.discard();
            TankGame.renderContent();
        }
    );

    TankGame.bindClick('runButton', TankGame.runJS);
    TankGame.bindClick('resetButton', TankGame.resetScene);
    onresize();
    Blockly.svgResize(TankGame.workspace);
    window.setTimeout(TankGame.importPrettify, 1);

    Scene.init();
};

TankGame.startGame = function () {
    Scene.startGame();
};

TankGame.endGame = function () {
    Scene.endGame();
};

TankGame.runJS = function () {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function () {
        if (timeouts++ > 1000000) {
            throw 'timeout';
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(TankGame.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
	    Scene.startGame();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }
};

TankGame.discard = function () {
    var count = TankGame.workspace.getAllBlocks().length;
    if (count < 2 ||
        window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
        TankGame.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

TankGame.renderContent = function () {
    var content = document.getElementById('content_javascript');
    var code = Blockly.JavaScript.workspaceToCode(TankGame.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
        code = content.innerHTML;
        code = prettyPrintOne(code, 'js');
        content.innerHTML = code;
    }
};

TankGame.outputCode = function () {    
    var content = document.getElementById('content_javascript');
    var code = Blockly.JavaScript.workspaceToCode(TankGame.workspace);
    content.textContent = code;
}

TankGame.resetScene = function () {
    window.location.reload();
}

window.onload = function () {
    TankGame.init();
}
