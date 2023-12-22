declare namespace Whoa {
    class WhoaEvent {
        public sub(eventName: string, callback: () => void): string;
        public unsub(eventName: string, eventID: string): void;
        public pub(eventName: string);
    }
}

// eslint-disable-next-line no-var
declare var WhoaEvent: Whoa.WhoaEvent;
