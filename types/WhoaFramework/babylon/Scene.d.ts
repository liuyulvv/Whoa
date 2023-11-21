/// <reference path="../../WhoaGeometry/Point2D.d.ts" />
/// <reference path="../../WhoaGeometry/Point3D.d.ts" />
/// <reference path="CameraMode.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface PickInfo {
            hit: boolean;
            meshID: string;
        }

        export class WhoaScene {
            public getCameraMode(): CameraMode;
            public screenToWorld(pos: WhoaGeometry.Point2D): WhoaGeometry.Point3D;
            public worldToScreen(pos: WhoaGeometry.Point3D): WhoaGeometry.Point2D;
            public getScreenPosition(): Whoa.WhoaGeometry.Point2D;
            public getGroundPosition(): Whoa.WhoaGeometry.Point3D;
            public setEntityHoverColor(): void;
            public setEntitySelectColor(): void;
            public pickEntity(): PickInfo;
            public enableCameraInput(): void;
            public disableCameraInput(): void;
        }
    }
}

// eslint-disable-next-line no-var
declare var WhoaScene: Whoa.WhoaFramework.WhoaScene;
