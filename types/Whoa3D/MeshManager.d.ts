/// <reference path="Mesh.d.ts" />

declare namespace Whoa {
    export namespace Whoa3D {
        export class MeshManager {
            public destroyMesh(meshID: string): void;
            public getMeshById(meshID: string): Mesh | undefined;
            public createBox(meshID: string): Mesh;
        }
    }
}
