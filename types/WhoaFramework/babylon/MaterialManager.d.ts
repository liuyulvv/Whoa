/// <reference path="Material.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class MaterialManager {
            public destroyMaterial(materialID: string): void;
            public getMaterialByID(materialID: string): Material | undefined;
            public createMaterial(materialID: string): Material;
        }
    }
}