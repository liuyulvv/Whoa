import { Mesh as BabylonMesh } from '@babylonjs/core';
import { v4 as uuid } from 'uuid';
import Scene from './Scene';

export default class Mesh {
    private meshID: string;
    private mesh: BabylonMesh;

    public constructor(mesh: BabylonMesh) {
        this.meshID = uuid();
        this.mesh = mesh;
    }

    public get id(): string {
        return this.meshID;
    }

    public destroy(): void {
        this.mesh.dispose();
    }

    public setMaterial(materialID: string) {
        const materialManager = Scene.get().getMaterialManager();
        const material = materialManager.getMaterialByID(materialID);
        if (material) {
            this.mesh.material = material.material;
        }
    }
}
