export default class Websocket {
    private ws_: WebSocket;

    public constructor() {
        this.ws_ = new WebSocket('ws_://localhost:8080/ws_');

        this.ws_.onopen = () => {
            this.ws_.send("Hello, I'm client.");
        };

        this.ws_.onmessage = (e) => {
            console.log(e.data);
        };

        this.ws_.onclose = () => {};

        this.ws_.onerror = () => {};
    }

    private HeartBeat() {
        this.ws_.send('Ping');
    }

    public Send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.ws_.send(data);
    }
}
