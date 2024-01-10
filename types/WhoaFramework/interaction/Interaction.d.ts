declare namespace Whoa3D {
    export class Interaction {
        public static Get(): Interaction;
        public SetPointerTouch(touch: boolean): void;
        public Restore(): void;
        public Pause(): void;
    }
}

// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
declare var WhoaInteraction: Whoa3D.Interaction;
