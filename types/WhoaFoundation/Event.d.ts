declare namespace Whoa {
    class WhoaEvent {
        public Sub(event_name: string, callback: () => void): string;
        public UnSub(event_name: string, event_id: string): void;
        public Pub(event_name: string): void;
    }
}

// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
declare var WhoaEvent: Whoa.WhoaEvent;
