/// <reference path="Entity.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface EntityModelCreateInfo extends EntityCreateInfo {
            meshURL: string;
            meshName: string;
        }

        export abstract class EntityModel extends Entity {}
    }
}
