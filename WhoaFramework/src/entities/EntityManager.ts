import { v4 as uuid } from 'uuid';
import Entity, { EntityCreateInfo } from './Entity';

export default class EntityManager {
    private static instance: EntityManager;
    private entities: Map<string, Entity>;

    private constructor() {
        this.entities = new Map<string, Entity>();
    }

    public static get(): EntityManager {
        if (!this.instance) {
            this.instance = new EntityManager();
        }
        return EntityManager.instance;
    }

    public create(info: EntityCreateInfo): Entity {
        const entityID = uuid();
        const entity = new Entity(entityID, info);
        this.entities.set(entityID, entity);
        return entity;
    }

    public destroy(entityID: string): void {
        const entity = this.entities.get(entityID);
        if (entity) {
            this.entities.delete(entityID);
            entity.destroy();
        }
    }
}
