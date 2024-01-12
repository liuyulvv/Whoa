// export default class
import { LinesMesh as BabylonLinesMesh } from '@babylonjs/core';
import { Color3 } from 'src/math/Color';
import Mesh from './Mesh';

export default class LineMesh extends Mesh {
    public constructor(id: string, line_mesh?: BabylonLinesMesh) {
        super(id, line_mesh);
    }

    public SetColor(color: Color3): void {
        (this.mesh_ as BabylonLinesMesh).color = color;
    }

    public GetMesh(): BabylonLinesMesh {
        return this.mesh_ as BabylonLinesMesh;
    }
}
