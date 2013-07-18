/// <reference path="IShape.ts" />
/// <reference path="Coordinate.ts" />
/// <reference path="Globals.ts" />

module SvgCommand {

    export class BezierCurve implements IShape {

        private start: Coordinate;
        private end: Coordinate;
        private ctrl1: Coordinate;
        private ctrl2: Coordinate;

        constructor(x1: number, y1: number, z1: number,
                    x2: number, y2: number, z2: number,
                    xc1: number, yc1: number, zc1: number,
                    xc2: number, yc2: number, zc2: number) {
            this.start = new Coordinate(x1, y1, z1);
            this.end = new Coordinate(x2, y2, z2);
            this.ctrl1 = new Coordinate(xc1, yc1, zc1);
            this.ctrl2 = new Coordinate(xc2, yc2, zc2);
        }

        public Draw(ctx: CanvasRenderingContext2D) {
            ctx.bezierCurveTo(this.ctrl1.ProjectedX, this.ctrl1.ProjectedY,
                this.ctrl2.ProjectedX, this.ctrl2.ProjectedY,
                this.end.ProjectedX, this.end.ProjectedY);
        }

        public Pitch(angle) {
            this.start.Pitch(angle);
            this.end.Pitch(angle);
            this.ctrl1.Pitch(angle);
            this.ctrl2.Pitch(angle);

            return this;
        }

        public Yaw(angle) {
            this.start.Yaw(angle);
            this.end.Yaw(angle);
            this.ctrl1.Yaw(angle);
            this.ctrl2.Yaw(angle);

            return this;
        }

        public Move(xDistance: number, yDistance: number): void {
            this.start.Move(xDistance, yDistance);
            this.end.Move(xDistance, yDistance);
            this.ctrl1.Move(xDistance, yDistance);
            this.ctrl2.Move(xDistance, yDistance);
        }

        public Resize(scaleFactor: number): void {
            this.start.Resize(scaleFactor);
            this.end.Resize(scaleFactor);
            this.ctrl1.Resize(scaleFactor);
            this.ctrl2.Resize(scaleFactor);
        }
    }

}
