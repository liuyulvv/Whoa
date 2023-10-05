import { Material as BabylonMaterial, Scene } from '@babylonjs/core';
import { v4 as uuid } from 'uuid';
import Material from './Material';

export default class MaterialManager {
    private scene: Scene;
    private materials: Map<string, Material>;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.materials = new Map<string, Material>();
    }

    public createMaterial(): Material {
        const materialID = uuid();
        const babylonMaterial = new BabylonMaterial(materialID, this.scene);
        const material = new Material(materialID, babylonMaterial);
        this.materials.set(materialID, material);
        return material;
    }

    public getMaterialByID(materialID: string): Material | undefined {
        return this.materials.get(materialID);
    }
}
