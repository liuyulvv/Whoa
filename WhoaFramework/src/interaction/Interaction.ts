import CreateWallByLine from 'src/wall/CreateWallByLine';

export default class Interaction {
    private static instance: Interaction;
    private canvas: HTMLCanvasElement;
    private position: Whoa.WhoaGeometry.Point2D;

    private pointerTouched: boolean;
    private pointerMoved: boolean;

    private lastHover: Whoa.WhoaFramework.Entity | undefined;
    private lastSelect: Whoa.WhoaFramework.Entity | undefined;
    private lastControl: Whoa.WhoaFramework.Entity | undefined;

    private creating: boolean;
    private bindPointerDown: (event: PointerEvent) => void;
    private bindPointerMove: (event: PointerEvent) => void;
    private bindPointerUp: (event: PointerEvent) => void;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.position = new Whoa.WhoaGeometry.Point2D();
        this.pointerTouched = false;
        this.pointerMoved = false;
        this.lastHover = undefined;
        this.lastSelect = undefined;
        this.lastControl = undefined;
        this.creating = false;
        this.bindPointerDown = this.onPointerDown.bind(this);
        this.bindPointerMove = this.onPointerMove.bind(this);
        this.bindPointerUp = this.onPointerUp.bind(this);
        this.registerEvent();
    }

    public static get(): Interaction {
        if (!Interaction.instance) {
            Interaction.instance = new Interaction();
        }
        return Interaction.instance;
    }

    private startCreate(): void {
        this.creating = true;
        this.unregisterPointerEvent();
    }

    private stopCreate(): void {
        this.creating = false;
        this.registerPointerEvent();
        WhoaEvent.pub('STOP_CREATE');
    }

    private registerPointerEvent() {
        this.canvas.addEventListener('pointerdown', this.bindPointerDown);
        this.canvas.addEventListener('pointermove', this.bindPointerMove);
        this.canvas.addEventListener('pointerup', this.bindPointerUp);
    }

    private unregisterPointerEvent() {
        this.canvas.removeEventListener('pointerdown', this.bindPointerDown);
        this.canvas.removeEventListener('pointermove', this.bindPointerMove);
        this.canvas.removeEventListener('pointerup', this.bindPointerUp);
    }

    private registerEvent() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.onKeyDown(event);
        });

        this.registerPointerEvent();

        WhoaEvent.sub('START_DRAW_LINE', () => {
            WhoaScene.disableCameraInput();
            this.startCreate();
            CreateWallByLine.get().onCreateStart();
        });

        WhoaEvent.sub('STOP_DRAW_LINE', () => {
            WhoaScene.enableCameraInput();
            this.stopCreate();
            CreateWallByLine.get().onCreateEnd();
        });

        WhoaEvent.sub('START_DRAW_BORDER', () => {
            this.startCreate();
            const createInfo: Whoa.WhoaFramework.EntityModelCreateInfo = {
                role: Whoa.WhoaFramework.EntityRole.ROOT,
                type: Whoa.WhoaFramework.EntityType.ORNAMENT,
                hovered: false,
                selected: false,
                visible: true,
                pickable: true,
                movable: true,
                modelURL: 'assets/models/',
                modelName: 'deer.glb',
                scale: [30000, 30000, 30000],
                rotation: [Math.PI / 2, 0, 0]
            };
            Whoa.WhoaFramework.EntityManager.get().createOrnament(createInfo);
        });

        WhoaEvent.sub('STOP_DRAW_BORDER', () => {
            this.stopCreate();
        });
    }

    public setPointerTouch(touch: boolean): void {
        this.pointerTouched = touch;
    }

    private onPointerDown(event: PointerEvent) {
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        const pickInfo = WhoaScene.pickEntity();
        if (pickInfo.hit) {
            const entity = Whoa.WhoaFramework.EntityManager.get().getEntityByID(pickInfo.meshID);
            if (entity && entity.type == Whoa.WhoaFramework.EntityType.CONTROL) {
                this.lastControl = entity;
            }
        }
    }

    private onPointerMove(event: PointerEvent) {
        if (this.pointerTouched) {
            return;
        }
        // Left
        if (event.buttons == 1 && (this.lastControl || this.lastSelect)) {
            if (this.pointerMoved) {
                if (this.lastControl) {
                    this.lastControl.onDrag();
                } else if (this.lastSelect) {
                    this.lastSelect.onDrag();
                }
            } else {
                this.pointerMoved = true;
                if (this.lastControl) {
                    this.lastControl.onDragStart();
                } else if (this.lastSelect) {
                    this.lastSelect.onDragStart();
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
            if (this.lastHover != entity) {
                this.lastHover?.onLeave();
                this.lastHover = entity;
                this.lastHover?.onEnter();
            }
        } else {
            this.lastHover?.onLeave();
            this.lastHover = undefined;
        }
    }

    private onPointerUp(event: PointerEvent) {
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        if (this.pointerMoved) {
            this.pointerTouched = false;
            this.pointerMoved = false;
            if (this.lastControl) {
                this.lastControl.onDragEnd();
                this.lastControl = undefined;
            } else if (this.lastSelect) {
                this.lastSelect.onDragEnd();
            }
            return;
        }
        if (!this.pointerTouched) {
            if (event.button == 0) {
                const pickInfo = WhoaScene.pickEntity();
                if (pickInfo.hit) {
                    const entity = Whoa.WhoaFramework.EntityManager.get().getEntityByID(pickInfo.meshID);
                    if (entity && entity.type == Whoa.WhoaFramework.EntityType.CONTROL) {
                        this.lastControl = entity;
                    } else {
                        this.lastControl = undefined;
                        if (entity?.type != Whoa.WhoaFramework.EntityType.CONTROL) {
                            if (this.lastSelect != entity) {
                                this.lastSelect?.onSelect(false);
                                this.lastSelect = entity;
                                this.lastSelect?.onSelect(true);
                            }
                        }
                    }
                } else {
                    this.lastSelect?.onSelect(false);
                    this.lastSelect = undefined;
                    this.lastControl = undefined;
                }
            } else if (event.button == 2) {
                if (this.creating) {
                    this.stopCreate();
                }
            }
        }
        this.pointerTouched = false;
        this.pointerMoved = false;
    }

    private onKeyDown(event: KeyboardEvent) {
        if (this.onlyKey(event)) {
            if (event.key == '2') {
                WhoaEvent.pub('CHANGE_TO_2D_CAMERA');
            } else if (event.key == '3') {
                WhoaEvent.pub('CHANGE_TO_3D_CAMERA');
            }
        }
    }

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
