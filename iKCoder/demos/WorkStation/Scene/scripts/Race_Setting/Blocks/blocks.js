﻿'use strict';

/*
roadCount
carCount
playerCfg
*/

Blockly.Blocks['race_roads'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("车道数量 [常量] : ")
            .appendField(new Blockly.FieldNumber('8', 1, 8, 1), "race_roads_count");
        this.setColour(20);
        this.setInputsInline(true);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setEditable(false);
        this.setDeletable(false);
    }
};

Blockly.JavaScript['race_roads'] = function (block) {
    var value = block.getFieldValue('race_roads_count');
    return "WorkScene.changeSceneCfg({ roadCount:" + value + "});\n";
};

Blockly.Blocks['race_cars'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("汽车数量 [变量] : ")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", 1], ["2", 2], ["3", 3], ["4", 4], ["5", 5], ["6", 6], ["7", 7], ["8", 8]]), "race_cars_count");
        this.setColour(230);
        this.setInputsInline(true);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setEditable(true);
        this.setDeletable(false);
    }
};

Blockly.JavaScript['race_cars'] = function (block) {
    var value = block.getFieldValue('race_cars_count');
    return "WorkScene.changeSceneCfg({ carCount:" + value + "});\n";
};

Blockly.Blocks['race_player'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set Player");
        this.appendDummyInput()
            .appendField("Speed Change")
            .appendField(new Blockly.FieldNumber(4, 1, 6, 1), "race_player_speedchange");
        this.appendDummyInput()
            .appendField("Image")
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        ["Player 1", "car_p1"],
                        ["Player 2", "car_p2"],
                        ["Player 3", "car_p3"],
                        ["Player 4", "car_p4"],
                        ["Player 5", "car_p5"]
                    ],
                    function (option) {
                        this.sourceBlock_.updateImage_(option);
                    }
                ), "race_player_image_src"
             )
            .appendField(new Blockly.FieldImage("images/race/car_p1.png", 20, 40, "*"), "race_player_image");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },

    updateImage_: function (option) {
        this.inputList[2].fieldRow[3].setValue("images/race/" + option + ".png");
    }
};

Blockly.JavaScript['race_player'] = function (block) {
    var change = block.getFieldValue('race_player_speedchange');
    var image = block.getFieldValue('race_player_image');
    var code = "{img: " + image + ", speedChange:" + change + "}";
    return "WorkScene.changeSceneCfg({ playerCfg:" + code + "});\n";
};

Blockly.Blocks['race_resource'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Speed")
            .appendField("Min")
            .appendField(new Blockly.FieldNumber(80, 80, 120, 1), "race_resource_speed_min")
            .appendField("Max")
            .appendField(new Blockly.FieldNumber(180, 120, 200, 1), "race_resource_speed_max");
        var tmpInput = this.appendDummyInput()
            .appendField("Image")
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        ["Car 1", "car1"],
                        ["Car 2", "car2"],
                        ["Car 3", "car3"],
                        ["Car 4", "car4"],
                        ["Car 5", "car5"],
                        ["Car 6", "car6"],
                        ["Car 7", "car7"],
                        ["Car 8", "car8"],
                        ["Car 9", "car9"],
                        ["Block 1", "block1"],
                        ["Block 2", "block2"],
                        ["Block 3", "block3"],
                        ["Block 4", "block4"],
                        ["Block 5", "block5"],
                        ["Block 6", "block6"],
                        ["Block 7", "block7"],
                        ["Block 8", "block8"],
                        ["Block 9", "block9"]
                    ],
                     function (option) {
                         this.sourceBlock_.updateImage_(option);
                     }
                ), "race_resource_image_src"
             )
             .appendField(new Blockly.FieldImage("images/race/car1.png", 20, 40, "*"), "race_resource_image");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    },

    updateImage_: function (option) {
        if (option.indexOf("block") == 0) {
            this.inputList[0].fieldRow[2].setConstraints(40, 40, 40);
            this.inputList[0].fieldRow[4].setConstraints(40, 40, 40);
        } else {
            this.inputList[0].fieldRow[2].setConstraints(80, 120, 1);
            this.inputList[0].fieldRow[4].setValue(120, 200, 1);
        }

        this.inputList[1].fieldRow[2].setValue("images/race/" + option + ".png");
    }
};

Blockly.JavaScript['race_resource'] = function (block) {
    var min = block.getFieldValue('race_resource_speed_min');
    var max = block.getFieldValue('race_resource_speed_max');
    var src = block.getFieldValue('race_resource_image_src');
    var code = "{src:'" + src + "', speed:{min:" + min + ",max:" + max + "}}|";
    //return "WorkScene.changeSceneCfg('laneCfg'," + code + ");\n";
    return code;
};

Blockly.Blocks['race_lane_setting'] = {
    init: function () {
        this.appendDummyInput()
           .appendField("Set Lanes");
        this.appendStatementInput("race_lane_setting_1")
            .setCheck(null)
            .appendField("Lane 1");
        this.appendStatementInput("race_lane_setting_2")
            .setCheck(null)
            .appendField("Lane 2");
        this.appendStatementInput("race_lane_setting_3")
            .setCheck(null)
            .appendField("Lane 3");
        this.appendStatementInput("race_lane_setting_4")
            .setCheck(null)
            .appendField("Lane 4");
        this.appendStatementInput("race_lane_setting_5")
            .setCheck(null)
            .appendField("Lane 5");
        this.appendStatementInput("race_lane_setting_6")
            .setCheck(null)
            .appendField("Lane 6");
        this.appendStatementInput("race_lane_setting_7")
            .setCheck(null)
            .appendField("Lane 7");
        this.appendStatementInput("race_lane_setting_8")
            .setCheck(null)
            .appendField("Lane 8");
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['race_lane_setting'] = function (block) {
    var code = "Scene.initLaneCfg();\n";
    var flag = false;
    var endStr = "]);\n";
    for (var i = 1; i < 9; i++) {
        var statements_lane = Blockly.JavaScript.statementToCode(block, 'race_lane_setting_' + i);
        statements_lane = statements_lane.split("|");
        if (statements_lane.length > 2) {
            endStr = "]\n);\n";
        } else {
            endStr = "]);\n";
        }
        statements_lane = statements_lane.join(",");
        statements_lane = statements_lane.substr(0, statements_lane.length - 1).replace(/},{/g, "},\n{");
        statements_lane = "Scene.setLaneConfig(" + i + ", [" + statements_lane + endStr;
        code += statements_lane;
    }

    return code;
};