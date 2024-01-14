export default class Entity extends WhoaFramework.Entity {
    protected points_: Array<WhoaMath.Vector3>;

    public constructor(id: string, points?: Array<WhoaMath.Vector3>) {
        super(id);
        this.points_ = new Array<WhoaMath.Vector3>();
        if (points) {
            this.points_ = points;
        }
    }
}
