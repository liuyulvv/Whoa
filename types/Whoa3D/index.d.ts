/// <reference path="../WhoaGeometry/Point2D.d.ts" />
/// <reference path="../WhoaGeometry/Point3D.d.ts" />

declare namespace Whoa {
    export namespace Whoa3D {
        export class WhoaScene {
            static get(): WhoaScene;
            resize(): void;
            release(): void;
            getCameraMode(): CameraMode;
            changeTo2D(): void;
            changeTo3D(): void;
            getWorldPos(pos: WhoaGeometry.Point2D): WhoaGeometry.Point3D;
            getScreenPos(pos: WhoaGeometry.Point3D): WhoaGeometry.Point2D;
        }
    }
}

// eslint-disable-next-line no-var
declare var WhoaScene: Whoa.Whoa3D.WhoaScene;
