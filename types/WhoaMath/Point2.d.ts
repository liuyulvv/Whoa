declare namespace WhoaMath {
    export class Point2 {
        public x: number;
        public y: number;

        public constructor(x?: number, y?: number);

        public distance(point: Point2): number;

        public add(point: Point2): Point2;

        public subtract(point: Point2): Point2;

        public multiply(num: number): Point2;

        public clone(): Point2;
    }
}
