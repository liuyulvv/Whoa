declare namespace Whoa {
    export namespace WhoaGeometry {
        export enum GeometryType {
            POINT_2D,
            POINT_3D,
            VECTOR_2D,
            VECTOR_3D,
            MATRIX
        }

        export interface GeometryBaseSerialization {
            type: string;
        }

        export class GeometryBase {
            public constructor(type: GeometryType);
            public serialize(): GeometryBaseSerialization;
            public deserialize(serialization: GeometryBaseSerialization): void;
        }
    }
}

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var Module: any;
