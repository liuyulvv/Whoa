import Ground from 'src/entities/Ground';
import Roof from 'src/entities/Roof';
import { v4 as uuid } from 'uuid';

export default class Space {
    private id_: string;
    private points_: Array<WhoaMath.Vector3>;
    private layer_height: number;
    private ground_: Ground;
    private roof_: Roof;

    public constructor(points: Array<WhoaMath.Vector3>, layer_height: number) {
        this.id_ = uuid();
        this.points_ = points;
        this.layer_height = layer_height;
        this.ground_ = new Ground(uuid(), points);
        this.roof_ = new Roof(uuid(), points, this.layer_height);
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
