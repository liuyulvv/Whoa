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
    private createType: string;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.position = new Whoa.WhoaGeometry.Point2D();
        this.pointerTouched = false;
        this.pointerMoved = false;
        this.lastHover = undefined;
        this.lastSelect = undefined;
        this.lastControl = undefined;
        this.creating = false;
        this.createType = '';
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
    }

    private stopCreate(): void {
        this.creating = false;
        this.createType = '';
        WhoaEvent.pub('STOP_CREATE');
    }

    private registerEvent() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.onKeyDown(event);
        });

        this.canvas.addEventListener('pointerdown', (event: PointerEvent) => {
            this.onPointerDown(event);
        });
        this.canvas.addEventListener('pointermove', (event: PointerEvent) => {
            this.onPointerMove(event);
        });
        this.canvas.addEventListener('pointerup', (event: PointerEvent) => {
            this.onPointerUp(event);
        });

        WhoaEvent.sub('START_DRAW_LINE', () => {
            this.startCreate();
            this.createType = 'LINE';
        });

        WhoaEvent.sub('STOP_DRAW_LINE', () => {
            this.stopCreate();
        });

        WhoaEvent.sub('START_DRAW_BORDER', () => {
            this.startCreate();
            this.createType = 'BORDER';
            const createInfo: Whoa.WhoaFramework.EntityCreateInfo = {
                role: Whoa.WhoaFramework.EntityRole.ROOT,
                type: Whoa.WhoaFramework.EntityType.ORNAMENT,
                hovered: false,
                selected: false,
                visible: true,
                pickable: true,
                movable: true,
                width: 30,
                height: 30,
                depth: 30,
                meshURL: 'assets/models/',
                meshName: 'deer.glb',
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
            } else if (this.lastSelect) {
                this.lastSelect.onDragEnd();
            }
            return;
        }
        if (!this.pointerTouched) {
            if (event.button == 0) {
                if (this.creating) {
                    if (this.createType == 'LINE') {
                    }
                } else {
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
                WhoaScene.changeTo2D();
            } else if (event.key == '3') {
                WhoaScene.changeTo3D();
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
