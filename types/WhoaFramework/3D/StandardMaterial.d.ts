/// <reference path="../math/Color3.d.ts" />

declare namespace Whoa3D {
    export class StandardMaterial {
        public constructor(id: string);

        public SetEmissiveColor(color: WhoaMath.Color3): void;

        public SetZOffset(zOffset: number, zOffsetUnits: number): void;
    }
}
