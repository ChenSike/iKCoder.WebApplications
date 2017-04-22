'use strict';


Blockly.Blocks['event_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("当开始运行");
        this.setNextStatement(true, null);
        this.setColour(150);
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
            .appendField("向上移动 1 步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setColour(150);
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
            .appendField("向下移动 1 步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setColour(150);
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
            .appendField("向左移动 1 步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setColour(150);
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
            .appendField("向右移动 1 步");
        this.setNextStatement(true, null);
        this.setPreviousStatement(true, null);
        this.setColour(150);
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
        this.setColour(150);
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
        this.setColour(150);
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
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['move_forward'] = function (block) {
    return 'Scene.move("", ' + block.getFieldValue('move_steps') + ');\n';
};

Blockly.Blocks['forloop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("重复")
        .appendField(new Blockly.FieldTextInput("???"), "times")
        .appendField("次");
    this.appendStatementInput("do")
        .setCheck(null)
        .appendField("做");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.JavaScript['forloop'] = function(block) {
  var number_times = block.getFieldValue('times');
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  // TODO: Assemble JavaScript into code variable.
  var countNum = "";
  if(statements_do.match("for") != null){
    var countNum = statements_do.match(/for/g).length;
  }  
  var count = "count" + countNum;
  var code = 'for (var '+ count +' = 0; '+ count + ' < ' + number_times +'; '+ count + '++)\n {\n' + statements_do + ' }\n';
  return code;
};