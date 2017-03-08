﻿'use strict';

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
        // Custom data for an advanced block.
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
            // Ignore any text at the <block> level.  It's all whitespace anyway.
            continue;
        }
        var input;

        // Find any enclosed blocks or shadows in this tag.
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
        // Use the shadow block if there is no child block.
        if (!childBlockNode && childShadowNode) {
            childBlockNode = childShadowNode;
        }

        var name = xmlChild.getAttribute('name');
        switch (xmlChild.nodeName.toLowerCase()) {
            case 'mutation':
                // Custom data for an advanced block.
                if (block.domToMutation) {
                    block.domToMutation(xmlChild);
                    if (block.initSvg) {
                        // Mutation may have added some elements that need initializing.
                        block.initSvg();
                    }
                }
                break;
            case 'comment':
                block.setCommentText(xmlChild.textContent);
                var visible = xmlChild.getAttribute('pinned');
                if (visible && !block.isInFlyout) {
                    // Give the renderer a millisecond to render and position the block
                    // before positioning the comment bubble.
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
                // Titles were renamed to field in December 2013.
                // Fall through.
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
                // Unknown tag; ignore.  Same principle as HTML parsers.
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
        // Ensure this block doesn't have any variable inputs.
        goog.asserts.assert(block.getVars().length == 0,
            'Shadow blocks cannot have variable fields.');
        block.setShadow(true);
    }
    return block;
};

Blockly.BlockSvg.prototype.updateColour = function () {
    if (this.disabled) {
        // Disabled blocks don't have colour.
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

    // Bump every dropdown to change its colour.
    for (var x = 0, input; input = this.inputList[x]; x++) {
        for (var y = 0, field; field = input.fieldRow[y]; y++) {
            field.setText(null);
        }
    }
};

Blockly.BlockSvg.prototype.getHeightWidth = function () {
    var height = this.svgGroup_.getBBox().height;
    var width = this.svgGroup_.getBBox().width;
    // Recursively add size of subsequent blocks.
    var nextBlock = this.getNextBlock();
    if (nextBlock) {
        var nextHeightWidth = nextBlock.getHeightWidth();
        //height += nextHeightWidth.height - 4;  // Height of tab.
        //height += nextHeightWidth.height;
        width = Math.max(width, nextHeightWidth.width);
    } else if (!this.nextConnection && !this.outputConnection) {
        // Add a bit of margin under blocks with no bottom tab.
        //height += 2;
    }

    if (!this.getInputsInline() && this.inputList.length > 0) {
        var hasBoolean = false;
        var hasAny = false;
        var tmpConn = null;
        for (var i = 0; i < this.inputList.length; i++) {
            tmpConn = this.inputList[i].connection
            if (tmpConn && tmpConn.check_) {
                if (tmpConn.check_.length == 1 && tmpConn.check_[0] == "Boolean") {
                    hasBoolean = true;
                } else {
                    hasAny = true;
                }
                break;
            }
        }

        if (hasAny) {
            width += height / 2 / 17.5 * 15;
        } else if (hasBoolean) {
            width += height / 2;
        }
    }

    return { height: height, width: width };
};

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

Blockly.Icon.prototype.renderIcon = function (cursorX) {
    if (this.collapseHidden && this.block_.isCollapsed()) {
        this.iconGroup_.setAttribute('display', 'none');
        return cursorX;
    }
    this.iconGroup_.setAttribute('display', 'block');

    var TOP_MARGIN = 9;
    var width = this.SIZE;
    if (this.block_.RTL) {
        cursorX -= width;
    }
    this.iconGroup_.setAttribute('transform',
        'translate(' + cursorX + ',' + TOP_MARGIN + ')');
    this.computeIconLocation();
    if (this.block_.RTL) {
        cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
    } else {
        cursorX += width + Blockly.BlockSvg.SEP_SPACE_X;
    }
    return cursorX;
};

Blockly.RenderedConnection.prototype.highlight = function () {
    var steps;
    if (this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
        if (this.check_ && this.check_.length == 1 && this.check_[0] == "Boolean") {
            //steps = 'm 0,0 l-10.7,12.5 10.7, 12.5';            
            var tmpY = (this.sourceBlock_.height - Blockly.BlockSvg.SEP_SPACE_Y * 2) / 2;
            var tmpX = tmpY / 17.5 * 15;
            //tmpX = 
            steps = 'm 0,0';
            steps += 'l-10.7,12.5 10.7, 12.5';
        } else {
            steps = 'm 0,0 a12.5,12.5,0,1,0,0,25';
            var tmpUnit = (this.sourceBlock_.height - Blockly.BlockSvg.SEP_SPACE_Y * 2) / 2;
            if (this.sourceBlock_.getInputsInline()) {
                //if (input.renderHeight < Blockly.BlockSvg.MIN_BLOCK_Y) {
                //    tmpUnit = input.renderHeight + 1;
                //}
            }

            var tmpR = tmpUnit / 2;
        }
    } else {
        steps = 'm -23,0 h 5 ' + Blockly.BlockSvg.NOTCH_PATH_LEFT + ' h 5';
    }

    var xy = this.sourceBlock_.getRelativeToSurfaceXY();
    var x = this.x_ - xy.x;
    var y = this.y_ - xy.y;
    Blockly.Connection.highlightedPath_ = Blockly.utils.createSvgElement(
        'path',
        {
            'class': 'blocklyHighlightedConnectionPath',
            'd': steps,
            transform: 'translate(' + x + ',' + y + ')' + (this.sourceBlock_.RTL ? ' scale(-1 1)' : '')
        },
        this.sourceBlock_.getSvgRoot()
    );
};

Blockly.RenderedConnection.prototype.tighten_ = function () {
    var dx = this.targetConnection.x_ - this.x_;
    var dy = this.targetConnection.y_ - this.y_;
    if (dx != 0 || dy != 0) {
        var block = this.targetBlock();
        var svgRoot = block.getSvgRoot();
        if (!svgRoot) {
            throw 'block is not rendered.';
        }
        var xy = Blockly.utils.getRelativeXY(svgRoot);
        block.getSvgRoot().setAttribute('transform', 'translate(' + (xy.x - dx) + ',' + (xy.y - dy) + ')');
        block.moveConnections_(-dx, -dy);
    }
};