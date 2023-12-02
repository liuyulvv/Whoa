/// <reference path="Point3.d.ts" />
/// <reference path="Vector3.d.ts" />
/// <reference path="Vector4.d.ts" />

declare namespace Whoa {
    export namespace WhoaMath {
        export class Vector4 {
            public x: number;
            public y: number;
            public z: number;
            public w: number;

            public constructor(x?: number, y?: number, z?: number, w?: number);

            public get length(): number;

            public add(vector: Vector4): Vector4;

            public subtract(vector: Vector4): Vector4;

            public multiply(num: number): Vector4;

            public divide(num: number): Vector4;

            public cross(vector: Vector4): Vector4;

            public dot(vector: Vector4): number;

            public getRadiansBetween(vector: Vector4): number;

            public normalize(): Vector4;

            public static fromVector3(vector: Vector3): Vector4;

            public static toVector3(vector: Vector4): Vector3;

            public static fromPoint3(point: Point3): Vector4;

            public static toPoint3(vector: Vector4): Point3;

            public clone(): Vector4;
        }
    }
}
