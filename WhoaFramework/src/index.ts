import Entity from './entities/Entity';
import EntityManager from './entities/EntityManager';
import EntityModel from './entities/EntityModel';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaFramework = {
    EntityRole: EntityRole,
    EntityType: EntityType,
    Entity: Entity,
    EntityModel: EntityModel,
    EntityManager: EntityManager
};
