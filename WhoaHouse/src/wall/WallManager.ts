import { v4 as uuid } from 'uuid';
import Wall, { WallCreateInfo } from '../entities/Wall';

export default class WallManager {
    private static instance_: WallManager;
    private entities_: Map<string, Wall>;

    private constructor() {
        this.entities_ = new Map<string, Wall>();
    }

    public static Get(): WallManager {
        if (!this.instance_) {
            this.instance_ = new WallManager();
        }
        return WallManager.instance_;
    }

    public Create(info: WallCreateInfo): Wall {
        const entity_id = uuid();
        const entity = new Wall(entity_id, info);
        this.entities_.set(entity_id, entity);
        WhoaFramework.EntityManager.Get().AddEntity(entity_id, entity);
        return entity;
    }

    public GetAllWall(): Wall[] {
        return Array.from(this.entities_.values());
    }
}
