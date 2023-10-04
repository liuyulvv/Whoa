import {
    ArcRotateCamera,
    Engine as BabylonEngine,
    Scene as BabylonScene,
    Color4,
    Matrix,
    Vector2,
    Vector3
} from '@babylonjs/core';
import CameraMode from './CameraMode';

class Scene {
    private static instance: Scene;
    private canvas: HTMLCanvasElement;
    private engine: BabylonEngine;
    private scene: BabylonScene;
    private camera2D: ArcRotateCamera;
    private camera3D: ArcRotateCamera;
    private cameraMode: CameraMode;

    private constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('main_canvas');
        this.engine = new BabylonEngine(this.canvas);
        this.scene = new BabylonScene(this.engine);
        this.scene.clearColor = new Color4(1.0, 1.0, 1.0, 1.0);
        this.cameraMode = CameraMode.MODE_2D;
        this.camera2D = new ArcRotateCamera('2D', 0, 0, 10, Vector3.Zero(), this.scene);
        this.camera2D.inputs.clear();
        this.camera2D.inputs.addMouseWheel();
        this.camera3D = new ArcRotateCamera('3D', 0, 0, 10, Vector3.Zero(), this.scene);
        this.changeTo2D();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.WhoaEvent.sub('WHOA_WINDOW_RESIZE', () => {
            this.resize();
        });
        this.resize();
    }

    public static get(): Scene {
        if (!Scene.instance) {
            Scene.instance = new Scene();
        }
        return Scene.instance;
    }

    public resize(): void {
        this.engine.resize();
    }

    public release(): void {
        this.engine.dispose();
    }

    public getCameraMode(): CameraMode {
        return this.cameraMode;
    }

    public changeTo2D(): void {
        this.camera2D.attachControl(this.engine.getRenderingCanvas(), true);
        this.scene.activeCamera = this.camera2D;
        this.cameraMode = CameraMode.MODE_2D;
        window.WhoaEvent.pub('WHOA_CHANGE_TO_2D');
    }

    public changeTo3D(): void {
        this.camera3D.attachControl(this.engine.getRenderingCanvas(), true);
        this.scene.activeCamera = this.camera3D;
        this.cameraMode = CameraMode.MODE_3D;
        window.WhoaEvent.pub('WHOA_CHANGE_TO_3D');
    }

    public getWorldPos(pos: Vector2): Vector3 {
        const res = Vector3.Unproject(
            new Vector3(pos.x, pos.y, 0),
            this.engine.getRenderWidth(),
            this.engine.getRenderHeight(),
            Matrix.Identity(),
            this.scene.getViewMatrix(),
            this.scene.getProjectionMatrix()
        );
        return res;
    }

    public getScreenPos(pos: Vector3): Vector2 {
        const res = new Vector2();
        if (window.WhoaScene.getCameraMode() == CameraMode.MODE_2D) {
            const project = Vector3.Project(
                new Vector3(pos.x, pos.y, pos.z),
                Matrix.Identity(),
                this.scene.getTransformMatrix(),
                this.camera2D.viewport.toGlobal(this.engine.getRenderWidth(), this.engine.getRenderHeight())
            );
            res.x = project.x;
            res.y = project.y;
        } else {
            const project = Vector3.Project(
                new Vector3(pos.x, pos.y, pos.z),
                Matrix.Identity(),
                this.scene.getTransformMatrix(),
                this.camera3D.viewport.toGlobal(this.engine.getRenderWidth(), this.engine.getRenderHeight())
            );
            res.x = project.x;
            res.y = project.y;
        }
        return res;
    }
}

export default Scene;
