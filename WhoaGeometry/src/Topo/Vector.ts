import { TopoBase } from './TopoBase';
import TopoType from './TopoType';
import { Clamp } from './Util';
import { Vertex2, Vertex3 } from './Vertex';

export abstract class VectorBase extends TopoBase {
    public abstract Length(): number;
    public abstract Add(vector: VectorBase): VectorBase;
    public abstract Subtract(vector: VectorBase): VectorBase;
    public abstract Multiply(num: number): VectorBase;
    public abstract Divide(num: number): VectorBase;
    public abstract Clone(): VectorBase;
    public abstract Cross(vector: VectorBase): VectorBase;
    public abstract Dot(vector: VectorBase): number;
    public abstract Normalize(): VectorBase;
    public abstract GetRadianBetween(vector: VectorBase): number;
}

export class Vector2 extends VectorBase {
    private x_: number;
    private y_: number;

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.type_ = TopoType.VECTOR_2;
        this.x_ = x;
        this.y_ = y;
    }

    public get x() {
        return this.x_;
    }

    public set x(x: number) {
        this.x_ = x;
    }

    public get y() {
        return this.y_;
    }

    public set y(y: number) {
        this.y_ = y;
    }

    public Length(): number {
        return Math.sqrt(this.x_ * this.x_ + this.y_ * this.y_);
    }

    public Add(vector: Vector2): Vector2 {
        return new Vector2(this.x_ + vector.x, this.y_ + vector.y);
    }

    public Subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x_ - vector.x, this.y_ - vector.y);
    }

    public Multiply(num: number): Vector2 {
        return new Vector2(this.x_ * num, this.y_ * num);
    }

    public Divide(num: number): Vector2 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector2(this.x_ / num, this.y_ / num);
    }

    public Cross(vector: Vector2): Vector2 {
        return new Vector2(this.x_ * vector.y - this.y_ * vector.x);
    }

    public Dot(vector: Vector2): number {
        return this.x_ * vector.x + this.y_ * vector.y;
    }

    public Normalize(): Vector2 {
        return this.Divide(this.Length());
    }

    public GetRadianBetween(vector: Vector2): number {
        return Math.acos(Clamp(this.Dot(vector) / (this.Length() * vector.Length()), -1, 1));
    }

    public Clone(): Vector2 {
        return new Vector2(this.x_, this.y_);
    }
}

export class Vector3 extends VectorBase {
    private x_: number;
    private y_: number;
    private z_: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super();
        this.type_ = TopoType.VECTOR_3;
        this.x_ = x;
        this.y_ = y;
        this.z_ = z;
    }

    public get x() {
        return this.x_;
    }

    public set x(x: number) {
        this.x_ = x;
    }

    public get y() {
        return this.y_;
    }

    public set y(y: number) {
        this.y_ = y;
    }

    public get z() {
        return this.z_;
    }

    public set z(z: number) {
        this.z_ = z;
    }

    public Length(): number {
        return Math.sqrt(this.x_ * this.x_ + this.y_ * this.y_ + this.z_ * this.z_);
    }

    public Add(vector: Vector3): Vector3 {
        return new Vector3(this.x_ + vector.x, this.y_ + vector.y, this.z_ + vector.z);
    }

    public Subtract(vector: Vector3): Vector3 {
        return new Vector3(this.x_ - vector.x, this.y_ - vector.y, this.z_ - vector.z);
    }

    public Multiply(num: number): Vector3 {
        return new Vector3(this.x_ * num, this.y_ * num, this.z_ * num);
    }

    public Divide(num: number): Vector3 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector3(this.x_ / num, this.y_ / num, this.z_ / num);
    }

    public Cross(vector: Vector3): Vector3 {
        return new Vector3(
            this.y_ * vector.z - this.z_ * vector.y,
            this.z_ * vector.x - this.x_ * vector.z,
            this.x_ * vector.y - this.y_ * vector.x
        );
    }

    public Dot(vector: Vector3): number {
        return this.x_ * vector.x + this.y_ * vector.y + this.z_ * vector.z;
    }

    public Normalize(): Vector3 {
        return this.Divide(this.Length());
    }

    public Clone(): Vector3 {
        return new Vector3(this.x_, this.y_, this.z_);
    }

    public GetRadianBetween(vector: Vector3): number {
        return Math.acos(Clamp(this.Dot(vector) / (this.Length() * vector.Length()), -1, 1));
    }
}
