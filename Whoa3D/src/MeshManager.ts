import { MeshBuilder, Scene } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';
import { v4 as uuid } from 'uuid';
import Mesh from './Mesh';

export default class MeshManager {
    private builder = MeshBuilder;
    private scene: Scene;
    private meshes: Map<string, Mesh>;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.meshes = new Map<string, Mesh>();
    }

    public destroyMesh(id: string): void {
        const mesh = this.meshes.get(id);
        if (mesh) {
            mesh.destroy();
        }
    }

    public createGround(): Mesh {
        const meshID = uuid();
        const babylonMesh = this.builder.CreateGround(meshID, { width: 100, height: 100 }, this.scene);
        const babylonMaterial = new GridMaterial(meshID, this.scene);
        babylonMaterial.majorUnitFrequency = 5;
        babylonMaterial.minorUnitVisibility = 0.5;
        babylonMaterial.gridRatio = 1;
        babylonMaterial.useMaxLine = true;
        babylonMaterial.opacity = 0.99;
        babylonMesh.material = babylonMaterial;
        const mesh = new Mesh(babylonMesh);
        this.meshes.set(mesh.id, mesh);
        return mesh;
    }

    // public createPlane(id: string): Mesh {
    //     return this.builder.CreatePlane(id, {}, this.scene);
    // }

    // public createBox(id: string): Mesh {
    //     return this.builder.CreateBox(id, {}, this.scene);
    // }

    // public createCylinder(id: string): Mesh {
    //     return this.builder.CreateCylinder(id, {}, this.scene);
    // }
}
