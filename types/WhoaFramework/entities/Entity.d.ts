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
            width: number;
            height: number;
            depth: number;
        }

        export class Entity {
            public get id(): string;
            public get role(): EntityRole;
            public get type(): EntityType;
            public get isHovered(): boolean;
            public get isSelected(): boolean;
            public get isVisible(): boolean;
            public get isPickable(): boolean;
            public get width(): number;
            public get height(): number;
            public get depth(): number;
            public destroy(): void;
            public showBoundingBox(): void;
            public hideBoundingBox(): void;
            public onHover(hover: boolean = true);
            public onSelect(selected: boolean = true);
        }
    }
}
