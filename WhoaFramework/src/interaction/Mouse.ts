export default class Mouse {
    private static instance: Mouse;
    private canvas: HTMLCanvasElement;
    private pointerTouched: boolean;
    private pointerMoved: boolean = false;
    private position: Whoa.WhoaGeometry.Point2D;

    private lastHoverEntity: Whoa.WhoaFramework.Entity | undefined;
    private lastSelectEntity: Whoa.WhoaFramework.Entity | undefined;
    private lastSelectControl: Whoa.WhoaFramework.Entity | undefined;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.pointerTouched = false;
        this.pointerMoved = false;
        this.position = new Whoa.WhoaGeometry.Point2D();
        this.lastHoverEntity = undefined;
        this.lastSelectEntity = undefined;
        this.lastSelectControl = undefined;
        this.register();
    }

    public static get(): Mouse {
        if (!Mouse.instance) {
            Mouse.instance = new Mouse();
        }
        return Mouse.instance;
    }

    public setPointerTouch(touch: boolean): void {
        this.pointerTouched = touch;
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
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        const pickInfo = WhoaScene.pickEntity();
        if (pickInfo.hit) {
            const entity = Whoa.WhoaFramework.EntityManager.get().getEntityByID(pickInfo.meshID);
            if (entity && entity.type == Whoa.WhoaFramework.EntityType.CONTROL) {
                this.lastSelectControl = entity;
            }
        }
    }

    private onPointerUp(event: PointerEvent) {
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        if (this.pointerMoved) {
            this.pointerTouched = false;
            this.pointerMoved = false;
            if (this.lastSelectControl) {
                this.lastSelectControl.onDragEnd();
            } else if (this.lastSelectEntity) {
                this.lastSelectEntity.onDragEnd();
            }
            return;
        }
        if (!this.pointerTouched) {
            const pickInfo = WhoaScene.pickEntity();
            if (pickInfo.hit) {
                const entity = Whoa.WhoaFramework.EntityManager.get().getEntityByID(pickInfo.meshID);
                if (entity && entity.type == Whoa.WhoaFramework.EntityType.CONTROL) {
                    this.lastSelectControl = entity;
                } else {
                    this.lastSelectControl = undefined;
                    if (entity?.type != Whoa.WhoaFramework.EntityType.CONTROL) {
                        if (this.lastSelectEntity != entity) {
                            this.lastSelectEntity?.onSelect(false);
                            this.lastSelectEntity = entity;
                            this.lastSelectEntity?.onSelect(true);
                        }
                    }
                }
            } else {
                this.lastSelectEntity?.onSelect(false);
                this.lastSelectEntity = undefined;
                this.lastSelectControl = undefined;
            }
        }
        this.pointerTouched = false;
        this.pointerMoved = false;
    }

    private onPointerMove(event: MouseEvent) {
        if (this.pointerTouched) {
            return;
        }
        // Left
        if (event.buttons == 1 && (this.lastSelectControl || this.lastSelectEntity)) {
            if (this.pointerMoved) {
                if (this.lastSelectControl) {
                    this.lastSelectControl.onDrag();
                } else if (this.lastSelectEntity) {
                    this.lastSelectEntity.onDrag();
                }
            } else {
                this.pointerMoved = true;
                if (this.lastSelectControl) {
                    this.lastSelectControl.onDragStart();
                } else if (this.lastSelectEntity) {
                    this.lastSelectEntity.onDragStart();
                }
            }
            return;
        }
        // Right or Mid
        if (event.buttons == 2 || event.buttons == 4) {
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
}
