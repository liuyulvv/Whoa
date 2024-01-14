import Ground from 'src/entities/Ground';
import { v4 as uuid } from 'uuid';

export default class Space {
    private id_: string;
    private points_: Array<WhoaMath.Vector3>;
    private ground_: Ground;

    public constructor(points: Array<WhoaMath.Vector3>) {
        this.id_ = uuid();
        this.points_ = points;
        this.ground_ = new Ground(uuid(), points);
    }

    public GetID(): string {
        return this.id_;
    }

    public SetID(id: string): void {
        this.id_ = id;
    }

    public GetPoints(): Array<WhoaMath.Vector3> {
        return this.points_;
    }

    public GetGround(): Ground {
        return this.ground_;
    }

    public Destroy(): void {
        this.ground_.Destroy();
    }
}
