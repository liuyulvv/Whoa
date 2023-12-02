declare namespace Whoa {
    export namespace WhoaMath {
        export class Point2 {
            public x: number;
            public y: number;

            public constructor(x?: number, y?: number);

            public clone(): Point2;
        }
    }
}
