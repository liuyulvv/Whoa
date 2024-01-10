import { v4 as uuid } from 'uuid';
import EntityWall, { EntityWallCreateInfo } from './EntityWall';

export default class EntityWallManager {
    private static instance_: EntityWallManager;
    private entities_: Map<string, EntityWall>;

    private constructor() {
        this.entities_ = new Map<string, EntityWall>();
    }

    public static Get(): EntityWallManager {
        if (!this.instance_) {
            this.instance_ = new EntityWallManager();
        }
        return EntityWallManager.instance_;
    }

    public Create(info: EntityWallCreateInfo): EntityWall {
        const entity_id = uuid();
        const entity = new EntityWall(entity_id, info);
        entity.UpdateBoundingBox();
        this.entities_.set(entity_id, entity);
        Whoa.WhoaFramework.EntityManager.Get().AddEntity(entity_id, entity);
        return entity;
    }

    public GetAllWall(): EntityWall[] {
        return Array.from(this.entities_.values());
    }
}
