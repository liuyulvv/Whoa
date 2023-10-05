/// <reference path="GeometryBase.d.ts" />

declare namespace Whoa {
    export namespace WhoaGeometry {
        export interface Point3DSerialization extends GeometryBaseSerialization {
            x: number;
            y: number;
            z: number;
        }

        export class Point3D extends GeometryBase {
            public constructor(x?: number, y?: number, z?: number);
            public clone(): Point3D;
            public get x(): number;
            public set x(v: number);
            public get y(): number;
            public set y(v: number);
            public get z(): number;
            public set z(v: number);
            public distance(point: Point3D): number;
            public add(point: Point3D): void;
            public subtract(point: Point3D): void;
            public multiply(num: number): void;
            public equal(point: Point3D, tolerance?: number): boolean;
            public serialize(): Point3DSerialization;
            public deserialize(serialization: Point3DSerialization): void;
        }
    }
}