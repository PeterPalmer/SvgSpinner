/// <reference path="Coordinate.ts" />
/// <reference path="IShape.ts" />

module SvgCommand {

    export class Path {
        public shapes: IShape[] = [];

        constructor(public fillColor: string = 'rgb(0,0,0)', public strokeColor: string = 'none') {
        }
    }

}
