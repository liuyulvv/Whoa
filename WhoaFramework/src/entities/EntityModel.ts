import { Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import Scene from 'src/babylon/Scene';
import Entity, { EntityCreateInfo } from './Entity';

export interface EntityModelCreateInfo extends EntityCreateInfo {
    modelURL: string;
    modelName: string;
    scale: number[];
    rotation: number[];
}

export default abstract class EntityModel extends Entity {
    protected info: EntityModelCreateInfo;

    public constructor(entityID: string, info: EntityModelCreateInfo) {
        super(entityID, info);
        this.info = info;
        this.info.visible ? this.show() : this.hide();
        Scene.get()
            .importMeshAsync(info.modelURL, info.modelName, this.entityID)
            .then((meshes) => {
                if (meshes.length > 0) {
                    this.loadModel(meshes[0]);
                }
            });
    }

    private loadModel(mesh: Mesh) {
        this.mesh.dispose();
        this.mesh = mesh;
        this.updateBoundingBox();
        this.info.visible ? this.show() : this.hide();
        if (this.info.scale.length == 3) {
            this.scale(this.info.scale[0], this.info.scale[1], this.info.scale[2], false);
        }
        if (this.info.rotation.length == 3) {
            this.rotateLocalX(this.info.rotation[0]);
            this.rotateLocalX(this.info.rotation[1]);
            this.rotateLocalX(this.info.rotation[2]);
        }
    }
}
