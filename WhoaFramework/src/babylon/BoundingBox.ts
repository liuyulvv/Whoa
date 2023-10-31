import { BoundingInfo, Vector3 } from '@babylonjs/core';

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
            this.bottomFarLeft = box[0];
            this.topNearRight = box[1];
            this.bottomFarRight = box[2];
            this.bottomNearLeft = box[3];
            this.topFarLeft = box[4];
            this.bottomNearRight = box[5];
            this.topNearLeft = box[6];
            this.topFarRight = box[7];
            this.center = boundingInfo.boundingBox.centerWorld;
        }
    }

    public bottom() {
        return [this.bottomFarLeft, this.bottomFarRight, this.bottomNearLeft, this.bottomNearRight];
    }

    public top() {
        return [this.topNearLeft, this.topFarLeft, this.topNearLeft, this.topNearRight];
    }
}
