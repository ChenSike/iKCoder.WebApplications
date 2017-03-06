'use strict';

// UI constants for rendering blocks.
/**
 * Horizontal space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_X = 10;
/**
 * Vertical space between elements.
 * @const
 */
Blockly.BlockSvg.SEP_SPACE_Y = 10;
/**
 * Vertical padding around inline elements.
 * @const
 */
Blockly.BlockSvg.INLINE_PADDING_Y = 5;
/**
 * Minimum height of a block.
 * @const
 */
Blockly.BlockSvg.MIN_BLOCK_Y = 25;
/**
 * Height of horizontal puzzle tab.
 * @const
 */
Blockly.BlockSvg.TAB_HEIGHT = 35;
/**
 * Width of horizontal puzzle tab.
 * @const
 */
Blockly.BlockSvg.TAB_WIDTH = 15;
/**
 * Width of vertical tab (inc left margin).
 * @const
 */
Blockly.BlockSvg.NOTCH_WIDTH = 30;
/**
 * Rounded corner radius.
 * @const
 */
Blockly.BlockSvg.CORNER_RADIUS = 2;
/**
 * Do blocks with no previous or output connections have a 'hat' on top?
 * @const
 */
Blockly.BlockSvg.START_HAT = false;
/**
 * Height of the top hat.
 * @const
 */
Blockly.BlockSvg.START_HAT_HEIGHT = 15;
/**
 * Path of the top hat's curve.
 * @const
 */
Blockly.BlockSvg.START_HAT_PATH = 'c 30,-' +
    Blockly.BlockSvg.START_HAT_HEIGHT + ' 70,-' +
    Blockly.BlockSvg.START_HAT_HEIGHT + ' 100,0';
/**
 * Path of the top hat's curve's highlight in LTR.
 * @const
 */
Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR =
    'c 17.8,-9.2 45.3,-14.9 75,-8.7 M 100.5,0.5';
/**
 * Path of the top hat's curve's highlight in RTL.
 * @const
 */
Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL =
    'm 25,-8.7 c 29.7,-6.2 57.2,-0.5 75,8.7';
/**
 * Distance from shape edge to intersect with a curved corner at 45 degrees.
 * Applies to highlighting on around the inside of a curve.
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) *
    (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + 0.5;
/**
 * Distance from shape edge to intersect with a curved corner at 45 degrees.
 * Applies to highlighting on around the outside of a curve.
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) *
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) - 0.5;
/**
 * SVG path for drawing next/previous notch from left to right.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_LEFT = 'l 5,7 8,0 5,-7';
/**
 * SVG path for drawing next/previous notch from left to right with
 * highlighting.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = 'l 5,7 8,0 5,-7';
/**
 * SVG path for drawing next/previous notch from right to left.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'l -5,7 -8,0 -5,-7';
/**
 * SVG path for drawing a horizontal puzzle tab from top to bottom.
 * @const
 */
Blockly.BlockSvg.TAB_PATH_DOWN = 'l-15,17.5 15,17.5';
/**
 * SVG path for drawing a horizontal puzzle tab from top to bottom with
 * highlighting from the upper-right.
 * @const
 */
Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL = 'v 6.5 m -' +
    (Blockly.BlockSvg.TAB_WIDTH * 0.97) + ',3 q -' +
    (Blockly.BlockSvg.TAB_WIDTH * 0.05) + ',10 ' +
    (Blockly.BlockSvg.TAB_WIDTH * 0.3) + ',9.5 m ' +
    (Blockly.BlockSvg.TAB_WIDTH * 0.67) + ',-1.9 v 1.4';

/**
 * SVG start point for drawing the top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START =
    'm 0,' + Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG start point for drawing the top-left corner's highlight in RTL.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL =
    'm ' + Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
    Blockly.BlockSvg.DISTANCE_45_INSIDE;
/**
 * SVG start point for drawing the top-left corner's highlight in LTR.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR =
    'm 0.5,' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5);
/**
 * SVG path for drawing the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER =
    'A ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',0';
/**
 * SVG path for drawing the highlight on the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT =
    'A ' + (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',0.5';
/**
 * SVG path for drawing the top-left corner of a statement input.
 * Includes the top notch, a horizontal space, and the rounded inside corner.
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER =
    Blockly.BlockSvg.NOTCH_PATH_RIGHT + ' h -' +
    (Blockly.BlockSvg.NOTCH_WIDTH - 18 - Blockly.BlockSvg.CORNER_RADIUS) +
    ' a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing the bottom-left corner of a statement input.
 * Includes the rounded inside corner.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER =
    'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing highlight on the top-left corner of a statement
 * input in RTL.
 * @const
 */
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL =
    'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
    (-Blockly.BlockSvg.DISTANCE_45_OUTSIDE - 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS -
    Blockly.BlockSvg.DISTANCE_45_OUTSIDE);
/**
 * SVG path for drawing highlight on the bottom-left corner of a statement
 * input in RTL.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL =
    'a ' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ' 0 0,0 ' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5);
/**
 * SVG path for drawing highlight on the bottom-left corner of a statement
 * input in LTR.
 * @const
 */
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR =
    'a ' + (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ',' +
    (Blockly.BlockSvg.CORNER_RADIUS + 0.5) + ' 0 0,0 ' +
    (Blockly.BlockSvg.CORNER_RADIUS -
    Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + ',' +
    (Blockly.BlockSvg.DISTANCE_45_OUTSIDE + 0.5);

/**
 * Render the block.
 * Lays out and reflows a block based on its contents and settings.
 * @param {boolean=} opt_bubble If false, just render this block.
 *   If true, also render block's parent, grandparent, etc.  Defaults to true.
 */
Blockly.BlockSvg.prototype.render = function (opt_bubble) {
    Blockly.Field.startCache();
    this.rendered = true;

    var cursorX = Blockly.BlockSvg.SEP_SPACE_X;
    if (this.RTL) {
        cursorX = -cursorX;
    }
    // Move the icons into position.
    var icons = this.getIcons();
    for (var i = 0; i < icons.length; i++) {
        cursorX = icons[i].renderIcon(cursorX);
    }
    cursorX += this.RTL ?
        Blockly.BlockSvg.SEP_SPACE_X : -Blockly.BlockSvg.SEP_SPACE_X;
    // If there are no icons, cursorX will be 0, otherwise it will be the
    // width that the first label needs to move over by.

    var inputRows = this.renderCompute_(cursorX);
    this.renderDraw_(cursorX, inputRows);
    this.renderMoveConnections_();

    if (opt_bubble !== false) {
        // Render all blocks above this one (propagate a reflow).
        var parentBlock = this.getParent();
        if (parentBlock) {
            parentBlock.render(true);
        } else {
            // Top-most block.  Fire an event to allow scrollbars to resize.
            this.workspace.resizeContents();
        }
    }
    Blockly.Field.stopCache();
};

/**
 * Render a list of fields starting at the specified location.
 * @param {!Array.<!Blockly.Field>} fieldList List of fields.
 * @param {number} cursorX X-coordinate to start the fields.
 * @param {number} cursorY Y-coordinate to start the fields.
 * @return {number} X-coordinate of the end of the field row (plus a gap).
 * @private
 */
Blockly.BlockSvg.prototype.renderFields_ =
    function (fieldList, cursorX, cursorY) {
        /* eslint-disable indent */
        cursorY += Blockly.BlockSvg.INLINE_PADDING_Y;
        if (this.RTL) {
            cursorX = -cursorX;
        }
        for (var t = 0, field; field = fieldList[t]; t++) {
            var root = field.getSvgRoot();
            if (!root) {
                continue;
            }
            if (this.RTL) {
                cursorX -= field.renderSep + field.renderWidth;
                root.setAttribute('transform',
                    'translate(' + cursorX + ',' + cursorY + ')');
                if (field.renderWidth) {
                    cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
                }
            } else {
                root.setAttribute('transform',
                    'translate(' + (cursorX + field.renderSep) + ',' + cursorY + ')');
                if (field.renderWidth) {
                    cursorX += field.renderSep + field.renderWidth +
                        Blockly.BlockSvg.SEP_SPACE_X;
                }
            }
        }
        return this.RTL ? -cursorX : cursorX;
    };  /* eslint-enable indent */

/**
 * Computes the height and widths for each row and field.
 * @param {number} iconWidth Offset of first row due to icons.
 * @return {!Array.<!Array.<!Object>>} 2D array of objects, each containing
 *     position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderCompute_ = function (iconWidth) {
    var inputList = this.inputList;
    var inputRows = [];
    inputRows.rightEdge = iconWidth + Blockly.BlockSvg.SEP_SPACE_X * 2;
    if (this.previousConnection || this.nextConnection) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge,
            Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X);
    }
    var fieldValueWidth = 0;  // Width of longest external value field.
    var fieldStatementWidth = 0;  // Width of longest statement field.
    var hasValue = false;
    var hasStatement = false;
    var hasDummy = false;
    var lastType = undefined;
    var isInline = this.getInputsInline() && !this.isCollapsed();
    for (var i = 0, input; input = inputList[i]; i++) {
        if (!input.isVisible()) {
            continue;
        }
        var row;
        if (!isInline || !lastType ||
            lastType == Blockly.NEXT_STATEMENT ||
            input.type == Blockly.NEXT_STATEMENT) {
            // Create new row.
            lastType = input.type;
            row = [];
            if (isInline && input.type != Blockly.NEXT_STATEMENT) {
                row.type = Blockly.BlockSvg.INLINE;
            } else {
                row.type = input.type;
            }
            row.height = 0;
            inputRows.push(row);
        } else {
            row = inputRows[inputRows.length - 1];
        }
        row.push(input);

        // Compute minimum input size.
        input.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
        // The width is currently only needed for inline value inputs.
        if (isInline && input.type == Blockly.INPUT_VALUE) {
            //input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X * 1.25;
            if (this.checkBooleanConnection(input)) {
                input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + input.renderHeight / 2 / 17.5 * 15 * 2;
            } else {
                input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + input.renderHeight / 2 * 2;
            }
        } else {
            input.renderWidth = 0;
        }
        // Expand input size if there is a connection.
        if (input.connection && input.connection.isConnected()) {
            var linkedBlock = input.connection.targetBlock();
            var bBox = linkedBlock.getHeightWidth();
            input.renderHeight = Math.max(input.renderHeight, bBox.height);
            input.renderWidth = Math.max(input.renderWidth, bBox.width);
        }
        // Blocks have a one pixel shadow that should sometimes overhang.
        if (!isInline && i == inputList.length - 1) {
            // Last value input should overhang.
            //input.renderHeight--;
        } else if (!isInline && input.type == Blockly.INPUT_VALUE &&
            inputList[i + 1] && inputList[i + 1].type == Blockly.NEXT_STATEMENT) {
            // Value input above statement input should overhang.
            //input.renderHeight--;
        }

        row.height = Math.max(row.height, input.renderHeight);
        input.fieldWidth = 0;
        if (inputRows.length == 1) {
            // The first row gets shifted to accommodate any icons.
            input.fieldWidth += this.RTL ? -iconWidth : iconWidth;
        }
        var previousFieldEditable = false;
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
            if (j != 0) {
                input.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X;
            }
            // Get the dimensions of the field.
            var fieldSize = field.getSize();
            field.renderWidth = fieldSize.width;
            field.renderSep = (previousFieldEditable && field.EDITABLE) ?
                Blockly.BlockSvg.SEP_SPACE_X : 0;
            input.fieldWidth += field.renderWidth + field.renderSep;
            row.height = Math.max(row.height, fieldSize.height);
            previousFieldEditable = field.EDITABLE;
        }

        if (row.type != Blockly.BlockSvg.INLINE) {
            if (row.type == Blockly.NEXT_STATEMENT) {
                hasStatement = true;
                fieldStatementWidth = Math.max(fieldStatementWidth, input.fieldWidth);
            } else {
                if (row.type == Blockly.INPUT_VALUE) {
                    hasValue = true;
                } else if (row.type == Blockly.DUMMY_INPUT) {
                    hasDummy = true;
                }
                fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth);
            }
        }
    }

    // Make inline rows a bit thicker in order to enclose the values.
    var rowsHeight = 0;
    for (var y = 0, row; row = inputRows[y]; y++) {
        row.thicker = false;
        if (row.type == Blockly.BlockSvg.INLINE) {
            for (var z = 0, input; input = row[z]; z++) {
                if (input.type == Blockly.INPUT_VALUE) {
                    row.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
                    row.thicker = true;
                    break;
                }
            }
        }

        if (isInline) {
            rowsHeight = Math.max(rowsHeight, row.height);
        } else {
            rowsHeight += row.height;
        }
    }


    // Compute the statement edge.
    // This is the width of a block where statements are nested.
    inputRows.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X +
        fieldStatementWidth;
    // Compute the preferred right edge.  Inline blocks may extend beyond.
    // This is the width of the block where external inputs connect.
    if (hasStatement) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge,
            inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH);
    }

    if (hasValue) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.TAB_WIDTH);
    } else if (hasDummy) {
        //inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + Blockly.BlockSvg.SEP_SPACE_X * 2);
        inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + Blockly.BlockSvg.SEP_SPACE_X * 2);
    }

    inputRows.hasValue = hasValue;
    inputRows.hasStatement = hasStatement;
    inputRows.hasDummy = hasDummy;
    return inputRows;
};


/**
 * Draw the path of the block.
 * Move the fields to the correct locations.
 * @param {number} iconWidth Offset of first row due to icons.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderDraw_ = function (iconWidth, inputRows) {
    this.startHat_ = false;
    // Reset the height to zero and let the rendering process add in
    // portions of the block height as it goes. (e.g. hats, inputs, etc.)
    this.height = 0;
    // Should the top and bottom left corners be rounded or square?
    if (this.outputConnection) {
        this.squareTopLeftCorner_ = true;
        this.squareBottomLeftCorner_ = true;
    } else {
        this.squareTopLeftCorner_ = false;
        this.squareBottomLeftCorner_ = false;
        // If this block is in the middle of a stack, square the corners.
        if (this.previousConnection) {
            var prevBlock = this.previousConnection.targetBlock();
            if (prevBlock && prevBlock.getNextBlock() == this) {
                this.squareTopLeftCorner_ = true;
            }
        } else if (Blockly.BlockSvg.START_HAT) {
            // No output or previous connection.
            this.squareTopLeftCorner_ = true;
            this.startHat_ = true;
            this.height += Blockly.BlockSvg.START_HAT_HEIGHT;
            inputRows.rightEdge = Math.max(inputRows.rightEdge, 100);
        }
        var nextBlock = this.getNextBlock();
        if (nextBlock) {
            this.squareBottomLeftCorner_ = true;
        }
    }

    // Assemble the block's path.
    var steps = [];
    var inlineSteps = [];
    // The highlighting applies to edges facing the upper-left corner.
    // Since highlighting is a two-pixel wide border, it would normally overhang
    // the edge of the block by a pixel. So undersize all measurements by a pixel.
    var highlightSteps = [];
    var highlightInlineSteps = [];

    this.renderDrawTop_(steps, highlightSteps, inputRows.rightEdge);
    var cursorY = this.renderDrawRight_(steps, highlightSteps, inlineSteps,
        highlightInlineSteps, inputRows, iconWidth);
    this.renderDrawBottom_(steps, highlightSteps, cursorY);
    this.renderDrawLeft_(steps, highlightSteps);

    var pathString = steps.join(' ') + '\n' + inlineSteps.join(' ');
    this.svgPath_.setAttribute('d', pathString);
    //this.svgPathDark_.setAttribute('d', pathString);
    this.svgPathDark_.setAttribute('d', '');
    //pathString = highlightSteps.join(' ') + '\n' + highlightInlineSteps.join(' ');
    //this.svgPathLight_.setAttribute('d', pathString);
    this.svgPathLight_.setAttribute('d', pathString);
    if (this.RTL) {
        // Mirror the block's path.
        this.svgPath_.setAttribute('transform', 'scale(-1 1)');
        this.svgPathLight_.setAttribute('transform', 'scale(-1 1)');
        this.svgPathDark_.setAttribute('transform', 'translate(1,1) scale(-1 1)');
    }
};

/**
 * Update all of the connections on this block with the new locations calculated
 * in renderCompute.  Also move all of the connected blocks based on the new
 * connection locations.
 * @private
 */
Blockly.BlockSvg.prototype.renderMoveConnections_ = function () {
    var blockTL = this.getRelativeToSurfaceXY();
    // Don't tighten previous or output connecitons because they are inferior
    // connections.
    if (this.previousConnection) {
        this.previousConnection.moveToOffset(blockTL);
    }
    if (this.outputConnection) {
        this.outputConnection.moveToOffset(blockTL);
    }

    for (var i = 0; i < this.inputList.length; i++) {
        var conn = this.inputList[i].connection;
        if (conn) {
            conn.moveToOffset(blockTL);
            if (conn.isConnected()) {
                conn.tighten_();
            }
        }
    }

    if (this.nextConnection) {
        this.nextConnection.moveToOffset(blockTL);
        if (this.nextConnection.isConnected()) {
            this.nextConnection.tighten_();
        }
    }

};

/**
 * Render the top edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @param {number} rightEdge Minimum width of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawTop_ =
    function (steps, highlightSteps, rightEdge) {
        /* eslint-disable indent */
        // Position the cursor at the top-left starting point.
        if (this.squareTopLeftCorner_) {
            steps.push('m 0,0');
            highlightSteps.push('m 0,0');
            if (this.startHat_) {
                steps.push(Blockly.BlockSvg.START_HAT_PATH);
                highlightSteps.push(this.RTL ?
                    Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL :
                    Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR);
            }
        } else {
            steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
            highlightSteps.push(this.RTL ?
                Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL :
                Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR);
            // Top-left rounded corner.
            steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
            highlightSteps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT);
        }

        // Top edge.
        if (this.previousConnection) {
            steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 18);
            highlightSteps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 18);
            steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
            highlightSteps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT);

            var connectionX = (this.RTL ?
                -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
            this.previousConnection.setOffsetInBlock(connectionX, 0);
        }
        steps.push('H', rightEdge);
        //highlightSteps.push('H', rightEdge - 0.5);
        highlightSteps.push('H', rightEdge);
        this.width = rightEdge;
    };  /* eslint-enable indent */

/**
 * Render the right edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @param {!Array.<string>} inlineSteps Inline block outlines.
 * @param {!Array.<string>} highlightInlineSteps Inline block highlights.
 * @param {!Array.<!Array.<!Object>>} inputRows 2D array of objects, each
 *     containing position information.
 * @param {number} iconWidth Offset of first row due to icons.
 * @return {number} Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawRight_ = function (steps, highlightSteps,
    inlineSteps, highlightInlineSteps, inputRows, iconWidth) {
    var cursorX;
    var cursorY = 0;
    var connectionX, connectionY;
    for (var y = 0, row; row = inputRows[y]; y++) {
        cursorX = Blockly.BlockSvg.SEP_SPACE_X;
        if (y == 0) {
            cursorX += this.RTL ? -iconWidth : iconWidth;
        }
        //highlightSteps.push('M', (inputRows.rightEdge - 0.5) + ',' + (cursorY + 0.5));
        highlightSteps.push('M', (inputRows.rightEdge) + ',' + (cursorY));
        if (this.isCollapsed()) {
            // Jagged right edge.
            var input = row[0];
            var fieldX = cursorX;
            var fieldY = cursorY;
            this.renderFields_(input.fieldRow, fieldX, fieldY);
            steps.push(Blockly.BlockSvg.JAGGED_TEETH);
            highlightSteps.push('h 8');
            var remainder = row.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
            steps.push('v', remainder);
            if (this.RTL) {
                highlightSteps.push('v 3.9 l 7.2,3.4 m -14.5,8.9 l 7.3,3.5');
                highlightSteps.push('v', remainder - 0.7);
            }
            this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH;
        } else if (row.type == Blockly.BlockSvg.INLINE) {
            // Inline inputs.
            for (var x = 0, input; input = row[x]; x++) {
                var fieldX = cursorX;
                var fieldY = cursorY;
                if (row.thicker) {
                    // Lower the field slightly.
                    fieldY += Blockly.BlockSvg.INLINE_PADDING_Y;
                }
                // TODO: Align inline field rows (left/right/centre).
                cursorX = this.renderFields_(input.fieldRow, fieldX, fieldY);
                var tmpBBox = null;
                var tmpBBoxWidth = input.renderWidth;
                var tmpBBoxHeight = input.renderHeight;
                if (input.connection && input.connection.targetBlock() && input.connection.targetBlock().svgPath_) {
                    tmpBBox = input.connection.targetBlock().svgPath_.getBBox();
                    tmpBBoxWidth = tmpBBox.width;
                    tmpBBoxHeight = tmpBBox.height;
                }

                if (input.type != Blockly.DUMMY_INPUT) {
                    //cursorX += input.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
                    cursorX += tmpBBoxWidth + Blockly.BlockSvg.SEP_SPACE_X;
                }

                if (input.type == Blockly.INPUT_VALUE) {
                    //inlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y));
                    inlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y));
                    if (this.checkBooleanConnection(input)) {
                        //var tmpY = input.renderHeight / 2;
                        //var tmpX = tmpY / 17.5 * 15;
                        //var hWidth = input.renderWidth - tmpX * 2;
                        //inlineSteps.push('m-' + tmpX + ',0');
                        //inlineSteps.push('h-' + hWidth);
                        //inlineSteps.push('l-' + tmpX + ',' + tmpY + ' ' + tmpX + ',' + tmpY);
                        //inlineSteps.push('h' + hWidth);
                        //inlineSteps.push('l' + tmpX + ',-' + tmpY + ' -' + tmpX + ',-' + tmpY);
                        var tmpY = tmpBBoxHeight / 2;
                        var tmpX = tmpY / 17.5 * 15;
                        var hWidth = tmpBBoxWidth - tmpX * 2;
                        inlineSteps.push('m-' + tmpX + ',0');
                        inlineSteps.push('h-' + hWidth);
                        inlineSteps.push('l-' + tmpX + ',' + tmpY + ' ' + tmpX + ',' + tmpY);
                        inlineSteps.push('h' + hWidth);
                        inlineSteps.push('l' + tmpX + ',-' + tmpY + ' -' + tmpX + ',-' + tmpY);
                    } else {
                        //var tmpR = input.renderHeight / 2;
                        //var hWidth = input.renderWidth - tmpR * 2;
                        //inlineSteps.push('m-' + tmpR + ',0');
                        //inlineSteps.push('h-' + hWidth);
                        //inlineSteps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,' + input.renderHeight);
                        //inlineSteps.push('h' + hWidth);
                        //inlineSteps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,-' + input.renderHeight);
                        var tmpR = tmpBBoxHeight / 2;
                        var hWidth = tmpBBoxWidth - tmpR * 2;
                        inlineSteps.push('m-' + tmpR + ',0');
                        inlineSteps.push('h-' + hWidth);
                        inlineSteps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,' + tmpBBoxHeight);
                        inlineSteps.push('h' + hWidth);
                        inlineSteps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,-' + tmpBBoxHeight);
                    }
                    //inlineSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
                    //inlineSteps.push('v', input.renderHeight + 1 - Blockly.BlockSvg.TAB_HEIGHT);
                    //inlineSteps.push('h', input.renderWidth + 2 - Blockly.BlockSvg.TAB_WIDTH);
                    inlineSteps.push('z');
                    if (this.RTL) {
                        // Highlight right edge, around back of tab, and bottom.
                        highlightInlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X - 2.5 + Blockly.BlockSvg.TAB_WIDTH - input.renderWidth) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 0.5));
                        highlightInlineSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
                        highlightInlineSteps.push('v', input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2.5);
                        highlightInlineSteps.push('h', input.renderWidth - Blockly.BlockSvg.TAB_WIDTH + 2);
                    } else {
                        // Highlight right edge, bottom.
                        highlightInlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X + 0.5) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 0.5));
                        highlightInlineSteps.push('v', input.renderHeight + 1);
                        highlightInlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 - input.renderWidth);
                        // Short highlight glint at bottom of tab.
                        highlightInlineSteps.push('M', (cursorX - input.renderWidth - Blockly.BlockSvg.SEP_SPACE_X + 0.9) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + Blockly.BlockSvg.TAB_HEIGHT - 0.7));
                        highlightInlineSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * 0.46) + ',-2.1');
                    }
                    // Create inline input connection.
                    if (this.RTL) {
                        connectionX = -cursorX - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + input.renderWidth + 1;
                    } else {
                        //connectionX = cursorX + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - input.renderWidth - 1;
                        var tmpOffsetX = 0;
                        if (this.checkBooleanConnection(input)) {
                            tmpOffsetX = tmpBBoxHeight / 17.5 * 15;
                        } else {
                            tmpOffsetX = tmpBBoxHeight / 2;
                        }

                        connectionX = cursorX - Blockly.BlockSvg.SEP_SPACE_X - tmpBBoxWidth + tmpOffsetX;
                    }

                    connectionY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y;
                    input.connection.setOffsetInBlock(connectionX, connectionY);
                }
            }

            cursorX = Math.max(cursorX, inputRows.rightEdge);
            this.width = Math.max(this.width, cursorX);
            steps.push('H', cursorX);
            highlightSteps.push('H', cursorX - 0.5);
            //steps.push('v', row.height);
            if (this.checkBooleanConnection(this, true)) {
                var tmpY = (row.height) / 2;
                var tmpX = tmpY / 17.5 * 15;
                steps.push('l' + tmpX + ',' + tmpY + ' -' + tmpX + ', ' + tmpY);
            } else {
                var tmpR = (row.height) / 2;
                steps.push('a' + tmpR + ',' + tmpR + ',0,1,1,0,' + (row.height));
            }
            if (this.RTL) {
                highlightSteps.push('v', row.height - 1);
            }
        } else if (row.type == Blockly.INPUT_VALUE) {
            // External input.
            var input = row[0];
            var fieldX = cursorX;
            var fieldY = cursorY;
            if (input.align != Blockly.ALIGN_LEFT) {
                var fieldRightX = inputRows.rightEdge - input.fieldWidth -
                    Blockly.BlockSvg.TAB_WIDTH - 2 * Blockly.BlockSvg.SEP_SPACE_X;
                if (input.align == Blockly.ALIGN_RIGHT) {
                    fieldX += fieldRightX;
                } else if (input.align == Blockly.ALIGN_CENTRE) {
                    fieldX += fieldRightX / 2;
                }
            }
            this.renderFields_(input.fieldRow, fieldX, fieldY);
            //steps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
            //steps.push('h' + Blockly.BlockSvg.SEP_SPACE_X);
            if (this.checkBooleanConnection(input)) {
                var tmpY = (row.height) / 2;
                var tmpX = tmpY / 17.5 * 15;
                //steps.push('h' + tmpX);
                steps.push('l-' + tmpX + ',' + tmpY + ' ' + tmpX + ', ' + tmpY);
            } else {
                var tmpR = (row.height) / 2;
                //steps.push('h' + tmpR);
                steps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,' + (row.height));
            }

            var v = row.height - Blockly.BlockSvg.TAB_HEIGHT;
            //steps.push('v', v);
            if (this.RTL) {
                // Highlight around back of tab.
                highlightSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
                highlightSteps.push('v', v + 0.5);
            } else {
                // Short highlight glint at bottom of tab.
                highlightSteps.push('M', (inputRows.rightEdge - 5) + ',' +
                    (cursorY + Blockly.BlockSvg.TAB_HEIGHT - 0.7));
                highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * 0.46) +
                    ',-2.1');
            }
            // Create external input connection.
            connectionX = this.RTL ? -inputRows.rightEdge - 1 :
                inputRows.rightEdge + 1;
            input.connection.setOffsetInBlock(connectionX, cursorY);
            if (input.connection.isConnected()) {
                this.width = Math.max(this.width, inputRows.rightEdge +
                    input.connection.targetBlock().getHeightWidth().width -
                    Blockly.BlockSvg.TAB_WIDTH + 1);
            }
        } else if (row.type == Blockly.DUMMY_INPUT) {
            // External naked field.
            var input = row[0];
            var fieldX = cursorX;
            var fieldY = cursorY;
            if (input.align != Blockly.ALIGN_LEFT) {
                var fieldRightX = inputRows.rightEdge - input.fieldWidth -
                    2 * Blockly.BlockSvg.SEP_SPACE_X;
                if (inputRows.hasValue) {
                    fieldRightX -= Blockly.BlockSvg.TAB_WIDTH;
                }
                if (input.align == Blockly.ALIGN_RIGHT) {
                    fieldX += fieldRightX;
                } else if (input.align == Blockly.ALIGN_CENTRE) {
                    fieldX += fieldRightX / 2;
                }
            }
            this.renderFields_(input.fieldRow, fieldX, fieldY);
            //steps.push('v', row.height);
            if (this.checkBooleanConnection(this, true)) {
                var tmpY = (row.height) / 2;
                var tmpX = tmpY / 17.5 * 15;
                steps.push('l' + tmpX + ',' + tmpY + ' -' + tmpX + ', ' + tmpY);
            } else {
                var tmpR = (row.height) / 2;
                steps.push('a' + tmpR + ',' + tmpR + ',0,1,1,0,' + (input.renderHeight));
            }

            if (this.RTL) {
                highlightSteps.push('v', row.height - 1);
            }
        } else if (row.type == Blockly.NEXT_STATEMENT) {
            // Nested statement.
            var input = row[0];
            if (y == 0) {
                // If the first input is a statement stack, add a small row on top.
                steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
                if (this.RTL) {
                    highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
                }
                cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
            }
            var fieldX = cursorX;
            var fieldY = cursorY;
            if (input.align != Blockly.ALIGN_LEFT) {
                var fieldRightX = inputRows.statementEdge - input.fieldWidth -
                    2 * Blockly.BlockSvg.SEP_SPACE_X;
                if (input.align == Blockly.ALIGN_RIGHT) {
                    fieldX += fieldRightX;
                } else if (input.align == Blockly.ALIGN_CENTRE) {
                    fieldX += fieldRightX / 2;
                }
            }
            this.renderFields_(input.fieldRow, fieldX, fieldY);
            cursorX = inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH;
            steps.push('H', cursorX + 1);
            steps.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER);
            var tmpSCount = 0;
            if (row[0].connection.targetBlock()) {
                tmpSCount = this.getStatementCount(row[0].connection.targetBlock());
            }

            if (row[0].connection.targetBlock() && this.checkNextConnection(row[0].connection.targetBlock())) {
                if (tmpSCount )
                steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS - (tmpSCount - 1) * 2 - 5);
                steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
                steps.push('h', 10);
                steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
                steps.push('h', Blockly.BlockSvg.SEP_SPACE_X * 2);
            } else {
                steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS - (tmpSCount - 1) * 2);
                steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
                steps.push('H', inputRows.rightEdge + Blockly.BlockSvg.SEP_SPACE_X * 2);
            }

            if (this.RTL) {
                highlightSteps.push('M',
                    (cursorX - Blockly.BlockSvg.NOTCH_WIDTH +
                     Blockly.BlockSvg.DISTANCE_45_OUTSIDE) +
                    ',' + (cursorY + Blockly.BlockSvg.DISTANCE_45_OUTSIDE));
                highlightSteps.push(
                    Blockly.BlockSvg.INNER_TOP_LEFT_CORNER_HIGHLIGHT_RTL);
                highlightSteps.push('v',
                    row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
                highlightSteps.push(
                    Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_RTL);
                highlightSteps.push('H', inputRows.rightEdge - 0.5);
            } else {
                highlightSteps.push('M',
                    (cursorX - Blockly.BlockSvg.NOTCH_WIDTH +
                     Blockly.BlockSvg.DISTANCE_45_OUTSIDE) + ',' +
                    (cursorY + row.height - Blockly.BlockSvg.DISTANCE_45_OUTSIDE));
                highlightSteps.push(
                    Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER_HIGHLIGHT_LTR);
                highlightSteps.push('H', inputRows.rightEdge - 0.5);
            }
            // Create statement connection.
            connectionX = this.RTL ? -cursorX : cursorX + 1;
            input.connection.setOffsetInBlock(connectionX, cursorY + 1);

            if (input.connection.isConnected()) {
                this.width = Math.max(this.width, inputRows.statementEdge +
                    input.connection.targetBlock().getHeightWidth().width);
            }
            if (y == inputRows.length - 1 || inputRows[y + 1].type == Blockly.NEXT_STATEMENT) {
                // If the final input is a statement stack, add a small row underneath.
                // Consecutive statement stacks are also separated by a small divider.
                //steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
                var tmpD = Blockly.BlockSvg.SEP_SPACE_Y;
                if (row[0].connection.targetBlock() && this.checkNextConnection(row[0].connection.targetBlock())) {
                    tmpD = Blockly.BlockSvg.SEP_SPACE_Y + 7;
                }
                steps.push('a' + (tmpD / 2) + ',' + (tmpD / 2) + ',0,1,1,0,' + tmpD);
                if (this.RTL) {
                    highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
                }
                cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
            }
        }

        if (row.type == Blockly.NEXT_STATEMENT && row[0].connection.targetBlock()) {
            cursorY += row.height;
        } else {
            cursorY += row.height;
        }
    }
    if (!inputRows.length) {
        cursorY = Blockly.BlockSvg.MIN_BLOCK_Y;
        steps.push('V', cursorY);
        if (this.RTL) {
            highlightSteps.push('V', cursorY - 1);
        }
    }
    return cursorY;
};

/**
 * Render the bottom edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @param {number} cursorY Height of block.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawBottom_ =
    function (steps, highlightSteps, cursorY) {
        /* eslint-disable indent */
        this.height += cursorY;  // Add one for the shadow.
        if (this.nextConnection) {
            //steps.push('H', (Blockly.BlockSvg.NOTCH_WIDTH + (this.RTL ? 0.5 : -0.5)) + ' ' + Blockly.BlockSvg.NOTCH_PATH_RIGHT);
            steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH + ' ' + Blockly.BlockSvg.NOTCH_PATH_RIGHT);
            // Create next block connection.
            var connectionX;
            if (this.RTL) {
                connectionX = -Blockly.BlockSvg.NOTCH_WIDTH;
            } else {
                connectionX = Blockly.BlockSvg.NOTCH_WIDTH;
            }
            this.nextConnection.setOffsetInBlock(connectionX, cursorY + 1);
            this.height += 5;  // Height of tab.
        }

        // Should the bottom-left corner be rounded or square?
        if (this.squareBottomLeftCorner_) {
            steps.push('H 0');
            if (!this.RTL) {
                highlightSteps.push('M', '0.5,' + (cursorY - 0.5));
            }
        } else {
            steps.push('H', Blockly.BlockSvg.CORNER_RADIUS);
            steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
                       Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
                       Blockly.BlockSvg.CORNER_RADIUS + ',-' +
                       Blockly.BlockSvg.CORNER_RADIUS);
            if (!this.RTL) {
                highlightSteps.push('M', Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
                    (cursorY - Blockly.BlockSvg.DISTANCE_45_INSIDE));
                highlightSteps.push('A', (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
                    (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
                    '0.5,' + (cursorY - Blockly.BlockSvg.CORNER_RADIUS));
            }
        }
    };  /* eslint-enable indent */

/**
 * Render the left edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawLeft_ = function (steps, highlightSteps) {
    if (this.outputConnection) {
        // Create output connection.
        this.outputConnection.setOffsetInBlock(0, 0);
        //steps.push('V', this.height);
        //steps.push('V', Blockly.BlockSvg.TAB_HEIGHT);
        //steps.push('c 0,-10 -' + Blockly.BlockSvg.TAB_WIDTH + ',8 -' +
        //    Blockly.BlockSvg.TAB_WIDTH + ',-7.5 s ' + Blockly.BlockSvg.TAB_WIDTH +
        //    ',2.5 ' + Blockly.BlockSvg.TAB_WIDTH + ',-7.5');
        if (this.checkBooleanConnection(this, true)) {
            var tmpY = (this.height) / 2;
            var tmpX = tmpY / 17.5 * 15;
            steps.push('l-' + tmpX + ',-' + tmpY + ' ' + tmpX + ',-' + tmpY);
        } else {
            var tmpUnit = this.height;
            if (this.getInputsInline()) {
                if (this.height < Blockly.BlockSvg.MIN_BLOCK_Y) {
                    tmpUnit = this.height + 1;
                }
            }

            var tmpR = tmpUnit / 2;
            steps.push('a' + tmpR + ',' + tmpR + ',0,1,1,0,-' + tmpUnit);
        }
        if (this.RTL) {
            highlightSteps.push('M', (Blockly.BlockSvg.TAB_WIDTH * -0.25) + ',8.4');
            highlightSteps.push('l', (Blockly.BlockSvg.TAB_WIDTH * -0.45) + ',-2.1');
        } else {
            highlightSteps.push('V', Blockly.BlockSvg.TAB_HEIGHT - 1.5);
            highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * -0.92) +
                                ',-0.5 q ' + (Blockly.BlockSvg.TAB_WIDTH * -0.19) +
                                ',-5.5 0,-11');
            highlightSteps.push('m', (Blockly.BlockSvg.TAB_WIDTH * 0.92) +
                                ',1 V 0.5 H 1');
        }
        this.width += Blockly.BlockSvg.TAB_WIDTH;
    } else if (!this.RTL) {
        if (this.squareTopLeftCorner_) {
            // Statement block in a stack.
            highlightSteps.push('V', 0.5);
        } else {
            highlightSteps.push('V', Blockly.BlockSvg.CORNER_RADIUS);
        }
    }
    steps.push('z');
};

Blockly.BlockSvg.prototype.checkBooleanConnection = function (obj, checkOut) {
    var flag = false;
    if (checkOut) {
        if (obj.outputConnection && obj.outputConnection.check_ && obj.outputConnection.check_.length == 1 && obj.outputConnection.check_[0] == "Boolean") {
            flag = true;
        }
    } else {
        if (obj.connection && obj.connection.check_ && obj.connection.check_.length == 1 && obj.connection.check_[0] == "Boolean") {
            flag = true;
        }
    }

    return flag;
};

Blockly.BlockSvg.prototype.checkNextConnection = function (targetBlock) {
    var flag = false;
    if (targetBlock) {
        if (targetBlock.nextConnection) {
            if (targetBlock.nextConnection.targetBlock()) {
                flag = this.checkNextConnection(targetBlock.nextConnection.targetBlock());
            } else {
                flag = true;
            }
        }
    }

    return flag;
}

Blockly.BlockSvg.prototype.getStatementCount = function (targetBlock) {
    var value = 1;
    if (targetBlock.nextConnection) {
        if (targetBlock.nextConnection.targetBlock()) {
            value += this.getStatementCount(targetBlock.nextConnection.targetBlock());
        }
    }

    return value;
}