/// <reference path="Entity.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class EntityModelCreateInfo {
            model_url_: string;
            model_name_: string;
            scale_: Array<number>;
            rotation_: Array<number>;
        }

        export abstract class EntityModel extends Entity {
            protected model_url_: string;
            protected model_name_: string;

            public constructor(id: string, info: EntityModelCreateInfo);
        }
    }
}
