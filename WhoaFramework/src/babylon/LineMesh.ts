import { LinesMesh as BabylonLineMesh } from '@babylonjs/core';
import { Color3 } from 'src/math/Color';

export default class LinesMesh {
    private id_: string;
    private line_mesh_: BabylonLineMesh;

    public constructor(id: string, line_mesh?: BabylonLineMesh) {
        this.id_ = id;
        if (line_mesh) {
            this.line_mesh_ = line_mesh;
        } else {
            this.line_mesh_ = new BabylonLineMesh(id);
        }
    }

    public GetID(): string {
        return this.id_;
    }

    public Dispose(): void {
        this.line_mesh_.dispose();
    }

    public SetColor(color: Color3): void {
        this.line_mesh_.color = color;
    }

    public GetMesh(): BabylonLineMesh {
        return this.line_mesh_;
    }
}
