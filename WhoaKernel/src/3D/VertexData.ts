import { VertexData as BabylonVertexData } from '@babylonjs/core';
import Mesh from './Mesh';

export enum SideOrientation {
    FRONT = BabylonVertexData.BACKSIDE,
    BACK = BabylonVertexData.FRONTSIDE,
    DOUBLE = BabylonVertexData.DOUBLESIDE
}

export default class VertexData extends BabylonVertexData {
    public constructor() {
        super();
    }

    public SetVertices(vertices: Array<number>): void {
        this.positions = vertices;
    }

    public SetIndices(indices: Array<number>): void {
        this.indices = indices;
    }

    public ApplyToMesh(mesh: Mesh, updatable: boolean = true): void {
        this.applyToMesh(mesh.GetMesh(), updatable);
    }
}
