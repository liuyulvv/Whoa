import {
    ArcRotateCamera,
    Engine as BabylonEngine,
    Scene as BabylonScene,
    Color4,
    Matrix,
    Vector3
} from '@babylonjs/core';
import CameraMode from './CameraMode';
import MaterialManager from './MaterialManager';
import Mesh from './Mesh';
import MeshManager from './MeshManager';

export default class Scene {
    private static instance: Scene;
    private readonly canvas: HTMLCanvasElement;
    private readonly engine: BabylonEngine;
    private readonly scene: BabylonScene;
    private readonly camera2D: ArcRotateCamera;
    private readonly camera3D: ArcRotateCamera;
    private readonly meshManager: MeshManager;
    private readonly materialManager: MaterialManager;
    private readonly groundMesh: Mesh;
    private cameraMode: CameraMode;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.engine = new BabylonEngine(this.canvas);
        this.scene = new BabylonScene(this.engine);
        this.scene.clearColor = new Color4(1.0, 1.0, 1.0, 1.0);
        this.camera2D = new ArcRotateCamera('2D', 0, 0, 10, Vector3.Zero(), this.scene);
        this.camera2D.inputs.clear();
        this.camera2D.inputs.addMouseWheel();
        this.camera3D = new ArcRotateCamera('3D', 0, 0, 10, Vector3.Zero(), this.scene);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        WhoaEvent.sub('WHOA_WINDOW_RESIZE', () => {
            this.resize();
        });
        this.meshManager = new MeshManager(this.scene);
        this.materialManager = new MaterialManager(this.scene);
        this.groundMesh = this.meshManager.createGround();
        this.cameraMode = CameraMode.MODE_2D;
        this.resize();
        this.changeTo2D();
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
        WhoaEvent.pub('WHOA_CHANGE_TO_2D');
    }

    public changeTo3D(): void {
        this.camera3D.attachControl(this.engine.getRenderingCanvas(), true);
        this.scene.activeCamera = this.camera3D;
        this.cameraMode = CameraMode.MODE_3D;
        WhoaEvent.pub('WHOA_CHANGE_TO_3D');
    }

    public getWorldPos(point: Whoa.WhoaGeometry.Point2D): Whoa.WhoaGeometry.Point3D {
        const unproject = Vector3.Unproject(
            new Vector3(point.x, point.y, 0),
            this.engine.getRenderWidth(),
            this.engine.getRenderHeight(),
            Matrix.Identity(),
            this.scene.getViewMatrix(),
            this.scene.getProjectionMatrix()
        );
        const res = new Whoa.WhoaGeometry.Point3D(unproject.x, unproject.y, unproject.z);
        return res;
    }

    public getScreenPos(point: Whoa.WhoaGeometry.Point3D): Whoa.WhoaGeometry.Point2D {
        const res = new Whoa.WhoaGeometry.Point2D();
        if (this.getCameraMode() == CameraMode.MODE_2D) {
            const project = Vector3.Project(
                new Vector3(point.x, point.y, point.z),
                Matrix.Identity(),
                this.scene.getTransformMatrix(),
                this.camera2D.viewport.toGlobal(this.engine.getRenderWidth(), this.engine.getRenderHeight())
            );
            res.x = project.x;
            res.y = project.y;
        } else {
            const project = Vector3.Project(
                new Vector3(point.x, point.y, point.z),
                Matrix.Identity(),
                this.scene.getTransformMatrix(),
                this.camera3D.viewport.toGlobal(this.engine.getRenderWidth(), this.engine.getRenderHeight())
            );
            res.x = project.x;
            res.y = project.y;
        }
        return res;
    }

    public getMeshManager(): MeshManager {
        return this.meshManager;
    }

    public getMaterialManager(): MaterialManager {
        return this.materialManager;
    }
}
