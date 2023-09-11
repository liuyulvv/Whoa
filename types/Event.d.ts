declare class Event {
    static get(): Event;
    sub(key: string, callback: () => void): void;
    unsub(key: string, callback: () => void): void;
    pub(key: string): void;
}

export default Event;
