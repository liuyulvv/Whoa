import EntityManager from 'src/entities/EntityManager';
import EntityWall, { EntityWallCreateInfo } from 'src/entities/EntityWall';
import { v4 as uuid } from 'uuid';

export default class EntityWallManager {
    private static instance: EntityWallManager;
    private entities: Map<string, EntityWall>;

    private constructor() {
        this.entities = new Map<string, EntityWall>();
    }

    public static get(): EntityWallManager {
        if (!this.instance) {
            this.instance = new EntityWallManager();
        }
        return EntityWallManager.instance;
    }

    public create(info: EntityWallCreateInfo): EntityWall {
        const entityID = uuid();
        const entity = new EntityWall(entityID, info);
        entity.updateBoundingBox();
        this.entities.set(entityID, entity);
        EntityManager.get().addEntity(entityID, entity);
        return entity;
    }

    public getAllWall(): EntityWall[] {
        return Array.from(this.entities.values());
    }
}
