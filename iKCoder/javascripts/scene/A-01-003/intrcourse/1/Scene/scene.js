(function() {
    'use strict';

    var configuration = {
        "Input Device": [{
                cn: "鼠标",
                en: "Mouse",
                path: "svg/mouse.svg"
            },
            {
                cn: "键盘",
                en: "Keyboard",
                path: "svg/keyboard.svg"
            }
        ],
        "Output Device": [{
                cn: "显示器",
                en: "Monitor",
                path: "svg/monitor.svg"
            },
            {
                cn: "打印机",
                en: "Printer",
                path: "svg/printer.svg"
            },
            {
                cn: "耳机",
                en: "Earphones",
                path: "svg/earphones.svg"
            }
        ],
        "Storage": [{
                cn: "硬盘",
                en: "Harddrive",
                path: "svg/hard-drive.svg"
            },
            {
                cn: "CD",
                en: "CD",
                path: "svg/cd.svg"
            },
            {
                cn: "U盘",
                en: "Pendrive",
                path: "svg/pendrive.svg"
            },
            {
                cn: "RAM",
                en: "RAM",
                path: "svg/ram-memory.svg"
            }
        ],
        "Computing": [{
                cn: "CPU",
                en: "CPU",
                path: "svg/cpu.svg"
            },
            {
                cn: "显卡",
                en: "Graphics Card",
                path: "svg/graphics-card.svg"
            },
            {
                cn: "主机",
                en: "Computer Tower",
                path: "svg/computer.svg"
            }

        ]
    };

    function searchForGroup(key, config, predicate) {
        if (predicate === undefined) return null;

        for (var group in config) {
            var components = config[group];
            for (var component in components) {
                if (predicate && predicate(key, components[component]))
                    return group;
            }
        }

        return null;
    }

    function placeComponentGroups(config, layer, stage) {
        var groups = [];
        for (var group in config) {
            groups.push(group);
        }

        var groupNum = groups.length,
            groupHeight = 200,
            groupSideMargin = 30,
            horizontalMargin = 100,
            groupWidth = ((stage.getWidth() - horizontalMargin) / groupNum) - groupSideMargin * 2;


        for (var i = 0; i < groupNum; i++) {
            var categoryConfig = {
                stroke: 'grey',
                strokeWidth: 1,
                height: groupHeight,
                width: groupWidth,
                group: groups[i],
                x: horizontalMargin / 2 + (groupSideMargin * 2 + groupWidth) * i + groupSideMargin,
                y: stage.getHeight() - groupHeight - 5
            };

            loadCategory(categoryConfig, layer, stage);
        }
    }

    function placeComponents(config, layer, categoryLayer, stage) {

        var ccomponents = [];
        for (var group in config) {
            ccomponents = Array.prototype.concat.apply(ccomponents, config[group]);
        }

        var cellDimension = 100,
            numberOfComponents = ccomponents.length || 0,
            verticalMargin = 50,
            horizontalMargin = 50,
            columns = Math.floor((stage.getWidth() - horizontalMargin) / cellDimension),
            rows = Math.floor((stage.getHeight() - verticalMargin) / cellDimension),
            cells = columns * rows;

        var calcCcomponentConfig = function(cellIndex, cellConfig) {
            var cn = cellConfig.cn,
                en = cellConfig.en,
                path = cellConfig.path,
                height = cellConfig.height || 60,
                width = cellConfig.width || 60,
                offsetX = (cellDimension - width) / 2,
                offsetY = (cellDimension - height) / 2,

                columnIndex = (cellIndex > columns - 1 ? cellIndex % columns : cellIndex),
                rowIndex = (cellIndex > columns - 1 ? Math.floor(cellIndex / columns) : 0),

                x = horizontalMargin / 2 + columnIndex * cellDimension + offsetX,
                y = verticalMargin / 2 + rowIndex * cellDimension + offsetY;

            return {
                x: x,
                y: y,
                width: width,
                height: height,
                file: path,
                en: en,
                cn: cn,
                id: en,
                row: rowIndex,
                column: columnIndex
            };
        };

        for (var i = 0; i < Math.min(cells, ccomponents.length); i++) {
            loadImage(calcCcomponentConfig(i, ccomponents[i]), layer, categoryLayer);
        }
    }

    var CATEGORY_THUMB_NAIL_SIZE_X = 50,
        CATEGORY_THUMB_NAIL_SIZE_Y = 50,
        CATEGORY_PADDING_BOTTOM = 5;


    var categoryManager = (function() {
        var categoryToContainer = new Map();

        window.categoryToContainer = categoryToContainer;

        function init(_categoryLayer) {
            _categoryLayer.children.forEach(function(element) {
                categoryToContainer.set(element, new CategoryContainer(element));
            });
        }

        function isAssignedRight(rect, image) {
            var group = searchForGroup(image, configuration, function(key, component) {
                return key.en === component.en;
            });

            return rect._group === group;
        }

        function removeExistingFromCategories(image) {
            for (var [k, v] of categoryToContainer) {
                for (var i in v.children) {
                    if (v.children[i]._id === image._id) {
                        Array.prototype.splice.call(v.children, i, 1);
                        return;
                    }
                }
            }
        }

        function calculateOffsetY(i) {
            return (CATEGORY_THUMB_NAIL_SIZE_Y + CATEGORY_PADDING_BOTTOM) * i;
        }

        function CategoryContainer(categoryRect, children) {
            this.categoryRect = categoryRect;
            this.children = [];

            if (!!children)
                this.add(children);
        }

        CategoryContainer.prototype.add = function(child) {
            var that = this;

            // add children
            if (Array.isArray(child)) {
                child.forEach(function(element) {
                    CategoryContainer.prototype.add.apply(that, element);
                });
            }

            // add child
            var isExist = this.children.some(function(element) {
                return element._id == child._id;
            });

            if (!!!isExist) {
                this.children.push(child);
            }

            return this.children.length - 1 || 0;
        };

        CategoryContainer.prototype.categorize = function(image, categoryRect, options) {
            removeExistingFromCategories(image);

            if (categoryRect !== undefined) {
                var nth = this.add(image);

                var x0 = image.x(),
                    y0 = image.y(),
                    width0 = image.width(),
                    height0 = image.height(),
                    RESULT_HEIGHT = 20,

                    slices = 50,
                    delta = (categoryRect.x() + 5 - x0) / slices,
                    deltaY = (categoryRect.y() + 5 + calculateOffsetY(nth) - y0) / slices,
                    deltaWidth = (CATEGORY_THUMB_NAIL_SIZE_X - width0) / slices,
                    deltaHeight = (CATEGORY_THUMB_NAIL_SIZE_Y - height0) / slices;

                var i = 0;
                var anim = new Konva.Animation(function(frame) {
                    if (i < slices) {
                        image.height(image.height() + deltaHeight);
                        image.width(image.width() + deltaWidth);
                        image.x(image.x() + delta);
                        image.y(image.y() + deltaY);
                        i++;
                    } else {
                        anim.stop();

                        image._isAssigned = categoryRect === undefined ? false : true;
                        image._isAssignedCorrectly = isAssignedRight(categoryRect, image);

                        image.resultImage.x(image.x() + image.width() + 10);
                        image.resultImage.y(image.y() + (image.height() - RESULT_HEIGHT) / 2);

                        image.draw();
                        image.parent.draw();
                    }
                }, image.parent);

                anim.start();

                image.draggable(false);
                image.off('mouseover');
            }

        };

        // return a function that return the associated CategoryContainer instance
        return function(_categoryLayer) {
            init(_categoryLayer);
            return function(categoryRect, image, options) {
                var container = categoryToContainer.get(categoryRect);
                CategoryContainer.prototype.categorize.call(container, image, categoryRect, options);
            };
        };

    })();

    function loadImage(config, layer, categoryLayer) {
        var box = new Konva.Ccomponent({
            x: config.x,
            y: config.y,
            width: config.width,
            height: config.height,
            draggable: config.draggable === undefined ? true : false,
            en: config.en,
            cn: config.cn,
            id: config.id
        });

        box.componentPosition(config.row, config.column);

        var imageObj = new Image();
        imageObj.src = 'images/Scene/intrcourse/' + config.file;
        imageObj.onload = function() {
            box.image(imageObj);
            layer.draw();
        };

        // add cursor styling
        box.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });

        box.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        box.on('dragend', function() {
            // locate the hit category
            var detectedCategoryRect = detectIntersection(this, categoryLayer.children);
            if (!!detectedCategoryRect) {
                _categorizer(detectedCategoryRect, this, {});
                // layer.draw();
            } else {
                this._isAssigned = false;
                layer.draw();
            }
        });

        console.log('adding ' + config.file + ' at ' + config.x + ' ' + config.y);

        box instanceof Konva.Ccomponent && layer.add(box.resultImage);
        layer.add(box);
    }

    function loadCategory(config, layer) {
        var rect = new Konva.ComponentGroup(config);
        var groupText = new Konva.Text({
            x: rect.x(),
            y: rect.y() - 20,
            width: rect.width(),
            text: config.group,
            fontSize: 18,
            fontFamily: 'Calibri',
            align: 'center'
        });
        layer.add(rect);
        layer.add(groupText);
    }

    var detectIntersection = (function() {
        function intersectRect(r1, r2) {
            return !(r2.left > r1.right ||
                r2.right < r1.left ||
                r2.top > r1.bottom ||
                r2.bottom < r1.top);
        }

        // translate x, y, height and width to left, right, top, bottom
        function translateToRect(_rect) {
            var that = {};

            // convert konva rect/image to an object that contains x, y, width and height
            var rect = _rect.attrs || _rect;
            that.left = rect.x,
                that.right = rect.x + rect.width,
                that.top = rect.y,
                that.bottom = rect.y + rect.height;

            return that;
        }

        function isDetect(r1, r2) {
            return intersectRect(translateToRect(r1), translateToRect(r2));
        }

        return function(r) {
            var rects = Array.prototype.slice.call(arguments, 1)[0];
            for (var index = 0; index < rects.length; index++) {
                if (isDetect(rects[index], r)) {
                    return rects[index];
                }
            }
            return null;
        };
    })();


    var _categorizer;
    // Used for exposing ComputerScene related API
    function ComputerScene(config, containerId) {
        this.config = config;
        this.containerId = containerId;
        // this.___init();
    }

    ComputerScene.prototype = {
        constructor: ComputerScene,
        init: function() {
            this.containerId = this.containerId || 'game_container';
            this.stage = new Konva.Stage({
                container: this.containerId,
                width: $('#' + this.containerId).width(),
                height: $('#' + this.containerId).height()
            });

            this.layer = new Konva.Layer();
            this.resultLayer = new Konva.Layer();
            this.categoryLayer = new Konva.Layer();
            this.connectionLayer = new Konva.Layer({
                clearBeforeDraw: true
            });

            this.__paint();
            this.__connectionSet = [];
            this.registerResize();
            this.__correctConnectionArr = [
                ["Mouse", "Computer Tower"],
                ["Keyboard", "Computer Tower"],
                ["Monitor", "Computer Tower"],
                ["Computer Tower", "Printer"],
                ["Computer Tower", "Earphones"],
                ["Harddrive", "Computer Tower"],
                ["Computer Tower", "Pendrive"],
                ["RAM", "Computer Tower"],
                ["CPU", "Computer Tower"],
                ["Graphics Card", "Computer Tower"],
                ["Computer Tower"]
            ];
        },

        getImages: function() {
            return (this.layer && this.layer.children) || [];
        },

        registerResize: function() {
            var that = this;
            $("#" + this.containerId).resize(function() {
                var width = $('#' + that.containerId).width(),
                    height = $('#' + that.containerId).height();
                that.stage.width(width);
                that.stage.height(height);
                // clear content in layers
                [that.layer, this.resultLayer, this.connectionLayer].forEach(function(layer) {
                    that._clearLayer(layer);
                });
                console.log('onresize to width=' + width + ' height= ' + height);
                that.__connectionSet = [];
                that._paint();
            });
        },

        __paint: function() {
            placeComponents(this.config, this.layer, this.categoryLayer, this.stage);
            // placeComponentGroups(this.config, this.categoryLayer, this.stage);

            _categorizer = categoryManager(this.categoryLayer);
            this.stage.add(this.categoryLayer);
            this.stage.add(this.layer);
            this.stage.add(this.resultLayer);
            this.stage.add(this.connectionLayer);
        },

        __getTurningPoints(comp1, comp2) {
            var points = [],
                start,
                end,
                diffStart,
                diffEnd;
            if (comp1.row === comp2.row) {
                start = this.__getBottomPoint(comp1);
                end = this.__getBottomPoint(comp2);
                points.push(start);
                points.push([start[0], start[1] + 20]);
                points.push([end[0], end[1] + 20]);
                points.push(end);
            } else if (comp1.column === comp2.column) {
                start = this.__getLeftSidePoint(comp1);
                end = this.__getLeftSidePoint(comp2);
                points.push(start);
                points.push([start[0] - 20, start[1]]);
                points.push([end[0] - 20, end[1]]);
                points.push(end);
            } else if ((comp1.row < comp2.row) && Math.abs(comp1.row - comp2.row) === 1) {
                start = this.__getBottomPoint(comp1);
                end = this.__getTopPoint(comp2);
                diffStart = Math.floor(Math.abs(start[1] - end[1]) / 2);
                diffEnd = Math.abs(start[1] - end[1]) - diffStart;
                points.push(start);
                points.push([start[0], start[1] + diffStart]);
                points.push([end[0], end[1] - diffEnd]);
                points.push(end);
            } else if (comp1.row > comp2.row && Math.abs(comp1.row - comp2.row) === 1) {
                start = this.__getTopPoint(comp1);
                end = this.__getBottomPoint(comp2);
                diffStart = Math.floor(Math.abs(start[1] - end[1]) / 2);
                diffEnd = Math.abs(start[1] - end[1]) - diffStart;
                points.push(start);
                points.push([start[0], start[1] - diffStart]);
                points.push([end[0], end[1] + diffEnd]);
                points.push(end);
            } else if (Math.abs(comp1.row - comp2.row) > 1) {
                if ((comp1.row - comp2.row) < 0) {
                    start = this.__getLeftSidePoint(comp1);
                    end = this.__getBottomPoint(comp2);
                    points.push(start);
                    points.push([start[0] - 20, start[1]]);
                    points.push([start[0] - 20, end[1] + 20]);
                    points.push([end[0], end[1] + 20]);
                    points.push(end);
                } else {
                    start = this.__getBottomPoint(comp1);
                    end = this.__getLeftSidePoint(comp2);
                    points.push(start);
                    points.push([start[0], start[1] + 20]);
                    points.push([end[0] - 20, start[1] + 20]);
                    points.push([end[0] - 20, end[1]]);
                    points.push(end);
                }
            }

            return points;
        },

        getByName: function(name) {
            var cc = this.layer.children,
                c;

            for (var i in cc) {
                c = cc[i];
                if (c.en === name || c.cn === name) break;
            }

            return c;
        },

        __getBottomPoint(comp) {
            return [
                comp.x() + comp.width() / 2,
                comp.y() + comp.height()
            ];
        },

        __getTopPoint(comp) {
            return [
                comp.x() + comp.width() / 2,
                comp.y()
            ];
        },
        __getLeftSidePoint(comp) {
            return [
                comp.x(),
                comp.y() + comp.height() / 2
            ];
        },

        startGame() {
            if (this.__connectionSet.length > 0)
                for (var i in this.__connectionSet) {
                    var names = this.__connectionSet[i];
                    ComputerScene.prototype._doConnect.apply(this, names);
                }
        },

        endGame() {
            this.connectionLayer.getCanvas().getContext().clear();
        },

        clear() {
            this._clearLayer(this.connectionLayer);
            this.connectionLayer.removeChildren();
            this.__connectionSet = [];
        },

        _clearLayer(layer) {
            layer && layer.getCanvas().getContext().clear();
        },

        buildConnect(name1, name2) {
            this.__connectionSet.push([name1, name2]);
        },

        _doConnect(comp1Id, comp2Id) {
            var that = this;

            var
                comp1 = this.getByName(comp1Id),
                comp2 = this.getByName(comp2Id),
                arc = new Konva.ConnectionPoint({
                    componentsLayer: that.layer,
                    inc: 8,
                    turnings: this.__getTurningPoints(comp1, comp2)
                });

            this.connectionLayer.add(arc);

            var anim = new Konva.Animation(function(frame) {
                if (!arc.isDone()) {
                    arc.moveAction();
                } else {
                    anim.stop();
                    console.log('anim done...');
                }
            }, this.connectionLayer);

            anim.start();
        },

        testConnect(x, y) {
            var comp1 = this.layer.children[x];
            var comp2 = this.layer.children[y];
            this.connect(comp1, comp2);
        },

        checkComplete() {
            var rightConnectionNum = 0;

            this.__correctConnectionArr.forEach(function(fromto) {
                var from = fromto[0],
                    to = fromto[1];
                this.__connectionSet.forEach(function(conntected){
                    var conntectedFrom = conntected[0],
                        conntectedTo = conntected[1];

                    if (from === conntectedFrom && to === conntectedTo) {
                        rightConnectionNum++;
                    }
                });
            });

            return rightConnectionNum >= 3;
        }
    };

    window.Scene = new ComputerScene(configuration);
})();

function test() {
    ComputerScene.testConnect(1, 17);
    ComputerScene.testConnect(5, 7);
}
