/// <reference path="TopoBase.d.ts" />

declare namespace WhoaGeometry {
    export abstract class VertexBase extends TopoBase {
        public abstract Distance(vertex: VertexBase): number;
        public abstract Add(vertex: VertexBase): VertexBase;
        public abstract Subtract(vertex: VertexBase): VertexBase;
        public abstract Multiply(num: number): VertexBase;
        public abstract Divide(num: number): VertexBase;
        public abstract Clone(): VertexBase;
    }

    export class Vertex2 extends VertexBase {
        public x: number;
        public y: number;
        public constructor(x: number, y: number);
    }

    export class Vertex3 extends VertexBase {
        public x: number;
        public y: number;
        public z: number;
        public constructor(x: number, y: number, z: number);
    }
}
