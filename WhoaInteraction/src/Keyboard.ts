export default class Keyboard {
    private static instance: Keyboard;
    private canvas: HTMLCanvasElement;

    private ctrlPressed: boolean;
    private shiftPressed: boolean;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.ctrlPressed = false;
        this.shiftPressed = false;
        this.register();
    }

    public static get(): Keyboard {
        if (!Keyboard.instance) {
            Keyboard.instance = new Keyboard();
        }
        return Keyboard.instance;
    }

    public get isCtrlPressed(): boolean {
        return this.ctrlPressed;
    }

    public get isShiftPressed(): boolean {
        return this.shiftPressed;
    }

    private register() {
        this.canvas.addEventListener('keydown', (event: KeyboardEvent) => {
            this.onKeyDown(event);
        });
        // this.canvas.addEventListener('keyup', (event: KeyboardEvent) => {
        //     this.onKeyUp(event);
        // });
    }

    private onKeyDown(event: KeyboardEvent) {
        if (this.onlyKey(event)) {
            if (event.key == '2') {
                Whoa3D.changeTo2D();
            } else if (event.key == '3') {
                Whoa3D.changeTo2D();
            }
        }
    }

    // private onKeyUp(event: KeyboardEvent) {}

    private onlyCtrl(event: KeyboardEvent): boolean {
        return (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey;
    }

    private onlyShift(event: KeyboardEvent): boolean {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.shiftKey;
    }

    private onlyKey(event: KeyboardEvent): boolean {
        return !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey;
    }
}
