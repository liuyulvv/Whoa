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
        }
    }

    public Bottom() {
        return [this.bottom_far_left_, this.bottom_far_right_, this.bottom_near_left_, this.bottom_near_right_];
    }

    public Top() {
        return [this.top_near_left_, this.top_far_left_, this.top_near_left_, this.top_near_right_];
    }
}
