import Entity, { EntityCreateInfo } from './Entity';

export interface EntityOrnamentCreateInfo extends EntityCreateInfo {
    meshURL: string;
    meshName: string;
}

export default class EntityOrnament extends Entity {
    public constructor(entityID: string, info: EntityOrnamentCreateInfo) {
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
        this.mesh.rotateLocalX((90 / 180) * Math.PI);
    }
}
