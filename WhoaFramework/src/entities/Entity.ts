import EntityRole from './EntityRole';
import EntityType from './EntityType';

export interface EntityCreateInfo {
    role: EntityRole;
    type: EntityType;
}

export default class Entity {
    protected info: EntityCreateInfo;
    protected entityID: string;
    protected mesh: Whoa.Whoa3D.Mesh;
    protected material: Whoa.Whoa3D.Material;

    public constructor(entityID: string, info: EntityCreateInfo) {
        this.entityID = entityID;
        this.info = info;
        this.mesh = Whoa3D.getMeshManager().createBox(this.entityID);
        this.material = Whoa3D.getMaterialManager().createMaterial(this.entityID);
        this.mesh.setMaterial(this.material);
    }

    public get id(): string {
        return this.entityID;
    }

    public get role(): EntityRole {
        return this.info.role;
    }

    public get type(): EntityType {
        return this.info.type;
    }

    public destroy(): void {
        Whoa3D.getMeshManager().destroyMesh(this.entityID);
        Whoa3D.getMaterialManager().destroyMaterial(this.entityID);
        Whoa.WhoaFramework.EntityManager.get().destroy(this.entityID);
    }
}
