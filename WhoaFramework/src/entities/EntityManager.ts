import { v4 as uuid } from 'uuid';
import Entity from './Entity';
import EntityModel, { EntityModelCreateInfo } from './EntityModel';
import EntityOrnament from './EntityOrnament';
import EntityControl from './EntityControl';

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

    public createControl(info: EntityModelCreateInfo): EntityControl {
        const entityID = uuid();
        const entity = new EntityControl(entityID, info);
        this.entities.set(entityID, entity);
        return entity;
    }

    public createOrnament(info: EntityModelCreateInfo): EntityOrnament {
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
