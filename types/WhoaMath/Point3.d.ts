declare namespace Whoa {
    export namespace WhoaMath {
        export class Point3 {
            public x: number;
            public y: number;
            public z: number;

            public constructor(x?: number, y?: number, z?: number);

            public clone(): Point3;
        }
    }
}
