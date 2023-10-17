/// <reference path="Entity.d.ts" />
/// <reference path="EntityOrnament.d.ts" />
/// <reference path="EntityControl.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class EntityManager {
            public static get(): EntityManager;
            public createControl(info: EntityModelCreateInfo): EntityControl;
            public createOrnament(info: EntityOrnamentCreateInfo): EntityOrnament;
            public destroyEntityByID(entityID: string): void;
            public getAllEntity(): Entity[];
            public getEntityByID(entityID: string): Entity | undefined;
        }
    }
}
