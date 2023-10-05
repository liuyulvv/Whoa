import Entity from './entities/Entity';
import EntityManager from './entities/EntityManager';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaFramework = {
    Entity: Entity,
    EntityRole: EntityRole,
    EntityType: EntityType,
    EntityManager: EntityManager
};
