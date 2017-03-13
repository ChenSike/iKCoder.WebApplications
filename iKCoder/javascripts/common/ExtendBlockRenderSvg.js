/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Methods for graphically rendering a block as SVG.
 * @author fenichel@google.com (Rachel Fenichel)
 */

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
Blockly.BlockSvg.MIN_BLOCK_Y = 26;
/**
 * Height of horizontal puzzle tab.
 * @const
 */
Blockly.BlockSvg.TAB_HEIGHT = 20;
/**
 * Width of horizontal puzzle tab.
 * @const
 */
Blockly.BlockSvg.TAB_WIDTH = 8;
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
Blockly.BlockSvg.START_HAT_PATH = 'c 30,-' + Blockly.BlockSvg.START_HAT_HEIGHT + ' 70,-' + Blockly.BlockSvg.START_HAT_HEIGHT + ' 100,0';
/**
 * Distance from shape edge to intersect with a curved corner at 45 degrees.
 * Applies to highlighting on around the inside of a curve.
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_INSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + 0.5;
/**
 * Distance from shape edge to intersect with a curved corner at 45 degrees.
 * Applies to highlighting on around the outside of a curve.
 * @const
 */
Blockly.BlockSvg.DISTANCE_45_OUTSIDE = (1 - Math.SQRT1_2) * (Blockly.BlockSvg.CORNER_RADIUS + 0.5) - 0.5;
/**
 * SVG path for drawing next/previous notch from left to right.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_LEFT = 'l 5,7 8,0 5,-7';
/**
 * SVG path for drawing next/previous notch from right to left.
 * @const
 */
Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'l -5,7 -8,0 -5,-7';
/**
 * SVG path for drawing jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH = 'l 8,0 0,4 8,4 -16,8 8,4';
/**
 * Height of SVG path for jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH_HEIGHT = 20;
/**
 * Width of SVG path for jagged teeth at the end of collapsed blocks.
 * @const
 */
Blockly.BlockSvg.JAGGED_TEETH_WIDTH = 15;
/**
 * SVG start point for drawing the top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER_START =
    'm 0,' + Blockly.BlockSvg.CORNER_RADIUS;
/**
 * SVG path for drawing the rounded top-left corner.
 * @const
 */
Blockly.BlockSvg.TOP_LEFT_CORNER =
    'A ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',0';
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
 * Render the block.
 * Lays out and reflows a block based on its contents and settings.
 * @param {boolean=} opt_bubble If false, just render this block.
 *   If true, also render block's parent, grandparent, etc.  Defaults to true.
 */
Blockly.BlockSvg.prototype.render = function (opt_bubble) {
    Blockly.Field.startCache();
    this.rendered = true;
    this.cateIconRadius = 0;
    this.cateIconX = 0;

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
Blockly.BlockSvg.prototype.renderFields_ = function (fieldList, cursorX, cursorY, isInput) {
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
            root.setAttribute('transform', 'translate(' + cursorX + ',' + cursorY + ')');
            if (field.renderWidth) {
                cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
            }
        } else {
            var tmpX = cursorX + field.renderSep;
            root.setAttribute('transform', 'translate(' + tmpX + ',' + cursorY + ')');
            if (field.renderWidth) {
                cursorX += field.renderSep + field.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
            }
        }
    }

    return this.RTL ? -cursorX : cursorX;
};

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
        inputRows.rightEdge = Math.max(inputRows.rightEdge, Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X);
    }
    var fieldValueWidth = 0;
    var fieldStatementWidth = 0;
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
        input.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
        if (input.connection && input.connection.isConnected()) {
            var linkedBlock = input.connection.targetBlock();
            var bBox = linkedBlock.getHeightWidth();
            input.renderHeight = Math.max(input.renderHeight, bBox.height);
            //input.renderWidth = Math.max(input.renderWidth, bBox.width);
        }

        if (isInline && input.type == Blockly.INPUT_VALUE) {
            //input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X * 1.25;
            if (this.checkBooleanConnection(input)) {
                //input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + input.renderHeight / 2 / 17.5 * 15 * 2;
                input.renderWidth = input.renderHeight / 2 / 17.5 * 15 * 2 + Blockly.BlockSvg.SEP_SPACE_X * 1.25;
            } else {
                //input.renderWidth = Blockly.BlockSvg.TAB_WIDTH + input.renderHeight / 2 * 2;
                input.renderWidth = input.renderHeight / 2 * 2 + Blockly.BlockSvg.SEP_SPACE_X * 1.25;
            }
        } else {
            input.renderWidth = 0;
        }

        if (input.connection && input.connection.isConnected()) {
            var linkedBlock = input.connection.targetBlock();
            var bBox = linkedBlock.getHeightWidth();
            input.renderWidth = Math.max(input.renderWidth, bBox.width);
        }

        if (!isInline && i == inputList.length - 1) {
            //input.renderHeight--;
        } else if (!isInline && input.type == Blockly.INPUT_VALUE && inputList[i + 1] && inputList[i + 1].type == Blockly.NEXT_STATEMENT) {
            //input.renderHeight--;
        }

        row.height = Math.max(row.height, input.renderHeight);
        input.fieldWidth = 0;
        if (inputRows.length == 1) {
            input.fieldWidth += this.RTL ? -iconWidth : iconWidth;
        }
        var previousFieldEditable = false;
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
            if (j != 0) {
                input.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X;
            }
            var fieldSize = field.getSize();
            field.renderWidth = fieldSize.width;
            field.renderSep = (previousFieldEditable && field.EDITABLE) ? Blockly.BlockSvg.SEP_SPACE_X : 0;
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
    }

    inputRows.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X + fieldStatementWidth;
    if (hasStatement) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH);
    } else {
        //inputRows.rightEdge = Math.max(inputRows.rightEdge, inputRows[0][0].renderHeight / 2 + Blockly.BlockSvg.SEP_SPACE_X);
    }

    if (hasValue) {
        inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth + Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.TAB_WIDTH);
    } else if (hasDummy) {
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
    var cursorY = this.renderDrawRight_(steps, highlightSteps, inlineSteps, highlightInlineSteps, inputRows, iconWidth);
    this.renderDrawBottom_(steps, highlightSteps, cursorY);
    this.renderDrawLeft_(steps, highlightSteps);
    var pathString = steps.join(' ') + '\n' + inlineSteps.join(' ');
    this.svgPath_.setAttribute('d', pathString);
    //this.svgPathDark_.setAttribute('d', pathString);
    this.svgPathDark_.setAttribute('d', '');
    //pathString = highlightSteps.join(' ') + '\n' + highlightInlineSteps.join(' ');
    //this.svgPathLight_.setAttribute('d', pathString);
    this.svgPathLight_.setAttribute('d', '');
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
    // Don't tighten previous or output connections because they are inferior
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
Blockly.BlockSvg.prototype.renderDrawTop_ = function (steps, highlightSteps, rightEdge) {
    /* eslint-disable indent */
    // Position the cursor at the top-left starting point.
    if (this.squareTopLeftCorner_) {
        steps.push('m 0,0');
        if (this.startHat_) {
            steps.push(Blockly.BlockSvg.START_HAT_PATH);
        }
    } else {
        if (this.getEventIcon()) {
            steps.push('m ' + (Blockly.BlockSvg.NOTCH_WIDTH - 18 + 4) + ',0');
        } else {
            steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
            steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
        }
    }

    // Top edge.
    if (this.previousConnection) {
        steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 18);
        steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
        var connectionX = (this.RTL ? -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
        this.previousConnection.setOffsetInBlock(connectionX, 0);
    }

    steps.push('H', rightEdge);
    this.width = rightEdge;
};

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
Blockly.BlockSvg.prototype.renderDrawRight_ = function (steps, highlightSteps, inlineSteps, highlightInlineSteps, inputRows, iconWidth) {
    var cursorX;
    var cursorY = 0;
    var connectionX, connectionY;
    var maxRowHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
    this.cateIconRadius = 0;
    this.cateIconX = 0;
    for (var i = 0, row; row = inputRows[i]; i++) {
        maxRowHeight = Math.max(maxRowHeight, row.height);
    }

    for (var y = 0, row; row = inputRows[y]; y++) {
        cursorX = Blockly.BlockSvg.SEP_SPACE_X;
        if (y == 0) {
            cursorX += this.RTL ? -iconWidth : iconWidth;
        }

        if (this.isCollapsed()) {
            var input = row[0];
            var fieldX = cursorX;
            var fieldY = cursorY;
            this.renderFields_(input.fieldRow, fieldX, fieldY);
            steps.push(Blockly.BlockSvg.JAGGED_TEETH);
            var remainder = row.height - Blockly.BlockSvg.JAGGED_TEETH_HEIGHT;
            steps.push('v', remainder);
            this.width += Blockly.BlockSvg.JAGGED_TEETH_WIDTH;
        } else if (row.type == Blockly.BlockSvg.INLINE) {
            for (var x = 0, input; input = row[x]; x++) {
                var fieldX = cursorX;
                var fieldY = cursorY;
                if (row.thicker) {
                    fieldY += Blockly.BlockSvg.INLINE_PADDING_Y;
                }
                cursorX = this.renderFields_(input.fieldRow, fieldX, fieldY, true);
                if (input.type != Blockly.DUMMY_INPUT) {
                    cursorX += input.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
                }
                if (input.type == Blockly.INPUT_VALUE) {
                    inlineSteps.push('M', (cursorX) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y));
                    //inlineSteps.push('l0,-5 -10,0 0,20 10,0 0,-15');
                    //inlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 - input.renderWidth + 2);                    
                    //inlineSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
                    if (this.checkBooleanConnection(input)) {
                        var tmpY = (input.renderHeight) / 2;
                        var tmpX = tmpY / 17.5 * 15;
                        inlineSteps.push('m', -(tmpX + Blockly.BlockSvg.SEP_SPACE_X) + ',0');
                        //inlineSteps.push('l0,5 0-5');
                        inlineSteps.push('h', -(input.renderWidth - tmpX * 2));
                        //inlineSteps.push('l0,5 0-5');
                        inlineSteps.push('l-' + tmpX + ',' + tmpY + ' ' + tmpX + ',' + tmpY);
                        inlineSteps.push('h' + (input.renderWidth - tmpX * 2));
                        inlineSteps.push('l' + tmpX + ',-' + tmpY + ' -' + tmpX + ',-' + tmpY);
                    } else {
                        var tmpUnit = input.renderHeight;
                        if (this.getInputsInline()) {
                            if (input.renderHeight < Blockly.BlockSvg.MIN_BLOCK_Y) {
                                tmpUnit = input.renderHeight + 1;
                            }
                        }

                        var tmpR = tmpUnit / 2;
                        inlineSteps.push('m', -(tmpR + Blockly.BlockSvg.SEP_SPACE_X) + ',0');
                        //inlineSteps.push('l0,5 0,-5');
                        inlineSteps.push('h', -(input.renderWidth - tmpR * 2));
                        //inlineSteps.push('l0,5 0-5');
                        inlineSteps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,' + tmpUnit);
                        inlineSteps.push('h' + (input.renderWidth - tmpR * 2));
                        inlineSteps.push('a' + tmpR + ',' + tmpR + ',0,1,0,0,-' + tmpUnit);
                    }

                    //inlineSteps.push('v', input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT);
                    //inlineSteps.push('h', input.renderWidth + 2 - Blockly.BlockSvg.TAB_WIDTH - 2);
                    inlineSteps.push('z');
                    if (this.RTL) {
                        //connectionX = -cursorX - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + input.renderWidth + 1;
                        connectionX = -cursorX - Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X + input.renderWidth;
                    } else {
                        //connectionX = cursorX + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - input.renderWidth - 1;
                        //connectionX = cursorX + Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X - input.renderWidth;
                        var tmpUnit = 0;
                        if (this.checkBooleanConnection(input)) {
                            tmpUnit = (input.renderHeight) / 2 / 17.5 * 15;
                        } else {
                            tmpUnit = input.renderHeight / 2;
                            if (this.getInputsInline()) {
                                if (input.renderHeight < Blockly.BlockSvg.MIN_BLOCK_Y) {
                                    tmpUnit = (input.renderHeight + 1) / 2;
                                }
                            }
                        }

                        connectionX = cursorX + tmpUnit - Blockly.BlockSvg.SEP_SPACE_X - input.renderWidth;
                    }
                    //connectionY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 1;
                    connectionY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y;
                    input.connection.setOffsetInBlock(connectionX, connectionY);
                }
            }

            cursorX = Math.max(cursorX, inputRows.rightEdge);
            if (y == 0 && this.getCategoryIcon() && !this.outputConnection && (this.nextConnection || this.previousConnection)) {
                this.cateIconRadius = (row.height) / 2;
                cursorX += this.cateIconRadius;
                this.cateIconX = cursorX;
            }

            this.width = Math.max(this.width, cursorX);
            steps.push('H', cursorX);
            //steps.push('v', row.height);
            if (this.checkBooleanConnection(this, true)) {
                var tmpY = row.height / 2;
                var tmpX = tmpY / 17.5 * 15;
                steps.push('l' + tmpX + ',' + tmpY + ' -' + tmpX + ', ' + tmpY);
            } else {
                var tmpR = row.height / 2;
                steps.push('a' + tmpR + ',' + tmpR + ',0,1,1,0,' + (tmpR * 2));
            }
        } else if (row.type == Blockly.INPUT_VALUE) {
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
            var tmpCursorX = this.renderFields_(input.fieldRow, fieldX, fieldY, true);
            //steps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
            var tmpY = row.height / 2;
            var tmpX = row.height / 2;
            var isBooleanConn = false;
            if (this.checkBooleanConnection(input)) {
                tmpX = tmpY / 17.5 * 15;
                isBooleanConn = true;
            }

            maxRowHeight = (isBooleanConn ? maxRowHeight / 2 / 17.5 * 15 : maxRowHeight / 2);
            maxRowHeight = Math.max(maxRowHeight, Blockly.BlockSvg.SEP_SPACE_X * 2);
            if (y == 0) {
                steps.push('h' + maxRowHeight);
            } else {
                if (input.align == Blockly.ALIGN_RIGHT) {
                    steps.push('H' + (tmpCursorX + maxRowHeight + 10));
                } else {
                    steps.push('h' + (maxRowHeight - Blockly.BlockSvg.SEP_SPACE_X * 2));
                }
            }

            if (isBooleanConn) {
                steps.push('l-' + tmpX + ',' + tmpY + ' ' + tmpX + ', ' + tmpY);
                connectionX = this.RTL ? -inputRows.rightEdge : inputRows.rightEdge + maxRowHeight;
                if (y > 0) {
                    //connectionX += 10;
                }
            } else {
                steps.push('a' + tmpX + ',' + tmpX + ',0,1,0,0,' + (tmpX * 2));
                connectionX = this.RTL ? -inputRows.rightEdge : inputRows.rightEdge + maxRowHeight;
            }

            input.connection.setOffsetInBlock(connectionX, cursorY);
            if (input.connection.isConnected()) {
                this.width = Math.max(this.width, inputRows.rightEdge + input.connection.targetBlock().getHeightWidth().width - Blockly.BlockSvg.TAB_WIDTH);
                this.width += maxRowHeight;
            }

        } else if (row.type == Blockly.DUMMY_INPUT) {
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
            this.renderFields_(input.fieldRow, fieldX, fieldY, true);
            //steps.push('v', row.height);
            if (this.checkBooleanConnection(this, true)) {
                var tmpY = (row.height) / 2;
                var tmpX = tmpY / 17.5 * 15;
                steps.push('l' + tmpX + ',' + tmpY + ' -' + tmpX + ', ' + tmpY);
            } else {
                var tmpR = (row.height) / 2;
                steps.push('a' + tmpR + ',' + tmpR + ',0,1,1,0,' + (tmpR * 2));
            }
        } else if (row.type == Blockly.NEXT_STATEMENT) {
            var input = row[0];
            if (y == 0) {
                steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
                cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
            }

            var fieldX = cursorX;
            var fieldY = cursorY;
            if (input.align != Blockly.ALIGN_LEFT) {
                var fieldRightX = inputRows.statementEdge - input.fieldWidth - 2 * Blockly.BlockSvg.SEP_SPACE_X;
                if (input.align == Blockly.ALIGN_RIGHT) {
                    fieldX += fieldRightX;
                } else if (input.align == Blockly.ALIGN_CENTRE) {
                    fieldX += fieldRightX / 2;
                }
            }

            this.renderFields_(input.fieldRow, fieldX, fieldY);
            cursorX = inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH;
            steps.push('H', cursorX);
            //steps.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER);
            steps.push(Blockly.BlockSvg.NOTCH_PATH_RIGHT);
            steps.push(' h -' + (Blockly.BlockSvg.NOTCH_WIDTH - 18 - Blockly.BlockSvg.CORNER_RADIUS));
            steps.push(' a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' + Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS);
            //steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
            //if (input.connection.targetBlock() && this.checkNextConnection(input.connection.targetBlock())) {
            //    steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS - 7);
            //    steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
            //    //cursorY -= 7;
            //} else {
            //    steps.push('v', row.height - Blockly.BlockSvg.CORNER_RADIUS);
            //}
            var tmpV = row.height - Blockly.BlockSvg.CORNER_RADIUS - 7;
            if (tmpV < Blockly.BlockSvg.MIN_BLOCK_Y - Blockly.BlockSvg.CORNER_RADIUS) {
                tmpV = Blockly.BlockSvg.MIN_BLOCK_Y - Blockly.BlockSvg.CORNER_RADIUS
            }
            steps.push('v', tmpV);

            steps.push('h', Blockly.BlockSvg.NOTCH_WIDTH - 18);
            steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
            steps.push('h', Blockly.BlockSvg.SEP_SPACE_X * 2);
            //steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
            //steps.push('H', inputRows.rightEdge);
            //connectionX = this.RTL ? -cursorX : cursorX + 1;
            connectionX = this.RTL ? -cursorX : cursorX;
            //input.connection.setOffsetInBlock(connectionX, cursorY + 1);
            input.connection.setOffsetInBlock(connectionX, cursorY);

            if (input.connection.isConnected()) {
                this.width = Math.max(this.width, inputRows.statementEdge +
                    input.connection.targetBlock().getHeightWidth().width);
            }

            if (y == inputRows.length - 1 || inputRows[y + 1].type == Blockly.NEXT_STATEMENT) {
                var tmpD = Blockly.BlockSvg.SEP_SPACE_Y + 7;
                steps.push('a' + (tmpD / 2) + ',' + (tmpD / 2) + ',0,1,1,0,' + tmpD);
                cursorY += Blockly.BlockSvg.SEP_SPACE_Y + 7;
            }

            if (input.connection.targetBlock()) {
                cursorY -= 7;
            }
        }

        cursorY += row.height;
    }

    if (!inputRows.length) {
        cursorY = Blockly.BlockSvg.MIN_BLOCK_Y;
        steps.push('V', cursorY);
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
Blockly.BlockSvg.prototype.renderDrawBottom_ = function (steps, highlightSteps, cursorY) {
    //this.height += cursorY + 1;  // Add one for the shadow.
    this.height += cursorY;
    if (this.nextConnection) {
        steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH);
        steps.push(Blockly.BlockSvg.NOTCH_PATH_RIGHT);
        // Create next block connection.
        var connectionX;
        if (this.RTL) {
            connectionX = -Blockly.BlockSvg.NOTCH_WIDTH;
        } else {
            connectionX = Blockly.BlockSvg.NOTCH_WIDTH;
        }
        //this.nextConnection.setOffsetInBlock(connectionX, cursorY + 1);
        this.nextConnection.setOffsetInBlock(connectionX, cursorY);
        //this.height += 4;  // Height of tab.
    }

    // Should the bottom-left corner be rounded or square?
    if (this.squareBottomLeftCorner_) {
        steps.push('H 0');
    } else {
        steps.push('H', Blockly.BlockSvg.CORNER_RADIUS);
        if (!this.getEventIcon()) {
            steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' + Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' + Blockly.BlockSvg.CORNER_RADIUS + ',-' + Blockly.BlockSvg.CORNER_RADIUS);
        }
    }
};

/**
 * Render the left edge of the block.
 * @param {!Array.<string>} steps Path of block outline.
 * @param {!Array.<string>} highlightSteps Path of block highlights.
 * @private
 */
Blockly.BlockSvg.prototype.renderDrawLeft_ = function (steps, highlightSteps) {
    if (this.outputConnection) {
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

            var tmpX = tmpUnit / 2;
            steps.push('a' + tmpX + ',' + tmpX + ',0,1,1,0,-' + tmpX * 2);
        }

        steps.push('z');
        this.outputConnection.setOffsetInBlock(0 - tmpX, 0);
        this.width += Blockly.BlockSvg.TAB_WIDTH;
    } else {

        if (this.getEventIcon()) {
            var tmpR = (Blockly.BlockSvg.MIN_BLOCK_Y + 10) / 2;
            steps.push('a' + tmpR + ',' + tmpR + ',0,1,1,' + (Blockly.BlockSvg.NOTCH_WIDTH - 18 + 1) + ',-' + Blockly.BlockSvg.MIN_BLOCK_Y);
            steps.push('L' + (Blockly.BlockSvg.NOTCH_WIDTH - 18 + 4) + ',0');
            steps.push('z');
            if (!this.svgEventIcon_) {
                this.svgEventIcon_ = Blockly.utils.createSvgElement('g', { 'transform': 'translate(-15.5,-6)' }, this.svgGroup_);
                Blockly.utils.createSvgElement('image', { 'class': 'blocklyTypeIcon', 'height': '28px', 'width': '28px', 'href': "images/icon/" + this.getEventIcon() }, this.svgEventIcon_);
            } else {
                if (this.nextConnection.targetBlock()) {
                    this.svgEventIcon_.setAttribute('transform', 'translate(-17.5,-6)');
                } else {
                    this.svgEventIcon_.setAttribute('transform', 'translate(-15.5,-6)');
                }
            }
        } else {
            steps.push('z');
        }

        if (this.getCategoryIcon()) {
            var tmpSize = (this.cateIconRadius - 2) * 2;
            var tmpX = this.cateIconX - this.cateIconRadius + 2;
            if (!this.svgCategoryIcon_) {
                this.svgCategoryIconRoot_ = Blockly.utils.createSvgElement('g', { 'transform': 'translate(' + tmpX + ',2)' }, this.svgGroup_);
                this.svgCategoryIcon_ = Blockly.utils.createSvgElement('image', { 'class': 'blocklyTypeIcon', 'height': tmpSize + 'px', 'width': tmpSize + 'px', 'href': "images/icon/" + this.getCategoryIcon() }, this.svgCategoryIconRoot_);
            } else {
                this.svgCategoryIconRoot_.setAttribute('transform', 'translate(' + tmpX + ',2)');
                this.svgCategoryIcon_.setAttribute('height', tmpSize + 'px');
                this.svgCategoryIcon_.setAttribute('width', tmpSize + 'px');
            }
        }
    }
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