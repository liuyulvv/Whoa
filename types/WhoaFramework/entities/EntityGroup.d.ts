/// <reference path="Entity.d.ts" />

declare namespace WhoaFramework {
    export class EntityGroup extends Entity {
        protected children_: Array<Entity>;

        public AddChild(child: Entity): void;
    }
}
