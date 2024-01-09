import { v4 as uuid } from 'uuid';

export default class Event {
    private static instance_: Event;
    private subscribers_: Map<string, Map<string, () => void>>;

    private constructor() {
        this.subscribers_ = new Map();
    }

    public static Get() {
        if (!Event.instance_) {
            Event.instance_ = new Event();
        }
        return Event.instance_;
    }

    public Sub(eventName: string, callback: () => void): string {
        const event_id = uuid();
        if (!this.subscribers_.get(eventName)) {
            this.subscribers_.set(eventName, new Map());
        }
        this.subscribers_.get(eventName)?.set(event_id, callback);
        return event_id;
    }

    public UnSub(eventName: string, event_id: string): void {
        const subscribers = this.subscribers_.get(eventName);
        if (subscribers) {
            subscribers.delete(event_id);
        }
    }

    public Pub(eventName: string) {
        const subscribers = this.subscribers_.get(eventName);
        if (subscribers) {
            subscribers.forEach((callback) => {
                callback();
            });
        }
    }
}
