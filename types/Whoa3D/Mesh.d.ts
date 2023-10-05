/// <reference path="Material.d.ts" />

declare namespace Whoa {
    export namespace Whoa3D {
        export class Mesh {
            public get id(): string;
            public destroy(): void;
            public setMaterial(material: Material): void;
        }
    }
}
