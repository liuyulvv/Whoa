export default class Point2 {
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public distance(point: Point2): number {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    }

    public add(point: Point2): Point2 {
        return new Point2(this.x + point.x, this.y + point.y);
    }

    public subtract(point: Point2): Point2 {
        return new Point2(this.x - point.x, this.y - point.y);
    }

    public multiply(num: number): Point2 {
        return new Point2(this.x * num, this.y * num);
    }

    public clone(): Point2 {
        return new Point2(this.x, this.y);
    }
}
