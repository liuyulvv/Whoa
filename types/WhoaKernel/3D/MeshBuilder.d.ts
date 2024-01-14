/// <reference path="./Mesh.d.ts" />
/// <reference path="./LineMesh.d.ts" />
/// <reference path="../math/Vector.d.ts" />
/// <reference path="../math/Color.d.ts" />
/// <reference path="./VertexData.d.ts" />

declare namespace Whoa3D {
    export class MeshBuilder {
        public static CreateBox(
            name: string,
            options?: {
                size?: number;
                width?: number;
                length?: number;
                height?: number;
                faceUV?: WhoaMath.Vector4[];
                faceColors?: WhoaMath.Color4[];
                sideOrientation?: number;
                frontUVs?: WhoaMath.Vector4;
                backUVs?: WhoaMath.Vector4;
                wrap?: boolean;
                topBaseAt?: number;
                bottomBaseAt?: number;
                updatable?: boolean;
            }
        ): Mesh;

        public static CreateLines(
            name: string,
            options: {
                points: WhoaMath.Vector3[];
                updatable?: boolean;
                instance?: Mesh;
                colors?: WhoaMath.Color4[];
                useVertexAlpha?: boolean;
            }
        ): LineMesh;

        public static CreatePlane(
            name: string,
            options: {
                size?: number;
                width?: number;
                length?: number;
                sideOrientation?: SideOrientation;
                frontUVs?: WhoaMath.Vector4;
                backUVs?: WhoaMath.Vector4;
                updatable?: boolean;
            }
        ): Mesh;

        public static CreatePolygon(
            name: string,
            options: {
                shape: Vector3[];
                holes?: Vector3[][];
                depth?: number;
                smoothingThreshold?: number;
                faceUV?: Vector4[];
                faceColors?: Color4[];
                updatable?: boolean;
                sideOrientation?: number;
                frontUVs?: Vector4;
                backUVs?: Vector4;
                wrap?: boolean;
            }
        ): Mesh;
    }
}
