/// <reference path="EntityRole.d.ts" />
/// <reference path="EntityType.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface EntityCreateInfo {
            role: EntityRole;
            type: EntityType;
            hovered: boolean;
            selected: boolean;
            visible: boolean;
            pickable: boolean;
            movable: boolean;
        }

        export abstract class Entity {
            public get id(): string;
            public get role(): EntityRole;
            public get type(): EntityType;
            public get isHovered(): boolean;
            public get isSelected(): boolean;
            public get isVisible(): boolean;
            public get isPickable(): boolean;
            public get position(): WhoaGeometry.Point3D;
            public show(): void;
            public hide(): void;
            public destroy(): void;
            public showBoundingBox(): void;
            public hideBoundingBox(): void;
            public onEnter(): void;
            public onLeave(): void;
            public onSelect(selected: boolean);
            public onDragStart(): void;
            public onDrag(): void;
            public onDragEnd(): void;
            public rotateLocalX(radian: number): void;
            public rotateLocalY(radian: number): void;
            public rotateLocalZ(radian: number): void;
            public scale(x: number, y: number, z: number, relative: boolean = true): void;
            public translate(x: number, y: number, z: number, relative: boolean = true): void;
        }
    }
}
