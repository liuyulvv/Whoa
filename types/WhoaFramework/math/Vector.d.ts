/// <reference path="Point.d.ts" />

declare namespace WhoaMath {
    export class Vector2 {
        public x: number;
        public y: number;

        public constructor(x?: number, y?: number);

        public Length(): number;

        public Add(vector: Vector2): Vector2;

        public Subtract(vector: Vector2): Vector2;

        public Multiply(num: number): Vector2;

        public Divide(num: number): Vector2;

        public Cross(vector: Vector2): number;

        public Dot(vector: Vector2): number;

        public GetRadianBetween(vector: Vector2): number;

        public Normalize(): Vector2;

        public static FromPoint2(point: Point2): Vector2;

        public static ToPoint2(vector: Vector2): Point2;

        public Clone(): Vector2;
    }

    export class Vector3 {
        public x: number;
        public y: number;
        public z: number;

        public constructor(x?: number, y?: number, z?: number);

        public Length(): number;

        public Add(vector: Vector3): Vector3;

        public Subtract(vector: Vector3): Vector3;

        public Multiply(num: number): Vector3;

        public Divide(num: number): Vector3;

        public Cross(vector: Vector3): Vector3;

        public Dot(vector: Vector3): number;

        public GetRadianBetween(vector: Vector3): number;

        public Normalize(): Vector3;

        public static FromPoint3(point: Point3): Vector3;
    }

    export class Vector4 {
        public x: number;
        public y: number;
        public z: number;
        public w: number;

        public constructor(x?: number, y?: number, z?: number, w?: number);

        public Length(): number;

        public Add(vector: Vector4): Vector4;

        public Subtract(vector: Vector4): Vector4;

        public Multiply(num: number): Vector4;

        public Divide(num: number): Vector4;

        public Cross(vector: Vector4): Vector4;

        public Dot(vector: Vector4): number;

        public GetRadianBetween(vector: Vector4): number;

        public Normalize(): Vector4;

        public static FromPoint3(point: Point3): Vector4;

        public static ToPoint3(vector: Vector4): Point3;

        public static FromVector3(vector: Vector3): Vector4;

        public static ToVector3(vector: Vector4): Vector3;

        public Clone(): Vector4;
    }
}
