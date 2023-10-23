declare namespace Whoa {
    export namespace WhoaFramework {
        class Interaction {
            public static get(): Interaction;
            public setPointerTouch(touch: boolean): void;
        }
    }
}

// eslint-disable-next-line no-var
declare var WhoaInteraction: Whoa.WhoaFramework.Interaction;
