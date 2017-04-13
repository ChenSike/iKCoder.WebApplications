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

    function placeComponents(config, layer, categoryLayer, stage) {

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

        var calcCcomponentConfig = function(cellIndex, cellConfig) {
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
            loadImage(calcCcomponentConfig(i, ccomponents[i]), layer, categoryLayer);
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

                this.parent.draw();
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

                var x0 = image.x(),
                    y0 = image.y(),
                    width0 = image.width(),
                    height0 = image.height(),

                    slices = 50,
                    delta = (categoryRect.x() + 5 - x0) / slices,
                    deltaY = (categoryRect.y() + 5 + calculateOffsetY(nth) - y0) / slices,
                    deltaWidth = (CATEGORY_THUMB_NAIL_SIZE_X - width0) / slices,
                    deltaHeight = (CATEGORY_THUMB_NAIL_SIZE_Y -height0) / slices;

                var i = 0;
                var anim = new Konva.Animation(function(frame){
                    if(i < slices){
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
                // resize image
                // image.height(CATEGORY_THUMB_NAIL_SIZE_X);
                // image.width(CATEGORY_THUMB_NAIL_SIZE_Y);

                // // calculate image x and y
                // image.x(categoryRect.x() + 5);
                // image.y(categoryRect.y() + calculateOffsetY(nth));

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
            if (!!detectedCategoryRect){
                _categorizer(detectedCategoryRect, this, {});
                // layer.draw();
            }
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


    var _categorizer;
    // Used for exposing Scene related API
    function Scene(config) {
        this.config = config;
        this.___init();
    }

    Scene.prototype = {
        constructor: Scene,
        ___init: function() {
            this.stage = new Konva.Stage({
                container: 'container',
                width: window.innerWidth,
                height: window.innerHeight
            });

            this.layer = new Konva.Layer();
            this.resultLayer = new Konva.Layer();
            this.categoryLayer = new Konva.Layer();
            this.connectionLayer = new Konva.Layer({
                clearBeforeDraw: false
            });
        },

        start: function() {
            placeComponents(this.config, this.layer, this.categoryLayer, this.stage);
            placeComponentGroups(this.config, this.categoryLayer, this.stage);

            _categorizer = categoryManager(this.categoryLayer);
            this.stage.add(this.categoryLayer);
            this.stage.add(this.layer);
            this.stage.add(this.resultLayer);
            this.stage.add(this.connectionLayer);
        },

        connect(comp1, comp2) {
            console.log('connecting ' + comp1 + ' to ' + comp2);

            var arc = new Konva.Arc({
                x: this.stage.getWidth() / 2,
                y: this.stage.getHeight() / 2,
                innerRadius: 2,
                outerRadius: 5,
                angle: 270,
                opacity: 0.3,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3
            });

            this.connectionLayer.add(arc);

            var duration = 2000,
                i = 10,
                j = 10;

            var anim = new Konva.Animation(function(frame) {
                if(i < 100){
                    arc.x(arc.x() + 1);
                    arc.y(arc.y() + 1);
                } else {
                    anim.stop();
                    console.log('anim done...');
                }
            }, this.connectionLayer);

            anim.start();
        }
    };

    window.ComputerScene = new Scene(configuration);
    ComputerScene.start();

})();
