import { CameraMode } from './babylon/Camera';
import Scene from './babylon/Scene';
import Entity from './entities/Entity';
import EntityManager from './entities/EntityManager';
import EntityModel from './entities/EntityModel';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';
import Interaction from './interaction/Interaction';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaFramework = {
    CameraMode: CameraMode,
    EntityRole: EntityRole,
    EntityType: EntityType,
    Entity: Entity,
    EntityModel: EntityModel,
    EntityManager: EntityManager
};

window.WhoaScene = Scene.get();

window.WhoaInteraction = Interaction.get();
