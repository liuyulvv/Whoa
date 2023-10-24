/// <reference path="GeometryBase.d.ts" />

declare namespace Whoa {
    export namespace WhoaGeometry {
        export interface Point2DSerialization extends GeometryBaseSerialization {
            x: number;
            y: number;
        }

        export class Point2D extends GeometryBase {
            public constructor(x?: number, y?: number);
            public clone(): Point2D;
            public get x(): number;
            public set x(v: number);
            public get y(): number;
            public set y(v: number);
            public distance(point: Point2D): number;
            public add(point: Point2D): Point2D;
            public addInPlace(point: Point2D): void;
            public subtract(point: Point2D): Point2D;
            public subtractInPlace(point: Point2D): void;
            public multiply(num: number): Point2D;
            public multiplyInPlace(num: number): void;
            public dot(point: Point2D): number;
            public getRadianBetween(end: Point2D): number;
            public equal(point: Point2D, tolerance?: number): boolean;
            public length(): number;
            public serialize(): Point2DSerialization;
            public deserialize(serialization: Point2DSerialization): void;
        }
    }
}
