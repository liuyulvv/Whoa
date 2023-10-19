/// <reference path="EntityModel.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export abstract class EntityControl extends EntityModel {
            protected entity: Entity | null;
            public attach(entity: Entity): void;
            public detach(): void;
        }

        export class EntityControlRotate2D extends EntityControl {}
        export class EntityControlRotate3D extends EntityControl {}
        export class EntityControlMove2D extends EntityControl {}
        export class EntityControlMove3D extends EntityControl {}
    }
}
