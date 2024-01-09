import Entity from 'src/entities/Entity';

export default class FreeMove {
    private static instance_: FreeMove;
    private entity_: Entity | null = null;
    protected start_position_2D_: WhoaMath.Point2;
    protected start_position_3D_: WhoaMath.Point3;

    private constructor() {
        this.start_position_2D_ = new WhoaMath.Point2();
        this.start_position_3D_ = new WhoaMath.Point3();
    }

    public static Get(): FreeMove {
        if (!FreeMove.instance_) {
            FreeMove.instance_ = new FreeMove();
        }
        return FreeMove.instance_;
    }

    public Attach(entity_: Entity): void {
        this.entity_ = entity_;
    }

    public OnDragStart() {
        if (this.entity_) {
            this.start_position_3D_ = WhoaScene.GetGroundPosition();
        }
    }

    public OnDrag() {
        if (this.entity_) {
            const position = WhoaScene.GetGroundPosition();
            const offset = position.Subtract(this.start_position_3D_);
            this.start_position_3D_ = position;
            this.entity_.Translate(offset.x, offset.y, offset.z, true);
        }
    }

    public OnDragEnd() {}
}
