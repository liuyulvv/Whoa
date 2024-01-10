import BoundingBox from 'src/babylon/BoundingBox';
import { LayerMask } from 'src/babylon/Camera';
import Mesh from 'src/babylon/Mesh';
import Scene from 'src/babylon/Scene';
import StandardMaterial from 'src/babylon/StandardMaterial';
import { Color3 } from 'src/math/Color';
import { Vector3 } from 'src/math/Vector';

export class EntityCreateInfo {
    role_: WhoaFramework.EntityRole = WhoaFramework.EntityRole.ROOT;
    type_: WhoaFramework.EntityType = WhoaFramework.EntityType.NONE;
    hovered_: boolean = false;
    selected_: boolean = false;
    visible_: boolean = true;
    pickable_: boolean = true;
    movable_: boolean = true;
}

export default abstract class Entity {
    protected id_: string;
    protected role_: WhoaFramework.EntityRole;
    protected type_: WhoaFramework.EntityType;
    protected hovered_: boolean;
    protected selected_: boolean;
    protected visible_: boolean;
    protected pickable_: boolean;
    protected movable_: boolean;

    protected mesh_: Mesh;
    protected material_: StandardMaterial;

    protected bounding_box_: BoundingBox;

    public constructor(id: string, info?: EntityCreateInfo) {
        this.id_ = id;
        this.role_ = WhoaFramework.EntityRole.ROOT;
        this.type_ = WhoaFramework.EntityType.NONE;
        this.hovered_ = false;
        this.selected_ = false;
        this.visible_ = true;
        this.pickable_ = true;
        this.movable_ = true;

        if (info) {
            this.role_ = info.role_;
            this.type_ = info.type_;
            this.hovered_ = info.hovered_;
            this.selected_ = info.selected_;
            this.visible_ = info.visible_;
            this.pickable_ = info.pickable_;
            this.movable_ = info.movable_;
        }

        this.mesh_ = new Mesh(this.id_);
        this.mesh_.GetMesh().layerMask = LayerMask.BOTH;
        this.material_ = new StandardMaterial(this.id_);
        this.material_.emissiveColor = new Color3(0.10196078431372549, 0.9215686274509803, 1);
        this.mesh_.GetMesh().material = this.material_;
        this.bounding_box_ = new BoundingBox();
        this.UpdateBoundingBox();
    }

    public GetID(): string {
        return this.id_;
    }

    public SetID(id_: string) {
        WhoaFramework.EntityManager.Get().UpdateEntityID(this.id_, id_);
        this.id_ = id_;
    }

    public GetRole(): WhoaFramework.EntityRole {
        return this.role_;
    }

    public SetRole(role: WhoaFramework.EntityRole) {
        this.role_ = role;
    }

    public GetType(): WhoaFramework.EntityType {
        return this.type_;
    }

    public SetType(type: WhoaFramework.EntityType) {
        this.type_ = type;
    }

    public IsHovered(): boolean {
        return this.hovered_;
    }

    public IsSelected(): boolean {
        return this.selected_;
    }

    public IsVisible(): boolean {
        return this.visible_;
    }

    public IsPickable(): boolean {
        return this.pickable_;
    }

    public SetPickable(pickable: boolean) {
        this.pickable_ = pickable;
    }

    public IsMovable(): boolean {
        return this.movable_;
    }

    public SetMovable(movable: boolean) {
        this.movable_ = movable;
    }

    public GetPosition(): WhoaMath.Point3 {
        const pos = this.mesh_.GetMesh().position;
        return new WhoaMath.Point3(pos.x, pos.y, pos.z);
    }

    public Show(): void {
        this.mesh_.GetMesh().setEnabled(true);
        this.visible_ = true;
    }

    public Hide(): void {
        this.mesh_.GetMesh().setEnabled(false);
        this.visible_ = false;
    }

    public ShowOverlay(): void {
        this.mesh_
            .GetMesh()
            .getChildMeshes()
            .forEach((mesh) => {
                mesh.overlayColor = Color3.Red();
                mesh.renderOverlay = true;
            });
    }

    public HideOverlay(): void {
        this.mesh_
            .GetMesh()
            .getChildMeshes()
            .forEach((mesh) => {
                mesh.renderOverlay = false;
            });
    }

    public Destroy(): void {
        this.mesh_.GetMesh().dispose();
        this.material_.dispose();
        WhoaFramework.EntityManager.Get().DestroyEntityByID(this.id_);
    }

    public GetBoundingBox(): BoundingBox {
        this.UpdateBoundingBox();
        return this.bounding_box_;
    }

    public UpdateBoundingBox(): void {
        this.bounding_box_ = new BoundingBox(this.mesh_.GetMesh().getBoundingInfo());
    }

    public ShowBoundingBox(): void {
        this.mesh_.GetMesh().showBoundingBox = true;
    }

    public HideBoundingBox(): void {
        this.mesh_.GetMesh().showBoundingBox = false;
    }

    public OnEnter(): void {
        this.hovered_ = true;
        Scene.Get().SetEntityHoverColor();
        this.ShowBoundingBox();
    }

    public OnLeave(): void {
        this.hovered_ = false;
        if (this.selected_) {
            Scene.Get().SetEntitySelectColor();
            this.ShowBoundingBox();
        } else {
            this.HideBoundingBox();
        }
    }

    public OnSelect(selected: boolean = true) {
        if (this.selected_ != selected) {
            this.selected_ = selected;
            if (this.selected_) {
                Scene.Get().SetEntitySelectColor();
                this.ShowBoundingBox();
            } else if (this.hovered_) {
                Scene.Get().SetEntityHoverColor();
                this.ShowBoundingBox();
            } else {
                this.HideBoundingBox();
            }
        }
    }

    public OnDragStart(): void {}

    public OnDrag(): void {}

    public OnDragEnd(): void {}

    public RotateLocalX(radian: number): void {
        this.mesh_.GetMesh().rotate(new Vector3(1, 0, 0), radian);
    }

    public RotateLocalY(radian: number): void {
        this.mesh_.GetMesh().rotate(new Vector3(0, 1, 0), radian);
    }

    public RotateLocalZ(radian: number): void {
        this.mesh_.GetMesh().rotate(new Vector3(0, 0, 1), radian);
    }

    public RotateAround(point: Vector3, axis: Vector3, radian: number): void {
        this.mesh_.GetMesh().rotateAround(point, axis, radian);
    }

    public Scale(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh_.GetMesh().scaling = new Vector3(
                this.mesh_.GetMesh().scaling.x * x,
                this.mesh_.GetMesh().scaling.y * y,
                this.mesh_.GetMesh().scaling.z * z
            );
        } else {
            this.mesh_.GetMesh().scaling = new Vector3(x, y, z);
        }
    }

    public Translate(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh_.GetMesh().position = new Vector3(
                this.mesh_.GetMesh().position.x + x,
                this.mesh_.GetMesh().position.y + y,
                this.mesh_.GetMesh().position.z + z
            );
        } else {
            this.mesh_.GetMesh().position = new Vector3(x, y, z);
        }
    }
}
