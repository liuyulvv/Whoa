/// <reference path="Entity.d.ts" />
/// <reference path="EntityOrnament.d.ts" />

declare namespace WhoaFramework {
    export class EntityManager {
        public static Get(): EntityManager;
        public AddEntity(entity_id: string, entity: Entity): void;
        public CreateOrnament(info: EntityModelCreateInfo): EntityOrnament;
        public DestroyEntityByID(entity_id: string): void;
        public UpdateEntityID(entity_id: string, new_entity_id: string): void;
        public GetAllEntity(): Entity[];
        public GetEntityByID(entity_id: string): Entity | undefined;
    }
}
