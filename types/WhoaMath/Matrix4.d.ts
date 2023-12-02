/// <reference path="Vector3.d.ts" />
/// <reference path="Vector4.d.ts" />
/// <reference path="Matrix3.d.ts" />

declare namespace Whoa {
    export namespace WhoaMath {
        export class Matrix4 {
            public value: Array<Array<number>>;

            public constructor(
                m11?: number,
                m12?: number,
                m13?: number,
                m14?: number,
                m21?: number,
                m22?: number,
                m23?: number,
                m24?: number,
                m31?: number,
                m32?: number,
                m33?: number,
                m34?: number,
                m41?: number,
                m42?: number,
                m43?: number,
                m44?: number
            );

            public multiply(matrix: Matrix4): Matrix4;

            public inverse(): Matrix4;

            public transform(vector: Vector4): Vector4;

            public transpose(): Matrix4;

            public clone(): Matrix4;

            public static fromMatrix3(matrix: Matrix3): Matrix4;

            public static toMatrix3(matrix: Matrix4): Matrix3;

            public static fromVector4(vector: Vector4): Matrix4;

            public static fromTranslation(vector: Vector3): Matrix4;

            public static fromScale(vector: Vector3): Matrix4;

            public static fromRotationX(radians: number): Matrix4;

            public static fromRotationY(radians: number): Matrix4;

            public static fromRotationZ(radians: number): Matrix4;

            public static fromRotationAxis(axis: Vector3, radians: number): Matrix4;

            public static fromRotationEuler(x: number, y: number, z: number): Matrix4;
        }
    }
}
