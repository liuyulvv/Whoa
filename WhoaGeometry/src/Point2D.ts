import GeometryBase, { GeometryBaseSerialization, GeometryType } from './GeometryBase';

export interface Point2DSerialization extends GeometryBaseSerialization {
    x: number;
    y: number;
}

export default class Point2D extends GeometryBase {
    private x_: number = 0;
    private y_: number = 0;

    public constructor(x?: number, y?: number) {
        super(GeometryType.POINT_2D);
        this.x_ = x ? x : 0;
        this.y_ = y ? y : 0;
    }

    public clone(): Point2D {
        return new Point2D(this.x_, this.y_);
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

    public distance(point: Point2D): number {
        return Math.sqrt(Math.pow(this.x_ - point.x, 2) + Math.pow(this.y_ - point.y, 2));
    }

    public add(point: Point2D): Point2D {
        return new Point2D(this.x_ + point.x, this.y_ + point.y);
    }

    public addInPlace(point: Point2D): void {
        this.x_ += point.x;
        this.y_ += point.y;
    }

    public subtract(point: Point2D): Point2D {
        return new Point2D(this.x_ - point.x, this.y_ - point.y);
    }

    public subtractInPlace(point: Point2D): void {
        this.x_ -= point.x;
        this.y_ -= point.y;
    }

    public multiply(num: number): Point2D {
        return new Point2D(this.x_ * num, this.y_ * num);
    }

    public multiplyInPlace(num: number): void {
        this.x_ *= num;
        this.y_ *= num;
    }

    public dot(point: Point2D): number {
        return this.x * point.x + this.y * point.y;
    }

    public getRadianBetween(end: Point2D): number {
        return Math.acos(this.dot(end) / (this.length() * end.length()));
    }

    public equal(point: Point2D, tolerance: number = 1e-3): boolean {
        return this.distance(point) < tolerance;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public serialize(): Point2DSerialization {
        return {
            type: super.serialize().type,
            x: this.x_,
            y: this.y_
        };
    }

    public deserialize(serialization: Point2DSerialization) {
        super.deserialize(serialization);
        this.x_ = serialization.x;
        this.x_ = serialization.y;
    }
}
