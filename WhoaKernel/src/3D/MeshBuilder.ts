import {
    LinesMesh as BabylonLinesMesh,
    MeshBuilder as BabylonMeshBuilder,
    Vector3 as BabylonVector3
} from '@babylonjs/core';
import { Color4 } from 'src/math/Color';
import { Vector3, Vector4 } from 'src/math/Vector';
import LineMesh from './LineMesh';
import Mesh from './Mesh';
import { SideOrientation } from './VertexData';

export default class MeshBuilder {
    public static CreateBox(
        name: string,
        options?: {
            size?: number;
            width?: number;
            length?: number;
            height?: number;
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
        const babylon_option: {
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
        } = {};
        babylon_option.size = options?.size;
        babylon_option.width = options?.width;
        babylon_option.depth = options?.height;
        babylon_option.height = options?.length;
        babylon_option.faceUV = options?.faceUV;
        babylon_option.faceColors = options?.faceColors;
        babylon_option.sideOrientation = options?.sideOrientation;
        babylon_option.frontUVs = options?.frontUVs;
        babylon_option.backUVs = options?.backUVs;
        babylon_option.wrap = options?.wrap;
        babylon_option.topBaseAt = options?.topBaseAt;
        babylon_option.bottomBaseAt = options?.bottomBaseAt;
        babylon_option.updatable = options?.updatable;
        return new Mesh(name, BabylonMeshBuilder.CreateBox(name, babylon_option));
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

    public static CreatePlane(
        name: string,
        options: {
            size?: number;
            width?: number;
            length?: number;
            sideOrientation?: SideOrientation;
            frontUVs?: Vector4;
            backUVs?: Vector4;
            updatable?: boolean;
        }
    ): Mesh {
        const babylon_option: {
            size?: number;
            width?: number;
            height?: number;
            sideOrientation?: number;
            frontUVs?: Vector4;
            backUVs?: Vector4;
            updatable?: boolean;
        } = {};
        babylon_option.size = options?.size;
        babylon_option.width = options?.width;
        babylon_option.height = options?.length;
        babylon_option.sideOrientation = options?.sideOrientation;
        babylon_option.frontUVs = options?.frontUVs;
        babylon_option.backUVs = options?.backUVs;
        babylon_option.updatable = options?.updatable;
        return new Mesh(name, BabylonMeshBuilder.CreatePlane(name, babylon_option));
    }
}
