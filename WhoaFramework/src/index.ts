import { CameraMode } from './babylon/Camera';
import LinesMesh from './babylon/LineMesh';
import Mesh from './babylon/Mesh';
import MeshBuilder from './babylon/MeshBuilder';
import Scene from './babylon/Scene';
import StandardMaterial from './babylon/StandardMaterial';
import VertexData from './babylon/VertexData';
import Entity, { EntityCreateInfo } from './entities/Entity';
import EntityManager from './entities/EntityManager';
import EntityModel from './entities/EntityModel';
import EntityRole from './entities/EntityRole';
import EntityType from './entities/EntityType';
import Interaction from './interaction/Interaction';
import { Color3, Color4 } from './math/Color';
import { Matrix } from './math/Matrix';
import { Point2, Point3 } from './math/Point';
import { Vector2, Vector3, Vector4 } from './math/Vector';
import { PointerButton } from './utils/Pointer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaGeometryUtilModule().then((module: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).WhoaGeometryUtil = module;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaGeometrySpaceModule().then((module: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window).WhoaGeometrySpace = module;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaFramework = {
    CameraMode: CameraMode,
    EntityRole: EntityRole,
    EntityType: EntityType,
    EntityCreateInfo: EntityCreateInfo,
    Entity: Entity,
    EntityModel: EntityModel,
    EntityManager: EntityManager,
    PointerButton: PointerButton
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa3D = {
    MeshBuilder: MeshBuilder,
    StandardMaterial: StandardMaterial,
    VertexData: VertexData,
    Mesh: Mesh,
    LineMesh: LinesMesh
};

window.WhoaScene = Scene.Get();

window.WhoaInteraction = Interaction.Get();
