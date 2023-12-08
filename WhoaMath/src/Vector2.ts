import Point2 from './Point2';
import { clamp } from './Util';

export default class Vector2 {
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public multiply(num: number): Vector2 {
        return new Vector2(this.x * num, this.y * num);
    }

    public divide(num: number): Vector2 {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vector2(this.x / num, this.y / num);
    }

    public cross(vector: Vector2): number {
        return this.x * vector.y - this.y * vector.x;
    }

    public dot(vector: Vector2): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public getRadianBetween(vector: Vector2): number {
        return Math.acos(clamp(this.dot(vector) / (this.length * vector.length), -1, 1));
    }

    public normalize(): Vector2 {
        return this.divide(this.length);
    }

    public static fromPoint2(point: Point2): Vector2 {
        return new Vector2(point.x, point.y);
    }

    public static toPoint2(vector: Vector2): Point2 {
        return new Point2(vector.x, vector.y);
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}
