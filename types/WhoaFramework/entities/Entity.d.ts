/// <reference path="EntityRole.d.ts" />
/// <reference path="EntityType.d.ts" />
/// <reference path="../../WhoaKernel/math/Point.d.ts" />
/// <reference path="../../WhoaKernel/3D/Mesh.d.ts" />
/// <reference path="../../WhoaKernel/3D/StandardMaterial.d.ts" />

declare namespace WhoaFramework {
    export class EntityCreateInfo {
        role_: EntityRole;
        type_: EntityType;
        hovered_: boolean;
        selected_: boolean;
        visible_: boolean;
        pickable_: boolean;
        movable_: boolean;
    }

    export class Entity {
        protected id_: string;

        protected mesh_: Whoa3D.Mesh;
        protected material_: Whoa3D.StandardMaterial;
        protected bounding_box_: Whoa3D.BoundingBox;

        public name_: string;

        protected role_: EntityRole;
        protected type_: EntityType;
        protected hovered_: boolean;
        protected selected_: boolean;
        protected visible_: boolean;
        protected pickable_: boolean;
        protected movable_: boolean;

        protected parent_: Entity;

        public constructor(id: string, info?: EntityCreateInfo);

        public GetID(): string;
        public SetID(id_: string): void;
        public GetRole(): EntityRole;
        public SetRole(role: EntityRole);
        public GetType(): EntityType;
        public SetType(type: EntityType);
        public IsHovered(): boolean;
        public IsSelected(): boolean;
        public IsVisible(): boolean;
        public IsPickable(): boolean;
        public SetPickable(pickable: boolean);
        public IsMovable(): boolean;
        public SetMovable(movable: boolean);
        public GetPosition(): WhoaMath.Point3;
        public GetBoundingBox(): Whoa3D.BoundingBox;
        public ComputeWorldMatrix(force?: boolean): void;
        public UpdateBoundingBox(): void;
        public ShowBoundingBox(): void;
        public HideBoundingBox(): void;
        public SetOverlayColor(color: WhoaMath.Color4): void;
        public ShowOverlay(): void;
        public HideOverlay(): void;
        public UpdateMesh(mesh: Whoa3D.Mesh): void;
        public Show(): void;
        public Hide(): void;
        public Destroy(): void;
        public OnEnter(): void;
        public OnLeave(): void;
        public OnSelect(selected: boolean): void;
        public SetSelect(selected: boolean): void;
        public OnDragStart(): void;
        public OnDrag(): void;
        public OnDragEnd(): void;
        public RotateLocalX(radian: number): void;
        public RotateLocalY(radian: number): void;
        public RotateLocalZ(radian: number): void;
        public RotateAround(point: WhoaMath.Vector3, axis: WhoaMath.Vector3, radian: number): void;
        public Scale(x: number, y: number, z: number, relative?: boolean /* true */): void;
        public Translate(x: number, y: number, z: number, relative?: boolean /* true */): void;
        public SetPosition(position: WhoaMath.Vector3): void;
        public GetParent(): Entity;
        public SetParent(parent: Entity): void;
        public SetMaterial(material: Whoa3D.StandardMaterial): void;
    }
}
