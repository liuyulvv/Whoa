import { StandardMaterial } from '@babylonjs/core';

export default class Material {
    private materialID: string;
    private readonly babylonMaterial: StandardMaterial;

    public constructor(id: string, material: StandardMaterial) {
        this.materialID = id;
        this.babylonMaterial = material;
    }

    public get id(): string {
        return this.materialID;
    }

    public get material(): StandardMaterial {
        return this.babylonMaterial;
    }
}
