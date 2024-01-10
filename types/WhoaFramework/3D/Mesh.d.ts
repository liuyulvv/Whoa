/// <reference path="StandardMaterial.d.ts" />

declare namespace Whoa3D {
    export class Mesh {
        public constructor(id: string);

        public GetID(): string;

        public Dispose(): void;

        public SetMaterial(material: StandardMaterial): void;

        public SetPosition(position: WhoaMath.Vector3): void;

        public GetMesh();
    }
}
