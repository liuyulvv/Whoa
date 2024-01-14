/// <reference path="Mesh.d.ts" />

declare namespace Whoa3D {
    export enum SideOrientation {
        FRONT,
        BACK,
        DOUBLE
    }

    export class VertexData {
        public SetVertices(vertices: Array<number>): void;

        public SetIndices(indices: Array<number>): void;

        public ApplyToMesh(mesh: Mesh, updatable?: boolean): void;
    }
}
