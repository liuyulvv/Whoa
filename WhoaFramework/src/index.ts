import Entity from './entities/Entity';
import EntityManager from './entities/EntityManager';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';
import EntityWall from './entities/EntityWall';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaFramework = {
    EntityRole: EntityRole,
    EntityType: EntityType,
    Entity: Entity,
    EntityWall: EntityWall,
    EntityManager: EntityManager
};
