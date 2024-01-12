import { Vector2, Vector3 } from '@babylonjs/core';

export class Point2 extends Vector2 {
    public constructor(x: number = 0, y: number = 0) {
        super(x, y);
    }

    public Distance(point: Point2): number {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    }

    public Add(point: Point2): Point2 {
        return new Point2(this.x + point.x, this.y + point.y);
    }

    public Subtract(point: Point2): Point2 {
        return new Point2(this.x - point.x, this.y - point.y);
    }

    public Multiply(num: number): Point2 {
        return new Point2(this.x * num, this.y * num);
    }

    public Clone(): Point2 {
        return new Point2(this.x, this.y);
    }
}

export class Point3 extends Vector3 {
    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
    }

    public Distance(point: Point3): number {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) + Math.pow(point.z - this.z, 2));
    }

    public Add(point: Point3): Point3 {
        return new Point3(this.x + point.x, this.y + point.y, this.z + point.z);
    }

    public Subtract(point: Point3): Point3 {
        return new Point3(this.x - point.x, this.y - point.y, this.z - point.z);
    }

    public Multiply(num: number): Point3 {
        return new Point3(this.x * num, this.y * num, this.z * num);
    }

    public Clone(): Point3 {
        return new Point3(this.x, this.y, this.z);
    }
}
