import { MeshBuilder as BabylonMeshBuilder } from '@babylonjs/core';
import { Color4 } from 'src/math/Color';
import { Vector3, Vector4 } from 'src/math/Vector';
import LinesMesh from './LineMesh';
import Mesh from './Mesh';

export default class MeshBuilder {
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
    ): Mesh {
        return new Mesh(name, BabylonMeshBuilder.CreateBox(name, options));
    }

    public static CreateLines(
        name: string,
        options: {
            points: Vector3[];
            updatable?: boolean;
            colors?: Color4[];
            useVertexAlpha?: boolean;
        }
    ): LinesMesh {
        return new LinesMesh(name, BabylonMeshBuilder.CreateLines(name, options));
    }
}
