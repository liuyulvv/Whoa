import Space from './Space';

export default class SpaceManager {
    private static instance_: SpaceManager;

    private spaces_: Map<string, Space>;

    private constructor() {
        this.spaces_ = new Map<string, Space>();
    }

    public static Get(): SpaceManager {
        if (!SpaceManager.instance_) {
            SpaceManager.instance_ = new SpaceManager();
        }
        return SpaceManager.instance_;
    }

    public Create(points: Array<WhoaMath.Vector3>, layer_height: number): void {
        const space = new Space(points, layer_height);
        this.spaces_.set(space.GetID(), space);
        const ground = space.GetGround();
        const roof = space.GetRoof();
        WhoaFramework.EntityManager.Get().AddEntity(ground.GetID(), ground);
        WhoaFramework.EntityManager.Get().AddEntity(roof.GetID(), roof);
    }

    public Clear(): void {
        this.spaces_.forEach((space: Space) => {
            space.Destroy();
        });
        this.spaces_.clear();
    }
}
