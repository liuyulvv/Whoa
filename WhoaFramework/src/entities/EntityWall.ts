import Entity, { EntityCreateInfo } from './Entity';

export default class EntityWall extends Entity {
    public constructor(entityID: string, info: EntityCreateInfo) {
        super(entityID, info);
    }
}
