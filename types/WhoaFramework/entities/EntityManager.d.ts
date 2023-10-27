/// <reference path="Entity.d.ts" />
/// <reference path="EntityOrnament.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class EntityManager {
            public static get(): EntityManager;
            public addEntity(entityID: string, entity: Entity): void;
            public createOrnament(info: EntityModelCreateInfo): EntityOrnament;
            public destroyEntityByID(entityID: string): void;
            public getAllEntity(): Entity[];
            public getEntityByID(entityID: string): Entity | undefined;
        }
    }
}
