import { BoundingInfo } from '@babylonjs/core';
import { Vector3 } from 'src/math/Vector';

export default class BoundingBox {
    public bottom_far_left_: Vector3 = new Vector3(0, 0, 0);
    public top_near_right_: Vector3 = new Vector3(0, 0, 0);
    public bottom_far_right_: Vector3 = new Vector3(0, 0, 0);
    public bottom_near_left_: Vector3 = new Vector3(0, 0, 0);
    public top_far_left_: Vector3 = new Vector3(0, 0, 0);
    public bottom_near_right_: Vector3 = new Vector3(0, 0, 0);
    public top_near_left_: Vector3 = new Vector3(0, 0, 0);
    public top_far_right_: Vector3 = new Vector3(0, 0, 0);
    public center_: Vector3 = new Vector3(0, 0, 0);
    public min_: Vector3 = new Vector3(0, 0, 0);
    public max_: Vector3 = new Vector3(0, 0, 0);

    public constructor(boundingInfo?: BoundingInfo) {
        if (boundingInfo) {
            const box = boundingInfo.boundingBox.vectorsWorld;
            this.bottom_far_left_ = Vector3.FromBabylonVector3(box[0]);
            this.top_near_right_ = Vector3.FromBabylonVector3(box[1]);
            this.bottom_far_right_ = Vector3.FromBabylonVector3(box[2]);
            this.bottom_near_left_ = Vector3.FromBabylonVector3(box[3]);
            this.top_far_left_ = Vector3.FromBabylonVector3(box[4]);
            this.bottom_near_right_ = Vector3.FromBabylonVector3(box[5]);
            this.top_near_left_ = Vector3.FromBabylonVector3(box[6]);
            this.top_far_right_ = Vector3.FromBabylonVector3(box[7]);
            this.center_ = Vector3.FromBabylonVector3(boundingInfo.boundingBox.centerWorld);
            this.min_ = Vector3.FromBabylonVector3(boundingInfo.boundingBox.minimumWorld);
            this.max_ = Vector3.FromBabylonVector3(boundingInfo.boundingBox.maximumWorld);
        }
    }

    public Bottom(): Array<Vector3> {
        return [this.bottom_far_left_, this.bottom_far_right_, this.bottom_near_left_, this.bottom_near_right_];
    }

    public Top(): Array<Vector3> {
        return [this.top_near_left_, this.top_far_left_, this.top_near_left_, this.top_near_right_];
    }

    public Clone(): BoundingBox {
        const box = new BoundingBox();
        box.bottom_far_left_ = this.bottom_far_left_.Clone();
        box.top_near_right_ = this.top_near_right_.Clone();
        box.bottom_far_right_ = this.bottom_far_right_.Clone();
        box.bottom_near_left_ = this.bottom_near_left_.Clone();
        box.top_far_left_ = this.top_far_left_.Clone();
        box.bottom_near_right_ = this.bottom_near_right_.Clone();
        box.top_near_left_ = this.top_near_left_.Clone();
        box.top_far_right_ = this.top_far_right_.Clone();
        box.center_ = this.center_.Clone();
        box.min_ = this.min_.Clone();
        box.max_ = this.max_.Clone();
        return box;
    }

    public static Merge(bound_box_1: BoundingBox, bound_box_2: BoundingBox): BoundingBox {
        const min = Vector3.Min(bound_box_1.min_, bound_box_2.min_);
        const max = Vector3.Max(bound_box_1.max_, bound_box_2.max_);
        const info = new BoundingInfo(min, max);
        return new BoundingBox(info);
    }
}
