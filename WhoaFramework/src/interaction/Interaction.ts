import Entity from 'src/entities/Entity';
import EntityManager from 'src/entities/EntityManager';
import { EntityModelCreateInfo } from 'src/entities/EntityModel';
import { Point2 } from 'src/math/Point';
import CreateWallByLine from 'src/wall/CreateWallByLine';

export default class Interaction {
    private static instance_: Interaction;
    private canvas_: HTMLCanvasElement;
    private position_: Point2;

    private pointer_touched_: boolean;
    private pointer_moved_: boolean;

    private last_hover_: Entity | undefined;
    private last_select_: Entity | undefined;
    private last_control_: Entity | undefined;

    private creating_: boolean;
    private bind_pointer_down_: (event: PointerEvent) => void;
    private bind_pointer_move_: (event: PointerEvent) => void;
    private bind_pointer_up_: (event: PointerEvent) => void;

    private constructor() {
        this.canvas_ = WhoaCanvas;
        this.position_ = new Point2();
        this.pointer_touched_ = false;
        this.pointer_moved_ = false;
        this.last_hover_ = undefined;
        this.last_select_ = undefined;
        this.last_control_ = undefined;
        this.creating_ = false;
        this.bind_pointer_down_ = this.OnPointerDown.bind(this);
        this.bind_pointer_move_ = this.OnPointerMove.bind(this);
        this.bind_pointer_up_ = this.OnPointerUp.bind(this);
        this.registerEvent();
    }

    public static Get(): Interaction {
        if (!Interaction.instance_) {
            Interaction.instance_ = new Interaction();
        }
        return Interaction.instance_;
    }

    private StartCreate(): void {
        this.creating_ = true;
        this.UnregisterPointerEvent();
    }

    private StopCreate(): void {
        this.creating_ = false;
        this.RegisterPointerEvent();
        WhoaEvent.Pub('STOP_CREATE');
    }

    private RegisterPointerEvent() {
        this.canvas_.addEventListener('pointerdown', this.bind_pointer_down_);
        this.canvas_.addEventListener('pointermove', this.bind_pointer_move_);
        this.canvas_.addEventListener('pointerup', this.bind_pointer_up_);
    }

    private UnregisterPointerEvent() {
        this.canvas_.removeEventListener('pointerdown', this.bind_pointer_down_);
        this.canvas_.removeEventListener('pointermove', this.bind_pointer_move_);
        this.canvas_.removeEventListener('pointerup', this.bind_pointer_up_);
    }

    private registerEvent() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.OnKeyDown(event);
        });

        this.RegisterPointerEvent();

        WhoaEvent.Sub('START_DRAW_LINE', () => {
            this.StartCreate();
            CreateWallByLine.Get().OnCreateStart();
        });

        WhoaEvent.Sub('STOP_DRAW_LINE', () => {
            this.StopCreate();
            CreateWallByLine.Get().OnCreateEnd();
        });

        WhoaEvent.Sub('START_DRAW_BORDER', () => {
            this.StartCreate();
            const create_info = new EntityModelCreateInfo();
            create_info.role_ = Whoa.WhoaFramework.EntityRole.ROOT;
            create_info.type_ = Whoa.WhoaFramework.EntityType.ORNAMENT;
            create_info.hovered_ = false;
            create_info.selected_ = false;
            create_info.visible_ = true;
            create_info.pickable_ = true;
            create_info.movable_ = true;
            create_info.model_url_ = 'assets/models/';
            create_info.model_name_ = 'deer.glb';
            create_info.scale_ = [30000, 30000, 30000];
            create_info.rotation_ = [Math.PI / 2, 0, 0];
            EntityManager.Get().CreateOrnament(create_info);
        });

        WhoaEvent.Sub('STOP_DRAW_BORDER', () => {
            this.StopCreate();
        });
    }

    public SetPointerTouch(touch: boolean): void {
        this.pointer_touched_ = touch;
    }

    private OnPointerDown(event: PointerEvent) {
        this.position_.x = event.offsetX;
        this.position_.y = event.offsetY;
        const pick_info = WhoaScene.PickEntity();
        if (pick_info.hit_) {
            const entity = EntityManager.Get().GetEntityByID(pick_info.mesh_id_);
            if (entity && entity.GetType() == Whoa.WhoaFramework.EntityType.CONTROL) {
                this.last_control_ = entity;
            }
        }
    }

    private OnPointerMove(event: PointerEvent) {
        if (this.pointer_touched_) {
            return;
        }
        // Left
        if (event.buttons == 1 && (this.last_control_ || this.last_select_)) {
            if (this.pointer_moved_) {
                if (this.last_control_) {
                    this.last_control_.OnDrag();
                } else if (this.last_select_) {
                    this.last_select_.OnDrag();
                }
            } else {
                this.pointer_moved_ = true;
                if (this.last_control_) {
                    this.last_control_.OnDragStart();
                } else if (this.last_select_) {
                    this.last_select_.OnDragStart();
                }
            }
            return;
        }
        // Right or Mid
        if (event.buttons == 2 || event.buttons == 4) {
            return;
        }
        this.position_.x = event.offsetX;
        this.position_.y = event.offsetY;
        const pick_info = WhoaScene.PickEntity();
        if (pick_info.hit_) {
            const entity = EntityManager.Get().GetEntityByID(pick_info.mesh_id_);
            if (this.last_hover_ != entity) {
                this.last_hover_?.OnLeave();
                this.last_hover_ = entity;
                this.last_hover_?.OnEnter();
            }
        } else {
            this.last_hover_?.OnLeave();
            this.last_hover_ = undefined;
        }
    }

    private OnPointerUp(event: PointerEvent) {
        this.position_.x = event.offsetX;
        this.position_.y = event.offsetY;
        if (this.pointer_moved_) {
            this.pointer_touched_ = false;
            this.pointer_moved_ = false;
            if (this.last_control_) {
                this.last_control_.OnDragEnd();
                this.last_control_ = undefined;
            } else if (this.last_select_) {
                this.last_select_.OnDragEnd();
            }
            return;
        }
        if (!this.pointer_touched_) {
            if (event.button == 0) {
                const pick_info = WhoaScene.PickEntity();
                if (pick_info.hit_) {
                    const entity = EntityManager.Get().GetEntityByID(pick_info.mesh_id_);
                    if (entity && entity.GetType() == Whoa.WhoaFramework.EntityType.CONTROL) {
                        this.last_control_ = entity;
                    } else {
                        this.last_control_ = undefined;
                        if (entity && entity.GetType() != Whoa.WhoaFramework.EntityType.CONTROL) {
                            if (this.last_select_ != entity) {
                                this.last_select_?.OnSelect(false);
                                this.last_select_ = entity;
                                this.last_select_?.OnSelect(true);
                            }
                        }
                    }
                } else {
                    this.last_select_?.OnSelect(false);
                    this.last_select_ = undefined;
                    this.last_control_ = undefined;
                }
            } else if (event.button == 2) {
                if (this.creating_) {
                    this.StopCreate();
                }
            }
        }
        this.pointer_touched_ = false;
        this.pointer_moved_ = false;
    }

    private OnKeyDown(event: KeyboardEvent) {
        if (this.OnlyKey(event)) {
            if (event.key == '2') {
                WhoaEvent.Pub('CHANGE_TO_2D_CAMERA');
            } else if (event.key == '3') {
                WhoaEvent.Pub('CHANGE_TO_3D_CAMERA');
            }
        }
    }

    private OnlyCtrl(event: KeyboardEvent): boolean {
        return (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey;
    }

    private OnlyShift(event: KeyboardEvent): boolean {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.shiftKey;
    }

    private OnlyKey(event: KeyboardEvent): boolean {
        return !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey;
    }
}
