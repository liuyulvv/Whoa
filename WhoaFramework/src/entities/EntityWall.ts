import '@babylonjs/loaders/glTF';
import Scene from 'src/babylon/Scene';
import { Color3 } from 'src/math/Color';
import { Vector3 } from 'src/math/Vector';
import Entity, { EntityCreateInfo } from './Entity';

export class EntityWallCreateInfo extends EntityCreateInfo {
    width_: number = 0;
    height_: number = 0;
    depth_: number = 0;
    radian_: number = 0;
    position_: Vector3 = new Vector3(0, 0, 0);
}

export default class EntityWall extends Entity {
    public constructor(entity_id: string, info: EntityWallCreateInfo) {
        super(entity_id, info);
        this.visible_ ? this.Show() : this.Hide();
        this.material_.emissiveColor = new Color3(1, 1, 1);
        this.mesh_ = Scene.Get().MeshBuilder.CreateBox(entity_id, {
            width: info.width_,
            height: info.height_,
            depth: info.depth_
        });
        this.mesh_.material = this.material_;
        this.RotateLocalZ(info.radian_);
        this.mesh_.position = info.position_;
    }
}
