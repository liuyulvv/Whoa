/// <reference path="../math/Color3.d.ts" />

declare namespace Whoa3D {
    export class LineMesh {
        private id_: string;

        public constructor(id: string);

        public GetID(): string;

        public Dispose(): void;

        public SetColor(color: Color3): void;

        public GetMesh();
    }
}
