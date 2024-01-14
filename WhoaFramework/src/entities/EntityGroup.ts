import Entity from './Entity';

export default class EntityGroup extends Entity {
    protected children_: Array<Entity>;

    public constructor(id: string) {
        super(id);
        this.children_ = new Array<Entity>();
        this.ComputeWorldMatrix(true);
        this.UpdateBoundingBox();
    }

    public AddChild(child: Entity): void {
        this.children_.push(child);
        child.SetParent(this);
    }

    public ComputeWorldMatrix(force?: boolean): void {
        this.mesh_.ComputeWorldMatrix(force);
        if (this.children_) {
            this.children_.forEach((child) => {
                child.ComputeWorldMatrix(force);
            });
        }
    }

    public UpdateBoundingBox(): void {
        if (this.children_) {
            if (this.children_.length > 0) {
                this.children_[0].UpdateBoundingBox();
                this.bounding_box_ = this.children_[0].GetBoundingBox().Clone();
                this.children_.forEach((child) => {
                    child.UpdateBoundingBox();
                    this.bounding_box_ = Whoa3D.BoundingBox.Merge(this.bounding_box_, child.GetBoundingBox());
                });
            }
        }
    }

    public Destroy(): void {
        this.children_.forEach((child) => {
            child.Destroy();
        });
        super.Destroy();
    }
}
