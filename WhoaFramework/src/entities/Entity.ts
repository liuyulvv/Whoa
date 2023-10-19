import Material from 'src/babylon/Material';
import Mesh from 'src/babylon/Mesh';
import Scene from 'src/babylon/Scene';
import EntityRole from './EntityRole';
import EntityType from './EntityType';
import { AxesViewer } from '@babylonjs/core';

export interface EntityCreateInfo {
    role: EntityRole;
    type: EntityType;
    hovered: boolean;
    selected: boolean;
    visible: boolean;
    pickable: boolean;
    movable: boolean;
    width: number;
    height: number;
    depth: number;
    meshURL: string;
    meshName: string;
    rotation: number[];
}

export default abstract class Entity {
    protected info: EntityCreateInfo;
    protected entityID: string;
    protected mesh: Mesh;
    protected material: Material;

    protected hovered: boolean;
    protected selected: boolean;
    protected visible: boolean;
    protected pickable: boolean;
    protected movable: boolean;

    protected entityWidth: number;
    protected entityHeight: number;
    protected entityDepth: number;

    public constructor(entityID: string, info: EntityCreateInfo) {
        this.entityID = entityID;
        this.info = info;
        this.mesh = Scene.get().getMeshManager().createBox(this.entityID);
        this.material = Scene.get().getMaterialManager().createMaterial(this.entityID);
        this.mesh.setMaterial(this.material);
        this.hovered = info.hovered;
        this.selected = info.selected;
        this.visible = info.visible;
        this.pickable = info.pickable;
        this.movable = info.movable;
        this.entityWidth = info.width;
        this.entityHeight = info.height;
        this.entityDepth = info.depth;
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

    public get isMovable(): boolean {
        return this.movable;
    }

    public get width(): number {
        return this.entityWidth;
    }

    public get height(): number {
        return this.entityHeight;
    }

    public get depth(): number {
        return this.entityDepth;
    }

    public show(): void {
        this.mesh.show();
    }

    public hide(): void {
        this.mesh.hide();
    }

    public showOverlay(): void {
        this.mesh.showOverlay();
    }

    public hideOverlay(): void {
        this.mesh.hideOverlay();
    }

    public destroy(): void {
        Scene.get().getMeshManager().destroyMeshByID(this.entityID);
        Scene.get().getMaterialManager().destroyMaterial(this.entityID);
        Whoa.WhoaFramework.EntityManager.get().destroyEntityByID(this.entityID);
    }

    public showBoundingBox(): void {
        this.mesh.showBoundingBox();
    }

    public hideBoundingBox(): void {
        this.mesh.hideBoundingBox();
    }

    public onHover(hover: boolean = true) {
        if (this.hovered != hover) {
            this.hovered = hover;
            if (this.hovered) {
                Scene.get().setEntityHoverColor();
                this.showBoundingBox();
            } else if (this.selected) {
                Scene.get().setEntitySelectColor();
                this.showBoundingBox();
            } else {
                this.hideBoundingBox();
            }
        }
    }

    public onSelect(selected: boolean = true) {
        if (this.selected != selected) {
            this.selected = selected;
            if (this.selected) {
                Scene.get().setEntitySelectColor();
                this.showBoundingBox();
            } else if (this.hovered) {
                Scene.get().setEntityHoverColor();
                this.showBoundingBox();
            } else {
                this.hideBoundingBox();
            }
        }
    }
}
