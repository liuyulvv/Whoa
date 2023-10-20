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
    private pointerTouch: boolean = false;
    private position: Whoa.WhoaGeometry.Point2D;

    private lastHoverEntity: Whoa.WhoaFramework.Entity | undefined;
    private lastSelectEntity: Whoa.WhoaFramework.Entity | undefined;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.position = new Whoa.WhoaGeometry.Point2D();
        this.lastHoverEntity = undefined;
        this.lastSelectEntity = undefined;
        this.register();
    }

    public static get(): Mouse {
        if (!Mouse.instance) {
            Mouse.instance = new Mouse();
        }
        return Mouse.instance;
    }

    public setPointerTouch(touch: boolean): void {
        this.pointerTouch = touch;
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

    private onPointerUp(event: PointerEvent) {
        const mouseButton = this.getMouseButton(event);
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        if (!this.pointerTouch) {
            const pickInfo = WhoaScene.pickEntity();
            if (pickInfo.hit) {
                const entity = Whoa.WhoaFramework.EntityManager.get().getEntityByID(pickInfo.meshID);
                if (entity?.type != Whoa.WhoaFramework.EntityType.CONTROL) {
                    if (this.lastSelectEntity != entity) {
                        this.lastSelectEntity?.onSelect(false);
                        this.lastSelectEntity = entity;
                        this.lastSelectEntity?.onSelect(true);
                    }
                }
            } else {
                this.lastSelectEntity?.onSelect(false);
                this.lastSelectEntity = undefined;
            }
        }
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
        this.setPointerTouch(false);
    }

    private onPointerMove(event: MouseEvent) {
        if (this.leftPressed || this.rightPressed || this.midPressed) {
            return;
        }
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        const pickInfo = WhoaScene.pickEntity();
        if (pickInfo.hit) {
            const entity = Whoa.WhoaFramework.EntityManager.get().getEntityByID(pickInfo.meshID);
            if (this.lastHoverEntity != entity) {
                this.lastHoverEntity?.onLeave();
                this.lastHoverEntity = entity;
                this.lastHoverEntity?.onEnter();
            }
        } else {
            this.lastHoverEntity?.onLeave();
            this.lastHoverEntity = undefined;
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
