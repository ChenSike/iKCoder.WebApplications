'use strict'

if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'
				? args[number]
				: match
			;
		});
	};
};

Blockly.Blocks['block_max_enemy'] = {
	init: function () {
		this.setPreviousStatement(true);
		this.appendDummyInput()
			.appendField("Set Max enemy");
		
		this.appendDummyInput()
			.appendField("Actual Limit")
			.appendField(new Blockly.FieldNumber(6, 6, 15), "enemy_tank_max_number");
		this.setColour(65);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

Blockly.JavaScript['block_max_enemy'] = function (block) {
	var maxEnemy2Beat = block.getFieldValue('enemy_tank_max_number');
	return 'Scene.setMaxEnemy(' + maxEnemy2Beat+ ');\n';
};

// Set max appearance enemy

// Block for Map block
(function() {

	// Internal var
	var maxColumns = '25',
	    maxRows = '25',
	    wallTypeConcret = '1',
	    wallTypeIron = '2',
	    mapTypeGrass = '3',
	    mapTypeWater = '4',
	    mapTypeIce = '5',
	    mapTypeHome = '9';
	
	var demornalizeIndexFn = function() {
		var indexVal = arguments[0] - 1; 
		if(indexVal < 0) return o;

		return Math.min(indexVal, maxRows);
	};
	
	Blockly.Blocks['block_fix_axis_array'] = {
		init: function() {
			this.appendValueInput("input_fixed_points")
				.setCheck("block_fix_axis_array")
				.setAlign(Blockly.ALIGN_CENTRE)
				.appendField(new Blockly.FieldNumber(0, 1, 35), "input_fixed_point");
			this.setPreviousStatement(true, ["block_draw_line", "block_fix_axis_array"]);
			this.setNextStatement(true, "block_fix_axis_array");
			this.setColour(230);
			this.setTooltip('');
			this.setHelpUrl('');
		}
	};

	Blockly.JavaScript['block_fix_axis_array'] = function(block) {
		var number_input_fixed_point = block.getFieldValue('input_fixed_point');
		var value_input_fixed_points = Blockly.JavaScript.valueToCode(block, 'input_fixed_points', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var code = '' + number_input_fixed_point +',';
		return code;
	};

	//****************************************************************
	// Blockly Block for point collections
	//****************************************************************

	Blockly.Blocks['block_point_collection'] = {
		init: function() {
			this.appendDummyInput()
				.appendField(new Blockly.FieldTextInput('1, 2, 3, 4, 5'), 'field_point_collection');
			this.setPreviousStatement(true);
			this.setColour(180);
		}
	};

	Blockly.JavaScript['block_point_collection'] = function(block) {
		var point_array = (function() {
			var point_collection_text = block.getFieldValue('field_point_collection');
			var splitedArray = String.prototype.split.call(point_collection_text || '', ',') || [];
			var result = [];
			
			for (var i = 0; i < splitedArray.length; i++) {
				try {
					var tmp = parseInt(splitedArray[i].trim());
					if(!isNaN(tmp)) {
						result.push(tmp);
					}
				} catch (e) {};
			}
			return result;
		})();

		return Array.prototype.toString.call(point_array) + ',';
	};
	
	//****************************************************************
	// Blockly Block for draw a line.
	//****************************************************************

	// Block For Line
	Blockly.Blocks['block_draw_line'] = {
		init: function () {
			var xOrYDropDown = new Blockly.FieldDropdown([
				['X', '0'],
				['Y', '1']
			]);

			this.setPreviousStatement(true);
			this.setNextStatement(this);

			// Define a fixed axis
			this.appendDummyInput()
				.appendField("Fix")
				.appendField(xOrYDropDown, "block_x_or_y_selector")
				.appendField("Axis");

			this.appendStatementInput('fix_x_y_point')
				.setCheck('block_fix_axis_array')
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField('point');

			// Wall type selector
			var wallTypeSelector = new Blockly.FieldDropdown([
				['Concret Wall', wallTypeConcret],
				['Iron Wall', wallTypeIron],
				['Grass', mapTypeGrass],
				['Ice', mapTypeIce]
			]);


			// draw a line from a point to b
			var block = this;
			this.appendDummyInput()
				.appendField('Draw')
				.appendField(wallTypeSelector, 'block_wall_type_selector');

			this.appendDummyInput()
				.appendField('from')
				.appendField(new Blockly.FieldNumber(15, 1, maxRows), 'block_draw_from')
				.appendField('to')
			// define the end of the draw
				.appendField(new Blockly.FieldNumber(15, 1, maxRows, function (_toValue) {
					var from = block.getFieldValue('block_draw_from');
					var fromValue = from.getValue();
					return (_toValue - fromValue) > 0 ? _toValue : fromValue;
				}), 'block_draw_to');
		}
	};

	Blockly.JavaScript['block_draw_line'] = function (block) {

		var selectedType = block.getFieldValue('block_wall_type_selector');

		var val = block.getFieldValue('block_x_or_y_selector');

		var fromField = block.getFieldValue('block_draw_from');
		var fromValue = demornalizeIndexFn(fromField);

		var toField = block.getFieldValue('block_draw_to');
		var toValue = demornalizeIndexFn(toField);

		var _code_fixed = Blockly.JavaScript.blockToCode(block.getChildren()[0]);
		var fixed_points = String.prototype.substr.call(_code_fixed, 0, _code_fixed.length - 1); 

		return "Scene.drawLine({0}, {1}, {2}, {3}, {4});\n"
			.format(selectedType, '[' + fixed_points + ']', fromValue, toValue, val);
	};


	//****************************************************************
	// Blockly Block for configuration container.
	//****************************************************************
	
	Blockly.Blocks['block_tank_game_config'] = {
		init: function () {
			this.appendDummyInput('tank_game_init_input')
				.appendField('Init Configuration');

			this.appendStatementInput('list_of_map_line')
				.setCheck(null)
				.appendField('draw')
				.setAlign(Blockly.ALIGN_RIGHT);

			this.setColour(120);
		}
	};

	Blockly.JavaScript['block_tank_game_config'] = function (block) {
		var lines = new Array();
		
		// get lines to draw
		(function getNextLineFn (_block) {
			var nextBlock = null;
			try {
				nextBlock = _block.getChildren()[0];
			} catch (e) {};

			if (!!nextBlock) {
				lines.push(nextBlock);
				getNextLineFn(nextBlock);
			}
		})(block);

		console.log(Blockly.Xml.blockToDom(block));
		
		var str2drawWall = Blockly.JavaScript.blockToCode(block.getChildren()[0]);
		return 'Scene.clearWalls();\n' + str2drawWall + '\n';
	};

})();

