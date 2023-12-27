import { CameraMode } from './babylon/Camera';
import Scene from './babylon/Scene';
import Entity from './entities/Entity';
import EntityManager from './entities/EntityManager';
import EntityModel from './entities/EntityModel';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';
import Interaction from './interaction/Interaction';
import { Color3, Color4 } from './math/Color';
import { Matrix } from './math/Matrix';
import { Point2, Point3 } from './math/Point';
import { Vector2, Vector3, Vector4 } from './math/Vector';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaGeometryModule().then((module: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).WhoaGeometry = module;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaFramework = {
    CameraMode: CameraMode,
    EntityRole: EntityRole,
    EntityType: EntityType,
    Entity: Entity,
    EntityModel: EntityModel,
    EntityManager: EntityManager
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaMath = {
    Color3: Color3,
    Color4: Color4,
    Point2: Point2,
    Point3: Point3,
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4,
    Matrix: Matrix
};

window.WhoaScene = Scene.get();

window.WhoaInteraction = Interaction.get();
