import { Color3, Scene, StandardMaterial } from '@babylonjs/core';
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
        const babylonMaterial = new StandardMaterial(materialID, this.scene);
        babylonMaterial.emissiveColor = new Color3(0.10196078431372549, 0.9215686274509803, 1);
        const material = new Material(materialID, babylonMaterial);
        this.materials.set(materialID, material);
        return material;
    }
}
