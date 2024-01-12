/// <reference path="../../WhoaKernel/math/Vector.d.ts" />

declare namespace WhoaGeometry {
    export class EarcutResult {
        public vertices_: Array<number>;
        public indices_: Array<number>;
    }

    export class Earcut {
        public static Triangulate2D(boundary: Array<WhoaMath.Vector3>): EarcutResult;
    }
}
