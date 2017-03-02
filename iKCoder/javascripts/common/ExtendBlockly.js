'use strict';

Blockly.Block.prototype.stroke_ = '#000000';

Blockly.Block.prototype.getStroke = function () {
    return this.stroke_;
};

Blockly.Block.prototype.setStroke = function (stroke) {
    var hue = parseFloat(stroke);
    if (!isNaN(hue)) {
        this.stroke_ = Blockly.hueToRgb(hue);
    } else if (goog.isString(stroke) && stroke.match(/^#[0-9a-fA-F]{6}$/)) {
        this.stroke_ = stroke;
    } else {
        throw 'Invalid stroke: ' + stroke;
    }
};

Blockly.Xml.blockToDom = function (block, opt_noId) {
    var element = goog.dom.createDom(block.isShadow() ? 'shadow' : 'block');
    element.setAttribute('type', block.type);
    if (!opt_noId) {
        element.setAttribute('id', block.id);
    }

    if (block.mutationToDom) {
        var mutation = block.mutationToDom();
        if (mutation && (mutation.hasChildNodes() || mutation.hasAttributes())) {
            element.appendChild(mutation);
        }
    }

    function fieldToDom(field) {
        if (field.name && field.EDITABLE) {
            var container = goog.dom.createDom('field', null, field.getValue());
            container.setAttribute('name', field.name);
            element.appendChild(container);
        }
    }

    for (var i = 0, input; input = block.inputList[i]; i++) {
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
            fieldToDom(field);
        }
    }

    var commentText = block.getCommentText();
    if (commentText) {
        var commentElement = goog.dom.createDom('comment', null, commentText);
        if (typeof block.comment == 'object') {
            commentElement.setAttribute('pinned', block.comment.isVisible());
            var hw = block.comment.getBubbleSize();
            commentElement.setAttribute('h', hw.height);
            commentElement.setAttribute('w', hw.width);
        }

        element.appendChild(commentElement);
    }

    if (block.data) {
        var dataElement = goog.dom.createDom('data', null, block.data);
        element.appendChild(dataElement);
    }

    for (var i = 0, input; input = block.inputList[i]; i++) {
        var container;
        var empty = true;
        if (input.type == Blockly.DUMMY_INPUT) {
            continue;
        } else {
            var childBlock = input.connection.targetBlock();
            if (input.type == Blockly.INPUT_VALUE) {
                container = goog.dom.createDom('value');
            } else if (input.type == Blockly.NEXT_STATEMENT) {
                container = goog.dom.createDom('statement');
            }

            var shadow = input.connection.getShadowDom();
            if (shadow && (!childBlock || !childBlock.isShadow())) {
                container.appendChild(Blockly.Xml.cloneShadow_(shadow));
            }

            if (childBlock) {
                container.appendChild(Blockly.Xml.blockToDom(childBlock, opt_noId));
                empty = false;
            }
        }

        container.setAttribute('name', input.name);
        if (!empty) {
            element.appendChild(container);
        }
    }

    if (block.inputsInlineDefault != block.inputsInline) {
        element.setAttribute('inline', block.inputsInline);
    }

    if (block.isCollapsed()) {
        element.setAttribute('collapsed', true);
    }

    if (block.disabled) {
        element.setAttribute('disabled', true);
    }

    if (!block.isDeletable() && !block.isShadow()) {
        element.setAttribute('deletable', false);
    }

    if (!block.isMovable() && !block.isShadow()) {
        element.setAttribute('movable', false);
    }

    if (!block.isEditable()) {
        element.setAttribute('editable', false);
    }

    var nextBlock = block.getNextBlock();
    if (nextBlock) {
        var container = goog.dom.createDom('next', null,
            Blockly.Xml.blockToDom(nextBlock, opt_noId));
        element.appendChild(container);
    }

    var shadow = block.nextConnection && block.nextConnection.getShadowDom();
    if (shadow && (!nextBlock || !nextBlock.isShadow())) {
        container.appendChild(Blockly.Xml.cloneShadow_(shadow));
    }

    element.setAttribute('colour', block.getColour());
    element.setAttribute('stroke', block.getStroke());
    return element;
};

Blockly.Xml.domToBlockHeadless_ = function (xmlBlock, workspace) {
    var block = null;
    var prototypeName = xmlBlock.getAttribute('type');
    goog.asserts.assert(prototypeName, 'Block type unspecified: %s', xmlBlock.outerHTML);
    var id = xmlBlock.getAttribute('id');
    block = workspace.newBlock(prototypeName, id);
    var currentColor = xmlBlock.getAttribute('colour');
    if (currentColor) {
        block.setColour(currentColor);
    }

    var currentStroke = xmlBlock.getAttribute('stroke');
    if (currentStroke) {
        block.setStroke(currentStroke);
    }

    var blockChild = null;
    for (var i = 0, xmlChild; xmlChild = xmlBlock.childNodes[i]; i++) {
        if (xmlChild.nodeType == 3) {
            continue;
        }

        var input;
        var childBlockNode = null;
        var childShadowNode = null;
        for (var j = 0, grandchildNode; grandchildNode = xmlChild.childNodes[j];
             j++) {
            if (grandchildNode.nodeType == 1) {
                if (grandchildNode.nodeName.toLowerCase() == 'block') {
                    childBlockNode = grandchildNode;
                } else if (grandchildNode.nodeName.toLowerCase() == 'shadow') {
                    childShadowNode = grandchildNode;
                }
            }
        }

        if (!childBlockNode && childShadowNode) {
            childBlockNode = childShadowNode;
        }

        var name = xmlChild.getAttribute('name');
        switch (xmlChild.nodeName.toLowerCase()) {
            case 'mutation':
                if (block.domToMutation) {
                    block.domToMutation(xmlChild);
                    if (block.initSvg) {
                        block.initSvg();
                    }
                }
                break;
            case 'comment':
                block.setCommentText(xmlChild.textContent);
                var visible = xmlChild.getAttribute('pinned');
                if (visible && !block.isInFlyout) {
                    setTimeout(function () {
                        if (block.comment && block.comment.setVisible) {
                            block.comment.setVisible(visible == 'true');
                        }
                    }, 1);
                }

                var bubbleW = parseInt(xmlChild.getAttribute('w'), 10);
                var bubbleH = parseInt(xmlChild.getAttribute('h'), 10);
                if (!isNaN(bubbleW) && !isNaN(bubbleH) &&
                    block.comment && block.comment.setVisible) {
                    block.comment.setBubbleSize(bubbleW, bubbleH);
                }

                break;
            case 'data':
                block.data = xmlChild.textContent;
                break;
            case 'title':
            case 'field':
                var field = block.getField(name);
                if (!field) {
                    console.warn('Ignoring non-existent field ' + name + ' in block ' +
                                 prototypeName);
                    break;
                }

                field.setValue(xmlChild.textContent);
                break;
            case 'value':
            case 'statement':
                input = block.getInput(name);
                if (!input) {
                    console.warn('Ignoring non-existent input ' + name + ' in block ' +
                                 prototypeName);
                    break;
                }

                if (childShadowNode) {
                    input.connection.setShadowDom(childShadowNode);
                }

                if (childBlockNode) {
                    blockChild = Blockly.Xml.domToBlockHeadless_(childBlockNode,
                        workspace);
                    if (blockChild.outputConnection) {
                        input.connection.connect(blockChild.outputConnection);
                    } else if (blockChild.previousConnection) {
                        input.connection.connect(blockChild.previousConnection);
                    } else {
                        goog.asserts.fail(
                            'Child block does not have output or previous statement.');
                    }
                }

                break;
            case 'next':
                if (childShadowNode && block.nextConnection) {
                    block.nextConnection.setShadowDom(childShadowNode);
                }

                if (childBlockNode) {
                    goog.asserts.assert(block.nextConnection,
                        'Next statement does not exist.');
                    // If there is more than one XML 'next' tag.
                    goog.asserts.assert(!block.nextConnection.isConnected(),
                        'Next statement is already connected.');
                    blockChild = Blockly.Xml.domToBlockHeadless_(childBlockNode,
                        workspace);
                    goog.asserts.assert(blockChild.previousConnection,
                        'Next block does not have previous statement.');
                    block.nextConnection.connect(blockChild.previousConnection);
                }

                break;
            default:
                console.warn('Ignoring unknown tag: ' + xmlChild.nodeName);
        }
    }

    var inline = xmlBlock.getAttribute('inline');
    if (inline) {
        block.setInputsInline(inline == 'true');
    }

    var disabled = xmlBlock.getAttribute('disabled');
    if (disabled) {
        block.setDisabled(disabled == 'true');
    }

    var deletable = xmlBlock.getAttribute('deletable');
    if (deletable) {
        block.setDeletable(deletable == 'true');
    }

    var movable = xmlBlock.getAttribute('movable');
    if (movable) {
        block.setMovable(movable == 'true');
    }

    var editable = xmlBlock.getAttribute('editable');
    if (editable) {
        block.setEditable(editable == 'true');
    }

    var collapsed = xmlBlock.getAttribute('collapsed');
    if (collapsed) {
        block.setCollapsed(collapsed == 'true');
    }

    if (xmlBlock.nodeName.toLowerCase() == 'shadow') {
        // Ensure all children are also shadows.
        var children = block.getChildren();
        for (var i = 0, child; child = children[i]; i++) {
            goog.asserts.assert(child.isShadow(),
                                'Shadow block not allowed non-shadow child.');
        }
        block.setShadow(true);
    }

    return block;
};

Blockly.BlockSvg.prototype.updateColour = function () {
    if (this.disabled) {
        return;
    }

    var hexColour = this.getColour();
    var hexStroke = this.getStroke();
    var rgb = goog.color.hexToRgb(hexColour);
    var rgbStroke = goog.color.hexToRgb(hexStroke);
    if (this.isShadow()) {
        rgb = goog.color.lighten(rgb, 0.6);
        hexColour = goog.color.rgbArrayToHex(rgb);
        this.svgPathLight_.style.display = 'none';
        this.svgPathDark_.setAttribute('fill', hexColour);
    } else {
        this.svgPathLight_.style.display = '';
        //var hexLight = goog.color.rgbArrayToHex(goog.color.lighten(rgb, 0.3));
        var hexDark = goog.color.rgbArrayToHex(goog.color.darken(rgb, 0.2));
        //this.svgPathLight_.setAttribute('stroke', hexLight);
        this.svgPathLight_.setAttribute('stroke', hexStroke);
        this.svgPathDark_.setAttribute('fill', hexDark);
    }

    this.svgPath_.setAttribute('fill', hexColour);
    this.svgPath_.setAttribute('stroke', hexStroke);
    var icons = this.getIcons();
    for (var i = 0; i < icons.length; i++) {
        icons[i].updateColour();
    }

    for (var x = 0, input; input = this.inputList[x]; x++) {
        for (var y = 0, field; field = input.fieldRow[y]; y++) {
            field.setText(null);
        }
    }
}

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
Blockly.BlockSvg.INNER_TOP_LEFT_CORNER =
    Blockly.BlockSvg.NOTCH_PATH_RIGHT + ' h -' +
    (Blockly.BlockSvg.NOTCH_WIDTH - 15 - Blockly.BlockSvg.CORNER_RADIUS) +
    ' a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 -' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;
Blockly.BlockSvg.INNER_BOTTOM_LEFT_CORNER =
    'a ' + Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS + ' 0 0,0 ' +
    Blockly.BlockSvg.CORNER_RADIUS + ',' +
    Blockly.BlockSvg.CORNER_RADIUS;

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

        highlightSteps.push('M', (inputRows.rightEdge - 0.5) + ',' + (cursorY + 0.5));
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
            //steps.push('v', row.height);
            //steps.push('c' + row.height + ' 0,' + row.height + ' ' + row.height + ',0 ' + row.height);
            steps.push('a ' + (row.height / 2) + ',' + (row.height / 2) + ', 180, 1, 1, 0, ' + row.height);
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
        //steps.push('V', cursorY);
        steps.push('c8.211 0,14.868 6.657,14.868 14.868');
        steps.push('c0 8.211,-6.657 14.868,-14.868 14.868');
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