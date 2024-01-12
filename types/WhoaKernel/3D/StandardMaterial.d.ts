/// <reference path="../math/Color.d.ts" />

declare namespace Whoa3D {
    export class StandardMaterial {
        public constructor(id: string);

        public Dispose(): void;

        public SetEmissiveColor(color: WhoaMath.Color3): void;

        public SetZOffset(zOffset: number, zOffsetUnits: number): void;
    }
}
