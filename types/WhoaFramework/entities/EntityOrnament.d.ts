/// <reference path="Entity.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface EntityOrnamentCreateInfo extends EntityCreateInfo {
            meshURL: string;
            meshName: string;
        }

        export class EntityOrnament extends Entity {}
    }
}
