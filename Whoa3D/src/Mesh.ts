import { Material as BabylonMaterial, Mesh as BabylonMesh } from '@babylonjs/core';

export default class Mesh {
    private mesh: BabylonMesh;
    private material: BabylonMaterial;

    public constructor(mesh: BabylonMesh, material: BabylonMaterial) {
        this.mesh = mesh;
        this.material = material;
    }
}
