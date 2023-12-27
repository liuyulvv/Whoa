export default class Websocket {
    private ws: WebSocket;

    public constructor() {
        this.ws = new WebSocket('ws://localhost:8080/ws');

        this.ws.onopen = () => {
            this.ws.send("Hello, I'm client.");
        };

        this.ws.onmessage = (e) => {
            console.log(e.data);
        };

        this.ws.onclose = () => {};

        this.ws.onerror = () => {};
    }

    private heartbeat() {
        this.ws.send('Ping');
    }

    public send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.ws.send(data);
    }
}
