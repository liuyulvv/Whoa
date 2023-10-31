import { BoundingInfo, Vector3 } from '@babylonjs/core';

export default class BoundingBox {
    public bottomFarLeft: Vector3;
    public topNearRight: Vector3;
    public bottomFarRight: Vector3;
    public bottomNearLeft: Vector3;
    public topFarLeft: Vector3;
    public bottomNearRight: Vector3;
    public topNearLeft: Vector3;
    public topFarRight: Vector3;

    public constructor(boundingInfo: BoundingInfo) {
        const box = boundingInfo.boundingBox.vectorsWorld;
        this.bottomFarLeft = box[0];
        this.topNearRight = box[1];
        this.bottomFarRight = box[2];
        this.bottomNearLeft = box[3];
        this.topFarLeft = box[4];
        this.bottomNearRight = box[5];
        this.topNearLeft = box[6];
        this.topFarRight = box[7];
    }

    public bottom() {
        return [this.bottomFarLeft, this.bottomFarRight, this.bottomNearLeft, this.bottomNearRight];
    }

    public top() {
        return [this.topNearLeft, this.topFarLeft, this.topNearLeft, this.topNearRight];
    }
}
