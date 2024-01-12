/// <reference path="../../WhoaFramework/entities/Entity.d.ts" />
/// <reference path="../../WhoaKernel/math/Vector.d.ts" />

declare namespace WhoaHouse {
    export class EntityWallCreateInfo extends WhoaFramework.EntityCreateInfo {
        width_: number;
        height_: number;
        depth_: number;
        radian_: number;
        position_: WhoaFramework.Vector3;
    }

    export class EntityWall {
        public static Get(): EntityWall;

        public UpdateEntityID(entity_id: string, newEntityID: string): void;
    }
}
