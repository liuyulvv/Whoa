/// <reference path="EntityRole.d.ts" />
/// <reference path="EntityType.d.ts" />
/// <reference path="../math/Point.d.ts" />
/// <reference path="../3D/Mesh.d.ts" />
/// <reference path="../3D/StandardMaterial.d.ts" />

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

    export abstract class Entity {
        protected id_: string;
        protected role_: EntityRole;
        protected type_: EntityType;
        protected hovered_: boolean;
        protected selected_: boolean;
        protected visible_: boolean;
        protected pickable_: boolean;
        protected movable_: boolean;

        protected mesh_: Whoa3D.Mesh;
        protected material_: Whoa3D.StandardMaterial;

        protected bounding_box_: BoundingBox;

        public constructor(id: string, info?: EntityCreateInfo);

        public GetID(): string;
        public SetID(id_: string);
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
        public Show(): void;
        public Hide(): void;
        public ShowOverlay(): void;
        public HideOverlay(): void;
        public Destroy(): void;
        public GetBoundingBox(): BoundingBox;
        public UpdateBoundingBox(): void;
        public ShowBoundingBox(): void;
        public HideBoundingBox(): void;
        public OnEnter(): void;
        public OnLeave(): void;
        public OnSelect(selected: boolean = true);
        public OnDragStart(): void;
        public OnDrag(): void;
        public OnDragEnd(): void;
        public RotateLocalX(radian: number): void;
        public RotateLocalY(radian: number): void;
        public RotateLocalZ(radian: number): void;
        public RotateAround(point: Vector3, axis: Vector3, radian: number): void;
        public Scale(x: number, y: number, z: number, relative: boolean = true): void;
        public Translate(x: number, y: number, z: number, relative: boolean = true): void;
    }
}
