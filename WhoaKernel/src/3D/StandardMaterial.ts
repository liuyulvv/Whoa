import { StandardMaterial as BabylonStandardMaterial } from '@babylonjs/core';
import { Color3 } from 'src/math/Color';

export default class StandardMaterial extends BabylonStandardMaterial {
    public constructor(name: string) {
        super(name);
    }

    public Dispose(): void {
        this.dispose();
    }

    public SetEmissiveColor(color: Color3): void {
        this.emissiveColor = color;
    }

    public SetZOffset(zOffset: number, zOffsetUnits: number): void {
        this.zOffset = zOffset;
        this.zOffsetUnits = zOffsetUnits;
    }
}
