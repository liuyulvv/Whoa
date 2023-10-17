import Entity from './Entity';
import EntityModel, { EntityModelCreateInfo } from './EntityModel';

export default class EntityControl extends EntityModel {
    private entity: Entity | null = null;

    public constructor(entityID: string, info: EntityModelCreateInfo) {
        super(entityID, info);
    }

    public onHover(hover?: boolean): void {
        if (hover) {
            this.showOverlay();
        } else {
            this.hideOverlay();
        }
    }

    public onSelect(selected?: boolean): void {
        console.log(selected);
        // super.onSelect(selected);
    }

    public attach(entity: Entity) {
        this.entity = entity;
        this.show();
    }

    public detach() {
        this.hide();
    }
}
