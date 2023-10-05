declare namespace Whoa {
    class WhoaInteraction {
        public isLeftPressed(): boolean;
        public isMidPressed(): boolean;
        public isRightPressed(): boolean;
    }
}

// eslint-disable-next-line no-var
declare var WhoaInteraction: Whoa.WhoaInteraction;
