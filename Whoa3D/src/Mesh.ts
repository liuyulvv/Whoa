import { Mesh as BabylonMesh, Color3, Vector3 } from '@babylonjs/core';
import Material from './Material';

export default class Mesh {
    private meshID: string;
    private mesh: BabylonMesh;

    public constructor(meshID: string, mesh: BabylonMesh) {
        this.meshID = meshID;
        this.mesh = mesh;
    }

    public get id(): string {
        return this.meshID;
    }

    public show(): void {
        this.mesh.isVisible = true;
        this.mesh.getChildMeshes().forEach((mesh) => {
            mesh.isVisible = true;
        });
    }

    public hide(): void {
        this.mesh.isVisible = false;
        this.mesh.getChildMeshes().forEach((mesh) => {
            mesh.isVisible = false;
        });
    }

    public showOverlay(): void {
        this.mesh.getChildMeshes().forEach((mesh) => {
            mesh.overlayColor = Color3.Red();
            mesh.renderOverlay = true;
        });
    }

    public hideOverlay(): void {
        this.mesh.getChildMeshes().forEach((mesh) => {
            mesh.renderOverlay = false;
        });
    }

    public destroy(): void {
        this.mesh.dispose();
    }

    public setMaterial(material: Material): void {
        this.mesh.material = material.material;
    }

    public getBoundingBox() {
        return this.mesh.getBoundingInfo();
    }

    public showBoundingBox(): void {
        this.mesh.showBoundingBox = true;
    }

    public hideBoundingBox(): void {
        this.mesh.showBoundingBox = false;
    }

    public rotateLocalX(radian: number): void {
        this.mesh.rotate(new Vector3(1, 0, 0), radian);
    }

    public rotateLocalY(radian: number): void {
        this.mesh.rotate(new Vector3(0, 1, 0), radian);
    }

    public rotateLocalZ(radian: number): void {
        this.mesh.rotate(new Vector3(0, 0, 1), radian);
    }

    public scale(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh.scaling = new Vector3(this.mesh.scaling.x * x, this.mesh.scaling.y * y, this.mesh.scaling.z * z);
        } else {
            this.mesh.scaling = new Vector3(x, y, z);
        }
    }
}
