/// <reference path="IShape.ts" />
/// <reference path="Coordinate.ts" />
var Shapes;
(function (Shapes) {
    var MovePenTo = (function () {
        function MovePenTo(x, y, z) {
            this.coordinate = new Shapes.Coordinate(x, y, z);
        }
        MovePenTo.prototype.Pitch = function (angle) {
            this.coordinate.Pitch(angle);
        };

        MovePenTo.prototype.Yaw = function (angle) {
            this.coordinate.Yaw(angle);
        };

        MovePenTo.prototype.Draw = function (ctx) {
            ctx.moveTo(this.coordinate.ProjectedX, this.coordinate.ProjectedY);
        };

        MovePenTo.prototype.Move = function (xDistance, yDistance) {
            this.coordinate.Move(xDistance, yDistance);
        };

        MovePenTo.prototype.Resize = function (scaleFactor) {
            this.coordinate.Resize(scaleFactor);
        };
        return MovePenTo;
    })();
    Shapes.MovePenTo = MovePenTo;
})(Shapes || (Shapes = {}));
//@ sourceMappingURL=MovePenTo.js.map
