/// <reference path="StandardMaterial.d.ts" />
/// <reference path="../math/Vector.d.ts" />
/// <reference path="LayerMask.d.ts" />

declare namespace Whoa3D {
    export class Mesh {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public constructor(id: string, mesh?: any);

        public GetID(): string;

        public Dispose(): void;

        public SetMaterial(material: StandardMaterial): void;

        public SetPosition(position: WhoaMath.Vector3): void;

        public SetLayerMask(mask: Whoa3D.LayerMask): void;

        public SetOverlayColor(color: WhoaMath.Color4): void;

        public ShowOverlay(): void;

        public HideOverlay(): void;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public GetBoundingInfo(): any;

        public ShowBoundingBox(): void;

        public HideBoundingBox(): void;

        public GetPosition(): WhoaMath.Point3;

        public Show(): void;

        public Hide(): void;

        public RotateLocalX(radian: number): void;

        public RotateLocalY(radian: number): void;

        public RotateLocalZ(radian: number): void;

        public RotateAround(point: WhoaMath.Vector3, axis: WhoaMath.Vector3, radian: number): void;

        public Scale(x: number, y: number, z: number, relative: boolean = true): void;

        public Translate(x: number, y: number, z: number, relative: boolean = true): void;
    }
}
