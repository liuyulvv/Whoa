import Color3 from './Color3';
import Color4 from './Color4';
import Matrix3 from './Matrix3';
import Matrix4 from './Matrix4';
import Point2 from './Point2';
import Point3 from './Point3';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaMath = {
    Color3: Color3,
    Color4: Color4,
    Point2: Point2,
    Point3: Point3,
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4,
    Matrix3: Matrix3,
    Matrix4: Matrix4
};
