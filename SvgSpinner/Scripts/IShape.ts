module SvgCommand {

    export interface IShape {
        Pitch(angle: number): void;
        Yaw(angle: number): void;
        Draw(ctx: CanvasRenderingContext2D): void;
        Move(xDistance: number, yDistance: number): void;
        Resize(scaleFactor: number): void;
    }

}
