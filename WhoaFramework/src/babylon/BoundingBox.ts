import { BoundingInfo } from '@babylonjs/core';
import { Vector3 } from 'src/math/Vector';

export default class BoundingBox {
    public bottomFarLeft: Vector3 = new Vector3(0, 0, 0);
    public topNearRight: Vector3 = new Vector3(0, 0, 0);
    public bottomFarRight: Vector3 = new Vector3(0, 0, 0);
    public bottomNearLeft: Vector3 = new Vector3(0, 0, 0);
    public topFarLeft: Vector3 = new Vector3(0, 0, 0);
    public bottomNearRight: Vector3 = new Vector3(0, 0, 0);
    public topNearLeft: Vector3 = new Vector3(0, 0, 0);
    public topFarRight: Vector3 = new Vector3(0, 0, 0);
    public center: Vector3 = new Vector3(0, 0, 0);

    public constructor(boundingInfo?: BoundingInfo) {
        if (boundingInfo) {
            const box = boundingInfo.boundingBox.vectorsWorld;
            this.bottomFarLeft = Vector3.FromBabylonVector3(box[0]);
            this.topNearRight = Vector3.FromBabylonVector3(box[1]);
            this.bottomFarRight = Vector3.FromBabylonVector3(box[2]);
            this.bottomNearLeft = Vector3.FromBabylonVector3(box[3]);
            this.topFarLeft = Vector3.FromBabylonVector3(box[4]);
            this.bottomNearRight = Vector3.FromBabylonVector3(box[5]);
            this.topNearLeft = Vector3.FromBabylonVector3(box[6]);
            this.topFarRight = Vector3.FromBabylonVector3(box[7]);
            this.center = Vector3.FromBabylonVector3(boundingInfo.boundingBox.centerWorld);
        }
    }

    public bottom() {
        return [this.bottomFarLeft, this.bottomFarRight, this.bottomNearLeft, this.bottomNearRight];
    }

    public top() {
        return [this.topNearLeft, this.topFarLeft, this.topNearLeft, this.topNearRight];
    }
}
