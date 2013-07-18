/// <reference path="raphael.d.ts" />
/// <reference path="Globals.ts" />
/// <reference path="IShape.ts" />
/// <reference path="Path.ts" />
/// <reference path="MovePenTo.ts" />
/// <reference path="BezierCurve.ts" />
var SvgCommand;
(function (SvgCommand) {
    var SpinnerModel = (function () {
        function SpinnerModel() {
            this.paths = [];
            this.minX = Number.MAX_VALUE;
            this.maxX = Number.MIN_VALUE;
            this.minY = Number.MAX_VALUE;
            this.maxY = Number.MIN_VALUE;
        }
        SpinnerModel.prototype.LoadSvgPath = function (pathStr, fillColor, strokeColor) {
            if (typeof fillColor === "undefined") { fillColor = '#000000'; }
            if (typeof strokeColor === "undefined") { strokeColor = 'none'; }
            var curves = Raphael.path2curve(pathStr);
            var currentX = 0, currentY = 0, currentZ = 150;
            var currentPath;

            this.paths.push(new SvgCommand.Path(fillColor, strokeColor));
            currentPath = this.paths[this.paths.length - 1];

            for (var curveIdx = 0; curveIdx < curves.length; curveIdx++) {
                var command = curves[curveIdx][0];

                if (command == "M") {
                    currentPath.shapes.push(new SvgCommand.MovePenTo(curves[curveIdx][1], curves[curveIdx][2], currentZ));
                } else if (command = "C") {
                    currentPath.shapes.push(new SvgCommand.BezierCurve(currentX, currentY, currentZ, curves[curveIdx][5], curves[curveIdx][6], currentZ, curves[curveIdx][1], curves[curveIdx][2], currentZ, curves[curveIdx][3], curves[curveIdx][4], currentZ));

                    currentX = curves[curveIdx][5];
                    currentY = curves[curveIdx][6];

                    if (this.minX > curves[curveIdx][5]) {
                        this.minX = curves[curveIdx][5];
                    }
                    if (this.maxX < curves[curveIdx][5]) {
                        this.maxX = curves[curveIdx][5];
                    }
                    if (this.minY > curves[curveIdx][6]) {
                        this.minY = curves[curveIdx][6];
                    }
                    if (this.maxY < curves[curveIdx][6]) {
                        this.maxY = curves[curveIdx][6];
                    }
                } else {
                    alert('Unknown command: ' + command);
                }
            }
        };

        SpinnerModel.prototype.Clear = function () {
            this.paths = [];
            this.minX = Number.MAX_VALUE;
            this.maxX = Number.MIN_VALUE;
            this.minY = Number.MAX_VALUE;
            this.maxY = Number.MIN_VALUE;
        };

        SpinnerModel.prototype.CenterAndScale = function () {
            // Center the model over origo
            this.Move((this.maxX - this.minX) / -2 - this.minX, (this.maxY - this.minY) / -2 - this.minY);

            // Resize the model to fit the canvas
            var scaleFactor = 300 / Math.max(this.maxY - this.minY, this.maxX - this.minX);
            this.Resize(scaleFactor);
        };

        SpinnerModel.prototype.Draw = function (ctx) {
            for (var pathIdx = 0; pathIdx < this.paths.length; pathIdx++) {
                this.DrawPath(ctx, this.paths[pathIdx]);
            }
        };

        SpinnerModel.prototype.DrawPath = function (ctx, path) {
            ctx.beginPath();

            for (var shapeIdx = 0; shapeIdx < path.shapes.length; shapeIdx++) {
                var shape = path.shapes[shapeIdx];
                shape.Draw(ctx);
                shape.Pitch(Globals.pitchSpeed);
                shape.Yaw(Globals.yawSpeed);
            }

            ctx.fillStyle = path.fillColor;
            ctx.fill();

            if (path.strokeColor != '' && path.strokeColor != 'none') {
                ctx.strokeStyle = path.strokeColor;
                ctx.stroke();
            }
        };

        SpinnerModel.prototype.Move = function (xDistance, yDistance) {
            this.paths.forEach(function (path) {
                path.shapes.forEach(function (shape) {
                    shape.Move(xDistance, yDistance);
                });
            });
        };

        SpinnerModel.prototype.Resize = function (scaleFactor) {
            this.paths.forEach(function (path) {
                path.shapes.forEach(function (shape) {
                    shape.Resize(scaleFactor);
                });
            });
        };
        return SpinnerModel;
    })();
    SvgCommand.SpinnerModel = SpinnerModel;
})(SvgCommand || (SvgCommand = {}));
//@ sourceMappingURL=SpinnerModel.js.map
