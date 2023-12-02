import Point3 from './Point3';
import Vector3 from './Vector3';

export default class Vector4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    public add(vector: Vector4): Vector4 {
        return new Vector4(this.x + vector.x, this.y + vector.y, this.z + vector.z, this.w + vector.w);
    }

    public subtract(vector: Vector4): Vector4 {
        return new Vector4(this.x - vector.x, this.y - vector.y, this.z - vector.z, this.w - vector.w);
    }

    public multiply(num: number): Vector4 {
        return new Vector4(this.x * num, this.y * num, this.z * num, this.w * num);
    }

    public divide(num: number): Vector4 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector4(this.x / num, this.y / num, this.z / num, this.w / num);
    }

    public cross(vector: Vector4): Vector4 {
        return new Vector4(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x,
            0
        );
    }

    public dot(vector: Vector4): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
    }

    public getRadiansBetween(vector: Vector4): number {
        return Math.acos(this.dot(vector) / (this.length * vector.length));
    }

    public normalize(): Vector4 {
        return this.divide(this.length);
    }

    public static fromVector3(vector: Vector3): Vector4 {
        return new Vector4(vector.x, vector.y, vector.z);
    }

    public static toVector3(vector: Vector4): Vector3 {
        return new Vector3(vector.x, vector.y, vector.z);
    }

    public static fromPoint3(point: Point3): Vector4 {
        return new Vector4(point.x, point.y, point.z);
    }

    public static toPoint3(vector: Vector4): Point3 {
        return new Point3(vector.x, vector.y, vector.z);
    }

    public clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
}
