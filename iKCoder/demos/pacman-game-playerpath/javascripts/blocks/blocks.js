'use strict';

Blockly.Blocks['pacman_turnto'] = {
    init: function () {
        //0: right; 1: down; 2: left; 3: up
        this.appendDummyInput("orientation").
            appendField("Turn To : ").
            appendField(new Blockly.FieldDropdown([["Up", "3"], ["Down", "1"], ["Left", "2"], ["Right", "0"]]), "pacman_move_orientation");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/')
    }
};

Blockly.JavaScript['pacman_turnto'] = function (block) {
    var orientation = block.getFieldValue('pacman_move_orientation');
    return 'Scene.PacMan.turnTo("P", ' + orientation + ');\n';
};

Blockly.Blocks['pacman_movestep'] = {
    init: function () {
        this.appendDummyInput("steps").
            appendField("Steps : ").
            appendField(new Blockly.FieldNumber(1, 1, 26, 1), "pacman_move_steps");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/')
    }
};

Blockly.JavaScript['pacman_movestep'] = function (block) {
    var steps = block.getFieldValue('pacman_move_steps');
    return 'Scene.PacMan.move("P", ' + steps + ');\n'
};


Blockly.Blocks['pacman_man'] = {
    init: function () {
        this.appendDummyInput("pacman-man").appendField("Pac-Man Start Moving");
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/')
    }
};

Blockly.JavaScript['pacman_man'] = function (block) {
    return 'Scene.PacMan.start();\n';
}

Blockly.Blocks['pacman_stop'] = {
    init: function () {
        this.appendDummyInput().appendField("Pac-Man Stop Moving");
        this.setPreviousStatement(true, null);
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_stop'] = function (block) {
    return 'Scene.PacMan.stop();\n';
};