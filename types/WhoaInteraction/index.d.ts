declare namespace Whoa {
    class WhoaInteraction {
        static get(): WhoaInteraction;
        isLeftPressed(): boolean;
        isMidPressed(): boolean;
        isRightPressed(): boolean;
    }
}

// eslint-disable-next-line no-var
declare var WhoaInteraction: Whoa.WhoaInteraction;
