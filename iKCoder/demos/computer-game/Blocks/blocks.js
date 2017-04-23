(function() {
    'use strict';

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
            var levelSelection = new Blockly.FieldDropdown(
                ["第二关", '2'],
                ["第三关", '3']
            );

            this.setPreviousStatement(false);
            this.setNextStatement(true);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');

            this.appendDummyInput().appendField("请选择连接模块");
        }
    };

    Blockly.JavaScript[COMPUTER_BLOCK_COMPONENT_CONFIGURATION] = function(block) {
        var commands = [];
        commands.push('Scene.clear();');
        var child = block.getChildren()[0];
        if (child) {
            var codes = Blockly.JavaScript.blockToCode(child);
            commands.push(codes);
        }

        return commands.join('\n');
    };

    function constructComputerCompDropDown(selected, opt_en_flag) {
        var name2id = new Map();
        ComputerScene.layer.children.filter(function(child) {
                return child.className === Konva.Ccomponent.className;
            })
            .forEach(function(component) {
                name2id.set(opt_en_flag ? component.en : component.cn, component.id);
            });

        if (Map.prototype.has(name2id, selected)) name2id.remove(selected);

        return name2id;
    };

    Blockly.Blocks[COMPUTER_BLOCK_COMPONENT_SELECTION] = {
        init: function() {
            var fromDropDown = new Blockly.FieldDropdown(constructComputerCompDropDown());
            var toDropDown = new Blockly.FieldDropdown(constructComputerCompDropDown());

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');

            this.appendDummyInput().appendField("选择连线");
            this.appendDummyInput().appendField("开始于");
            this.appendDummyInput()
                .appendField(fromDropDown, COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_FROM)
                .appendField("至")
                .appendField(toDropDown, COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_TO);
        }
    };

    Blockly.JavaScript[COMPUTER_BLOCK_COMPONENT_SELECTION] = function(block) {
        var from = block.getFieldValue(COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_FROM);
        var to = block.getFieldValue(COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_TO);

        return "ComputerScene.buildConnect({}, {});\n".format(from, to);
    };
})();
