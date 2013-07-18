/// <reference path="CoordinateTests.ts" />
/// <reference path="tsUnit.ts" />

module UnitTests {
    export class TestRunner {
        private test: tsUnit.Test;
        constructor() {
            this.test = new tsUnit.Test();
            this.test.addTestClass(new UnitTests.CoordinateTests);
        }

        runInBrowser() {
            window.onload = () => {
                this.test.showResults(document.getElementById('result'),
                    this.test.run());
            }
    }

        runInScriptEngine() {
            var result = this.test.run();
            if (result.errors.length > 0) {
                var message = '';
                for (var i = 0; i < result.errors.length; i++) {
                    var err = result.errors[i];
                    message += err.testName + ' ' +
                    err.funcName + ' ' +
                    err.message + '\r\n';
                }
                throw new Error(message);
            }
        }
    }
}

declare var isMsScriptEngineContext: boolean;

var testRunner = new UnitTests.TestRunner();

if (typeof isMsScriptEngineContext === "undefined") {
    testRunner.runInBrowser();
}

function getResult() {
    testRunner.runInScriptEngine();
}