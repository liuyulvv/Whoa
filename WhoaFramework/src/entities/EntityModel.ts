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
        WhoaScene.ImportMeshAsync(this.model_url_, this.model_name_, this.id_).then((mesh) => {
            if (mesh) {
                this.LoadModel(mesh, scale, rotation);
            }
        });
    }

    private LoadModel(mesh: Whoa3D.Mesh, scale: Array<number>, rotation: Array<number>) {
        this.mesh_.Dispose();
        this.mesh_ = mesh;
        this.UpdateBoundingBox();
        this.visible_ ? this.Show() : this.Hide();
        if (scale.length == 3) {
            this.Scale(scale[0], scale[1], scale[2], false);
        }
        if (rotation.length == 3) {
            this.RotateLocalX(rotation[0]);
            this.RotateLocalY(rotation[1]);
            this.RotateLocalZ(rotation[2]);
        }
    }
}
