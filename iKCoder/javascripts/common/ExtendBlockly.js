'use strict';

Blockly.Toolbox.prototype.addColour_ = function (opt_tree) {
    var tree = opt_tree || this.tree_;
    var children = tree.getChildren();
    for (var i = 0, child; child = children[i]; i++) {
        //var element = child.getRowElement();
        $(child.getRowElement()).css('border', 'none');
        var element = child.getElement();
        if (element) {
            if (this.hasColours_) {
                var border = '10px solid ' + (child.hexColour || '#ddd');
            } else {
                var border = 'none';
            }
            if (this.workspace_.RTL) {
                element.style.borderRight = border;
            } else {
                element.style.borderLeft = border;
            }
        }
        this.addColour_(child);
    }
};

Blockly.Toolbox.TreeControl.prototype.setSelectedItem = function (node) {
    var toolbox = this.toolbox_;
    if (node == this.selectedItem_ || node == toolbox.tree_) {
        return;
    }
    if (toolbox.lastCategory_) {
        toolbox.lastCategory_.getElement().style.backgroundColor = "";
        //toolbox.lastCategory_.getRowElement().style.backgroundColor = '';
    }
    if (node) {
        var hexColour = node.hexColour || '#57e';
        //node.getRowElement().style.backgroundColor = hexColour;
        node.getElement().style.backgroundColor = hexColour;
        // Add colours to child nodes which may have been collapsed and thus
        // not rendered.
        toolbox.addColour_(node);
    }
    var oldNode = this.getSelectedItem();
    goog.ui.tree.TreeControl.prototype.setSelectedItem.call(this, node);
    if (node && node.blocks && node.blocks.length) {
        toolbox.flyout_.show(node.blocks);
        // Scroll the flyout to the top if the category has changed.
        if (toolbox.lastCategory_ != node) {
            toolbox.flyout_.scrollToStart();
        }
    } else {
        // Hide the flyout.
        toolbox.flyout_.hide();
    }
    if (oldNode != node && oldNode != this) {
        var event = new Blockly.Events.Ui(null, 'category',
            oldNode && oldNode.getHtml(), node && node.getHtml());
        event.workspaceId = toolbox.workspace_.id;
        Blockly.Events.fire(event);
    }
    if (node) {
        toolbox.lastCategory_ = node;
    }
};

Blockly.BlockSvg.TOP_LEFT_CORNER_START = 'm 0.5,1.917';
Blockly.BlockSvg.TOP_LEFT_CORNER = 'c0 -0.783,0.635 -1.417, 1.417 -1.417';
Blockly.BlockSvg.NOTCH_WIDTH = 31.594;
Blockly.BlockSvg.NOTCH_PATH_LEFT = 'l4.419,7.655 h8.839 l4.419,-7.655';
Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'l-4.419,7.655 h-8.839 l-4.419,-7.655';

Blockly.BlockSvg.prototype.renderDrawTop_ = function (steps, highlightSteps, rightEdge) {
    if (this.squareTopLeftCorner_) {
        steps.push('m 0,0');
        highlightSteps.push('m 0.5,0.5');
        if (this.startHat_) {
            steps.push(Blockly.BlockSvg.START_HAT_PATH);
            highlightSteps.push(this.RTL ?
                Blockly.BlockSvg.START_HAT_HIGHLIGHT_RTL :
                Blockly.BlockSvg.START_HAT_HIGHLIGHT_LTR);
        }
    } else {
        steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_START);
        //highlightSteps.push(this.RTL ? Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_RTL : Blockly.BlockSvg.TOP_LEFT_CORNER_START_HIGHLIGHT_LTR);
        // Top-left rounded corner.
        steps.push(Blockly.BlockSvg.TOP_LEFT_CORNER);
        //highlightSteps.push(Blockly.BlockSvg.TOP_LEFT_CORNER_HIGHLIGHT);
    }

    // Top edge.
    if (this.previousConnection) {
        steps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 17.624);
        //highlightSteps.push('H', Blockly.BlockSvg.NOTCH_WIDTH - 16.624);
        steps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT);
        //highlightSteps.push(Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT);
        var connectionX = (this.RTL ?
            -Blockly.BlockSvg.NOTCH_WIDTH : Blockly.BlockSvg.NOTCH_WIDTH);
        this.previousConnection.setOffsetInBlock(connectionX, 0);
    }
    steps.push('H', rightEdge);
    highlightSteps.push('H', rightEdge - 0.5);
    this.width = rightEdge;
};

Blockly.BlockSvg.prototype.renderDrawRight_ = function (steps, highlightSteps, inlineSteps, highlightInlineSteps, inputRows, iconWidth) {
    var cursorX;
    var cursorY = 0;
    var connectionX, connectionY;
    for (var y = 0, row; row = inputRows[y]; y++) {
        cursorX = Blockly.BlockSvg.SEP_SPACE_X;
        if (y == 0) {
            cursorX += this.RTL ? -iconWidth : iconWidth;
        }
        highlightSteps.push('M', (inputRows.rightEdge - 0.5) + ',' +
            (cursorY + 0.5));
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
                cursorX = this.renderFields_(input.fieldRow, fieldX + 1, fieldY);
                if (input.type != Blockly.DUMMY_INPUT) {
                    cursorX += input.renderWidth + Blockly.BlockSvg.SEP_SPACE_X;
                }
                if (input.type == Blockly.INPUT_VALUE) {
                    inlineSteps.push('M', (cursorX - Blockly.BlockSvg.SEP_SPACE_X - 2) +
                                     ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y));
                    inlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 -
                                     input.renderWidth + 2);
                    inlineSteps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
                    //inlineSteps.push('v', input.renderHeight + 1 -
                    //                      Blockly.BlockSvg.TAB_HEIGHT);
                    inlineSteps.push('v', input.renderHeight -
                                          Blockly.BlockSvg.TAB_HEIGHT - 1);
                    inlineSteps.push('h', input.renderWidth + 2 -
                                     Blockly.BlockSvg.TAB_WIDTH - 2);
                    inlineSteps.push('z');
                    if (this.RTL) {
                        // Highlight right edge, around back of tab, and bottom.
                        highlightInlineSteps.push('M',
                            (cursorX - Blockly.BlockSvg.SEP_SPACE_X - 2.5 +
                             Blockly.BlockSvg.TAB_WIDTH - input.renderWidth) + ',' +
                            (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 0.5));
                        highlightInlineSteps.push(
                            Blockly.BlockSvg.TAB_PATH_DOWN_HIGHLIGHT_RTL);
                        highlightInlineSteps.push('v',
                            input.renderHeight - Blockly.BlockSvg.TAB_HEIGHT + 2.5);
                        highlightInlineSteps.push('h',
                            input.renderWidth - Blockly.BlockSvg.TAB_WIDTH + 2);
                    } else {
                        // Highlight right edge, bottom.
                        highlightInlineSteps.push('M',
                            (cursorX - Blockly.BlockSvg.SEP_SPACE_X + 0.5) + ',' +
                            (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 0.5));
                        highlightInlineSteps.push('v', input.renderHeight + 1);
                        highlightInlineSteps.push('h', Blockly.BlockSvg.TAB_WIDTH - 2 -
                                                       input.renderWidth);
                        // Short highlight glint at bottom of tab.
                        highlightInlineSteps.push('M',
                            (cursorX - input.renderWidth - Blockly.BlockSvg.SEP_SPACE_X +
                             0.9) + ',' + (cursorY + Blockly.BlockSvg.INLINE_PADDING_Y +
                             Blockly.BlockSvg.TAB_HEIGHT - 0.7));
                        highlightInlineSteps.push('l',
                            (Blockly.BlockSvg.TAB_WIDTH * 0.46) + ',-2.1');
                    }
                    // Create inline input connection.
                    if (this.RTL) {
                        connectionX = -cursorX -
                            Blockly.BlockSvg.TAB_WIDTH + Blockly.BlockSvg.SEP_SPACE_X +
                            input.renderWidth + 1;
                    } else {
                        connectionX = cursorX +
                            Blockly.BlockSvg.TAB_WIDTH - Blockly.BlockSvg.SEP_SPACE_X -
                            input.renderWidth - 2;
                    }
                    //connectionY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y + 1;
                    connectionY = cursorY + Blockly.BlockSvg.INLINE_PADDING_Y;
                    input.connection.setOffsetInBlock(connectionX, connectionY);
                }
            }

            cursorX = Math.max(cursorX, inputRows.rightEdge);
            this.width = Math.max(this.width, cursorX);
            steps.push('H', cursorX);
            highlightSteps.push('H', cursorX - 0.5);
            steps.push('v', row.height);
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
            steps.push(Blockly.BlockSvg.TAB_PATH_DOWN);
            var v = row.height - Blockly.BlockSvg.TAB_HEIGHT;
            steps.push('v', v);
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
                inputRows.rightEdge;
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
            steps.push('v', row.height);
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
            steps.push('H', cursorX);
            steps.push(Blockly.BlockSvg.INNER_TOP_LEFT_CORNER);
            steps.push('v', row.height - 2 * Blockly.BlockSvg.CORNER_RADIUS);
            steps.push(Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER);
            steps.push('H', inputRows.rightEdge + 1);
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
            if (y == inputRows.length - 1 ||
                inputRows[y + 1].type == Blockly.NEXT_STATEMENT) {
                // If the final input is a statement stack, add a small row underneath.
                // Consecutive statement stacks are also separated by a small divider.
                steps.push('v', Blockly.BlockSvg.SEP_SPACE_Y);
                if (this.RTL) {
                    highlightSteps.push('v', Blockly.BlockSvg.SEP_SPACE_Y - 1);
                }
                cursorY += Blockly.BlockSvg.SEP_SPACE_Y;
            }
        }
        cursorY += row.height;
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

Blockly.BlockSvg.prototype.renderDrawBottom_ = function (steps, highlightSteps, cursorY) {
    /* eslint-disable indent */
    this.height += cursorY + 1;
    if (this.nextConnection) {
        steps.push('H', (Blockly.BlockSvg.NOTCH_WIDTH + (this.RTL ? 0.5 : -0.5)) +
            ' ' + Blockly.BlockSvg.NOTCH_PATH_RIGHT);
        // Create next block connection.
        var connectionX;
        if (this.RTL) {
            connectionX = -Blockly.BlockSvg.NOTCH_WIDTH;
        } else {
            connectionX = Blockly.BlockSvg.NOTCH_WIDTH;
        }
        this.nextConnection.setOffsetInBlock(connectionX, cursorY);
        this.height += 4;  // Height of tab.
    }

    // Should the bottom-left corner be rounded or square?
    if (this.squareBottomLeftCorner_) {
        steps.push('H 0');
        if (!this.RTL) {
            highlightSteps.push('M', '0.5,' + (cursorY - 0.5));
        }
    } else {
        //steps.push('H', Blockly.BlockSvg.CORNER_RADIUS);
        //steps.push('a', Blockly.BlockSvg.CORNER_RADIUS + ',' +
        //           Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,1 -' +
        //           Blockly.BlockSvg.CORNER_RADIUS + ',-' +
        //           Blockly.BlockSvg.CORNER_RADIUS);
        steps.push('H', 1.917);
        steps.push('c-0.783 0, -1.417 -0.635, -1.417 -1.417');

        if (!this.RTL) {
            highlightSteps.push('M', Blockly.BlockSvg.DISTANCE_45_INSIDE + ',' +
                (cursorY - Blockly.BlockSvg.DISTANCE_45_INSIDE));
            highlightSteps.push('A', (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ',' +
                (Blockly.BlockSvg.CORNER_RADIUS - 0.5) + ' 0 0,1 ' +
                '0.5,' + (cursorY - Blockly.BlockSvg.CORNER_RADIUS));
        }
    }
};