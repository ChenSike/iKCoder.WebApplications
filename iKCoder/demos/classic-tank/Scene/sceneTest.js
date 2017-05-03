function testScenarioOne() {
    var codeArr = [];
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    // codeArr.push('turnLeft()');
    codeArr.push('shoot()');

    var code = codeArr.join("\n");
    var interpreter = new Interpreter(code, Scene.interpreter);

    Scene.registerCurInterpreter(interpreter);
    Scene.startGame();
}

function testing() {
    var codeArr = [];
    codeArr.push('var i = 0;');
    codeArr.push('while(i < 5) {');
    codeArr.push('moveForward();');
    codeArr.push('i++;');
    codeArr.push('}');

    var code = codeArr.join("\n");
    var interpreter = new Interpreter(code, Scene.interpreter);

    Scene.startGame(interpreter);
}

function exectuteTest() {
    testScenarioOne();
    testing();
}

function testScenarioTwo() {
    var codeArr = [];
    codeArr.push('if(hitWall()) {');
    codeArr.push('turnRight()');
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('turnLeft()');
    codeArr.push('shoot()}');

    var code = codeArr.join("\n");
    var interpreter = new Interpreter(code, Scene.interpreter);
    try {
        var ticks = 10000; // 10k ticks runs Pegman for about 8 minutes.
        while (interpreter.step()) {
            if (ticks-- == 0) {
                throw Infinity;
            }
        }
        Scene.startGame();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }

    Scene.Animate();
}

function testScenarioThree() {
    var codeArr = [];
    codeArr.push('if(hitWall()) {');
    codeArr.push('turnRight()');
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('turnLeft()');
    codeArr.push('shoot()}');

    var code = codeArr.join("\n");
    var interpreter = new Interpreter(code, Scene.interpreter);
    try {
        var ticks = 10000; // 10k ticks runs Pegman for about 8 minutes.
        while (interpreter.step()) {
            if (ticks-- == 0) {
                throw Infinity;
            }
        }
        Scene.startGame();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }

    Scene.Animate();
}

function testScenarioFour() {
    var interpreter = new Interpreter("enableKeyboardControl();", Scene.interpreter);
    try {
        interpreter.run();
        Scene.startGame();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }

    Scene.Animate();
}
