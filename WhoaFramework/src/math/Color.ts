import { Color3 as BabylonColor3, Color4 as BabylonColor4 } from '@babylonjs/core';

export class Color3 extends BabylonColor3 {
    public constructor(r: number = 0, g: number = 0, b: number = 0) {
        super(r, g, b);
    }

    public static FromFloats(r: number, g: number, b: number): Color3 {
        const color = new BabylonColor3(r, g, b);
        color.copyFromFloats(r, g, b);
        return color;
    }

    public static FromHexString(hex: string): Color3 {
        const color = BabylonColor3.FromHexString(hex);
        return new Color3(color.r, color.g, color.b);
    }
}

export class Color4 extends BabylonColor4 {
    public constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
        super(r, g, b, a);
    }

    public static FromFloats(r: number, g: number, b: number, a: number): Color4 {
        const color = new BabylonColor4(r, g, b, a);
        color.copyFromFloats(r, g, b, a);
        return color;
    }

    public static FromHexString(hex: string): Color4 {
        const color = BabylonColor4.FromHexString(hex);
        return new Color4(color.r, color.g, color.b, color.a);
    }
}
