var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Scripts/Coordinate.ts" />
/// <reference path="tsUnit.ts" />
var UnitTests;
(function (UnitTests) {
    var CoordinateTests = (function (_super) {
        __extends(CoordinateTests, _super);
        function CoordinateTests() {
            _super.apply(this, arguments);
        }
        CoordinateTests.prototype.Coordinate_ProjectedX = function (context) {
            // Arrange
            var coordinate = new Shapes.Coordinate(1, 1, 0);

            // Act
            var projectedX = coordinate.ProjectedX;

            // Assert
            context.areIdentical(1, projectedX);
        };

        CoordinateTests.prototype.Coordinate_Pitch_FullCircleShouldEndUpInSamePlace = function (context) {
            var coordinate = new Shapes.Coordinate(Math.random(), Math.random(), Math.random());
            var projectedXBefore = coordinate.ProjectedX;

            coordinate.Pitch(2 * Math.PI);

            context.areIdentical(projectedXBefore, coordinate.ProjectedX);
        };

        CoordinateTests.prototype.Coordinate_Move_ShouldMoveSpecifiedDistance = function (context) {
            var coordinate = new Shapes.Coordinate(123, 456, 0);

            coordinate.Move(100, 100);

            context.areIdentical(223, coordinate.ProjectedX);
            context.areIdentical(556, coordinate.ProjectedY);
        };

        CoordinateTests.prototype.Coordinate_Resize_ShoulResizeToSpecifiedScale = function (context) {
            var coordinate = new Shapes.Coordinate(123, 456, 0);

            coordinate.Resize(2);

            context.areIdentical(246, coordinate.ProjectedX);
        };
        return CoordinateTests;
    })(tsUnit.TestClass);
    UnitTests.CoordinateTests = CoordinateTests;
})(UnitTests || (UnitTests = {}));
//@ sourceMappingURL=CoordinateTests.js.map
