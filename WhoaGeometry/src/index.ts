import GeometryBase, { GeometryType } from './GeometryBase';
import Point2D from './Point2D';
import Point3D from './Point3D';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaGeometry = {
    GeometryType: GeometryType,
    GeometryBase: GeometryBase,
    Point2D: Point2D,
    Point3D: Point3D
};
