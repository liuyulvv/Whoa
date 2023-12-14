declare namespace WhoaMath {
    export class Point3 {
        public x: number;
        public y: number;
        public z: number;

        public constructor(x?: number, y?: number, z?: number);

        public distance(point: Point3): number;

        public add(point: Point3): Point3;

        public subtract(point: Point3): Point3;

        public multiply(num: number): Point3;

        public clone(): Point3;
    }
}
