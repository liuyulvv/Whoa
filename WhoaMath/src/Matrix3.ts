import Vector3 from './Vector3';

export default class Matrix3 {
    public m11: number;
    public m12: number;
    public m13: number;
    public m21: number;
    public m22: number;
    public m23: number;
    public m31: number;
    public m32: number;
    public m33: number;

    public constructor(
        m11: number = 1,
        m12: number = 0,
        m13: number = 0,
        m21: number = 0,
        m22: number = 1,
        m23: number = 0,
        m31: number = 0,
        m32: number = 0,
        m33: number = 1
    ) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
    }

    public multiply(matrix: Matrix3): Matrix3 {
        return new Matrix3(
            this.m11 * matrix.m11 + this.m12 * matrix.m21 + this.m13 * matrix.m31,
            this.m11 * matrix.m12 + this.m12 * matrix.m22 + this.m13 * matrix.m32,
            this.m11 * matrix.m13 + this.m12 * matrix.m23 + this.m13 * matrix.m33,
            this.m21 * matrix.m11 + this.m22 * matrix.m21 + this.m23 * matrix.m31,
            this.m21 * matrix.m12 + this.m22 * matrix.m22 + this.m23 * matrix.m32,
            this.m21 * matrix.m13 + this.m22 * matrix.m23 + this.m23 * matrix.m33,
            this.m31 * matrix.m11 + this.m32 * matrix.m21 + this.m33 * matrix.m31,
            this.m31 * matrix.m12 + this.m32 * matrix.m22 + this.m33 * matrix.m32,
            this.m31 * matrix.m13 + this.m32 * matrix.m23 + this.m33 * matrix.m33
        );
    }

    private determinant(): number {
        return (
            this.m11 * this.m22 * this.m33 +
            this.m12 * this.m23 * this.m31 +
            this.m13 * this.m21 * this.m32 -
            this.m11 * this.m23 * this.m32 -
            this.m12 * this.m21 * this.m33 -
            this.m13 * this.m22 * this.m31
        );
    }

    public inverse(): Matrix3 {
        const det = this.determinant();
        if (det == 0) {
            throw new Error('Cannot invert matrix with zero determinant');
        }
        return new Matrix3(
            (this.m22 * this.m33 - this.m23 * this.m32) / det,
            (this.m13 * this.m32 - this.m12 * this.m33) / det,
            (this.m12 * this.m23 - this.m13 * this.m22) / det,
            (this.m23 * this.m31 - this.m21 * this.m33) / det,
            (this.m11 * this.m33 - this.m13 * this.m31) / det,
            (this.m13 * this.m21 - this.m11 * this.m23) / det,
            (this.m21 * this.m32 - this.m22 * this.m31) / det,
            (this.m12 * this.m31 - this.m11 * this.m32) / det,
            (this.m11 * this.m22 - this.m12 * this.m21) / det
        );
    }

    public transform(vector: Vector3): Vector3 {
        return new Vector3(
            this.m11 * vector.x + this.m12 * vector.y + this.m13 * vector.z,
            this.m21 * vector.x + this.m22 * vector.y + this.m23 * vector.z,
            this.m31 * vector.x + this.m32 * vector.y + this.m33 * vector.z
        );
    }

    public transpose(): Matrix3 {
        return new Matrix3(this.m11, this.m21, this.m31, this.m12, this.m22, this.m32, this.m13, this.m23, this.m33);
    }

    public clone(): Matrix3 {
        return new Matrix3(this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
    }

    public static fromVector3(vector: Vector3): Matrix3 {
        return new Matrix3(vector.x, 0, 0, 0, vector.y, 0, 0, 0, vector.z);
    }

    public static fromRows(row1: Vector3, row2: Vector3, row3: Vector3): Matrix3 {
        return new Matrix3(row1.x, row1.y, row1.z, row2.x, row2.y, row2.z, row3.x, row3.y, row3.z);
    }

    public static fromColumns(column1: Vector3, column2: Vector3, column3: Vector3): Matrix3 {
        return new Matrix3(
            column1.x,
            column2.x,
            column3.x,
            column1.y,
            column2.y,
            column3.y,
            column1.z,
            column2.z,
            column3.z
        );
    }
}
