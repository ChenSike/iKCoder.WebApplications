'use strict';

(function(){
    var generalSettings = {
        backgroundX : 0,
        backgroundy : 0,
        backgroundUpperStyle : "#34889b",
        backgroundSecondStyle : "#34889b",

        canvasWidth : 800,
        canvasHeight : 600,
        canvasId : "CursorLayer",
        textCanvasId : "TextLayer",
        textFontFamily : '28px Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif, STFangsong',
        textStyle : '#ffffff',
        componentContainer: new ComponentContainer()
    };

    var s = generalSettings;

    function initCanvas() {
        var canvas = document.getElementById(generalSettings.canvasId);
        var textCanvas = document.getElementById(generalSettings.textCanvasId);

        [canvas, textCanvas].forEach(function(canvas){
                if(!!canvas) {
                    var ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, s.canvasWidth, s.canvasHeight);

                    canvas.width = s.canvasWidth;
                    canvas.height = s.canvasHeight;

                    console.log('canvas is set to width ' + canvas.width + ' height ' + canvas.height);
                }
            });
    }

    function loadBackground(){
        // load upper section
        var ctx = document.getElementById(generalSettings.canvasId).getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = generalSettings.backgroundUpperStyle;
        ctx.fillRect(generalSettings.backgroundX, generalSettings.backgroundy, s.canvasWidth, s.canvasHeight * 3 / 5);
        // load second section
        ctx.beginPath();
        ctx.fillStyle = generalSettings.backgroundSecondStyle;
        ctx.fillRect(generalSettings.backgroundX, generalSettings.canvasHeight * 3 / 5, s.canvasWidth, s.canvasHeight * 2 / 5);
     }

    function loadComponents(){
        s.componentContainer.clear();

        // load components
        var ctx = document.getElementById(generalSettings.canvasId).getContext("2d");

        var monitor = new component(ctx, "monitor.svg", s.canvasWidth / 2 - 200, s.canvasHeight / 2 - 200, 200, 200, "显示器");
        var laptop = new component(ctx, "laptop.svg", s.canvasWidth / 2 + 50, s.canvasHeight / 2 -200, 200, 200, '笔记本电脑');
        var keyboard = new component(ctx, "keyboard.svg", s.canvasWidth / 2 - 280, s.canvasHeight / 2 + 30, 150, 150, '键盘');
        var cup = new component(ctx, "cpu.svg", s.canvasWidth / 2 - 100, s.canvasHeight / 2 + 15, 80, 80, 'CPU');
        var printer = new component(ctx, "printer.svg", s.canvasWidth / 2, s.canvasHeight / 2 + 45, 100, 100, '打印机');
        var cable = new component(ctx, "cable.svg", s.canvasWidth / 2 - 100, s.canvasHeight / 2 + 125, 90, 90, '线缆');
        var cd = new component(ctx, "cd.svg", s.canvasWidth / 2 + 100, s.canvasHeight / 2 - 0, 90, 90, 'CD');
        var earphones = new component(ctx, "earphones.svg", s.canvasWidth / 2 + 120, s.canvasHeight / 2 + 120, 90, 90, '耳机');
        var mouse = new component(ctx, "mouse.svg", s.canvasWidth / 2 + 200, s.canvasHeight / 2 + 50, 150, 150, '鼠标');
    }

    /** Used to keep track of
     ** ta collection of components
     **/
    function ComponentContainer() {
        this.collections = [];
    }

    // locate and return a component
        ComponentContainer.prototype.locate = function(dx, dy) {
            var locatedComponent = null;
            this.collections.forEach(function(cmp){
                if(cmp.identify(dx, dy)){
                    locatedComponent = cmp;
                }
            });
            locatedComponent && locatedComponent.showText();
        };

    // add component
    ComponentContainer.prototype.add = function(component){
        this.collections && this.collections.push(component);
    };

    ComponentContainer.prototype.clear = function(component){
        this.collections = [];
    };

    function component (ctx, name, x, y, width, height, text) {
        this.ctx =ctx;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text =text;
        var cmp = this;

        // init component
        console.log('init ' + this.name);
        var componentImage = new Image();
        componentImage.onload = function() {
            height && width && cmp.ctx.drawImage(componentImage, cmp.x, cmp.y, cmp.width, cmp.height);
            s.componentContainer.add(cmp);
            console.log('loaded component ' + cmp.name + ' at ' + cmp.x + ' ' + cmp.y + ' ' + cmp.width + ' ' + cmp.height);
        };
        componentImage.src = "svg/" + this.name;
    }

    component.prototype.identify = function(dx, dy){
        return dx >= this.x && dx <= this.x + this.width && dy >= this.y && dy <= this.y + this.height;
    };

    component.prototype.showText = function() {
        var text = (function(name, text){
            var englishName = name.replace('\.svg', '');
            return String.prototype.toUpperCase.apply(englishName) === String.prototype.toUpperCase.apply(text) ? text : text + '(' + englishName + ')';
        })(this.name, this.text);
        var textWidth = this.ctx.measureText(text);
        var x = (s.canvasWidth - textWidth.width || 0) / 2;
        var y = 100;
        var textLayer = document.getElementById(generalSettings.textCanvasId).getContext('2d');
        textLayer.font = s.textFontFamily;
        textLayer.fillStyle = s.textStyle;
        textLayer.clearRect(0, 0, s.canvasWidth, s.canvasHeight);
        textLayer.fillText(text, x, y);
    };

    $('#' + s.canvasId).ready(function(){
        initCanvas();
        loadBackground();
        loadComponents();

        (function(){
            var top = $("#" + s.canvasId).offset().top;
            var left = $("#" + s.canvasId).offset().left;

            console.log("canvas off set x " + left + " top " + top);

            $('#' + s.canvasId).click(function(_, e){
                var x = e.pageX - left;
                var y = e.pageY - top;

                s.componentContainer.locate(x, y);
                console.log(x, y);
            });

            // relay click on text layer to component layer
            $('#' + s.textCanvasId).click(function(e){
                $('#' + s.canvasId).trigger('click', e);
            });
        })();
    });

})();
