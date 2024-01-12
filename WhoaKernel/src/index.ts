import { CameraMode, LayerMask } from './3D/Camera';
import Mesh from './3D/Mesh';
import MeshBuilder from './3D/MeshBuilder';
import Scene from './3D/Scene';
import StandardMaterial from './3D/StandardMaterial';
import VertexData from './3D/VertexData';
import { Color3, Color4 } from './math/Color';
import { Matrix } from './math/Matrix';
import { Point2, Point3 } from './math/Point';
import { Vector2, Vector3, Vector4 } from './math/Vector';
import BoundingBox from './3D/BoundingBox';

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
    WhoaScene: Scene.Get(),
    CameraMode: CameraMode,
    LayerMask: LayerMask,
    MeshBuilder: MeshBuilder,
    StandardMaterial: StandardMaterial,
    VertexData: VertexData,
    Mesh: Mesh,
    BoundingBox: BoundingBox
};

window.WhoaScene = Scene.Get();
