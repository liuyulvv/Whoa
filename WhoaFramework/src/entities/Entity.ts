import { Mesh as BabylonMesh, Color3, Mesh, StandardMaterial, Vector3 } from '@babylonjs/core';
import BoundingBox from 'src/babylon/BoundingBox';
import { LayerMask } from 'src/babylon/Camera';
import Scene from 'src/babylon/Scene';
import EntityRole from './EntityRole';
import EntityType from './EntityType';

export interface EntityCreateInfo {
    role: EntityRole;
    type: EntityType;
    hovered: boolean;
    selected: boolean;
    visible: boolean;
    pickable: boolean;
    movable: boolean;
}

export default abstract class Entity {
    protected info: EntityCreateInfo;
    protected entityID: string;
    protected mesh: BabylonMesh;
    protected material: StandardMaterial;

    protected hovered: boolean;
    protected selected: boolean;
    protected visible: boolean;
    protected pickable: boolean;
    protected movable: boolean;

    protected boundingBox: BoundingBox;

    public constructor(entityID: string, info: EntityCreateInfo) {
        this.entityID = entityID;
        this.info = info;
        this.mesh = new Mesh(this.entityID);
        this.mesh.layerMask = LayerMask.BOTH;
        this.material = new StandardMaterial(this.entityID);
        this.material.emissiveColor = new Color3(0.10196078431372549, 0.9215686274509803, 1);
        this.mesh.material = this.material;
        this.hovered = info.hovered;
        this.selected = info.selected;
        this.visible = info.visible;
        this.pickable = info.pickable;
        this.movable = info.movable;
        this.boundingBox = new BoundingBox();
        this.updateBoundingBox();
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

    public get position(): Whoa.WhoaGeometry.Point3D {
        const pos = this.mesh.position;
        return new Whoa.WhoaGeometry.Point3D(pos.x, pos.y, pos.z);
    }

    public show(): void {
        this.mesh.setEnabled(true);
        this.visible = true;
    }

    public hide(): void {
        this.mesh.setEnabled(false);
        this.visible = false;
    }

    public showOverlay(): void {
        this.mesh.getChildMeshes().forEach((mesh) => {
            mesh.overlayColor = Color3.Red();
            mesh.renderOverlay = true;
        });
    }

    public hideOverlay(): void {
        this.mesh.getChildMeshes().forEach((mesh) => {
            mesh.renderOverlay = false;
        });
    }

    public destroy(): void {
        this.mesh.dispose();
        this.material.dispose();
        Whoa.WhoaFramework.EntityManager.get().destroyEntityByID(this.entityID);
    }

    public getBoundingBox(): BoundingBox {
        return this.boundingBox;
    }

    public updateBoundingBox(): void {
        this.boundingBox = new BoundingBox(this.mesh.getBoundingInfo());
    }

    public showBoundingBox(): void {
        this.mesh.showBoundingBox = true;
    }

    public hideBoundingBox(): void {
        this.mesh.showBoundingBox = false;
    }

    public onEnter(): void {
        this.hovered = true;
        Scene.get().setEntityHoverColor();
        this.showBoundingBox();
    }

    public onLeave(): void {
        this.hovered = false;
        if (this.selected) {
            Scene.get().setEntitySelectColor();
            this.showBoundingBox();
        } else {
            this.hideBoundingBox();
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

    public onDragStart(): void {}

    public onDrag(): void {}

    public onDragEnd(): void {}

    public rotateLocalX(radian: number): void {
        this.mesh.rotate(new Vector3(1, 0, 0), radian);
    }

    public rotateLocalY(radian: number): void {
        this.mesh.rotate(new Vector3(0, 1, 0), radian);
    }

    public rotateLocalZ(radian: number): void {
        this.mesh.rotate(new Vector3(0, 0, 1), radian);
    }

    public rotateAround(point: Vector3, axis: Vector3, radian: number): void {
        this.mesh.rotateAround(point, axis, radian);
    }

    public scale(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh.scaling = new Vector3(this.mesh.scaling.x * x, this.mesh.scaling.y * y, this.mesh.scaling.z * z);
        } else {
            this.mesh.scaling = new Vector3(x, y, z);
        }
    }

    public translate(x: number, y: number, z: number, relative: boolean = true): void {
        if (relative) {
            this.mesh.position = new Vector3(
                this.mesh.position.x + x,
                this.mesh.position.y + y,
                this.mesh.position.z + z
            );
        } else {
            this.mesh.position = new Vector3(x, y, z);
        }
    }
}
