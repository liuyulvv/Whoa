import Matrix3 from './Matrix3';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

export default class Matrix4 {
    public value: Array<Array<number>>;

    public constructor(
        m11: number = 1,
        m12: number = 0,
        m13: number = 0,
        m14: number = 0,
        m21: number = 0,
        m22: number = 1,
        m23: number = 0,
        m24: number = 0,
        m31: number = 0,
        m32: number = 0,
        m33: number = 1,
        m34: number = 0,
        m41: number = 0,
        m42: number = 0,
        m43: number = 0,
        m44: number = 1
    ) {
        this.value = new Array<Array<number>>(4);
        this.value[0] = new Array<number>(4);
        this.value[1] = new Array<number>(4);
        this.value[2] = new Array<number>(4);
        this.value[3] = new Array<number>(4);
        this.value[0][0] = m11;
        this.value[0][1] = m12;
        this.value[0][2] = m13;
        this.value[0][3] = m14;
        this.value[1][0] = m21;
        this.value[1][1] = m22;
        this.value[1][2] = m23;
        this.value[1][3] = m24;
        this.value[2][0] = m31;
        this.value[2][1] = m32;
        this.value[2][2] = m33;
        this.value[2][3] = m34;
        this.value[3][0] = m41;
        this.value[3][1] = m42;
        this.value[3][2] = m43;
        this.value[3][3] = m44;
    }

    public multiply(matrix: Matrix4): Matrix4 {
        const result = new Matrix4();
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 4; column++) {
                result.value[row][column] =
                    this.value[row][0] * matrix.value[0][column] +
                    this.value[row][1] * matrix.value[1][column] +
                    this.value[row][2] * matrix.value[2][column] +
                    this.value[row][3] * matrix.value[3][column];
            }
        }
        return result;
    }

    private determinant(): number {
        return (
            this.value[0][0] * this.value[1][1] * this.value[2][2] * this.value[3][3] +
            this.value[0][1] * this.value[1][2] * this.value[2][3] * this.value[3][0] +
            this.value[0][2] * this.value[1][3] * this.value[2][0] * this.value[3][1] +
            this.value[0][3] * this.value[1][0] * this.value[2][1] * this.value[3][2] -
            this.value[0][0] * this.value[1][2] * this.value[2][3] * this.value[3][1] -
            this.value[0][1] * this.value[1][3] * this.value[2][0] * this.value[3][2] -
            this.value[0][2] * this.value[1][0] * this.value[2][1] * this.value[3][3] -
            this.value[0][3] * this.value[1][1] * this.value[2][2] * this.value[3][0]
        );
    }

    public inverse(): Matrix4 {
        const det = this.determinant();
        if (det == 0) {
            throw new Error('Matrix is not invertible');
        }
        const invDet = 1 / det;
        const result = new Matrix4();
        result.value[0][0] =
            invDet *
            (this.value[1][1] * this.value[2][2] * this.value[3][3] +
                this.value[1][2] * this.value[2][3] * this.value[3][1] +
                this.value[1][3] * this.value[2][1] * this.value[3][2] -
                this.value[1][1] * this.value[2][3] * this.value[3][2] -
                this.value[1][2] * this.value[2][1] * this.value[3][3] -
                this.value[1][3] * this.value[2][2] * this.value[3][1]);
        result.value[0][1] =
            invDet *
            (this.value[1][0] * this.value[2][3] * this.value[3][2] +
                this.value[1][2] * this.value[2][0] * this.value[3][3] +
                this.value[1][3] * this.value[2][2] * this.value[3][0] -
                this.value[1][3] * this.value[2][0] * this.value[3][2] -
                this.value[1][0] * this.value[2][2] * this.value[3][3] -
                this.value[1][2] * this.value[2][3] * this.value[3][0]);
        result.value[0][2] =
            invDet *
            (this.value[1][0] * this.value[2][1] * this.value[3][3] +
                this.value[1][1] * this.value[2][3] * this.value[3][0] +
                this.value[1][3] * this.value[2][0] * this.value[3][1] -
                this.value[1][0] * this.value[2][3] * this.value[3][1] -
                this.value[1][1] * this.value[2][0] * this.value[3][3] -
                this.value[1][3] * this.value[2][1] * this.value[3][0]);
        result.value[0][3] =
            invDet *
            (this.value[1][0] * this.value[2][2] * this.value[3][1] +
                this.value[1][1] * this.value[2][0] * this.value[3][2] +
                this.value[1][2] * this.value[2][1] * this.value[3][0] -
                this.value[1][0] * this.value[2][1] * this.value[3][2] -
                this.value[1][1] * this.value[2][2] * this.value[3][0] -
                this.value[1][2] * this.value[2][0] * this.value[3][1]);
        result.value[1][0] =
            invDet *
            (this.value[0][1] * this.value[2][3] * this.value[3][2] +
                this.value[0][2] * this.value[2][1] * this.value[3][3] +
                this.value[0][3] * this.value[2][2] * this.value[3][1] -
                this.value[0][1] * this.value[2][2] * this.value[3][3] -
                this.value[0][2] * this.value[2][3] * this.value[3][1] -
                this.value[0][3] * this.value[2][1] * this.value[3][2]);
        result.value[1][1] =
            invDet *
            (this.value[0][0] * this.value[2][2] * this.value[3][3] +
                this.value[0][2] * this.value[2][3] * this.value[3][0] +
                this.value[0][3] * this.value[2][0] * this.value[3][2] -
                this.value[0][0] * this.value[2][3] * this.value[3][2] -
                this.value[0][2] * this.value[2][0] * this.value[3][3] -
                this.value[0][3] * this.value[2][2] * this.value[3][0]);
        result.value[1][2] =
            invDet *
            (this.value[0][0] * this.value[2][3] * this.value[3][1] +
                this.value[0][1] * this.value[2][0] * this.value[3][3] +
                this.value[0][3] * this.value[2][1] * this.value[3][0] -
                this.value[0][0] * this.value[2][1] * this.value[3][3] -
                this.value[0][1] * this.value[2][3] * this.value[3][0] -
                this.value[0][3] * this.value[2][0] * this.value[3][1]);
        result.value[1][3] =
            invDet *
            (this.value[0][0] * this.value[2][1] * this.value[3][2] +
                this.value[0][1] * this.value[2][2] * this.value[3][0] +
                this.value[0][2] * this.value[2][0] * this.value[3][1] -
                this.value[0][0] * this.value[2][2] * this.value[3][1] -
                this.value[0][1] * this.value[2][0] * this.value[3][2] -
                this.value[0][2] * this.value[2][1] * this.value[3][0]);
        result.value[2][0] =
            invDet *
            (this.value[0][1] * this.value[1][2] * this.value[3][3] +
                this.value[0][2] * this.value[1][3] * this.value[3][1] +
                this.value[0][3] * this.value[1][1] * this.value[3][2] -
                this.value[0][1] * this.value[1][3] * this.value[3][2] -
                this.value[0][2] * this.value[1][1] * this.value[3][3] -
                this.value[0][3] * this.value[1][2] * this.value[3][1]);
        result.value[2][1] =
            invDet *
            (this.value[0][0] * this.value[1][3] * this.value[3][2] +
                this.value[0][2] * this.value[1][0] * this.value[3][3] +
                this.value[0][3] * this.value[1][2] * this.value[3][0] -
                this.value[0][0] * this.value[1][2] * this.value[3][3] -
                this.value[0][2] * this.value[1][3] * this.value[3][0] -
                this.value[0][3] * this.value[1][0] * this.value[3][2]);
        result.value[2][2] =
            invDet *
            (this.value[0][0] * this.value[1][1] * this.value[3][3] +
                this.value[0][1] * this.value[1][3] * this.value[3][0] +
                this.value[0][3] * this.value[1][0] * this.value[3][1] -
                this.value[0][0] * this.value[1][3] * this.value[3][1] -
                this.value[0][1] * this.value[1][0] * this.value[3][3] -
                this.value[0][3] * this.value[1][1] * this.value[3][0]);
        result.value[2][3] =
            invDet *
            (this.value[0][0] * this.value[1][2] * this.value[3][1] +
                this.value[0][1] * this.value[1][0] * this.value[3][2] +
                this.value[0][2] * this.value[1][1] * this.value[3][0] -
                this.value[0][0] * this.value[1][1] * this.value[3][2] -
                this.value[0][1] * this.value[1][2] * this.value[3][0] -
                this.value[0][2] * this.value[1][0] * this.value[3][1]);
        result.value[3][0] =
            invDet *
            (this.value[0][1] * this.value[1][3] * this.value[2][2] +
                this.value[0][2] * this.value[1][1] * this.value[2][3] +
                this.value[0][3] * this.value[1][2] * this.value[2][1] -
                this.value[0][1] * this.value[1][2] * this.value[2][3] -
                this.value[0][2] * this.value[1][3] * this.value[2][1] -
                this.value[0][3] * this.value[1][1] * this.value[2][2]);
        result.value[3][1] =
            invDet *
            (this.value[0][0] * this.value[1][2] * this.value[2][3] +
                this.value[0][2] * this.value[1][3] * this.value[2][0] +
                this.value[0][3] * this.value[1][0] * this.value[2][2] -
                this.value[0][0] * this.value[1][3] * this.value[2][2] -
                this.value[0][2] * this.value[1][0] * this.value[2][3] -
                this.value[0][3] * this.value[1][2] * this.value[2][0]);
        result.value[3][2] =
            invDet *
            (this.value[0][0] * this.value[1][3] * this.value[2][1] +
                this.value[0][1] * this.value[1][0] * this.value[2][3] +
                this.value[0][3] * this.value[1][1] * this.value[2][0] -
                this.value[0][0] * this.value[1][1] * this.value[2][3] -
                this.value[0][1] * this.value[1][3] * this.value[2][0] -
                this.value[0][3] * this.value[1][0] * this.value[2][1]);
        result.value[3][3] =
            invDet *
            (this.value[0][0] * this.value[1][1] * this.value[2][2] +
                this.value[0][1] * this.value[1][2] * this.value[2][0] +
                this.value[0][2] * this.value[1][0] * this.value[2][1] -
                this.value[0][0] * this.value[1][2] * this.value[2][1] -
                this.value[0][1] * this.value[1][0] * this.value[2][2] -
                this.value[0][2] * this.value[1][1] * this.value[2][0]);
        return result;
    }

    public transform(vector: Vector4): Vector4 {
        return new Vector4(
            this.value[0][0] * vector.x +
                this.value[0][1] * vector.y +
                this.value[0][2] * vector.z +
                this.value[0][3] * vector.w,
            this.value[1][0] * vector.x +
                this.value[1][1] * vector.y +
                this.value[1][2] * vector.z +
                this.value[1][3] * vector.w,
            this.value[2][0] * vector.x +
                this.value[2][1] * vector.y +
                this.value[2][2] * vector.z +
                this.value[2][3] * vector.w,
            this.value[3][0] * vector.x +
                this.value[3][1] * vector.y +
                this.value[3][2] * vector.z +
                this.value[3][3] * vector.w
        );
    }

    public transpose(): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = this.value[0][0];
        result.value[0][1] = this.value[1][0];
        result.value[0][2] = this.value[2][0];
        result.value[0][3] = this.value[3][0];
        result.value[1][0] = this.value[0][1];
        result.value[1][1] = this.value[1][1];
        result.value[1][2] = this.value[2][1];
        result.value[1][3] = this.value[3][1];
        result.value[2][0] = this.value[0][2];
        result.value[2][1] = this.value[1][2];
        result.value[2][2] = this.value[2][2];
        result.value[2][3] = this.value[3][2];
        result.value[3][0] = this.value[0][3];
        result.value[3][1] = this.value[1][3];
        result.value[3][2] = this.value[2][3];
        result.value[3][3] = this.value[3][3];
        return result;
    }

    public clone(): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = this.value[0][0];
        result.value[0][1] = this.value[0][1];
        result.value[0][2] = this.value[0][2];
        result.value[0][3] = this.value[0][3];
        result.value[1][0] = this.value[1][0];
        result.value[1][1] = this.value[1][1];
        result.value[1][2] = this.value[1][2];
        result.value[1][3] = this.value[1][3];
        result.value[2][0] = this.value[2][0];
        result.value[2][1] = this.value[2][1];
        result.value[2][2] = this.value[2][2];
        result.value[2][3] = this.value[2][3];
        result.value[3][0] = this.value[3][0];
        result.value[3][1] = this.value[3][1];
        result.value[3][2] = this.value[3][2];
        result.value[3][3] = this.value[3][3];
        return result;
    }

    public static fromMatrix3(matrix: Matrix3): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = matrix.value[0][0];
        result.value[0][1] = matrix.value[0][1];
        result.value[0][2] = matrix.value[0][2];
        result.value[1][0] = matrix.value[1][0];
        result.value[1][1] = matrix.value[1][1];
        result.value[1][2] = matrix.value[1][2];
        result.value[2][0] = matrix.value[2][0];
        result.value[2][1] = matrix.value[2][1];
        result.value[2][2] = matrix.value[2][2];
        return result;
    }

    public static toMatrix3(matrix: Matrix4): Matrix3 {
        const result = new Matrix3();
        result.value[0][0] = matrix.value[0][0];
        result.value[0][1] = matrix.value[0][1];
        result.value[0][2] = matrix.value[0][2];
        result.value[1][0] = matrix.value[1][0];
        result.value[1][1] = matrix.value[1][1];
        result.value[1][2] = matrix.value[1][2];
        result.value[2][0] = matrix.value[2][0];
        result.value[2][1] = matrix.value[2][1];
        result.value[2][2] = matrix.value[2][2];
        return result;
    }

    public static fromVector4(vector: Vector4): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = vector.x;
        result.value[1][1] = vector.y;
        result.value[2][2] = vector.z;
        result.value[3][3] = vector.w;
        return result;
    }

    public static fromTranslation(vector: Vector3): Matrix4 {
        const result = new Matrix4();
        result.value[0][3] = vector.x;
        result.value[1][3] = vector.y;
        result.value[2][3] = vector.z;
        return result;
    }

    public static fromScale(vector: Vector3): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = vector.x;
        result.value[1][1] = vector.y;
        result.value[2][2] = vector.z;
        return result;
    }

    public static fromRotationX(radians: number): Matrix4 {
        const result = new Matrix4();
        result.value[1][1] = Math.cos(radians);
        result.value[1][2] = -Math.sin(radians);
        result.value[2][1] = Math.sin(radians);
        result.value[2][2] = Math.cos(radians);
        return result;
    }

    public static fromRotationY(radians: number): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = Math.cos(radians);
        result.value[0][2] = Math.sin(radians);
        result.value[2][0] = -Math.sin(radians);
        result.value[2][2] = Math.cos(radians);
        return result;
    }

    public static fromRotationZ(radians: number): Matrix4 {
        const result = new Matrix4();
        result.value[0][0] = Math.cos(radians);
        result.value[0][1] = -Math.sin(radians);
        result.value[1][0] = Math.sin(radians);
        result.value[1][1] = Math.cos(radians);
        return result;
    }

    public static fromRotationAxis(axis: Vector3, radians: number): Matrix4 {
        const result = new Matrix4();
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const oneMinusCos = 1 - cos;
        result.value[0][0] = cos + axis.x * axis.x * oneMinusCos;
        result.value[0][1] = axis.x * axis.y * oneMinusCos - axis.z * sin;
        result.value[0][2] = axis.x * axis.z * oneMinusCos + axis.y * sin;
        result.value[1][0] = axis.y * axis.x * oneMinusCos + axis.z * sin;
        result.value[1][1] = cos + axis.y * axis.y * oneMinusCos;
        result.value[1][2] = axis.y * axis.z * oneMinusCos - axis.x * sin;
        result.value[2][0] = axis.z * axis.x * oneMinusCos - axis.y * sin;
        result.value[2][1] = axis.z * axis.y * oneMinusCos + axis.x * sin;
        result.value[2][2] = cos + axis.z * axis.z * oneMinusCos;
        return result;
    }

    public static fromRotationEuler(x: number, y: number, z: number): Matrix4 {
        const result = new Matrix4();
        const cosX = Math.cos(x);
        const sinX = Math.sin(x);
        const cosY = Math.cos(y);
        const sinY = Math.sin(y);
        const cosZ = Math.cos(z);
        const sinZ = Math.sin(z);
        result.value[0][0] = cosY * cosZ;
        result.value[0][1] = cosY * sinZ;
        result.value[0][2] = -sinY;
        result.value[1][0] = sinX * sinY * cosZ - cosX * sinZ;
        result.value[1][1] = sinX * sinY * sinZ + cosX * cosZ;
        result.value[1][2] = sinX * cosY;
        result.value[2][0] = cosX * sinY * cosZ + sinX * sinZ;
        result.value[2][1] = cosX * sinY * sinZ - sinX * cosZ;
        result.value[2][2] = cosX * cosY;
        return result;
    }
}
