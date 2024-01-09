/// <reference path="../math/Point.d.ts" />
/// <reference path="CameraMode.d.ts" />

declare namespace Whoa3D {
    export interface PickInfo {
        hit_: boolean;
        mesh_id_: string;
    }

    export class WhoaScene {
        public GetCameraMode(): CameraMode;
        public ScreenToWorld(pos: WhoaMath.Point2): WhoaMath.Point3;
        public WorldToScreen(pos: WhoaMath.Point3): WhoaMath.Point2;
        public GetScreenPosition(): WhoaMath.Point2;
        public GetGroundPosition(): WhoaMath.Point3;
        public SetEntityHoverColor(): void;
        public SetEntitySelectColor(): void;
        public PickEntity(): PickInfo;
    }
}
