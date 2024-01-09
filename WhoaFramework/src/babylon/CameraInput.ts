import { ArcRotateCameraPointersInput, IPointerEvent, Nullable, PointerTouch } from '@babylonjs/core';

export class Camera2DPointersInput extends ArcRotateCameraPointersInput {
    private static instance_: Camera2DPointersInput;
    private picked_: boolean;
    private touched_: boolean;

    private constructor() {
        super();
        this.picked_ = false;
        this.touched_ = false;
    }

    public static Get(): Camera2DPointersInput {
        if (!Camera2DPointersInput.instance_) {
            Camera2DPointersInput.instance_ = new Camera2DPointersInput();
        }
        return Camera2DPointersInput.instance_;
    }

    onButtonDown(evt: IPointerEvent): void {
        if (evt.button == 0) {
            const pick_info = WhoaScene.PickEntity();
            this.picked_ = pick_info.hit_;
        }
    }

    onTouch(point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void {
        if (this._ctrlKey || this._shiftKey || this._altKey || this._metaKey) {
            return;
        }
        if (this.picked_) {
            if (this._buttonsPressed == 2) {
                this.camera.inertialPanningX += -offsetX * 2;
                this.camera.inertialPanningY += offsetY * 2;
                if (!this.touched_) {
                    WhoaEvent.Pub('CAMERA_PERSPECTIVE_CHANGE_START');
                }
                this.touched_ = true;
            }
        } else {
            WhoaInteraction.SetPointerTouch(true);
            if (this._buttonsPressed == 1 || this._buttonsPressed == 2) {
                this.camera.inertialPanningX += -offsetX * 2;
                this.camera.inertialPanningY += offsetY * 2;
                if (!this.touched_) {
                    WhoaEvent.Pub('CAMERA_PERSPECTIVE_CHANGE_START');
                }
                this.touched_ = true;
            }
        }
    }

    onButtonUp(evt: IPointerEvent): void {
        if (evt.button == 0) {
            this.picked_ = false;
        }
        if (this.touched_) {
            WhoaEvent.Pub('CAMERA_PERSPECTIVE_CHANGE_END');
            this.touched_ = false;
        }
    }
}

export class Camera3DPointersInput extends ArcRotateCameraPointersInput {
    private static instance_: Camera3DPointersInput;
    private picked_: boolean;
    private touched_: boolean;

    private constructor() {
        super();
        this.picked_ = false;
        this.touched_ = false;
    }

    public static get(): Camera3DPointersInput {
        if (!Camera3DPointersInput.instance_) {
            Camera3DPointersInput.instance_ = new Camera3DPointersInput();
        }
        return Camera3DPointersInput.instance_;
    }

    onButtonDown(evt: IPointerEvent): void {
        if (evt.button == 0) {
            const pick_info = WhoaScene.PickEntity();
            this.picked_ = pick_info.hit_;
        }
    }

    onTouch(point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void {
        if (this._ctrlKey || this._shiftKey || this._altKey || this._metaKey || this.picked_) {
            return;
        }
        if (this._buttonsPressed == 2) {
            this.camera.inertialPanningX += -offsetX * 2;
            this.camera.inertialPanningY += offsetY * 2;
            if (!this.touched_) {
                WhoaEvent.Pub('CAMERA_PERSPECTIVE_CHANGE_START');
            }
            this.touched_ = true;
            return;
        }
        if (!this.picked_) {
            WhoaInteraction.SetPointerTouch(true);
            super.onTouch(point, offsetX, offsetY);
            if (!this.touched_) {
                WhoaEvent.Pub('CAMERA_PERSPECTIVE_CHANGE_START');
            }
            this.touched_ = true;
        }
    }

    onButtonUp(evt: IPointerEvent): void {
        if (evt.button == 0) {
            this.picked_ = false;
        }
        if (this.touched_) {
            WhoaEvent.Pub('CAMERA_PERSPECTIVE_CHANGE_END');
            this.touched_ = false;
        }
    }
}
