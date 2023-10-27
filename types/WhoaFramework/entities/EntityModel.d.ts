/// <reference path="Entity.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface EntityModelCreateInfo extends EntityCreateInfo {
            modelURL: string;
            modelName: string;
            scale: number[];
            rotation: number[];
        }

        export abstract class EntityModel extends Entity {}
    }
}
