/// <reference path="Coordinate.ts" />
/// <reference path="IShape.ts" />
var Shapes;
(function (Shapes) {
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
    Shapes.Path = Path;
})(Shapes || (Shapes = {}));
//@ sourceMappingURL=Path.js.map
