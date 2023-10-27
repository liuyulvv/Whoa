import EntityManager from 'src/entities/EntityManager';
import EntityWall, { EntityWallCreateInfo } from 'src/entities/EntityWall';
import { v4 as uuid } from 'uuid';

export default class EntityWallManager {
    private static instance: EntityWallManager;
    private entities: Set<string>;

    private constructor() {
        this.entities = new Set<string>();
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
        this.entities.add(entityID);
        EntityManager.get().addEntity(entityID, entity);
        return entity;
    }

    public getAllWall(): string[] {
        return Array.from(this.entities.values());
    }
}
