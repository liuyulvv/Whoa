export enum MouseButton {
    LEFT,
    MID,
    RIGHT,
    OTHER
}

export default class Mouse {
    private static instance: Mouse;
    private canvas: HTMLCanvasElement;
    private leftPressed: boolean = false;
    private midPressed: boolean = false;
    private rightPressed: boolean = false;
    private pressedPosition: Whoa.WhoaGeometry.Point2D;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.register();
        this.pressedPosition = new Whoa.WhoaGeometry.Point2D();
    }

    public static get(): Mouse {
        if (!Mouse.instance) {
            Mouse.instance = new Mouse();
        }
        return Mouse.instance;
    }

    public isLeftPressed(): boolean {
        return this.leftPressed;
    }

    public isMidPressed(): boolean {
        return this.midPressed;
    }

    public isRightPressed(): boolean {
        return this.rightPressed;
    }

    private register() {
        this.canvas.addEventListener('pointerdown', (event: PointerEvent) => {
            this.onPointerDown(event);
        });
        this.canvas.addEventListener('pointerup', (event: PointerEvent) => {
            this.onPointerUp(event);
        });
        this.canvas.addEventListener('pointermove', (event: PointerEvent) => {
            this.onPointerMove(event);
        });
    }

    private onPointerDown(event: PointerEvent) {
        const mouseButton = this.getMouseButton(event);
        switch (mouseButton) {
            case MouseButton.LEFT: {
                this.leftPressed = true;
                this.pressedPosition.x = event.offsetX;
                this.pressedPosition.y = event.offsetY;
                break;
            }
            case MouseButton.MID:
                this.midPressed = true;
                break;
            case MouseButton.RIGHT:
                this.rightPressed = true;
                break;
            default:
                break;
        }
    }

    private onPointerUp(event: PointerEvent) {
        const mouseButton = this.getMouseButton(event);
        switch (mouseButton) {
            case MouseButton.LEFT:
                this.leftPressed = false;
                break;
            case MouseButton.MID:
                this.midPressed = false;
                break;
            case MouseButton.RIGHT:
                this.rightPressed = false;
                break;
            default:
                break;
        }
    }

    private onPointerMove(event: PointerEvent) {
        if (this.leftPressed) {
            this.pressedPosition.x = event.offsetX;
            this.pressedPosition.y = event.offsetY;
        }
    }

    private getMouseButton(event: PointerEvent): MouseButton {
        switch (event.button) {
            case 0:
                return MouseButton.LEFT;
            case 1:
                return MouseButton.MID;
            case 2:
                return MouseButton.RIGHT;
            default:
                return MouseButton.OTHER;
        }
    }
}
