/// <reference path="IShape.ts" />
/// <reference path="Globals.ts" />
var SvgCommand;
(function (SvgCommand) {
    var Coordinate = (function () {
        function Coordinate(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Coordinate.prototype.Draw = function (ctx) {
        };

        Coordinate.prototype.Pitch = function (angle) {
            var oldZ = this.z;
            this.z = this.z * Math.cos(angle) + this.y * Math.sin(angle);
            this.y = this.y * Math.cos(angle) - oldZ * Math.sin(angle);
        };

        Coordinate.prototype.Yaw = function (angle) {
            var oldX = this.x;
            this.x = this.x * Math.cos(angle) + this.z * Math.sin(angle);
            this.z = this.z * Math.cos(angle) - oldX * Math.sin(angle);
        };

        Object.defineProperty(Coordinate.prototype, "ProjectedX", {
            get: function () {
                return (Globals.perspective * this.x) / (Globals.perspective - this.z);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Coordinate.prototype, "ProjectedY", {
            get: function () {
                return (Globals.perspective * this.y) / (Globals.perspective - this.z);
            },
            enumerable: true,
            configurable: true
        });

        Coordinate.prototype.Move = function (xDistance, yDistance) {
            this.x += xDistance;
            this.y += yDistance;
        };

        Coordinate.prototype.Resize = function (scaleFactor) {
            this.x *= scaleFactor;
            this.y *= scaleFactor;
        };
        return Coordinate;
    })();
    SvgCommand.Coordinate = Coordinate;
})(SvgCommand || (SvgCommand = {}));
//# sourceMappingURL=Coordinate.js.map
