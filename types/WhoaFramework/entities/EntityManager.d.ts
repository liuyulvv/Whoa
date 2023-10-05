/// <reference path="Entity.d.ts" />
/// <reference path="EntityRole.d.ts" />
/// <reference path="EntityType.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class EntityManager {
            public static get(): EntityManager;
            public create(info: EntityCreateInfo): Entity;
            public destroy(entityID: string): void;
        }
    }
}
