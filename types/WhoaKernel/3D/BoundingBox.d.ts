/// <reference path="../math/Vector.d.ts" />

declare namespace Whoa3D {
    export class BoundingBox {
        public bottom_far_left_: WhoaMath.Vector3;
        public top_near_right_: WhoaMath.Vector3;
        public bottom_far_right_: WhoaMath.Vector3;
        public bottom_near_left_: WhoaMath.Vector3;
        public top_far_left_: WhoaMath.Vector3;
        public bottom_near_right_: WhoaMath.Vector3;
        public top_near_left_: WhoaMath.Vector3;
        public top_far_right_: WhoaMath.Vector3;
        public center_: WhoaMath.Vector3;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public constructor(info?: any);

        public Bottom(): Array<WhoaMath.Vector3>;

        public Top(): Array<WhoaMath.Vector3>;
    }
}
