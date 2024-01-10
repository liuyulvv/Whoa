declare namespace Whoa3D {
    export class MeshBuilder {
        public static CreateBox(
            name: string,
            options?: {
                size?: number;
                width?: number;
                height?: number;
                depth?: number;
                faceUV?: Vector4[];
                faceColors?: Color4[];
                sideOrientation?: number;
                frontUVs?: Vector4;
                backUVs?: Vector4;
                wrap?: boolean;
                topBaseAt?: number;
                bottomBaseAt?: number;
                updatable?: boolean;
            }
        ): Mesh;

        public static CreateLines(
            name: string,
            options: {
                points: Vector3[];
                updatable?: boolean;
                instance?: Nullable<LinesMesh>;
                colors?: Color4[];
                useVertexAlpha?: boolean;
                material?: Material;
            },
            scene?: Nullable<Scene>
        ): LinesMesh;
    }
}
