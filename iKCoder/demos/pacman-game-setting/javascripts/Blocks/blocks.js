﻿'use strict';

Blockly.Blocks['pacman_map_wall'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Wall");
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_map_wall'] = function (block) {
    return 'Scene.initWall();\n';
};

Blockly.Blocks['pacman_map_wall_detail'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Add Wall");
        this.appendDummyInput()
            .appendField("X:")
            .appendField(new Blockly.FieldNumber(1, 1, 25, 1), "pacman_map_wall_detail_x_s")
            .appendField(" to ")
            .appendField(new Blockly.FieldNumber(1, 2, 26, 1), "pacman_map_wall_detail_x_e");
        this.appendDummyInput()
            .appendField("Y:")
            .appendField(new Blockly.FieldNumber(1, 1, 27, 1), "pacman_map_wall_detail_y_s")
            .appendField(" to ")
            .appendField(new Blockly.FieldNumber(1, 2, 28, 1), "pacman_map_wall_detail_y_e");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('aaaaaaaaaaaaaaaaaa');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_map_wall_detail'] = function (block) {
    var xs = block.getFieldValue('pacman_map_wall_detail_x_s');
    var xe = block.getFieldValue('pacman_map_wall_detail_x_e');
    var ys = block.getFieldValue('pacman_map_wall_detail_y_s');
    var ye = block.getFieldValue('pacman_map_wall_detail_y_e');
    return 'Scene.setWall(' + xs + ', ' + xe + ', ' + ys + ', ' + ye +');\n';
};

Blockly.Blocks['pacman_map_wall_end'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Wall Complete");
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_map_wall_end'] = function (block) {
    return 'Scene.redrawWall();\n';
};

Blockly.Blocks['pacman_map_goods'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Goods: ");
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setColour(330);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_map_goods'] = function (block) {
    return 'Scene.initGoods();\n';
};

Blockly.Blocks['pacman_map_goods_detail'] = {
    init: function () {
        this.appendDummyInput().appendField("Add Goods");
        this.appendValueInput("pacman_map_goods_detail_x")
            .setCheck(null)
            .appendField("X:");
        this.appendValueInput("pacman_map_goods_detail_y")
            .setCheck(null)
            .appendField("Y:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setColour(330);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_map_goods_detail'] = function (block) {
    var code = "";
    var pointX = Blockly.JavaScript.valueToCode(block, 'pacman_map_goods_detail_x', Blockly.JavaScript.ORDER_ATOMIC);
    var pointY = Blockly.JavaScript.valueToCode(block, 'pacman_map_goods_detail_y', Blockly.JavaScript.ORDER_ATOMIC);
    if (pointX) {
        code = 'Scene.setGoods(' + pointX + ', ' + pointY + ');\n';
    }

    return code;
};

Blockly.Blocks['pacman_npc'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set NPC");
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setColour(20);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_npc'] = function (block) {
    return 'Scene.initNPC();\n';
};

Blockly.Blocks['pacman_npc_detail'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Add NPC");
        this.appendDummyInput()
           .appendField("Color:")
           .appendField(new Blockly.FieldColour("#ffff33"), "pacman_npc_detail_color");
        this.appendValueInput("pacman_npc_detail_x")
            .setCheck(null)
            .appendField("X:");
        this.appendValueInput("pacman_npc_detail_y")
            .setCheck(null)
            .appendField("Y:");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip('');
        this.setColour(20);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_npc_detail'] = function (block) {
    var code = "";
    var color = block.getFieldValue('pacman_npc_detail_color');
    var pointX = Blockly.JavaScript.valueToCode(block, 'pacman_npc_detail_x', Blockly.JavaScript.ORDER_ATOMIC);
    var pointY = Blockly.JavaScript.valueToCode(block, 'pacman_npc_detail_y', Blockly.JavaScript.ORDER_ATOMIC);
    if (pointX) {
        code = 'Scene.setNPC("' + color + '", ' + pointX + ', ' + pointY + ');\n';
    }

    return code;
};

Blockly.Blocks['pacman_player'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Player")
        this.appendDummyInput()
            .appendField("Color:")
            .appendField(new Blockly.FieldColour("#ffff33"), "pacman_player_color");
        this.appendValueInput("pacman_player_x")
            .setCheck(null)
            .appendField("X:");
        this.appendValueInput("pacman_player_y")
            .setCheck(null)
            .appendField("Y: ");
        this.setInputsInline(true);
        this.setTooltip('');
        this.setColour(210);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_player'] = function (block) {
    var code = "";
    var color = block.getFieldValue('pacman_player_color');
    var pointX = Blockly.JavaScript.valueToCode(block, 'pacman_player_x', Blockly.JavaScript.ORDER_ATOMIC);
    var pointY = Blockly.JavaScript.valueToCode(block, 'pacman_player_y', Blockly.JavaScript.ORDER_ATOMIC);
    if (pointX) {
        code = 'Scene.setPlayer("' + color + '", ' + pointX + ', ' + pointY + ');\n';
    }

    return code;
};

Blockly.Blocks["pacman_coord_number"] = {
    init: function () {
        this.appendDummyInput().appendField(new Blockly.FieldNumber(1, 1, 30, 1), "NUM");
        this.setOutput(!0, "Number");
        this.setColour(Blockly.Blocks.math.HUE);
        this.setTooltip('');
        this.setHelpUrl("http://www.example.com/");
    }
};

Blockly.JavaScript["pacman_coord_number"] = function (a) {
    return [parseFloat(a.getFieldValue("NUM")), Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.Blocks["pacman_coord_random"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Random ")
            .appendField(new Blockly.FieldNumber(1, 1, 28, 1), "random_from")
            .appendField("To")
            .appendField(new Blockly.FieldNumber(28, 1, 29, 1), "random_to");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript["pacman_coord_random"] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, "random_from", Blockly.JavaScript.ORDER_COMMA) || "1";
    var b = Blockly.JavaScript.valueToCode(block, "random_to", Blockly.JavaScript.ORDER_COMMA) || "25";
    return [
        Blockly.JavaScript.provideFunction_(
            "mathRandomInt",
            [
                "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(a, b) {",
                "   if (a > b) {",
                "       var c = a;",
                "       a = b;",
                "       b = c;",
                "   }",
                "   return Math.floor(Math.random() * (b - a + 1) + a);",
                "}"
            ]
        ) + "(" + b + ", " + a + ")",
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    ];
};