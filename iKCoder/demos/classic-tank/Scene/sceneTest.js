function testScenarioOne() {
    var codeArr = [];
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('moveForward()');
    codeArr.push('turnLeft()');
    codeArr.push('shoot()');

    var code = codeArr.join("\n");
    var interpreter = new Interpreter(code, Scene.interpreter);
    try {
        var ticks = 10000;  // 10k ticks runs Pegman for about 8 minutes.
        while (interpreter.step()) {
            if (ticks-- == 0) {
                throw Infinity;
            }
        }
	      Scene.startGame();
    } catch (e) {
        alert('badCode: %1'.replace('%1', e));
    }

    Scene.Amin();
}

// testScenarioOne();

