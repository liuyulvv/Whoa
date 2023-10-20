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

    public onSelect(selected?: boolean): void {
        super.onSelect(selected);
        if (selected) {
            if (Scene.get().getCameraMode() == CameraMode.MODE_2D) {
                EntityControlRotate2D.get().attach(this);
                EntityControlMove2D.get().attach(this);
            } else {
                EntityControlRotate3D.get().attach(this);
                EntityControlMove3D.get().attach(this);
            }
        } else {
            EntityControlRotate2D.get().detach();
            EntityControlMove2D.get().detach();
            EntityControlRotate3D.get().detach();
            EntityControlMove3D.get().detach();
        }
    }
}
