import {
    ArcRotateCamera,
    Engine as BabylonEngine,
    Scene as BabylonScene,
    Viewport as BabylonViewport,
    Camera,
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
        this.camera = new ArcRotateCamera('2D', 0, 0, 10, Vector3.Zero(), this.scene);
        this.camera.beta = 0;
        this.camera.lowerBetaLimit = 0;
        this.camera.upperBetaLimit = 0;
        this.camera.alpha = 0;
        this.camera.lowerAlphaLimit = 0;
        this.camera.upperAlphaLimit = 0;
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.camera.orthoLeft = -10;
        this.camera.orthoRight = 10;
        this.camera.inputs.clear();
        this.camera.inputs.addMouseWheel();
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
    }

    public attach() {
        this.camera.attachControl(this.engine.getRenderingCanvas(), true);
        this.scene.activeCamera = this.camera;
    }

    public get viewport(): BabylonViewport {
        return this.camera.viewport;
    }
}
