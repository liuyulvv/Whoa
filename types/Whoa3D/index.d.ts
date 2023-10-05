/// <reference path="../WhoaGeometry/Point2D.d.ts" />
/// <reference path="../WhoaGeometry/Point3D.d.ts" />
/// <reference path="CameraMode.d.ts" />
/// <reference path="MeshManager.d.d.ts" />
/// <reference path="MaterialManager.d.ts" />

declare namespace Whoa {
    export namespace Whoa3D {
        export class WhoaScene {
            public getCameraMode(): CameraMode;
            public changeTo2D(): void;
            public changeTo3D(): void;
            public getWorldPos(pos: WhoaGeometry.Point2D): WhoaGeometry.Point3D;
            public getScreenPos(pos: WhoaGeometry.Point3D): WhoaGeometry.Point2D;
            public getMeshManager(): MeshManager;
            public getMaterialManager(): MaterialManager;
        }
    }
}

// eslint-disable-next-line no-var
declare var Whoa3D: Whoa.Whoa3D.WhoaScene;
