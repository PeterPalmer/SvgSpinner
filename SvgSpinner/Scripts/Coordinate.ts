/// <reference path="IShape.ts" />
/// <reference path="Globals.ts" />

module Shapes {

    export class Coordinate implements IShape {

        constructor(private x: number, private y: number, private z: number) {
        }

        public Draw(ctx: CanvasRenderingContext2D): void { }

        public Pitch(angle: number): void {
            var oldZ = this.z;
            this.z = this.z * Math.cos(angle) + this.y * Math.sin(angle);
            this.y = this.y * Math.cos(angle) - oldZ * Math.sin(angle);
        }

        public Yaw(angle: number): void {
            var oldX = this.x;
            this.x = this.x * Math.cos(angle) + this.z * Math.sin(angle);
            this.z = this.z * Math.cos(angle) - oldX * Math.sin(angle);
        }

        get ProjectedX(): number {
            return (Globals.perspective * this.x) / (Globals.perspective - this.z);
        }

        get ProjectedY(): number {
            return (Globals.perspective * this.y) / (Globals.perspective - this.z);
        }

        public Move(xDistance: number, yDistance: number): void {
            this.x += xDistance;
            this.y += yDistance;
        }

        public Resize(scaleFactor: number): void {
            this.x *= scaleFactor;
            this.y *= scaleFactor;
        }
    }

}
