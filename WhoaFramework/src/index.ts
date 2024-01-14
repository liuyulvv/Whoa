import Entity, { EntityCreateInfo } from './entities/Entity';
import EntityGroup from './entities/EntityGroup';
import EntityManager from './entities/EntityManager';
import EntityModel from './entities/EntityModel';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';
import Interaction from './interaction/Interaction';
import { PointerButton } from './utils/Pointer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaFramework = {
    EntityRole: EntityRole,
    EntityType: EntityType,
    EntityCreateInfo: EntityCreateInfo,
    Entity: Entity,
    EntityGroup: EntityGroup,
    EntityModel: EntityModel,
    EntityManager: EntityManager,
    PointerButton: PointerButton
};

window.WhoaInteraction = Interaction.Get();
