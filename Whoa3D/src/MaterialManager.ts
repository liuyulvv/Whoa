import { Material as BabylonMaterial, Scene } from '@babylonjs/core';
import Material from './Material';

export default class MaterialManager {
    private scene: Scene;
    private materials: Map<string, Material>;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.materials = new Map<string, Material>();
    }

    public destroyMaterial(materialID: string): void {
        const material = this.materials.get(materialID);
        if (material) {
            material.material.dispose();
            this.materials.delete(materialID);
        }
    }

    public getMaterialByID(materialID: string): Material | undefined {
        return this.materials.get(materialID);
    }

    public createMaterial(materialID: string): Material {
        const babylonMaterial = new BabylonMaterial(materialID, this.scene);
        const material = new Material(materialID, babylonMaterial);
        this.materials.set(materialID, material);
        return material;
    }
}
