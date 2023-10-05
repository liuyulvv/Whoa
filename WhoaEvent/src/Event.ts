export default class Event {
    private static instance: Event;
    private subscribers: { [key: string]: Array<() => void> };

    private constructor() {
        this.subscribers = {};
    }

    public static get() {
        if (!Event.instance) {
            Event.instance = new Event();
        }
        return Event.instance;
    }

    public sub(key: string, callback: () => void) {
        if (!this.subscribers[key]) {
            this.subscribers[key] = [];
        }
        this.subscribers[key].push(callback);
    }

    public unsub(key: string, callback: () => void) {
        if (this.subscribers[key]) {
            const index = this.subscribers[key].indexOf(callback);
            if (index != -1) {
                this.subscribers[key].splice(index, 1);
            }
        }
    }

    public pub(key: string) {
        if (this.subscribers[key]) {
            this.subscribers[key].forEach((callback) => {
                callback();
            });
        }
    }
}
