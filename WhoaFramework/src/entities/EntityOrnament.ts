import FreeMove from 'src/interaction/FreeMove';
import { EntityControlMove3D, EntityControlRotate2D, EntityControlRotate3D } from './EntityControl';
import EntityModel, { EntityModelCreateInfo } from './EntityModel';

export default class EntityOrnament extends EntityModel {
    public constructor(id: string, info: EntityModelCreateInfo) {
        super(id, info);
    }

    public AttachControl(): void {
        if (WhoaScene.GetCameraMode() == Whoa3D.CameraMode.MODE_2D) {
            EntityControlRotate2D.Get().Attach(this);
        } else {
            EntityControlRotate3D.Get().Attach(this);
            EntityControlMove3D.Get().Attach(this);
        }
    }

    public DetachControl(): void {
        EntityControlRotate2D.Get().Detach();
        EntityControlRotate3D.Get().Detach();
        EntityControlMove3D.Get().Detach();
    }

    public OnSelect(selected?: boolean): void {
        super.OnSelect(selected);
        if (selected) {
            FreeMove.Get().Attach(this);
            this.AttachControl();
        } else {
            this.DetachControl();
        }
    }

    public OnDragStart(): void {
        this.DetachControl();
        FreeMove.Get().OnDragStart();
    }

    public OnDrag(): void {
        FreeMove.Get().OnDrag();
    }

    public OnDragEnd(): void {
        this.AttachControl();
        FreeMove.Get().OnDragEnd();
    }
}
