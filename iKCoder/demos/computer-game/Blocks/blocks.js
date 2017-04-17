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
        COMPUTER_BLOCK_COMPONENT_SELECTION = 'computer-selection-block';


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
    }

    Blockly.Blocks[COMPUTER_BLOCK_COMPONENT_SELECTION] = {
        init: function() {
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');

            this.appendDummyInput().appendField("Please choose component");
            this.appendDummyInput().appendField(new Blockly.FieldDropdown(constructComputerCompDropDown()), COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_FROM);
            this.appendDummyInput().appendField("to");
            this.appendDummyInput().appendField(new Blockly.FieldDropdown(constructComputerCompDropDown()), COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_TO);
        }
    };

    Blockly.JavaScript[COMPUTER_BLOCK_COMPONENT_SELECTION] = function(block) {
        var from = block.getFieldValue(COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_FROM);
        var to = block.getFieldValue(COMPUTER_FIELD_COMPONENT_SELECTION_DROPDOWN_TO);

        return "ComputerScene.connect({}, {});\n".format(from, to);
    };
})();
