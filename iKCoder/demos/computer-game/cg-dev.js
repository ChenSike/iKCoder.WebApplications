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
                path: "svg/ram.svg"
            }
        ],
        "Computing": [{
                cn: "CPU",
                en: "CPU",
                path: "svg/cpu.svg"
            },
            {
                cn: "显卡",
                en: "Grahpics Card",
                path: "svg/graphics-card.svg"
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

    function placeComponents(config, layer, stage) {

        var ccomponents = [];
        for (var group in config) {
            ccomponents = Array.prototype.concat.apply(ccomponents, config[group]);
        }

        var cellDimension = 180,
            numberOfComponents = ccomponents.length || 0,
            verticalMargin = 200,
            horizontalMargin = 100,
            columns = Math.floor((stage.getWidth() - horizontalMargin) / cellDimension),
            rows = Math.floor((stage.getHeight() - verticalMargin) / cellDimension),
            cells = columns * rows;

        var calcCcomponentConfig = function(cellIndex, cellConfig, layer) {
            var cn = cellConfig.cn,
                en = cellConfig.en,
                path = cellConfig.path,
                height = cellConfig.height || 120,
                width = cellConfig.width || 120,
                offsetX = (cellDimension - width) / 2,
                offsetY = (cellDimension - height) / 2,

                columnIndex = (cellIndex > columns - 1 ? cellIndex % columns : cellIndex),
                rowIndex = (cellIndex > columns - 1 ? Math.floor(cellIndex / columns) : 0),

                x = horizontalMargin / 2 + columnIndex * cellDimension + offsetX,
                y = verticalMargin / 2 + rowIndex * cellDimension + offsetY;

            return {
                layer: layer,
                x: x,
                y: y,
                width: width,
                height: height,
                file: path,
                en: en,
                cn: cn,
                id: en
            };
        };

        for (var i = 0; i < Math.min(cells, ccomponents.length); i++) {
            loadImage(calcCcomponentConfig(i, ccomponents[i], layer));
        }
    }

    var CATEGORY_THUMB_NAIL_SIZE_X = 50,
        CATEGORY_THUMB_NAIL_SIZE_Y = 50,
        CATEGORY_PADDING_BOTTOM = 5,
        RESULT_WIDTH = 20,
        RESULT_HEIGHT = 20;

    // Extend Image
    (function() {
        Konva.Ccomponent = function(config) {
            this.___init(config);
            this._isAssigned = false;
            this._isAssignedCorrectly = false;
            this.className = 'Ccomponent';
            this.en = config.en;
            this.cn = config.en;
        };

        Konva.Ccomponent.prototype = {
            ___init: function(config) {
                Konva.Image.prototype.___init.call(this, config);
                this.resultImage = new Konva.Image({
                    x: config.x + 5,
                    y: config.y,
                    width: RESULT_WIDTH,
                    height: RESULT_HEIGHT
                });
            },

            draw: function() {
                Konva.Image.prototype.draw.apply(this);

                var that = this;

                var imageObj = new Image();
                imageObj.src = !this._isAssigned ? null : this._isAssignedCorrectly ? 'svg/success.svg' : 'svg/error.svg';
                that.resultImage.image(imageObj);

                layer.draw();
                that.resultImage.draw();
            }
        };

        Konva.Util.extend(Konva.Ccomponent, Konva.Image);

        // extend component group
        Konva.ComponentGroup = function(config) {
            this.___init(config);
            this._group = config.group;
        };

        Konva.ComponentGroup.prototype = {
            ___init: function(config) {
                Konva.Rect.prototype.___init.call(this, config);
            }
        };

        Konva.Util.extend(Konva.ComponentGroup, Konva.Rect);
    })();

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

                // resize image
                image.height(CATEGORY_THUMB_NAIL_SIZE_X);
                image.width(CATEGORY_THUMB_NAIL_SIZE_Y);

                // calculate image x and y
                image.x(categoryRect.x() + 5);
                image.y(categoryRect.y() + calculateOffsetY(nth));

                image._isAssigned = categoryRect === undefined ? false : true;
                image._isAssignedCorrectly = isAssignedRight(categoryRect, image);

                image.resultImage.x(image.x() + image.width() + 10);
                image.resultImage.y(image.y() + (image.height() - RESULT_HEIGHT) / 2);

                image.draggable(false);
                image.off('mouseover');
            }

            image.draw();
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

    function loadImage(config) {
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

        var imageObj = new Image();
        imageObj.src = config.file;
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
            if (!!detectedCategoryRect)
                _categorizer(detectedCategoryRect, this, detectedCategoryRect);
            else {
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
        layer.add(rect);
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

    var width = window.innerWidth,
        height = window.innerHeight,
        stage = new Konva.Stage({
            container: 'container',
            width: width,
            height: height
        });

    var layer = new Konva.Layer(),
        resultLayer = new Konva.Layer(),
        categoryLayer = new Konva.Layer(),
        rectX = stage.getWidth() / 2 - 50,
        rectY = stage.getHeight() / 2 - 25;

    var s = window.Scene = function() {};
    s.prototype = {
        loadImage: loadImage,
        cleanLayer: layer.destroy
    };

    placeComponents(configuration, layer, stage);
    placeComponentGroups(configuration, categoryLayer, stage);

    var categoryWith = 200,
        categoryHeight = 200,
        categoryY = stage.getHeight() - categoryHeight - 10,
        categoryX = (stage.getWidth() / 2) - 50 - categoryWith;

    // loadCategory(categoryLayer, categoryX, categoryY, categoryWith, categoryHeight, 'category one');
    // loadCategory(categoryLayer, categoryX - categoryWith - 100, categoryY, categoryWith, categoryHeight, 'recycling-purple.svg');
    // loadCategory(categoryLayer, categoryX + categoryWith + 100, categoryY, categoryWith, categoryHeight, 'recycling-blue.svg');
    // loadCategory(categoryLayer, categoryX - 3 * categoryWith, categoryY, categoryWith, categoryHeight, 'recycling-purple.svg');

    var _categorizer = categoryManager(categoryLayer);

    // add layers into stage
    stage.add(categoryLayer);
    stage.add(layer);
    stage.add(resultLayer);

})();
