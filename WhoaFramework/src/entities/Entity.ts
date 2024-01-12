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

    protected mesh_: Whoa3D.Mesh;
    protected material_: Whoa3D.StandardMaterial;

    protected bounding_box_: Whoa3D.BoundingBox;

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

        this.mesh_ = new Whoa3D.Mesh(this.id_);
        this.mesh_.SetLayerMask(Whoa3D.LayerMask.BOTH);
        this.material_ = new Whoa3D.StandardMaterial(this.id_);
        this.material_.SetEmissiveColor(new WhoaMath.Color3(0.10196078431372549, 0.9215686274509803, 1));
        this.mesh_.SetMaterial(this.material_);
        this.bounding_box_ = new Whoa3D.BoundingBox();
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
        return this.mesh_.GetPosition();
    }

    public Show(): void {
        this.mesh_.Show();
        this.visible_ = true;
    }

    public Hide(): void {
        this.mesh_.Hide();
        this.visible_ = false;
    }

    public SetOverlayColor(color: WhoaMath.Color4): void {
        this.mesh_.SetOverlayColor(color);
    }

    public ShowOverlay(): void {
        this.mesh_.ShowOverlay();
    }

    public HideOverlay(): void {
        this.mesh_.HideOverlay();
    }

    public Destroy(): void {
        this.mesh_.Dispose();
        this.material_.Dispose();
        WhoaFramework.EntityManager.Get().DestroyEntityByID(this.id_);
    }

    public GetBoundingBox(): Whoa3D.BoundingBox {
        this.UpdateBoundingBox();
        return this.bounding_box_;
    }

    public UpdateBoundingBox(): void {
        this.bounding_box_ = new Whoa3D.BoundingBox(this.mesh_.GetBoundingInfo());
    }

    public ShowBoundingBox(): void {
        this.mesh_.ShowBoundingBox();
    }

    public HideBoundingBox(): void {
        this.mesh_.HideBoundingBox();
    }

    public OnEnter(): void {
        this.hovered_ = true;
        WhoaScene.SetEntityHoverColor();
        this.ShowBoundingBox();
    }

    public OnLeave(): void {
        this.hovered_ = false;
        if (this.selected_) {
            WhoaScene.SetEntitySelectColor();
            this.ShowBoundingBox();
        } else {
            this.HideBoundingBox();
        }
    }

    public OnSelect(selected: boolean = true) {
        if (this.selected_ != selected) {
            this.selected_ = selected;
            if (this.selected_) {
                WhoaScene.SetEntitySelectColor();
                this.ShowBoundingBox();
            } else if (this.hovered_) {
                WhoaScene.SetEntityHoverColor();
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
        this.mesh_.RotateLocalX(radian);
    }

    public RotateLocalY(radian: number): void {
        this.mesh_.RotateLocalY(radian);
    }

    public RotateLocalZ(radian: number): void {
        this.mesh_.RotateLocalZ(radian);
    }

    public RotateAround(point: WhoaMath.Vector3, axis: WhoaMath.Vector3, radian: number): void {
        this.mesh_.RotateAround(point, axis, radian);
    }

    public Scale(x: number, y: number, z: number, relative: boolean = true): void {
        this.mesh_.Scale(x, y, z, relative);
    }

    public Translate(x: number, y: number, z: number, relative: boolean = true): void {
        this.mesh_.Translate(x, y, z, relative);
    }
}
