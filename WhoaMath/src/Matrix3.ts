import Vector3 from './Vector3';

export default class Matrix3 {
    public value: Array<Array<number>>;

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
        this.value = new Array<Array<number>>(3);
        this.value[0] = new Array<number>(3);
        this.value[1] = new Array<number>(3);
        this.value[2] = new Array<number>(3);
        this.value[0][0] = m11;
        this.value[0][1] = m12;
        this.value[0][2] = m13;
        this.value[1][0] = m21;
        this.value[1][1] = m22;
        this.value[1][2] = m23;
        this.value[2][0] = m31;
        this.value[2][1] = m32;
        this.value[2][2] = m33;
    }

    public multiply(matrix: Matrix3): Matrix3 {
        const result = new Matrix3();
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                result.value[row][column] =
                    this.value[row][0] * matrix.value[0][column] +
                    this.value[row][1] * matrix.value[1][column] +
                    this.value[row][2] * matrix.value[2][column];
            }
        }
        return result;
    }

    private determinant(): number {
        return (
            this.value[0][0] * (this.value[1][1] * this.value[2][2] - this.value[1][2] * this.value[2][1]) -
            this.value[0][1] * (this.value[1][0] * this.value[2][2] - this.value[1][2] * this.value[2][0]) +
            this.value[0][2] * (this.value[1][0] * this.value[2][1] - this.value[1][1] * this.value[2][0])
        );
    }

    public inverse(): Matrix3 {
        const det = this.determinant();
        if (det == 0) {
            throw new Error('Matrix is not invertible');
        }
        const result = new Matrix3();
        result.value[0][0] = (this.value[1][1] * this.value[2][2] - this.value[1][2] * this.value[2][1]) / det;
        result.value[0][1] = (this.value[0][2] * this.value[2][1] - this.value[0][1] * this.value[2][2]) / det;
        result.value[0][2] = (this.value[0][1] * this.value[1][2] - this.value[0][2] * this.value[1][1]) / det;
        result.value[1][0] = (this.value[1][2] * this.value[2][0] - this.value[1][0] * this.value[2][2]) / det;
        result.value[1][1] = (this.value[0][0] * this.value[2][2] - this.value[0][2] * this.value[2][0]) / det;
        result.value[1][2] = (this.value[0][2] * this.value[1][0] - this.value[0][0] * this.value[1][2]) / det;
        result.value[2][0] = (this.value[1][0] * this.value[2][1] - this.value[1][1] * this.value[2][0]) / det;
        result.value[2][1] = (this.value[0][1] * this.value[2][0] - this.value[0][0] * this.value[2][1]) / det;
        result.value[2][2] = (this.value[0][0] * this.value[1][1] - this.value[0][1] * this.value[1][0]) / det;
        return result;
    }

    public transform(vector: Vector3): Vector3 {
        return new Vector3(
            this.value[0][0] * vector.x + this.value[0][1] * vector.y + this.value[0][2] * vector.z,
            this.value[1][0] * vector.x + this.value[1][1] * vector.y + this.value[1][2] * vector.z,
            this.value[2][0] * vector.x + this.value[2][1] * vector.y + this.value[2][2] * vector.z
        );
    }

    public transpose(): Matrix3 {
        const result = new Matrix3();
        result.value[0][0] = this.value[0][0];
        result.value[0][1] = this.value[1][0];
        result.value[0][2] = this.value[2][0];
        result.value[1][0] = this.value[0][1];
        result.value[1][1] = this.value[1][1];
        result.value[1][2] = this.value[2][1];
        result.value[2][0] = this.value[0][2];
        result.value[2][1] = this.value[1][2];
        result.value[2][2] = this.value[2][2];
        return result;
    }

    public clone(): Matrix3 {
        const result = new Matrix3();
        result.value[0][0] = this.value[0][0];
        result.value[0][1] = this.value[0][1];
        result.value[0][2] = this.value[0][2];
        result.value[1][0] = this.value[1][0];
        result.value[1][1] = this.value[1][1];
        result.value[1][2] = this.value[1][2];
        result.value[2][0] = this.value[2][0];
        result.value[2][1] = this.value[2][1];
        result.value[2][2] = this.value[2][2];
        return result;
    }

    public static fromVector3(vector: Vector3): Matrix3 {
        return new Matrix3(vector.x, 0, 0, 0, vector.y, 0, 0, 0, vector.z);
    }
}
