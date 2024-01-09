import { v4 as uuid } from 'uuid';
import Entity from './Entity';
import { EntityControlMove3D, EntityControlRotate2D, EntityControlRotate3D } from './EntityControl';
import { EntityModelCreateInfo } from './EntityModel';
import EntityOrnament from './EntityOrnament';

export default class EntityManager {
    private static instance_: EntityManager;
    private entities_: Map<string, Entity>;

    private constructor() {
        this.entities_ = new Map<string, Entity>();
        this.CreateControl();
    }

    public static Get(): EntityManager {
        if (!this.instance_) {
            this.instance_ = new EntityManager();
        }
        return EntityManager.instance_;
    }

    private CreateControl(): void {
        const control_move_3d = EntityControlMove3D.Get();
        const control_rotate_2d = EntityControlRotate2D.Get();
        const control_rotate_3d = EntityControlRotate3D.Get();
        this.entities_.set(control_move_3d.GetID(), control_move_3d);
        this.entities_.set(control_rotate_2d.GetID(), control_rotate_2d);
        this.entities_.set(control_rotate_3d.GetID(), control_rotate_3d);
    }

    public CreateOrnament(info: EntityModelCreateInfo): EntityOrnament {
        const entity_id = uuid();
        const entity = new EntityOrnament(entity_id, info);
        this.entities_.set(entity_id, entity);
        return entity;
    }

    public AddEntity(entity_id: string, entity: Entity): void {
        this.entities_.set(entity_id, entity);
    }

    public DestroyEntityByID(entity_id: string): void {
        const entity = this.entities_.get(entity_id);
        if (entity) {
            this.entities_.delete(entity_id);
            entity.Destroy();
        }
    }

    public UpdateEntityID(entity_id: string, newEntityID: string): void {
        const entity = this.entities_.get(entity_id);
        if (entity) {
            this.entities_.delete(entity_id);
            this.entities_.set(newEntityID, entity);
        }
    }

    public GetAllEntity(): Entity[] {
        return Array.from(this.entities_.values());
    }

    public GetEntityByID(entity_id: string): Entity | undefined {
        return this.entities_.get(entity_id);
    }
}
