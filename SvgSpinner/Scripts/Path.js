/// <reference path="Coordinate.ts" />
/// <reference path="IShape.ts" />
var SvgCommand;
(function (SvgCommand) {
    var Path = (function () {
        function Path(fillColor, strokeColor) {
            if (typeof fillColor === "undefined") { fillColor = 'rgb(0,0,0)'; }
            if (typeof strokeColor === "undefined") { strokeColor = 'none'; }
            this.fillColor = fillColor;
            this.strokeColor = strokeColor;
            this.shapes = [];
        }
        return Path;
    })();
    SvgCommand.Path = Path;
})(SvgCommand || (SvgCommand = {}));
//# sourceMappingURL=Path.js.map
