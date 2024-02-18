import Entity from './Entity';
import EntityModel, { EntityModelCreateInfo } from './EntityModel';

export abstract class EntityControl extends EntityModel {
    protected entity_: Entity | null = null;
    protected sub_id_: string;
    protected start_position_2D_: WhoaMath.Point2;

    public constructor(entity_id: string, info: EntityModelCreateInfo) {
        super(entity_id, info);
        this.sub_id_ = '';
        this.start_position_2D_ = new WhoaMath.Point2();
    }

    public OnEnter(): void {
        this.ShowOverlay();
    }

    public OnLeave(): void {
        this.HideOverlay();
    }

    public Attach(entity: Entity) {
        this.entity_ = entity;
        const center = this.entity_.GetBoundingBox().center_;
        this.Translate(center.x, center.y, center.z, false);
        this.Show();
    }

    public Detach() {
        WhoaEvent.UnSub('CHANGE_TO_2D_CAMERA', this.sub_id_);
        WhoaEvent.UnSub('CHANGE_TO_3D_CAMERA', this.sub_id_);
        this.Hide();
    }
}

export class EntityControlRotate2D extends EntityControl {
    private static instance_: EntityControlRotate2D;

    private constructor() {
        const entity_id = 'ControlRotate2D';
        const info = new EntityModelCreateInfo();
        info.role_ = WhoaFramework.EntityRole.ROOT;
        info.type_ = WhoaFramework.EntityType.CONTROL;
        info.hovered_ = false;
        info.selected_ = false;
        info.visible_ = false;
        info.pickable_ = true;
        info.movable_ = true;
        info.model_url_ = 'assets/models/';
        info.model_name_ = 'arrow_2D.glb';
        info.scale_ = [1000000, 1000000, 1000000];
        super(entity_id, info);
    }

    public static Get(): EntityControlRotate2D {
        if (!EntityControlRotate2D.instance_) {
            EntityControlRotate2D.instance_ = new EntityControlRotate2D();
        }
        return EntityControlRotate2D.instance_;
    }

    public Attach(entity: Entity) {
        super.Attach(entity);
        this.sub_id_ = WhoaEvent.Sub('CHANGE_TO_3D_CAMERA', () => {
            EntityControlRotate3D.Get().Attach(entity);
            EntityControlMove3D.Get().Attach(entity);
            this.Detach();
        });
    }

    public OnDragStart(): void {
        this.start_position_2D_ = WhoaScene.GetScreenPosition();
    }

    public OnDrag(): void {
        if (this.entity_) {
            const position = WhoaScene.GetScreenPosition();
            const origin = WhoaScene.WorldToScreen(this.entity_.GetPosition());
            const start = WhoaMath.Vector2.FromPoint2(<WhoaMath.Point2>this.start_position_2D_.Subtract(origin));
            const now = WhoaMath.Vector2.FromPoint2(<WhoaMath.Point2>position.Subtract(origin));
            this.start_position_2D_ = position;
            const direction = start.x * now.y - start.y * now.x > 0 ? -1 : 1;
            const radian = start.GetRadianBetween(now) * direction;
            this.entity_.RotateLocalY(radian);
            this.RotateLocalY(radian);
        }
    }

    public OnDragEnd(): void {}

    public RotateLocalY(radian: number): void {
        if (this.entity_) {
            const position = this.entity_.GetPosition();
            this.mesh_.RotateAround(
                new WhoaMath.Vector3(position.x, position.y, position.z),
                new WhoaMath.Vector3(0, 0, 1),
                radian
            );
        }
    }
}

export abstract class EntityControl3D extends EntityControl {
    public UpdateDirection(): void {}
}

export class EntityControlRotate3D extends EntityControl3D {
    private static instance_: EntityControlRotate3D;

    private constructor() {
        const entity_id = 'ControlRotate3D';
        const info = new EntityModelCreateInfo();
        info.role_ = WhoaFramework.EntityRole.ROOT;
        info.type_ = WhoaFramework.EntityType.CONTROL;
        info.hovered_ = false;
        info.selected_ = false;
        info.visible_ = false;
        info.pickable_ = true;
        info.movable_ = true;
        info.model_url_ = 'assets/models/';
        info.model_name_ = 'arrow_3D.glb';
        info.scale_ = [1000000, 1000000, 1000000];
        super(entity_id, info);
    }

    public static Get(): EntityControlRotate3D {
        if (!EntityControlRotate3D.instance_) {
            EntityControlRotate3D.instance_ = new EntityControlRotate3D();
        }
        return EntityControlRotate3D.instance_;
    }

    public Attach(entity: Entity) {
        super.Attach(entity);
        this.sub_id_ = WhoaEvent.Sub('CHANGE_TO_2D_CAMERA', () => {
            EntityControlRotate2D.Get().Attach(entity);
            this.Detach();
        });
    }
}

export class EntityControlMove3D extends EntityControl3D {
    private static instance_: EntityControlMove3D;

    private constructor() {
        const entity_id = 'ControlMove3D';
        const info = new EntityModelCreateInfo();
        info.role_ = WhoaFramework.EntityRole.ROOT;
        info.type_ = WhoaFramework.EntityType.CONTROL;
        info.hovered_ = false;
        info.selected_ = false;
        info.visible_ = false;
        info.pickable_ = true;
        info.movable_ = true;
        info.model_url_ = 'assets/models/';
        info.model_name_ = 'arrow_move.glb';
        info.scale_ = [1000000, 1000000, 1000000];
        super(entity_id, info);
    }

    public static Get(): EntityControlMove3D {
        if (!EntityControlMove3D.instance_) {
            EntityControlMove3D.instance_ = new EntityControlMove3D();
        }
        return EntityControlMove3D.instance_;
    }

    public Attach(entity: Entity) {
        super.Attach(entity);
        this.sub_id_ = WhoaEvent.Sub('CHANGE_TO_2D_CAMERA', () => {
            this.Detach();
        });
    }
}
