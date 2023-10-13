/// <reference path="Mesh.d.ts" />

declare namespace Whoa {
    export namespace Whoa3D {
        export class MeshManager {
            public destroyMeshByID(meshID: string): void;
            public getMeshByID(meshID: string): Mesh | undefined;
            public createBox(meshID: string): Mesh;
            public importMeshAsync(baseURL: string, meshName: string, entityID: string): Promise<Mesh[]>;
        }
    }
}
