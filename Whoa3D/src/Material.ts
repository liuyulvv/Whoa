import { Material as BabylonMaterial } from '@babylonjs/core';

export default class Material {
    private materialID: string;
    private readonly babylonMaterial: BabylonMaterial;

    public constructor(id: string, material: BabylonMaterial) {
        this.materialID = id;
        this.babylonMaterial = material;
    }

    public get id(): string {
        return this.materialID;
    }

    public get material(): BabylonMaterial {
        return this.babylonMaterial;
    }
}
