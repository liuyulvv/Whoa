import EntityModel, { EntityModelCreateInfo } from './EntityModel';

export default class EntityOrnament extends EntityModel {
    public constructor(entityID: string, info: EntityModelCreateInfo) {
        super(entityID, info);
    }

    public onSelect(selected?: boolean): void {
        super.onSelect(selected);
    }
}
