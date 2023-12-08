import Point3 from './Point3';
import { clamp } from './Util';

export default class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    public subtract(vector: Vector3): Vector3 {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    public multiply(num: number): Vector3 {
        return new Vector3(this.x * num, this.y * num, this.z * num);
    }

    public divide(num: number): Vector3 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector3(this.x / num, this.y / num, this.z / num);
    }

    public cross(vector: Vector3): Vector3 {
        return new Vector3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    public dot(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    public getRadianBetween(vector: Vector3): number {
        return Math.acos(clamp(this.dot(vector) / (this.length * vector.length), -1, 1));
    }

    public normalize(): Vector3 {
        return this.divide(this.length);
    }

    public static fromPoint3(point: Point3): Vector3 {
        return new Vector3(point.x, point.y, point.z);
    }

    public static toPoint3(vector: Vector3): Point3 {
        return new Point3(vector.x, vector.y, vector.z);
    }

    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
}
