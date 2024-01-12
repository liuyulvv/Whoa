/// <reference path="Mesh.d.ts" />

declare namespace Whoa3D {
    export class VertexData {
        public SetVertices(vertices: Array<number>): void;

        public SetIndices(indices: Array<number>): void;

        public ApplyToMesh(mesh: Mesh, updatable?: boolean): void;
    }
}
