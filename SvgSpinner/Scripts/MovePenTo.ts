/// <reference path="IShape.ts" />
/// <reference path="Coordinate.ts" />

module SvgCommand {

    export class MovePenTo implements IShape {

        private coordinate: Coordinate;

        constructor(x: number, y: number, z: number) {
            this.coordinate = new Coordinate(x, y, z);
        }

        public Pitch(angle: number): void {
            this.coordinate.Pitch(angle);
        }

        public Yaw(angle: number): void {
            this.coordinate.Yaw(angle);
        }

        public Draw(ctx: CanvasRenderingContext2D): void {
            ctx.moveTo(this.coordinate.ProjectedX, this.coordinate.ProjectedY);
        }

        public Move(xDistance: number, yDistance: number): void {
            this.coordinate.Move(xDistance, yDistance);
        }

        public Resize(scaleFactor: number): void {
            this.coordinate.Resize(scaleFactor);
        }

    }
}