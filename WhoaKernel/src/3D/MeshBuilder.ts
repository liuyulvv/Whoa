import {
    LinesMesh as BabylonLinesMesh,
    MeshBuilder as BabylonMeshBuilder,
    Vector3 as BabylonVector3
} from '@babylonjs/core';
import { Color4 } from 'src/math/Color';
import { Vector3, Vector4 } from 'src/math/Vector';
import LineMesh from './LineMesh';
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
            instance?: LineMesh;
            colors?: Color4[];
            useVertexAlpha?: boolean;
        }
    ): LineMesh {
        const babylon_option: {
            points: BabylonVector3[];
            updatable?: boolean;
            instance?: BabylonLinesMesh;
            colors?: Color4[];
            useVertexAlpha?: boolean;
        } = { points: [] };
        options.points.forEach((point) => {
            babylon_option.points.push(new BabylonVector3(point.x, point.y, point.z));
        });
        babylon_option.updatable = options.updatable;
        babylon_option.colors = options.colors;
        babylon_option.useVertexAlpha = options.useVertexAlpha;
        if (options.instance) {
            babylon_option.instance = options.instance.GetMesh();
        }
        return new LineMesh(name, BabylonMeshBuilder.CreateLines(name, babylon_option));
    }
}
