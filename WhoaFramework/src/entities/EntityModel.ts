import Entity, { EntityCreateInfo } from './Entity';

export interface EntityModelCreateInfo extends EntityCreateInfo {
    meshURL: string;
    meshName: string;
}

export default abstract class EntityModel extends Entity {
    public constructor(entityID: string, info: EntityModelCreateInfo) {
        super(entityID, info);
        Whoa3D.getMeshManager()
            .importMeshAsync(info.meshURL, info.meshName, this.entityID)
            .then((meshes) => {
                if (meshes.length > 0) {
                    this.loadModel(meshes[0]);
                }
            });
    }

    private loadModel(mesh: Whoa.Whoa3D.Mesh) {
        this.mesh.destroy();
        this.mesh = mesh;
        this.mesh.scale(this.info.width, this.info.depth, this.info.height, false);
    }
}
