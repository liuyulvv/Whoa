import EntityRole from './EntityRole';
import EntityType from './EntityType';

export interface EntityCreateInfo {
    role: EntityRole;
    type: EntityType;
    hovered: boolean;
    selected: boolean;
    visible: boolean;
    pickable: boolean;
}

export default class Entity {
    protected info: EntityCreateInfo;
    protected entityID: string;
    protected mesh: Whoa.Whoa3D.Mesh;
    protected material: Whoa.Whoa3D.Material;

    protected hovered: boolean;
    protected selected: boolean;
    protected visible: boolean;
    protected pickable: boolean;

    public constructor(entityID: string, info: EntityCreateInfo) {
        this.entityID = entityID;
        this.info = info;
        this.mesh = Whoa3D.getMeshManager().createBox(this.entityID);
        this.material = Whoa3D.getMaterialManager().createMaterial(this.entityID);
        this.mesh.setMaterial(this.material);
        this.hovered = info.hovered;
        this.selected = info.selected;
        this.visible = info.visible;
        this.pickable = info.pickable;
    }

    public get id(): string {
        return this.entityID;
    }

    public get role(): EntityRole {
        return this.info.role;
    }

    public get type(): EntityType {
        return this.info.type;
    }

    public get isHovered(): boolean {
        return this.hovered;
    }

    public get isSelected(): boolean {
        return this.selected;
    }

    public get isVisible(): boolean {
        return this.visible;
    }

    public get isPickable(): boolean {
        return this.pickable;
    }

    public destroy(): void {
        Whoa3D.getMeshManager().destroyMesh(this.entityID);
        Whoa3D.getMaterialManager().destroyMaterial(this.entityID);
        Whoa.WhoaFramework.EntityManager.get().destroyEntityByID(this.entityID);
    }

    public showBoundingBox(): void {
        this.mesh.showBoundingBox();
    }

    public hideBoundingBox(): void {
        this.mesh.hideBoundingBox();
    }

    public onHover(hover: boolean = true) {
        this.hovered = hover;
        if (this.hovered) {
            Whoa3D.onEntityHover();
            this.showBoundingBox();
        } else if (this.selected) {
            Whoa3D.onEntitySelect();
            this.showBoundingBox();
        } else {
            this.hideBoundingBox();
        }
    }

    public onSelect(selected: boolean = true) {
        this.selected = selected;
        if (this.selected) {
            Whoa3D.onEntitySelect();
            this.showBoundingBox();
        } else if (this.hovered) {
            Whoa3D.onEntityHover();
            this.showBoundingBox();
        } else {
            this.hideBoundingBox();
        }
    }
}
