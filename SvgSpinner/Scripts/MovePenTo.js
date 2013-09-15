/// <reference path="IShape.ts" />
/// <reference path="Coordinate.ts" />
var SvgCommand;
(function (SvgCommand) {
    var MovePenTo = (function () {
        function MovePenTo(x, y, z) {
            this.coordinate = new SvgCommand.Coordinate(x, y, z);
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
    SvgCommand.MovePenTo = MovePenTo;
})(SvgCommand || (SvgCommand = {}));
//# sourceMappingURL=MovePenTo.js.map
