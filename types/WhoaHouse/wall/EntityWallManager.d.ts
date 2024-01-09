declare namespace WhoaHouse {
    export class EntityWallManager {
        public static Get(): EntityWallManager;

        public UpdateEntityID(entity_id: string, newEntityID: string): void;
    }
}
