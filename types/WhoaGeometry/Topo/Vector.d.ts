/// <reference path="TopoBase.d.ts" />
/// <reference path="Vertex.d.ts" />

declare namespace WhoaGeometry {
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
        public x: number;
        public y: number;
        public constructor(x: number, y: number);
    }

    export class Vector3 extends VectorBase {
        public x: number;
        public y: number;
        public z: number;
        public constructor(x: number, y: number, z: number);
    }
}
