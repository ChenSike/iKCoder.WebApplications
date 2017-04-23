(function() {
    'use strict';

    var configuration = {
        "Input Device": [{
                cn: "鼠标",
                en: "Mouse",
                path: "svg/mouse.svg"
            },
            {
                cn: "键盘",
                en: "Keyboard",
                path: "svg/keyboard.svg"
            }
        ],
        "Output Device": [{
                cn: "显示器",
                en: "Monitor",
                path: "svg/monitor.svg"
            },
            {
                cn: "打印机",
                en: "Printer",
                path: "svg/printer.svg"
            },
            {
                cn: "耳机",
                en: "Earphones",
                path: "svg/earphones.svg"
            }
        ],
        "Storage": [{
                cn: "硬盘",
                en: "Harddrive",
                path: "svg/hard-drive.svg"
            },
            {
                cn: "CD",
                en: "CD",
                path: "svg/cd.svg"
            },
            {
                cn: "U盘",
                en: "Pendrive",
                path: "svg/pendrive.svg"
            },
            {
                cn: "RAM",
                en: "RAM",
                path: "svg/ram-memory.svg"
            }
        ],
        "Computing": [{
                cn: "CPU",
                en: "CPU",
                path: "svg/cpu.svg"
            },
            {
                cn: "显卡",
                en: "Graphics Card",
                path: "svg/graphics-card.svg"
            },
            {
                cn: "主机",
                en: "Computer Tower",
                path: "svg/computer.svg"
            }

        ]
    };

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ?
                    args[number] :
                    match;
            });
        };
    };

    var COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_FROM = 'computer-game-component-dropdown-from',
        COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_TO = 'computer-game-component-dropdown-to',
        COMPUTER_BLOCK_COMPONENT_SELECTION = 'computer-selection-block',
        COMPUTER_BLOCK_COMPONENT_CONFIGURATION = 'computer-configuration-block',
        COMPUTER_FIELD_COMPONENT_SELECT_LEVEL = 'computer-game-select-level';


    Blockly.Blocks[COMPUTER_BLOCK_COMPONENT_CONFIGURATION] = {
        init: function() {
            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');

            this.appendDummyInput().appendField("请选择连接模块");
        }
    };

    Blockly.JavaScript[COMPUTER_BLOCK_COMPONENT_CONFIGURATION] = function(block) {
        return 'Scene.clear();\n';
    };

    Blockly.Blocks['computer_block_connection'] = {
        init: function() {
            this.appendValueInput("from_computer_component")
                .setCheck("")
                .appendField("从");
            this.appendValueInput("to_computer_component")
                .setCheck(null)
                .appendField("至");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blockly.JavaScript['computer_block_connection'] = function(block) {
        var value_from_computer_component = Blockly.JavaScript.valueToCode(block, 'from_computer_component');
        var value_to_computer_component = Blockly.JavaScript.valueToCode(block, 'to_computer_component');
        var code = "Scene.buildConnect(\"{0}\", \"{1}\");\n".format(
            value_from_computer_component, value_to_computer_component);
        return code;
    };

    var generateComponentBlocks = function(config) {
        var generateTmpl = function(identifier, path, code, alt){
            var tmplArr = [];
            tmplArr.push('Blockly.Blocks["computer_component_block_' + identifier + '"] = {');
            tmplArr.push('init: function() {');
            tmplArr.push('this.appendDummyInput()');
            tmplArr.push('.appendField(new Blockly.FieldImage("images/Scene/intrcourse/' + path + '", 30, 30, "' + alt + '"));');
            tmplArr.push('this.setInputsInline(true);');
            tmplArr.push('this.setOutput(true, null);');
            tmplArr.push('this.setColour(230);');
            tmplArr.push('this.setTooltip("");');
            tmplArr.push('this.setHelpUrl("");');
            tmplArr.push('}');
            tmplArr.push('};');
            tmplArr.push('');
            tmplArr.push('Blockly.JavaScript["computer_component_block_' + identifier + '"]  = function(block) {');
            tmplArr.push('var code = "'+ code +'";');
            tmplArr.push('return [code, Blockly.JavaScript.ORDER_NONE];};');

            return tmplArr.join('\n');
        };

        var ccomponents = [];
        for (var group in config) {
            ccomponents = Array.prototype.concat.apply(ccomponents, config[group]);
        }

        ccomponents.forEach(function(comp){
            var identifier = comp.en.toLowerCase(),
                path = comp.path,
                code = comp.en,
                alt = comp.cn,
                tmpl = generateTmpl(identifier, path, code, alt);

            console.log(tmpl);
            eval(tmpl);
        });
    };

    generateComponentBlocks(configuration);
})();
