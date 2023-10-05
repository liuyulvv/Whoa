declare namespace Whoa {
    class WhoaEvent {
        public sub(key: string, callback: () => void): void;
        public unsub(key: string, callback: () => void): void;
        public pub(key: string): void;
    }
}

// eslint-disable-next-line no-var
declare var WhoaEvent: Whoa.WhoaEvent;
