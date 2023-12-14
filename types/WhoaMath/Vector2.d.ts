/// <reference path="Point2.d.ts" />

declare namespace WhoaMath {
    export class Vector2 {
        public x: number;
        public y: number;

        public constructor(x?: number, y?: number);

        public get length(): number;

        public add(vector: Vector2): Vector2;

        public subtract(vector: Vector2): Vector2;

        public multiply(num: number): Vector2;

        public divide(num: number): Vector2;

        public cross(vector: Vector2): Vector2;

        public dot(vector: Vector2): number;

        public getRadianBetween(vector: Vector2): number;

        public normalize(): Vector2;

        public static fromPoint2(point: Point2): Vector2;

        public static toPoint2(vector: Vector2): Point2;

        public clone(): Vector2;
    }
}
