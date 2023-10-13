import { v4 as uuid } from 'uuid';
import Entity, { EntityCreateInfo } from './Entity';
import EntityOrnament, { EntityOrnamentCreateInfo } from './EntityOrnament';
import EntityWall from './EntityWall';

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

    public createWall(info: EntityCreateInfo): EntityWall {
        const entityID = uuid();
        const entity = new EntityWall(entityID, info);
        this.entities.set(entityID, entity);
        return entity;
    }

    public createOrnament(info: EntityOrnamentCreateInfo): EntityOrnament {
        const entityID = uuid();
        const entity = new EntityOrnament(entityID, info);
        this.entities.set(entityID, entity);
        return entity;
    }

    public destroyEntityByID(entityID: string): void {
        const entity = this.entities.get(entityID);
        if (entity) {
            this.entities.delete(entityID);
            entity.destroy();
        }
    }

    public getAllEntity(): Entity[] {
        return Array.from(this.entities.values());
    }

    public getEntityByID(entityID: string): Entity | undefined {
        return this.entities.get(entityID);
    }
}
