import { Vector2 as BabylonVector2, Vector3 as BabylonVector3, Vector4 as BabylonVector4 } from '@babylonjs/core';
import { Point2, Point3 } from './Point';
import { Clamp } from './Util';

export class Vector2 extends BabylonVector2 {
    public constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }

    public Length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public Add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public Subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public Multiply(num: number): Vector2 {
        return new Vector2(this.x * num, this.y * num);
    }

    public Divide(num: number): Vector2 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector2(this.x / num, this.y / num);
    }

    public Cross(vector: Vector2): number {
        return this.x * vector.y - this.y * vector.x;
    }

    public Dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public GetRadianBetween(vector: Vector2): number {
        return Math.acos(Clamp(this.Dot(vector) / (this.Length() * vector.Length()), -1, 1));
    }

    public Normalize(): Vector2 {
        return this.Divide(this.Length());
    }

    public static FromPoint2(point: Point2): Vector2 {
        return new Vector2(point.x, point.y);
    }

    public static ToPoint2(vector: Vector2): Point2 {
        return new Point2(vector.x, vector.y);
    }

    public Clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}

export class Vector3 extends BabylonVector3 {
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    public Length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public Add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    public Subtract(vector: Vector3): Vector3 {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    public Multiply(num: number): Vector3 {
        return new Vector3(this.x * num, this.y * num, this.z * num);
    }

    public Divide(num: number): Vector3 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector3(this.x / num, this.y / num, this.z / num);
    }

    public Cross(vector: Vector3): Vector3 {
        return new Vector3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    public Dot(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    public GetRadianBetween(vector: Vector3): number {
        return Math.acos(Clamp(this.Dot(vector) / (this.Length() * vector.Length()), -1, 1));
    }

    public Normalize(): Vector3 {
        return this.Divide(this.Length());
    }

    public static FromPoint3(point: Point3): Vector3 {
        return new Vector3(point.x, point.y, point.z);
    }

    public static ToPoint3(vector: Vector3): Point3 {
        return new Point3(vector.x, vector.y, vector.z);
    }

    public Clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    public static FromBabylonVector3(vector: BabylonVector3): Vector3 {
        return new Vector3(vector.x, vector.y, vector.z);
    }

    public static Min(vector1: Vector3, vector2: Vector3): Vector3 {
        return BabylonVector3.Minimize(vector1, vector2);
    }

    public static Max(vector1: Vector3, vector2: Vector3): Vector3 {
        return BabylonVector3.Maximize(vector1, vector2);
    }
}

export class Vector4 extends BabylonVector4 {
    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        super(x, y, z, w);
    }

    public Length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    public Add(vector: Vector4): Vector4 {
        return new Vector4(this.x + vector.x, this.y + vector.y, this.z + vector.z, this.w + vector.w);
    }

    public Subtract(vector: Vector4): Vector4 {
        return new Vector4(this.x - vector.x, this.y - vector.y, this.z - vector.z, this.w - vector.w);
    }

    public Multiply(num: number): Vector4 {
        return new Vector4(this.x * num, this.y * num, this.z * num, this.w * num);
    }

    public Divide(num: number): Vector4 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector4(this.x / num, this.y / num, this.z / num, this.w / num);
    }

    public Cross(vector: Vector4): Vector4 {
        return new Vector4(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x,
            0
        );
    }

    public Dot(vector: Vector4): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
    }

    public GetRadianBetween(vector: Vector4): number {
        return Math.acos(this.Dot(vector) / (this.Length() * vector.Length()));
    }

    public Normalize(): Vector4 {
        return this.Divide(this.Length());
    }

    public static FromPoint3(point: Point3): Vector4 {
        return new Vector4(point.x, point.y, point.z);
    }

    public static ToPoint3(vector: Vector4): Point3 {
        return new Point3(vector.x, vector.y, vector.z);
    }

    public static FromVector3(vector: Vector3): Vector4 {
        return new Vector4(vector.x, vector.y, vector.z);
    }

    public static ToVector3(vector: Vector4): Vector3 {
        return new Vector3(vector.x, vector.y, vector.z);
    }

    public Clone(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
}
