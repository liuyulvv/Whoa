import { v4 as uuid } from 'uuid';
import Entity, { EntityCreateInfo } from './Entity';
import {
    EntityControlMove2D,
    EntityControlMove3D,
    EntityControlRotate2D,
    EntityControlRotate3D
} from './EntityControl';
import EntityOrnament from './EntityOrnament';

export default class EntityManager {
    private static instance: EntityManager;
    private entities: Map<string, Entity>;

    private constructor() {
        this.entities = new Map<string, Entity>();
        this.createControl();
    }

    public static get(): EntityManager {
        if (!this.instance) {
            this.instance = new EntityManager();
        }
        return EntityManager.instance;
    }

    private createControl(): void {
        const controlMove2D = EntityControlMove2D.get();
        const controlMove3D = EntityControlMove3D.get();
        const controlRotate2D = EntityControlRotate2D.get();
        const controlRotate3D = EntityControlRotate3D.get();
        this.entities.set(controlMove2D.id, controlMove2D);
        this.entities.set(controlMove3D.id, controlMove3D);
        this.entities.set(controlRotate2D.id, controlRotate2D);
        this.entities.set(controlRotate3D.id, controlRotate3D);
    }

    public createOrnament(info: EntityCreateInfo): EntityOrnament {
        const entityID = uuid();
        const entity = new EntityOrnament(entityID, info);
        this.entities.set(entityID, entity);
        return entity;
    }

    public addEntity(entityID: string, entity: Entity): void {
        this.entities.set(entityID, entity);
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
