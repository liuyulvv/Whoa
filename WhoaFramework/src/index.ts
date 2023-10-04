import Entity from './entities/Entity';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';

const WhoaFramework = {
    Entity: Entity,
    EntityRole: EntityRole,
    EntityType: EntityType
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaFramework = WhoaFramework;
