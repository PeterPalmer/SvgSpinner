/// <reference path="CoordinateTests.ts" />
/// <reference path="tsUnit.ts" />
var UnitTests;
(function (UnitTests) {
    var TestRunner = (function () {
        function TestRunner() {
            this.test = new tsUnit.Test();
            this.test.addTestClass(new UnitTests.CoordinateTests());
        }
        TestRunner.prototype.runInBrowser = function () {
            var _this = this;
            window.onload = function () {
                _this.test.showResults(document.getElementById('result'), _this.test.run());
            };
        };

        TestRunner.prototype.runInScriptEngine = function () {
            var result = this.test.run();
            if (result.errors.length > 0) {
                var message = '';
                for (var i = 0; i < result.errors.length; i++) {
                    var err = result.errors[i];
                    message += err.testName + ' ' + err.funcName + ' ' + err.message + '\r\n';
                }
                throw new Error(message);
            }
        };
        return TestRunner;
    })();
    UnitTests.TestRunner = TestRunner;
})(UnitTests || (UnitTests = {}));

var testRunner = new UnitTests.TestRunner();

if (typeof isMsScriptEngineContext === "undefined") {
    testRunner.runInBrowser();
}

function getResult() {
    testRunner.runInScriptEngine();
}
//# sourceMappingURL=TestRunner.js.map
