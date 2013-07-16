module Main {

    // Methods prefixed with 'cb_' will have their this-pointer permanently bound to the class.
    export class HasCallbacks {
        constructor() {
            var _this = this, _constructor = (<any>this).constructor;
            if (!_constructor.__cb__) {
                _constructor.__cb__ = {};
                for (var m in this) {
                    var fn = this[m];
                    if (typeof fn === 'function' && m.indexOf('cb_') == 0) {
                        _constructor.__cb__[m] = fn;
                    }
                }
            }
            for (var m in _constructor.__cb__) {
                (function (m, fn) {
                    _this[m] = function () {
                        return fn.apply(_this, Array.prototype.slice.call(arguments));
                    };
                })(m, _constructor.__cb__[m]);
            }
        }
    }

}