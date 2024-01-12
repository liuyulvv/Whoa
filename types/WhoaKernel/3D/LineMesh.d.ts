/// <reference path="Mesh.d.ts" />

declare namespace Whoa3D {
    export class LineMesh extends Mesh {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public constructor(id: string, line_mesh?: any);

        public SetColor(color: WhoaMath.Color3): void;
    }
}
