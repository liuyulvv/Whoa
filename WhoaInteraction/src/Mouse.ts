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
    private position: Whoa.WhoaGeometry.Point2D;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.position = new Whoa.WhoaGeometry.Point2D();
        this.register();
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
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.onMouseClick(event);
        });
        this.canvas.addEventListener('pointerup', (event: PointerEvent) => {
            this.onPointerUp(event);
        });
        this.canvas.addEventListener('pointermove', (event: MouseEvent) => {
            this.onPointerMove(event);
        });
    }

    private onPointerDown(event: PointerEvent) {
        const mouseButton = this.getMouseButton(event);
        switch (mouseButton) {
            case MouseButton.LEFT: {
                this.leftPressed = true;
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

    private onMouseClick(event: MouseEvent) {
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        const pickInfo = Whoa3D.pickEntity();
        const entities = Whoa.WhoaFramework.EntityManager.get().getAllEntity();
        if (pickInfo.hit) {
            entities.forEach((entity) => {
                if (entity.id == pickInfo.meshID) {
                    entity.onSelect(true);
                } else {
                    entity.onSelect(false);
                }
            });
        } else {
            entities.forEach((entity) => {
                entity.onSelect(false);
            });
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

    private onPointerMove(event: MouseEvent) {
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        const pickInfo = Whoa3D.pickEntity();
        const entities = Whoa.WhoaFramework.EntityManager.get().getAllEntity();
        if (pickInfo.hit) {
            entities.forEach((entity) => {
                if (entity.id == pickInfo.meshID) {
                    entity.onHover(true);
                } else {
                    entity.onHover(false);
                }
            });
        } else {
            entities.forEach((entity) => {
                entity.onHover(false);
            });
        }
    }

    private getMouseButton(event: MouseEvent): MouseButton {
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
