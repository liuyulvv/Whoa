import { CameraMode } from 'src/babylon/Camera';
import Scene from 'src/babylon/Scene';
import { EntityCreateInfo } from './Entity';
import {
    EntityControlMove2D,
    EntityControlMove3D,
    EntityControlRotate2D,
    EntityControlRotate3D
} from './EntityControl';
import EntityModel from './EntityModel';

export default class EntityOrnament extends EntityModel {
    public constructor(entityID: string, info: EntityCreateInfo) {
        super(entityID, info);
    }

    public attachControl(): void {
        if (Scene.get().getCameraMode() == CameraMode.MODE_2D) {
            EntityControlRotate2D.get().attach(this);
            EntityControlMove2D.get().attach(this);
        } else {
            EntityControlRotate3D.get().attach(this);
            EntityControlMove3D.get().attach(this);
        }
    }

    public detachControl(): void {
        EntityControlRotate2D.get().detach();
        EntityControlMove2D.get().detach();
        EntityControlRotate3D.get().detach();
        EntityControlMove3D.get().detach();
    }

    public onSelect(selected?: boolean): void {
        super.onSelect(selected);
        if (selected) {
            this.attachControl();
        } else {
            this.detachControl();
        }
    }

    public onDragStart(): void {
        this.detachControl();
    }

    public onDrag(): void {}

    public onDragEnd(): void {
        this.attachControl();
    }
}
