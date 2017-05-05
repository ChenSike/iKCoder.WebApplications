'use strict';

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
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['pacman_map_wall_detail'] = function (block) {
    var xs = block.getFieldValue('pacman_map_wall_detail_x_s');
    var xe = block.getFieldValue('pacman_map_wall_detail_x_e');
    var ys = block.getFieldValue('pacman_map_wall_detail_y_s');
    var ye = block.getFieldValue('pacman_map_wall_detail_y_e');
    return 'Scene.setWall(' + xs + ', ' + xe + ', ' + ys + ', ' + ye + ');\n';
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

Blockly.Blocks['event_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("当开始运行");
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['event_start'] = function (block) {
    //return 'Scene.start();\n';
    return '';
};

Blockly.Blocks['move_onestep_up'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向上移动一步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_onestep_up'] = function (block) {
    return 'Scene.move("U", 1);\n';
};

Blockly.Blocks['move_onestep_down'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向下移动一步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_onestep_down'] = function (block) {
    return 'Scene.move("D", 1);\n';
};

Blockly.Blocks['move_onestep_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向左移动一步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_onestep_left'] = function (block) {
    return 'Scene.move("L", 1);\n';
};

Blockly.Blocks['move_onestep_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向右移动一步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_onestep_right'] = function (block) {
    return 'Scene.move("R", 1);\n';
};

Blockly.Blocks['turn_right'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向右转");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['turn_right'] = function (block) {
    return 'Scene.TurnRight();\n';
};

Blockly.Blocks['turn_left'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向左转");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['turn_left'] = function (block) {
    return 'Scene.TurnLeft();\n';
};


Blockly.Blocks['move_forward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向前移动")
            .appendField(new Blockly.FieldNumber(1, 1, 25, 1), "move_steps")
            .appendField(" 步 ")
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_forward'] = function (block) {
    return 'Scene.move("", ' + block.getFieldValue('move_steps') + ');\n';
};
Blockly.Blocks['move_onestep_forward'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("向前移动一步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_onestep_forward'] = function (block) {
    return 'Scene.move("", 1);\n';
};

/*
 Blockly.Blocks['if_condition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("如果    吃豆人 ")
        .appendField("前面")
        .appendField(" 是 墙");
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField("执行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
	var a = this;
  }
};

Blockly.JavaScript['if_condition'] = function (a) {
	
    var b = 0,
		c = "",
		d, e;
    do 
		e = Blockly.JavaScript.valueToCode(a, "IF" + b, Blockly.JavaScript.ORDER_NONE) || "false", 
		d = Blockly.JavaScript.statementToCode(a, "DO" + b), 
		c += (0 < b ? " else " : "") + "if (Scene.isWall()) {\n" + d + "}", 
		
		++b;
    while (a.getInput("IF" + b));
    a.getInput("ELSE") && (d = Blockly.JavaScript.statementToCode(a, "ELSE"), c += " else {\n" + d + "}");
    return c + "\n"
};
*/

Blockly.Blocks['if_condition_else'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("如果 ")
		//.appendField("是")
		.appendField(new Blockly.FieldDropdown([["前方是怪物","NPC"], ["前方是豆子","Beans"]]), "DropName");
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField("执行");
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField("否则");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
	var a = this;
  }
};

Blockly.JavaScript['if_condition_else'] = function (a) {
    var b = 0,
		c = "",
		d, e, f;
		var selectedValue = a.getFieldValue('DropName');
		if (selectedValue == "NPC"){
			f = "Scene.isNPC()";
		}else if (selectedValue == "Beans"){
			f = "Scene.isBean()";
		}
    //do 
	//	e = Blockly.JavaScript.valueToCode(a, "IF" + b, Blockly.JavaScript.ORDER_NONE) || "false", 
		d = Blockly.JavaScript.statementToCode(a, "DO" + b), 
		c += (0 < b ? " else " : "") + "if (" + f + ") {\n" + d + "}";
	//	++b;
	//while (a.getInput("IF" + b));
    a.getInput("ELSE") && (d = Blockly.JavaScript.statementToCode(a, "ELSE"), c += " else {\n" + d + "}");
    return c + "\n"
};
