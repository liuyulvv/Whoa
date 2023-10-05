import { MeshBuilder, Scene } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';
import Mesh from './Mesh';

export default class MeshManager {
    private builder = MeshBuilder;
    private scene: Scene;

    public constructor(scene: Scene) {
        this.scene = scene;
    }

    public createGround(): Mesh {
        const mesh = this.builder.CreateGround('ground', { width: 100, height: 100 }, this.scene);
        const material = new GridMaterial('groundMaterial', this.scene);
        material.majorUnitFrequency = 5;
        material.minorUnitVisibility = 0.5;
        material.gridRatio = 1;
        material.useMaxLine = true;
        material.opacity = 0.99;
        mesh.material = material;
        return new Mesh(mesh, material);
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
