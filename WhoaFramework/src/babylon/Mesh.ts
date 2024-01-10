import { Mesh as BabylonMesh, Vector3 } from '@babylonjs/core';
import StandardMaterial from './StandardMaterial';

export default class Mesh {
    private id_: string;
    private mesh_: BabylonMesh;

    public constructor(id: string, mesh_?: BabylonMesh) {
        this.id_ = id;
        if (mesh_) {
            this.mesh_ = mesh_;
        } else {
            this.mesh_ = new BabylonMesh(id);
        }
    }

    public GetID(): string {
        return this.id_;
    }

    public Dispose(): void {
        this.mesh_.dispose();
    }

    public SetMaterial(material: StandardMaterial): void {
        this.mesh_.material = material;
    }

    public SetPosition(position: WhoaMath.Vector3): void {
        this.mesh_.position = new Vector3(position.x, position.y, position.z);
    }

    public GetMesh(): BabylonMesh {
        return this.mesh_;
    }
}
