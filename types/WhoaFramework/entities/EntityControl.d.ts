/// <reference path="EntityModel.d.ts" />

declare namespace WhoaFramework {
    export abstract class EntityControl extends EntityModel {
        protected entity_: Entity | null;
        public Attach(entity: Entity): void;
        public Detach(): void;
    }

    export class EntityControlRotate2D extends EntityControl {}
    export class EntityControlRotate3D extends EntityControl {}
    export class EntityControlMove2D extends EntityControl {}
    export class EntityControlMove3D extends EntityControl {}
}
