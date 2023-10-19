/// <reference path="Material.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export class Mesh {
            public get id(): string;
            public show(): void;
            public hide(): void;
            public showOverlay(): void;
            public hideOverlay(): void;
            public destroy(): void;
            public setMaterial(material: Material): void;
            public getBoundingBox();
            public showBoundingBox(): void;
            public hideBoundingBox(): void;
            public rotateLocalX(radian: number): void;
            public rotateLocalY(radian: number): void;
            public rotateLocalZ(radian: number): void;
            public scale(x: number, y: number, z: number, relative): void;
        }
    }
}
