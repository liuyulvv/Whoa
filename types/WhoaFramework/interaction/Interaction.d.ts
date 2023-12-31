declare namespace Whoa {
    export namespace WhoaFramework {
        class Interaction {
            public static Get(): Interaction;
            public SetPointerTouch(touch: boolean): void;
        }
    }
}

// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
declare var WhoaInteraction: Whoa.WhoaFramework.Interaction;
