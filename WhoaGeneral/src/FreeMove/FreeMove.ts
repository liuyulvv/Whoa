export default class FreeMove {
    private static instance: FreeMove;
    private entity: Whoa.WhoaFramework.Entity | null = null;
    protected startPosition2D: Whoa.WhoaGeometry.Point2D;
    protected startPosition3D: Whoa.WhoaGeometry.Point3D;

    private constructor() {
        this.startPosition2D = new Whoa.WhoaGeometry.Point2D();
        this.startPosition3D = new Whoa.WhoaGeometry.Point3D();
    }

    public static get(): FreeMove {
        if (!FreeMove.instance) {
            FreeMove.instance = new FreeMove();
        }
        return FreeMove.instance;
    }

    public attach(entity: Whoa.WhoaFramework.Entity): void {
        this.entity = entity;
    }

    public onDragStart() {
        if (this.entity) {
            this.startPosition3D = WhoaScene.getGroundPosition();
        }
    }

    public onDrag() {
        if (this.entity) {
            const position = WhoaScene.getGroundPosition();
            const offset = position.subtract(this.startPosition3D);
            this.startPosition3D = position;
            this.entity.translate(offset.x, offset.y, offset.z, true);
        }
    }

    public onDragEnd() {}
}