'use strict';

Blockly.Block.prototype.stroke_ = '#000000';

Blockly.Block.prototype.eventIcon_ = "";

Blockly.Block.prototype.categoryIcon_ = "";

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

Blockly.Block.prototype.getEventIcon = function () {
    return this.eventIcon_;
};

Blockly.Block.prototype.setEventIcon = function (eventIcon) {
    if (typeof eventIcon == 'string' && eventIcon.toLowerCase() != 'null') {
        this.eventIcon_ = eventIcon;
    } else {
        this.eventIcon_ = "";
    }
};

Blockly.Block.prototype.getCategoryIcon = function () {
    return this.categoryIcon_;
};

Blockly.Block.prototype.setCategoryIcon = function (categoryIcon) {
    if (typeof categoryIcon == 'string' && categoryIcon.toLowerCase() != 'null') {
        this.categoryIcon_ = categoryIcon;
    } else {
        this.categoryIcon_ = "";
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
    element.setAttribute('eventicon', block.getEventIcon());
    element.setAttribute('categoryicon', block.getCategoryIcon());
    return element;
};

Blockly.Xml.domToBlockHeadless_ = function (xmlBlock, workspace) {
    var block = null;
    var prototypeName = xmlBlock.getAttribute('type');
    goog.asserts.assert(prototypeName, 'Block type unspecified: %s', xmlBlock.outerHTML);
    var id = xmlBlock.getAttribute('id');
    block = workspace.newBlock(prototypeName, id);
    block.setEventIcon(xmlBlock.getAttribute('eventicon'));
    block.setCategoryIcon(xmlBlock.getAttribute('categoryicon'));
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

    var lastInputType = this.checkLastInputType(this);
    if (lastInputType == "B") {
        width += height / 2 / 17.5 * 15;
    } else if (lastInputType == "A") {
        width += height / 2;
    }

    return { height: height, width: width };
};

Blockly.BlockSvg.prototype.checkLastInputType = function (block) {
    var endType = '';
    if (!block.previousConnection && !block.nextConnection && !block.getInputsInline() && block.inputList.length > 0) {
        var tmpConn = null;
        var tmpTargetBlock = null;
        var tmpMaxWidth = 0;
        var allConnected = true;
        for (var i = 0; i < block.inputList.length; i++) {
            tmpConn = block.inputList[i].connection;
            if (tmpConn) {
                if (tmpConn.targetBlock()) {
                    var tmpCurrentWidth = tmpConn.targetBlock().getHeightWidth().width;
                    if (Math.max(tmpMaxWidth, tmpCurrentWidth) == tmpCurrentWidth) {
                        tmpTargetBlock = tmpConn.targetBlock();
                    }
                } else {
                    endType = this.getConnectionCheckType(tmpConn);
                    allConnected = false;
                    break;
                }
            }
        }

        if (allConnected && block.inputList.length > 1) {
            for (var i = 0; i < block.inputList.length; i++) {
                endType = this.getConnectionCheckType(block.inputList[i].connection);
            }
        } else {
            if (endType == "") {
                if (tmpTargetBlock) {
                    endType = this.checkLastInputType(tmpTargetBlock);
                } else {
                    for (var i = 0; i < block.inputList.length; i++) {
                        endType = this.getConnectionCheckType(block.inputList[i].connection);
                    }
                }
            }
        }
    }

    return endType;
};

Blockly.BlockSvg.prototype.getConnectionCheckType = function (tmpConn) {
    var checkType = '';
    if (tmpConn) {
        if (tmpConn.check_ && tmpConn.check_.length == 1 && tmpConn.check_[0] == "Boolean") {
            checkType = "B";
        } else {
            checkType = "A";
        }
    }

    return checkType;
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
    this.iconGroup_.setAttribute('transform', 'translate(' + cursorX + ',' + TOP_MARGIN + ')');
    this.computeIconLocation();
    if (this.block_.RTL) {
        cursorX -= Blockly.BlockSvg.SEP_SPACE_X;
    } else {
        cursorX += width + Blockly.BlockSvg.SEP_SPACE_X;
    }
    return cursorX;
};

Blockly.Mutator.prototype.drawIcon_ = function (group) {
    // Square with rounded corners.
    Blockly.utils.createSvgElement('rect',
        {
            'class': 'blocklyIconShape',
            'rx': '4', 'ry': '4',
            'height': '10', 'width': '10'
        },
         group);
    // Gear teeth.
    Blockly.utils.createSvgElement('path',
        {
            'class': 'blocklyIconSymbol',
            'd': 'm1.203,4.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 -0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z'
        },
         group);
    // Axle hole.
    Blockly.utils.createSvgElement('circle',
        { 'class': 'blocklyIconShape', 'r': '2.7', 'cx': '5', 'cy': '5' },
         group);
};

Blockly.Comment.prototype.drawIcon_ = function (group) {
    // Circle.
    Blockly.utils.createSvgElement('circle',
        { 'class': 'blocklyIconShape', 'r': '8', 'cx': '5', 'cy': '5' },
         group);
    // Can't use a real '?' text character since different browsers and operating
    // systems render it differently.
    // Body of question mark.
    Blockly.utils.createSvgElement('path',
        {
            'class': 'blocklyIconSymbol',
            'd': 'm3.8,7h2c0.003,-0.617 0.271,-0.962 0.633,-1.266 2.875,-2.405 0.607,-5.534 -3.765,-3.874v1.7c3.12,-1.657 3.698,0.118 2.336,1.25 -1.201,0.998 -1.201,1.528 -1.204,2.19z'
        },
         group);
    // Dot of question mark.
    Blockly.utils.createSvgElement('rect',
        {
            'class': 'blocklyIconSymbol',
            'x': '3.8', 'y': '7.78', 'height': '2', 'width': '2'
        },
         group);
};

Blockly.RenderedConnection.prototype.highlight = function () {
    var steps;
    if (this.sourceBlock_.type == "controls_if") {
        var a = 0;
    }

    if (this.type == Blockly.INPUT_VALUE || this.type == Blockly.OUTPUT_VALUE) {
        var currHeight = 25;
        for (var i = 0; i < this.sourceBlock_.inputList.length; i++) {
            var tmpInputConn = this.sourceBlock_.inputList[i].connection;
            if (tmpInputConn && tmpInputConn.x_ == this.x_ && tmpInputConn.y_ == this.y_) {
                currHeight = this.sourceBlock_.inputList[i].renderHeight;
                break;
            }
        }

        if (this.check_ && this.check_.length == 1 && this.check_[0] == "Boolean") {
            //steps = 'm 0,0 l-10.7,12.5 10.7, 12.5';            
            var tmpY = currHeight / 2;
            var tmpX = tmpY / 17.5 * 15;
            steps = 'm 0,0';
            steps += 'l-' + tmpX + ',' + tmpY + ' ' + tmpX + ', ' + tmpY;
        } else {
            var tmpUnit = currHeight;
            if (this.sourceBlock_.getInputsInline()) {
                if (tmpUnit < Blockly.BlockSvg.MIN_BLOCK_Y) {
                    tmpUnit += 1;
                }
            }

            var tmpR = tmpUnit / 2;
            //steps = 'm 0,0 a12.5,12.5,0,1,0,0,25';
            steps = 'm 0,0';
            steps += 'a' + tmpR + ',' + tmpR + ',0,1,0,0,' + tmpR * 2;
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
    if (this.sourceBlock_.type == "controls_if") {
        var a = 0;
    }
    if (dx != 0 || dy != 0) {
        var block = this.targetBlock();
        var svgRoot = block.getSvgRoot();
        if (!svgRoot) {
            throw 'block is not rendered.';
        }
        var xy = Blockly.utils.getRelativeXY(svgRoot);
        var tmpX = dx;
        if (this.type != Blockly.NEXT_STATEMENT) {
            if (block.checkBooleanConnection(block, true)) {
                tmpX += block.height / 2 / 17.5 * 15;
            } else {
                tmpX += block.height / 2;
            }
        }

        block.getSvgRoot().setAttribute('transform', 'translate(' + (xy.x - tmpX) + ',' + (xy.y - dy) + ')');
        block.moveConnections_(-tmpX, -dy);
    }
};

Blockly.Flyout.prototype.layout_ = function (contents, gaps) {
    this.workspace_.scale = this.targetWorkspace_.scale;
    var margin = this.MARGIN;
    var cursorX = this.RTL ? margin : margin + Blockly.BlockSvg.TAB_WIDTH;
    var cursorY = margin;
    if (this.horizontalLayout_ && this.RTL) {
        contents = contents.reverse();
    }

    for (var i = 0, item; item = contents[i]; i++) {
        if (item.type == 'block') {
            var block = item.block;
            var allBlocks = block.getDescendants();
            for (var j = 0, child; child = allBlocks[j]; j++) {
                // Mark blocks as being inside a flyout.  This is used to detect and
                // prevent the closure of the flyout if the user right-clicks on such a
                // block.
                child.isInFlyout = true;
            }
            block.render();
            var root = block.getSvgRoot();
            var blockHW = block.getHeightWidth();
            var tab = block.outputConnection ? Blockly.BlockSvg.TAB_WIDTH : 0;
            if (this.horizontalLayout_) {
                cursorX += tab;
            }

            var tmpX = cursorX;
            var tmpY = cursorY;
            if (block.svgGroup_.getBBox().x != 0) {
                tmpX -= block.svgGroup_.getBBox().x;
            }

            if (block.svgGroup_.getBBox().y != 0) {
                tmpY -= block.svgGroup_.getBBox().y;
            }

            block.moveBy((this.horizontalLayout_ && this.RTL) ? tmpX + blockHW.width - tab : tmpX, tmpY);
            //if (block.svgGroup_.getBBox().x != 16) {
            //    var tmpX = block.svgGroup_.getBBox().x - 16;
            //    block.moveBy(tmpX, cursorY);
            //}

            if (this.horizontalLayout_) {
                cursorX += (blockHW.width + gaps[i] - tab);
            } else {
                cursorY += blockHW.height + gaps[i];
            }


            // Create an invisible rectangle under the block to act as a button.  Just
            // using the block as a button is poor, since blocks have holes in them.
            var rect = Blockly.utils.createSvgElement('rect', { 'fill-opacity': 0 }, null);
            rect.tooltip = block;
            Blockly.Tooltip.bindMouseEvents(rect);
            // Add the rectangles under the blocks, so that the blocks' tooltips work.
            this.workspace_.getCanvas().insertBefore(rect, block.getSvgRoot());
            block.flyoutRect_ = rect;
            this.backgroundButtons_[i] = rect;

            this.addBlockListeners_(root, block, rect);
        } else if (item.type == 'button') {
            var button = item.button;
            var buttonSvg = button.createDom();
            button.moveTo(cursorX, cursorY);
            button.show();
            Blockly.bindEventWithChecks_(buttonSvg, 'mouseup', button, button.onMouseUp);
            this.buttons_.push(button);
            if (this.horizontalLayout_) {
                cursorX += (button.width + gaps[i]);
            } else {
                cursorY += button.height + gaps[i];
            }
        }
    }
};

Blockly.Toolbox.prototype.syncTrees_ = function (treeIn, treeOut, pathToMedia) {
    var openNode = null;
    var lastElement = null;
    for (var i = 0, childIn; childIn = treeIn.childNodes[i]; i++) {
        if (!childIn.tagName) {
            continue;
        }
        switch (childIn.tagName.toUpperCase()) {
            case 'CATEGORY':
                var childOut = this.tree_.createNode(childIn.getAttribute('name'));
                childOut["category_id"] = childIn.getAttribute('id') ? childIn.getAttribute('id') : '';
                childOut["category_icon_position"] = childIn.getAttribute('iconposition') ? childIn.getAttribute('iconposition') : '';
                childOut.blocks = [];
                treeOut.add(childOut);
                var custom = childIn.getAttribute('custom');
                if (custom) {
                    childOut.blocks = custom;
                } else {
                    var newOpenNode = this.syncTrees_(childIn, childOut, pathToMedia);
                    if (newOpenNode) {
                        openNode = newOpenNode;
                    }
                }
                var colour = childIn.getAttribute('colour');
                if (goog.isString(colour)) {
                    if (colour.match(/^#[0-9a-fA-F]{6}$/)) {
                        childOut.hexColour = colour;
                    } else {
                        childOut.hexColour = Blockly.hueToRgb(colour);
                    }

                    this.hasColours_ = true;
                } else {
                    childOut.hexColour = '';
                }
                if (childIn.getAttribute('expanded') == 'true') {
                    if (childOut.blocks.length) {
                        openNode = childOut;
                    }
                    childOut.setExpanded(true);
                } else {
                    childOut.setExpanded(false);
                }
                lastElement = childIn;
                break;
            case 'SEP':
                if (lastElement) {
                    if (lastElement.tagName.toUpperCase() == 'CATEGORY') {
                        treeOut.add(new Blockly.Toolbox.TreeSeparator(this.treeSeparatorConfig_));
                    } else {
                        var newGap = parseFloat(childIn.getAttribute('gap'));
                        if (!isNaN(newGap) && lastElement) {
                            lastElement.setAttribute('gap', newGap);
                        }
                    }
                }
                break;
            case 'BLOCK':
            case 'SHADOW':
            case 'LABEL':
            case 'BUTTON':
                treeOut.blocks.push(childIn);
                lastElement = childIn;
                break;
        }
    }
    return openNode;
};

goog.ui.tree.BaseNode.prototype.toSafeHtml = function () {
    var tree = this.getTree();
    var hideLines = !tree.getShowLines() || tree == this.getParent() && !tree.getShowRootLines();
    var childClass = hideLines ? this.config_.cssChildrenNoLines : this.config_.cssChildren;
    var nonEmptyAndExpanded = this.getExpanded() && this.hasChildren();
    var attributes = { 'class': childClass, 'style': this.getLineStyle() };
    var content = [];
    if (nonEmptyAndExpanded) {
        this.forEachChild(function (child) { content.push(child.toSafeHtml()); });
    }

    var children = goog.html.SafeHtml.create('div', attributes, content);
    var tmpClass = this.config_.cssItem;
    tmpClass += ' blocklyToolboxItem_' + this.category_id;
    this.createCategoryTreeItemIconClass(tmpClass);
    return goog.html.SafeHtml.create('div', { 'class': tmpClass, 'id': this.getId() }, [this.getRowSafeHtml(), children]);
};

goog.ui.tree.BaseNode.prototype.createCategoryTreeItemIconClass = function (className) {
    var text = ['.' + className.trim() + ' div span.blocklyTreeIcon.blocklyTreeIconNone{'];
    if (this.category_id && this.category_icon_position) {
        var positionArr = this.category_icon_position.split(';');
        text.push('background-position:' + positionArr[0] + ';\n}');
        text.push('.' + className.trim() + ':hover div span.blocklyTreeIcon.blocklyTreeIconNone{');
        text.push('background-position:' + positionArr[1] + ';\n}');
    } else {
        text.push('background:none;');
        text.push('width:16px;');
        text.push('height:16px;');
        text.push('margin:auto;\n}');
    }

    text.push('.' + className.trim() + ':hover{');
    text.push('color:#FFFFFF;');
    text.push('background-color:' + this.hexColour + ';\n}');
    var cssTextNode = document.createTextNode(text.join('\n'));
    var cssNode = document.createElement('style');
    cssNode.appendChild(cssTextNode);
    document.head.insertBefore(cssNode, document.head.firstChild);
}

Blockly.WorkspaceSvg.prototype.preloadAudio_ = function () {
    try {
        for (var name in this.SOUNDS_) {
            var sound = this.SOUNDS_[name];
            sound.volume = .01;
            sound.play();
            sound.pause();
            if (goog.userAgent.IPAD || goog.userAgent.IPHONE) {
                break;
            }
        }
    } catch (ex) {
    }
};