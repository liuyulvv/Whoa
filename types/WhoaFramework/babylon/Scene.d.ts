/// <reference path="../../WhoaMath/Point2.d.ts" />
/// <reference path="../../WhoaMath/Point3.d.ts" />
/// <reference path="CameraMode.d.ts" />

declare namespace Whoa {
    export namespace WhoaFramework {
        export interface PickInfo {
            hit: boolean;
            meshID: string;
        }

        export class WhoaScene {
            public getCameraMode(): CameraMode;
            public screenToWorld(pos: WhoaMath.Point2): WhoaMath.Point3;
            public worldToScreen(pos: WhoaMath.Point3): WhoaMath.Point2;
            public getScreenPosition(): WhoaMath.Point2;
            public getGroundPosition(): WhoaMath.Point3;
            public setEntityHoverColor(): void;
            public setEntitySelectColor(): void;
            public pickEntity(): PickInfo;
        }
    }
}

// eslint-disable-next-line no-var
declare var WhoaScene: Whoa.WhoaFramework.WhoaScene;
