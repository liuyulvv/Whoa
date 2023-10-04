declare namespace Whoa {
    class WhoaEvent {
        static get(): WhoaEvent;
        sub(key: string, callback: () => void): void;
        unsub(key: string, callback: () => void): void;
        pub(key: string): void;
    }
}

// eslint-disable-next-line no-var
declare var WhoaEvent: Whoa.WhoaEvent;
