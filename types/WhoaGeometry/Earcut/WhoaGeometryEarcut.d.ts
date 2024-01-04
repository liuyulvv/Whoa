/// <reference path="../../WhoaFramework/math/Vector.d.ts" />

declare namespace WhoaGeometry {
    export class EarcutResult {
        public vertices: Array<number>;
        public indices: Array<number>;
    }

    export class Earcut {
        public static triangulate2D(boundary: Array<WhoaMath.Vector3>): EarcutResult;
    }
}
