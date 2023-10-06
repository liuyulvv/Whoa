/// <reference path="Entity.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class EntityManager {
            public static get(): EntityManager;
            public createWall(info: EntityCreateInfo): Entity;
            public destroyEntityByID(entityID: string): void;
            public getAllEntity(): Entity[];
            public getEntityByID(entityID: string): Entity | undefined;
        }
    }
}
