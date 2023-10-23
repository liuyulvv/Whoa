import { CameraMode } from 'src/babylon/Camera';
import Scene from 'src/babylon/Scene';
import { EntityCreateInfo } from './Entity';
import { EntityControlMove3D, EntityControlRotate2D, EntityControlRotate3D } from './EntityControl';
import EntityModel from './EntityModel';

export default class EntityOrnament extends EntityModel {
    public constructor(entityID: string, info: EntityCreateInfo) {
        super(entityID, info);
    }

    public attachControl(): void {
        if (Scene.get().getCameraMode() == CameraMode.MODE_2D) {
            EntityControlRotate2D.get().attach(this);
        } else {
            EntityControlRotate3D.get().attach(this);
            EntityControlMove3D.get().attach(this);
        }
    }

    public detachControl(): void {
        EntityControlRotate2D.get().detach();
        EntityControlRotate3D.get().detach();
        EntityControlMove3D.get().detach();
    }

    public onSelect(selected?: boolean): void {
        super.onSelect(selected);
        if (selected) {
            Whoa.WhoaGeneral.FreeMove.get().attach(this);
            this.attachControl();
        } else {
            this.detachControl();
        }
    }

    public onDragStart(): void {
        this.detachControl();
        Whoa.WhoaGeneral.FreeMove.get().onDragStart();
    }

    public onDrag(): void {
        Whoa.WhoaGeneral.FreeMove.get().onDrag();
    }

    public onDragEnd(): void {
        this.attachControl();
        Whoa.WhoaGeneral.FreeMove.get().onDragEnd();
    }
}
