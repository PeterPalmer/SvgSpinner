/// <reference path="IShape.ts" />
/// <reference path="Coordinate.ts" />
/// <reference path="Globals.ts" />
var Shapes;
(function (Shapes) {
    var BezierCurve = (function () {
        function BezierCurve(x1, y1, z1, x2, y2, z2, xc1, yc1, zc1, xc2, yc2, zc2) {
            this.start = new Shapes.Coordinate(x1, y1, z1);
            this.end = new Shapes.Coordinate(x2, y2, z2);
            this.ctrl1 = new Shapes.Coordinate(xc1, yc1, zc1);
            this.ctrl2 = new Shapes.Coordinate(xc2, yc2, zc2);
        }
        BezierCurve.prototype.Draw = function (ctx) {
            ctx.bezierCurveTo(this.ctrl1.ProjectedX, this.ctrl1.ProjectedY, this.ctrl2.ProjectedX, this.ctrl2.ProjectedY, this.end.ProjectedX, this.end.ProjectedY);
        };

        BezierCurve.prototype.Pitch = function (angle) {
            this.start.Pitch(angle);
            this.end.Pitch(angle);
            this.ctrl1.Pitch(angle);
            this.ctrl2.Pitch(angle);

            return this;
        };

        BezierCurve.prototype.Yaw = function (angle) {
            this.start.Yaw(angle);
            this.end.Yaw(angle);
            this.ctrl1.Yaw(angle);
            this.ctrl2.Yaw(angle);

            return this;
        };

        BezierCurve.prototype.Move = function (xDistance, yDistance) {
            this.start.Move(xDistance, yDistance);
            this.end.Move(xDistance, yDistance);
            this.ctrl1.Move(xDistance, yDistance);
            this.ctrl2.Move(xDistance, yDistance);
        };

        BezierCurve.prototype.Resize = function (scaleFactor) {
            this.start.Resize(scaleFactor);
            this.end.Resize(scaleFactor);
            this.ctrl1.Resize(scaleFactor);
            this.ctrl2.Resize(scaleFactor);
        };
        return BezierCurve;
    })();
    Shapes.BezierCurve = BezierCurve;
})(Shapes || (Shapes = {}));
//@ sourceMappingURL=BezierCurve.js.map
