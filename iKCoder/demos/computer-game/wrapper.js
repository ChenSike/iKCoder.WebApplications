'use strict';

var Wrapper = {};
Wrapper.workspace = null;
Wrapper.SCORE = 0;

Wrapper.loadBlocks = function(defaultXml) {
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
        Blockly.Xml.domToWorkspace(xml, Wrapper.workspace);
    } else if (defaultXml) {
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Wrapper.workspace);
    } else if ('BlocklyStorage' in window) {
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

Wrapper.bindClick = function(el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

Wrapper.importPrettify = function() {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../../styles/prettify.css');
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.setAttribute('src', '../../javascripts/common/prettify.js');
    document.head.appendChild(script);
};

Wrapper.getBBox_ = function(element) {
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

Wrapper.init = function() {
    var container = document.getElementById('content_area');
    var onresize = function(e) {
        var bBox = Wrapper.getBBox_(container);
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
    Wrapper.workspace = Blockly.inject('content_blocks', {
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
    });

    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
    var defaultXml = XMLToString(LoadXMLFile("xml/default.xml"));
    Wrapper.loadBlocks(defaultXml);
    Wrapper.workspace.addChangeListener(Wrapper.outputCode);

    if ('BlocklyStorage' in window) {
        BlocklyStorage.backupOnUnload(Wrapper.workspace);
    }

    Wrapper.renderContent();
    Wrapper.workspace.setVisible(true);
    Blockly.svgResize(Wrapper.workspace);

    Wrapper.bindClick('trashButton',
        function() {
            Wrapper.discard();
            Wrapper.renderContent();
        }
    );

    Wrapper.bindClick('runButton', Wrapper.runJS);
    Wrapper.bindClick('resetButton', Wrapper.resetScene);
    onresize();
    Blockly.svgResize(Wrapper.workspace);
    window.setTimeout(Wrapper.importPrettify, 1);

    Scene.init();
};

Wrapper.startGame = function() {
    Scene.startGame();
};

Wrapper.endGame = function() {
    Scene.endGame();
};

Wrapper.runJS = function() {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function() {
        if (timeouts++ > 1000000) {
            throw 'timeout';
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(Wrapper.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
        Scene.startGame();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }
};

Wrapper.discard = function() {
    var count = Wrapper.workspace.getAllBlocks().length;
    if (count < 2 ||
        window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
        Wrapper.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

Wrapper.renderContent = function() {
    var content = document.getElementById('content_javascript');
    var code = Blockly.JavaScript.workspaceToCode(Wrapper.workspace);
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
        code = content.innerHTML;
        code = prettyPrintOne(code, 'js');
        content.innerHTML = code;
    }
};

Wrapper.outputCode = function() {
    var content = document.getElementById('content_javascript');
    var code = Blockly.JavaScript.workspaceToCode(Wrapper.workspace);
    content.textContent = code;
};

Wrapper.resetScene = function() {
    window.location.reload();
};

window.onload = function() {
    Wrapper.init();
};
