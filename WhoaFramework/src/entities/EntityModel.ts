import { Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import Scene from 'src/babylon/Scene';
import Entity, { EntityCreateInfo } from './Entity';

export default abstract class EntityModel extends Entity {
    public constructor(entityID: string, info: EntityCreateInfo) {
        super(entityID, info);
        this.info = info;
        this.info.visible ? this.show() : this.hide();
        Scene.get()
            .importMeshAsync(info.meshURL, info.meshName, this.entityID)
            .then((meshes) => {
                if (meshes.length > 0) {
                    this.loadModel(meshes[0]);
                }
            });
    }

    private loadModel(mesh: Mesh) {
        this.mesh.dispose();
        this.mesh = mesh;
        this.scale(this.info.width, this.info.depth, this.info.height, false);
        this.info.visible ? this.show() : this.hide();
        if (this.info.rotation.length == 3) {
            this.rotateLocalX(this.info.rotation[0]);
            this.rotateLocalX(this.info.rotation[1]);
            this.rotateLocalX(this.info.rotation[2]);
        }
    }
}
