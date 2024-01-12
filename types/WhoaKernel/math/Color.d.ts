declare namespace WhoaMath {
    export class Color3 {
        public r: number;
        public g: number;
        public b: number;

        public constructor(r?: number, g?: number, b?: number);

        public static FromFloats(r: number, g: number, b: number): Color3;

        public static FromHexString(hex: string): Color3;
    }

    export class Color4 {
        public r: number;
        public g: number;
        public b: number;
        public a: number;

        public constructor(r?: number, g?: number, b?: number, a?: number);

        public static FromFloats(r: number, g: number, b: number, a: number): Color4;

        public static FromHexString(hex: string): Color4;
    }
}
