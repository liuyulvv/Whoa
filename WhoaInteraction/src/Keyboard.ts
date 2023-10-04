class Keyboard {
    private static instance: Keyboard;
    private canvas: HTMLCanvasElement;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.register();
    }

    public static get(): Keyboard {
        if (!Keyboard.instance) {
            Keyboard.instance = new Keyboard();
        }
        return Keyboard.instance;
    }

    private register() {
        // this.canvas.addEventListener('keydown', (event: KeyboardEvent) => {
        //     this.onKeyDown(event);
        // });
        // this.canvas.addEventListener('keyup', (event: KeyboardEvent) => {
        //     this.onKeyUp(event);
        // });
    }

    // private onKeyDown(event: KeyboardEvent) {
    //     // if (event.key == '2') {
    //     // }
    // }

    // private onKeyUp(event: KeyboardEvent) {}
}

export default Keyboard;
