import { Mesh as BabylonMesh } from '@babylonjs/core';
import { v4 as uuid } from 'uuid';
import Material from './Material';

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

    public setMaterial(material: Material): void {
        this.mesh.material = material.material;
    }
}
