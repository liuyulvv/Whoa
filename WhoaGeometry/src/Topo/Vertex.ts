import { TopoBase } from './TopoBase';
import TopoType from './TopoType';

export abstract class VertexBase extends TopoBase {
    public abstract Distance(vertex: VertexBase): number;
    public abstract Add(vertex: VertexBase): VertexBase;
    public abstract Subtract(vertex: VertexBase): VertexBase;
    public abstract Multiply(num: number): VertexBase;
    public abstract Divide(num: number): VertexBase;
    public abstract Clone(): VertexBase;
}

export class Vertex2 extends VertexBase {
    private x_: number;
    private y_: number;

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.type_ = TopoType.VERTEX_2;
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

    public Distance(vertex: Vertex2): number {
        return Math.sqrt(Math.pow(vertex.x - this.x, 2) + Math.pow(vertex.y - this.y, 2));
    }

    public Add(vertex: Vertex2): Vertex2 {
        return new Vertex2(this.x + vertex.x, this.y + vertex.y);
    }

    public Subtract(vertex: Vertex2): Vertex2 {
        return new Vertex2(this.x - vertex.x, this.y - vertex.y);
    }

    public Multiply(num: number): Vertex2 {
        return new Vertex2(this.x * num, this.y * num);
    }

    public Divide(num: number): VertexBase {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vertex2(this.x / num, this.y / num);
    }

    public Clone(): Vertex2 {
        return new Vertex2(this.x_, this.y_);
    }
}

export class Vertex3 extends VertexBase {
    private x_: number;
    private y_: number;
    private z_: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super();
        this.type_ = TopoType.VERTEX_3;
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

    public Distance(vertex: Vertex3): number {
        return Math.sqrt(
            Math.pow(vertex.x - this.x, 2) + Math.pow(vertex.y - this.y, 2) + Math.pow(vertex.z - this.z, 2)
        );
    }

    public Add(vertex: Vertex3): Vertex3 {
        return new Vertex3(this.x + vertex.x, this.y + vertex.y, this.z + vertex.z);
    }

    public Subtract(vertex: Vertex3): Vertex3 {
        return new Vertex3(this.x - vertex.x, this.y - vertex.y, this.z - vertex.z);
    }

    public Multiply(num: number): Vertex3 {
        return new Vertex3(this.x * num, this.y * num, this.z * num);
    }

    public Divide(num: number): VertexBase {
        if (num == 0) {
            throw new Error('Cannot divide by zero');
        }
        return new Vertex3(this.x / num, this.y / num, this.z / num);
    }

    public Clone(): Vertex3 {
        return new Vertex3(this.x_, this.y_, this.z_);
    }
}
