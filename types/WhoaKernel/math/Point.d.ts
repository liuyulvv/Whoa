declare namespace WhoaMath {
    export class Point2 {
        public x: number;
        public y: number;

        public constructor(x?: number, y?: number);

        public Distance(point: Point2): number;

        public Add(point: Point2): Point2;

        public Subtract(point: Point2): Point2;

        public Multiply(num: number): Point2;

        public Clone(): Point2;
    }

    export class Point3 {
        public x: number;
        public y: number;
        public z: number;

        public constructor(x?: number, y?: number, z?: number);

        public Distance(point: Point3): number;

        public Add(point: Point3): Point3;

        public Subtract(point: Point3): Point3;

        public Multiply(num: number): Point3;

        public Clone(): Point3;
    }
}
