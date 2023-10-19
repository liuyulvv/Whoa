import Mesh from 'src/babylon/Mesh';
import Scene from 'src/babylon/Scene';
import Entity, { EntityCreateInfo } from './Entity';

export default abstract class EntityModel extends Entity {
    public constructor(entityID: string, info: EntityCreateInfo) {
        super(entityID, info);
        this.info = info;
        this.info.visible ? this.mesh.show() : this.mesh.hide();
        Scene.get()
            .getMeshManager()
            .importMeshAsync(info.meshURL, info.meshName, this.entityID)
            .then((meshes) => {
                if (meshes.length > 0) {
                    this.loadModel(meshes[0]);
                }
            });
    }

    private loadModel(mesh: Mesh) {
        this.mesh.destroy();
        this.mesh = mesh;
        this.mesh.scale(this.info.width, this.info.depth, this.info.height, false);
        this.info.visible ? this.mesh.show() : this.mesh.hide();
        if (this.info.rotation.length == 3) {
            this.mesh.rotateLocalX(this.info.rotation[0]);
            this.mesh.rotateLocalX(this.info.rotation[1]);
            this.mesh.rotateLocalX(this.info.rotation[2]);
        }
    }
}
