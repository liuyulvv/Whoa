import {
    ArcRotateCamera,
    ArcRotateCameraPointersInput,
    Engine as BabylonEngine,
    Scene as BabylonScene,
    Viewport as BabylonViewport,
    Camera,
    Nullable,
    PointerTouch,
    Vector3
} from '@babylonjs/core';

export enum CameraMode {
    MODE_2D,
    MODE_3D
}

export class Camera2D {
    private engine: BabylonEngine;
    private scene: BabylonScene;
    private camera: ArcRotateCamera;
    private oldRadius: number;
    public constructor(engine: BabylonEngine, scene: BabylonScene) {
        this.engine = engine;
        this.scene = scene;
        this.camera = new ArcRotateCamera('2D', -Math.PI / 2, 0, 10, Vector3.Zero(), this.scene);
        this.camera.lowerBetaLimit = -10;
        this.camera.upperBetaLimit = 10;
        this.camera.lowerAlphaLimit = -10;
        this.camera.upperAlphaLimit = 10;
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.camera.orthoLeft = -10;
        this.camera.orthoRight = 10;
        this.camera.inputs.clear();
        this.camera.inputs.addMouseWheel();
        this.camera.inputs.add(Camera2DPointersInput.getInstance());
        this.oldRadius = this.camera.radius;
        scene.onBeforeRenderObservable.add(() => {
            const canvas = this.engine.getRenderingCanvas();
            if (canvas && this.oldRadius !== this.camera.radius) {
                const radiusChangeRatio = this.camera.radius / this.oldRadius;
                this.camera.orthoLeft! *= radiusChangeRatio;
                this.camera.orthoRight! *= radiusChangeRatio;
                this.oldRadius = this.camera.radius;
                this.setOrthoCameraTopBottom(canvas.height / canvas.width);
            }
        });
    }

    public attach() {
        this.camera.attachControl(this.engine.getRenderingCanvas(), true);
        this.scene.activeCamera = this.camera;
    }

    public get viewport(): BabylonViewport {
        return this.camera.viewport;
    }

    public setOrthoCameraTopBottom(ratio: number) {
        this.camera.orthoTop = this.camera.orthoRight! * ratio;
        this.camera.orthoBottom = this.camera.orthoLeft! * ratio;
    }
}

export class Camera3D {
    private engine: BabylonEngine;
    private scene: BabylonScene;
    private camera: ArcRotateCamera;

    public constructor(engine: BabylonEngine, scene: BabylonScene) {
        this.engine = engine;
        this.scene = scene;
        this.camera = new ArcRotateCamera('3D', -Math.PI / 2, 0, 10, Vector3.Zero(), this.scene);
        this.camera.inputs.clear();
        this.camera.inputs.addMouseWheel();
        this.camera.inputs.add(Camera3DPointersInput.getInstance());
    }

    public attach() {
        this.camera.attachControl(this.engine.getRenderingCanvas(), true, false);
        this.scene.activeCamera = this.camera;
    }

    public get viewport(): BabylonViewport {
        return this.camera.viewport;
    }
}

class Camera2DPointersInput extends ArcRotateCameraPointersInput {
    private static instance: Camera2DPointersInput;

    private constructor() {
        super();
    }

    public static getInstance(): Camera2DPointersInput {
        if (!Camera2DPointersInput.instance) {
            Camera2DPointersInput.instance = new Camera2DPointersInput();
        }
        return Camera2DPointersInput.instance;
    }

    onTouch(point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void {
        if (this._ctrlKey || this._shiftKey || this._altKey || this._metaKey) {
            return;
        }
        if (this._buttonsPressed == 2) {
            this.camera.inertialPanningX += -offsetX / this.panningSensibility;
            this.camera.inertialPanningY += offsetY / this.panningSensibility;
        }
    }
}

class Camera3DPointersInput extends ArcRotateCameraPointersInput {
    private static instance: Camera3DPointersInput;

    private constructor() {
        super();
    }

    public static getInstance(): Camera3DPointersInput {
        if (!Camera3DPointersInput.instance) {
            Camera3DPointersInput.instance = new Camera3DPointersInput();
        }
        return Camera3DPointersInput.instance;
    }

    onTouch(point: Nullable<PointerTouch>, offsetX: number, offsetY: number): void {
        if (this._ctrlKey || this._shiftKey || this._altKey || this._metaKey) {
            return;
        }
        WhoaInteraction.setPointerTouch(true);
        super.onTouch(point, offsetX, offsetY);
    }
}
