/// <reference path="EntityRole.d.ts" />
/// <reference path="EntityType.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface EntityCreateInfo {
            role: EntityRole;
            type: EntityType;
        }

        export class Entity {
            public get id(): string;
            public get role(): EntityRole;
            public get type(): EntityType;
            public destroy(): void;
        }
    }
}
