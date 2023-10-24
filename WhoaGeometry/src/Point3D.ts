import GeometryBase, { GeometryBaseSerialization, GeometryType } from './GeometryBase';

export interface Point3DSerialization extends GeometryBaseSerialization {
    x: number;
    y: number;
    z: number;
}

export default class Point3D extends GeometryBase {
    private x_: number = 0;
    private y_: number = 0;
    private z_: number = 0;

    constructor(x?: number, y?: number, z?: number) {
        super(GeometryType.POINT_3D);
        this.x_ = x ? x : 0;
        this.y_ = y ? y : 0;
        this.z_ = z ? z : 0;
    }

    public clone(): Point3D {
        return new Point3D(this.x_, this.y_, this.z_);
    }

    public get x(): number {
        return this.x_;
    }

    public set x(v: number) {
        this.x_ = v;
    }

    public get y(): number {
        return this.y_;
    }

    public set y(v: number) {
        this.y_ = v;
    }

    public get z(): number {
        return this.z_;
    }

    public set z(v: number) {
        this.z_ = v;
    }

    public distance(point: Point3D): number {
        return Math.sqrt(
            Math.pow(this.x_ - point.x, 2) + Math.pow(this.y_ - point.y, 2) + Math.pow(this.z_ - point.z, 2)
        );
    }

    public add(point: Point3D): Point3D {
        return new Point3D(this.x_ + point.x, this.y_ + point.y, this.z_ + point.z);
    }

    public addInPlace(point: Point3D) {
        this.x_ += point.x;
        this.y_ += point.y;
        this.z_ += point.z;
    }

    public subtract(point: Point3D): Point3D {
        return new Point3D(this.x_ - point.x, this.y_ - point.y, this.z_ - point.z);
    }

    public subtractInPlace(point: Point3D) {
        this.x_ -= point.x;
        this.y_ -= point.y;
        this.z_ -= point.z;
    }

    public multiply(num: number): Point3D {
        return new Point3D(this.x_ * num, this.y_ * num, this.z_ * num);
    }

    public multiplyInPlace(num: number) {
        this.x_ *= num;
        this.y_ *= num;
        this.z_ *= num;
    }

    public dot(point: Point3D): number {
        return this.x * point.x + this.y * point.y + this.z * point.z;
    }

    public getRadianBetween(end: Point3D): number {
        return Math.acos(this.dot(end) / (this.length() * end.length()));
    }

    public equal(point: Point3D, tolerance: number = 1e-3): boolean {
        return this.distance(point) < tolerance;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public serialize(): Point3DSerialization {
        return {
            type: super.serialize().type,
            x: this.x_,
            y: this.y_,
            z: this.z_
        };
    }

    public deserialize(serialization: Point3DSerialization) {
        super.deserialize(serialization);
        this.x_ = serialization.x;
        this.x_ = serialization.y;
        this.z_ = serialization.z;
    }
}
