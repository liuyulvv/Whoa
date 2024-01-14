import { Mesh as BabylonMesh, Color3, Vector3 } from '@babylonjs/core';
import StandardMaterial from './StandardMaterial';

export default class Mesh {
    protected id_: string;
    protected mesh_: BabylonMesh;

    public constructor(id: string, mesh_?: BabylonMesh) {
        this.id_ = id;
        if (mesh_) {
            this.mesh_ = mesh_;
        } else {
            this.mesh_ = new BabylonMesh(id);
        }
    }

    public GetID(): string {
        return this.id_;
    }

    public Dispose(): void {
        this.mesh_.dispose();
    }

    public SetMaterial(material: StandardMaterial): void {
        this.mesh_.material = material;
    }

    public SetPosition(position: WhoaMath.Vector3): void {
        this.mesh_.position = new Vector3(position.x, position.y, position.z);
    }

    public SetLayerMask(mask: Whoa3D.LayerMask): void {
        this.mesh_.layerMask = mask;
    }

    public SetOverlayColor(color: WhoaMath.Color4): void {
        this.mesh_.getChildMeshes().forEach((mesh) => {
            mesh.overlayColor = new Color3(color.r, color.g, color.b);
            mesh.overlayAlpha = color.a;
        });
    }

    public ShowOverlay(): void {
        this.mesh_.getChildMeshes().forEach((mesh) => {
            mesh.renderOverlay = true;
        });
    }

    public HideOverlay(): void {
        this.mesh_.getChildMeshes().forEach((mesh) => {
            mesh.renderOverlay = false;
        });
    }

    public GetChildMeshes() {
        return this.mesh_.getChildMeshes();
    }

    public ComputeWorldMatrix(force: boolean = false): void {
        this.mesh_.computeWorldMatrix(force);
    }

    public GetBoundingInfo() {
        return this.mesh_.getBoundingInfo();
    }

    public ShowBoundingBox() {
        this.mesh_.showBoundingBox = true;
    }

    public HideBoundingBox() {
        this.mesh_.showBoundingBox = false;
    }

    public GetPosition(): WhoaMath.Point3 {
        const pos = this.mesh_.position;
        return new WhoaMath.Point3(pos.x, pos.y, pos.z);
    }

    public Show(): void {
        this.mesh_.setEnabled(true);
    }

    public Hide(): void {
        this.mesh_.setEnabled(false);
    }

    public RotateLocalX(radian: number): void {
        this.mesh_.rotate(new Vector3(1, 0, 0), radian);
    }

    public RotateLocalY(radian: number): void {
        this.mesh_.rotate(new Vector3(0, 1, 0), radian);
    }

    public RotateLocalZ(radian: number): void {
        this.mesh_.rotate(new Vector3(0, 0, 1), radian);
    }

    public RotateAround(point: WhoaMath.Vector3, axis: WhoaMath.Vector3, radian: number): void {
        this.mesh_.rotateAround(new Vector3(point.x, point.y, point.z), new Vector3(axis.x, axis.y, axis.z), radian);
    }

    public Scale(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh_.scaling = new Vector3(
                this.mesh_.scaling.x * x,
                this.mesh_.scaling.y * y,
                this.mesh_.scaling.z * z
            );
        } else {
            this.mesh_.scaling = new Vector3(x, y, z);
        }
    }

    public Translate(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh_.position = new Vector3(
                this.mesh_.position.x + x,
                this.mesh_.position.y + y,
                this.mesh_.position.z + z
            );
        } else {
            this.mesh_.position = new Vector3(x, y, z);
        }
    }

    public GetMesh(): BabylonMesh {
        return this.mesh_;
    }

    public SetParent(parent: Mesh): void {
        this.mesh_.setParent(parent.GetMesh());
    }

    public RefreshBoundingInfo(): void {
        this.mesh_.refreshBoundingInfo();
    }

    public UpdateVertices(vertices: Array<number>): void {
        this.mesh_.setVerticesData('position', vertices);
    }

    public UpdateIndices(indices: Array<number>): void {
        this.mesh_.setIndices(indices);
    }
}
