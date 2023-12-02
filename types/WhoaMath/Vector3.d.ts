/// <reference path="Point3.d.ts" />

declare namespace Whoa {
    export namespace WhoaMath {
        export class Vector3 {
            public x: number;
            public y: number;
            public z: number;

            public constructor(x?: number, y?: number, z?: number);

            public get length(): number;

            public add(vector: Vector3): Vector3;

            public subtract(vector: Vector3): Vector3;

            public multiply(num: number): Vector3;

            public divide(num: number): Vector3;

            public cross(vector: Vector3): Vector3;

            public dot(vector: Vector3): number;

            public getRadiansBetween(vector: Vector3): number;

            public normalize(): Vector3;

            public static fromPoint3(point: Point3): Vector3;

            public static toPoint3(vector: Vector3): Point3;

            public clone(): Vector3;
        }
    }
}
