import {
    ArcRotateCamera,
    Engine as BabylonEngine,
    Scene as BabylonScene,
    Viewport as BabylonViewport,
    Camera
} from '@babylonjs/core';
import { Vector3 } from 'src/math/Vector';
import { Camera2DPointersInput, Camera3DPointersInput } from './CameraInput';

export enum CameraMode {
    MODE_2D,
    MODE_3D
}

export enum LayerMask {
    ONLY_2D = 1,
    ONLY_3D = 2,
    BOTH = 3
}

export class Camera2D {
    private engine_: BabylonEngine;
    private scene_: BabylonScene;
    private camera_: ArcRotateCamera;
    private old_radius_: number;

    public constructor(engine: BabylonEngine, scene: BabylonScene) {
        this.engine_ = engine;
        this.scene_ = scene;
        this.camera_ = new ArcRotateCamera('2D', Math.PI / 2, 0, 20000, Vector3.Zero(), this.scene_);
        this.camera_.minZ = 1000;
        this.camera_.maxZ = 10000000;
        this.camera_.layerMask = LayerMask.ONLY_2D;
        this.camera_.upVector = new Vector3(0, 0, 1);
        this.camera_.lowerBetaLimit = -20000;
        this.camera_.upperBetaLimit = 20000;
        this.camera_.lowerAlphaLimit = -20000;
        this.camera_.upperAlphaLimit = 20000;
        this.camera_.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.camera_.orthoLeft = -20000;
        this.camera_.orthoRight = 20000;
        this.old_radius_ = this.camera_.radius;

        this.scene_.onBeforeRenderObservable.add(() => {
            const canvas = this.engine_.getRenderingCanvas();
            if (canvas && this.old_radius_ !== this.camera_.radius) {
                const radius_change_ratio = this.camera_.radius / this.old_radius_;
                this.camera_.orthoLeft! *= radius_change_ratio;
                this.camera_.orthoRight! *= radius_change_ratio;
                this.old_radius_ = this.camera_.radius;
                this.SetOrthoCameraTopBottom(canvas.height / canvas.width);
            }
        });
    }

    public Attach(): void {
        this.camera_.attachControl(this.engine_.getRenderingCanvas(), true);
        this.scene_.activeCamera = this.camera_;
    }

    public EnableCameraInput(): void {
        this.camera_.inputs.clear();
        this.camera_.inputs.addMouseWheel();
        this.camera_.inputs.add(Camera2DPointersInput.Get());
        this.camera_.wheelPrecision = 0.003;
    }

    public DisableCameraInput(): void {
        this.camera_.inputs.clear();
    }

    public GetViewport(): BabylonViewport {
        return this.camera_.viewport;
    }

    public SetOrthoCameraTopBottom(ratio: number) {
        this.camera_.orthoTop = this.camera_.orthoRight! * ratio;
        this.camera_.orthoBottom = this.camera_.orthoLeft! * ratio;
    }
}

export class Camera3D {
    private engine_: BabylonEngine;
    private scene_: BabylonScene;
    private camera_: ArcRotateCamera;

    public constructor(engine: BabylonEngine, scene: BabylonScene) {
        this.engine_ = engine;
        this.scene_ = scene;
        this.camera_ = new ArcRotateCamera('3D', Math.PI / 2, Math.PI / 4, 30000, Vector3.Zero(), this.scene_);
        this.camera_.minZ = 1000;
        this.camera_.maxZ = 10000000;
        this.camera_.layerMask = LayerMask.ONLY_3D;
        this.camera_.upVector = new Vector3(0, 0, 1);
    }

    public Attach(): void {
        this.camera_.attachControl(this.engine_.getRenderingCanvas(), true, false);
        this.scene_.activeCamera = this.camera_;
    }

    public EnableCameraInput(): void {
        this.camera_.inputs.clear();
        this.camera_.inputs.addMouseWheel();
        this.camera_.inputs.add(Camera3DPointersInput.get());
        this.camera_.wheelPrecision = 0.003;
    }

    public DisableCameraInput(): void {
        this.camera_.inputs.clear();
    }

    public GetViewport(): BabylonViewport {
        return this.camera_.viewport;
    }
}
