import '@babylonjs/loaders/glTF';
import Scene from 'src/babylon/Scene';
import { Color3 } from 'src/math/Color';
import { Vector3 } from 'src/math/Vector';
import Entity, { EntityCreateInfo } from './Entity';

export interface EntityWallCreateInfo extends EntityCreateInfo {
    width: number;
    height: number;
    depth: number;
    radian: number;
    position: Vector3;
}

export default class EntityWall extends Entity {
    protected info: EntityWallCreateInfo;

    public constructor(entityID: string, info: EntityWallCreateInfo) {
        super(entityID, info);
        this.info = info;
        this.info.visible ? this.show() : this.hide();
        this.material.emissiveColor = new Color3(1, 1, 1);
        this.mesh = Scene.get().MeshBuilder.CreateBox(entityID, {
            width: this.info.width,
            height: this.info.height,
            depth: this.info.depth
        });
        this.mesh.material = this.material;
        this.rotateLocalZ(this.info.radian);
        this.mesh.position = this.info.position;
    }
}
