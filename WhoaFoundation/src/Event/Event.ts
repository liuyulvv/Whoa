import { v4 as uuid } from 'uuid';

export default class Event {
    private static instance: Event;
    private subscribers: Map<string, Map<string, () => void>>;

    private constructor() {
        this.subscribers = new Map();
    }

    public static get() {
        if (!Event.instance) {
            Event.instance = new Event();
        }
        return Event.instance;
    }

    public sub(eventName: string, callback: () => void): string {
        const eventID = uuid();
        if (!this.subscribers.get(eventName)) {
            this.subscribers.set(eventName, new Map());
        }
        this.subscribers.get(eventName)?.set(eventID, callback);
        return eventID;
    }

    public unsub(eventName: string, eventID: string): void {
        const subscribers = this.subscribers.get(eventName);
        if (subscribers) {
            subscribers.delete(eventID);
        }
    }

    public pub(eventName: string) {
        const subscribers = this.subscribers.get(eventName);
        if (subscribers) {
            subscribers.forEach((callback) => {
                callback();
            });
        }
    }
}
