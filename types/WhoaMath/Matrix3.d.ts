/// <reference path="Vector3.d.ts" />

declare namespace WhoaMath {
    export class Matrix3 {
        public value: Array<Array<number>>;

        public constructor(
            m11?: number,
            m12?: number,
            m13?: number,
            m21?: number,
            m22?: number,
            m23?: number,
            m31?: number,
            m32?: number,
            m33?: number
        );

        public multiply(matrix: Matrix3): Matrix3;

        public inverse(): Matrix3;

        public transpose(): Matrix3;

        public clone(): Matrix3;

        public static fromVector3(vector: Vector3): Matrix3;
    }
}
