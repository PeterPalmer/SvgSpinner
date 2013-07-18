/// <reference path="../Scripts/Coordinate.ts" />
/// <reference path="tsUnit.ts" />

module UnitTests {

    export class CoordinateTests extends tsUnit.TestClass {

        public Coordinate_ProjectedX(context: tsUnit.TestContext):void {
            // Arrange
            var coordinate = new SvgCommand.Coordinate(1, 1, 0);

            // Act
            var projectedX = coordinate.ProjectedX;

            // Assert
            context.areIdentical(1, projectedX);
        }

        public Coordinate_Pitch_FullCircleShouldEndUpInSamePlace(context: tsUnit.TestContext) {
            var coordinate = new SvgCommand.Coordinate(Math.random(), Math.random(), Math.random());
            var projectedXBefore = coordinate.ProjectedX;

            coordinate.Pitch(2 * Math.PI);

            context.areIdentical(projectedXBefore, coordinate.ProjectedX);
        }

        public Coordinate_Move_ShouldMoveSpecifiedDistance(context: tsUnit.TestContext) {
            var coordinate = new SvgCommand.Coordinate(123, 456, 0);

            coordinate.Move(100, 100);

            context.areIdentical(223, coordinate.ProjectedX);
            context.areIdentical(556, coordinate.ProjectedY);
        }

        public Coordinate_Resize_ShoulResizeToSpecifiedScale(context: tsUnit.TestContext) {
            var coordinate = new SvgCommand.Coordinate(123, 456, 0);

            coordinate.Resize(2);

            context.areIdentical(246, coordinate.ProjectedX);
        }
    }
}