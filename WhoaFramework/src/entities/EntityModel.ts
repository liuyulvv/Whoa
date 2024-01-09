import { Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import Scene from 'src/babylon/Scene';
import Entity, { EntityCreateInfo } from './Entity';

export class EntityModelCreateInfo extends EntityCreateInfo {
    model_url_: string = '';
    model_name_: string = '';
    scale_: Array<number> = [1, 1, 1];
    rotation_: Array<number> = [0, 0, 0];
}

export default abstract class EntityModel extends Entity {
    protected model_url_: string;
    protected model_name_: string;

    public constructor(id: string, info?: EntityModelCreateInfo) {
        super(id, info);
        this.model_url_ = '';
        this.model_name_ = '';
        let scale = [1, 1, 1];
        let rotation = [0, 0, 0];
        if (info) {
            this.model_url_ = info.model_url_;
            this.model_name_ = info.model_name_;
            scale = info.scale_;
            rotation = info.rotation_;
        }
        this.visible_ ? this.Show() : this.Hide();
        Scene.Get()
            .ImportMeshAsync(this.model_url_, this.model_name_, this.id_)
            .then((meshes) => {
                if (meshes.length > 0) {
                    this.LoadModel(meshes[0], scale, rotation);
                }
            });
    }

    private LoadModel(mesh: Mesh, scale: Array<number>, rotation: Array<number>) {
        this.mesh_.dispose();
        this.mesh_ = mesh;
        this.UpdateBoundingBox();
        this.visible_ ? this.Show() : this.Hide();
        if (scale.length == 3) {
            this.Scale(scale[0], scale[1], scale[2], false);
        }
        if (rotation.length == 3) {
            this.RotateLocalX(rotation[0]);
            this.RotateLocalX(rotation[1]);
            this.RotateLocalX(rotation[2]);
        }
    }
}
