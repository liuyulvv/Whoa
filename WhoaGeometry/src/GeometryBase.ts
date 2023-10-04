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

export default class GeometryBase {
    protected type: GeometryType;

    public constructor(type: GeometryType) {
        this.type = type;
    }

    public serialize(): GeometryBaseSerialization {
        let type = '';
        switch (this.type) {
            case GeometryType.POINT_2D:
                type = 'POINT_2D';
                break;
            case GeometryType.POINT_3D:
                type = 'POINT_3D';
                break;
            case GeometryType.VECTOR_2D:
                type = 'VECTOR_2D';
                break;
            case GeometryType.VECTOR_3D:
                type = 'VECTOR_3D';
                break;
        }
        return {
            type: type
        };
    }

    public deserialize(serialization: GeometryBaseSerialization): void {
        switch (serialization.type) {
            case 'POINT_2D':
                this.type = GeometryType.POINT_2D;
                break;
            case 'POINT_3D':
                this.type = GeometryType.POINT_3D;
                break;
            case 'VECTOR_2D':
                this.type = GeometryType.VECTOR_2D;
                break;
            case 'VECTOR_3D':
                this.type = GeometryType.VECTOR_3D;
                break;
        }
    }
}
