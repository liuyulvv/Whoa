import {
    AxesViewer,
    Engine as BabylonEngine,
    Mesh as BabylonMesh,
    Scene as BabylonScene,
    BoundingInfo,
    MeshBuilder,
    PointerEventTypes,
    PointerInfo,
    SceneLoader
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { GridMaterial } from '@babylonjs/materials';
import { Color3, Color4 } from 'src/math/Color';
import { Matrix } from 'src/math/Matrix';
import { Vector3 } from 'src/math/Vector';
import { Camera2D, Camera3D, CameraMode } from './Camera';
import Mesh from './Mesh';

export interface PickInfo {
    hit_: boolean;
    mesh_id_: string;
}

export default class Scene {
    private static instance_: Scene;
    private readonly canvas_: HTMLCanvasElement;
    private readonly engine_: BabylonEngine;
    private readonly scene_: BabylonScene;
    private readonly camera_2D_: Camera2D;
    private readonly camera_3D_: Camera3D;
    private readonly ground_mesh_: BabylonMesh;
    private camera_mode_: CameraMode;

    private constructor() {
        this.canvas_ = WhoaCanvas;
        this.engine_ = new BabylonEngine(this.canvas_);
        this.scene_ = new BabylonScene(this.engine_);
        new AxesViewer(this.scene_, 1000);
        this.scene_.clearColor = new Color4(1.0, 1.0, 1.0, 1.0);
        const helper = this.scene_.createDefaultEnvironment({
            environmentTexture: '/assets/env/environmentSpecular.env',
            createGround: false,
            createSkybox: false
        });
        helper?.setMainColor(new Color3(1.0, 1.0, 1.0));
        this.camera_2D_ = new Camera2D(this.engine_, this.scene_);
        this.camera_3D_ = new Camera3D(this.engine_, this.scene_);
        this.EnableCameraInput();
        this.ground_mesh_ = MeshBuilder.CreatePlane('ground', { width: 1000000, height: 1000000 }, this.scene_);
        this.ground_mesh_.isPickable = false;
        this.ground_mesh_.rotate(new Vector3(1, 0, 0), Math.PI / 2);
        const ground_mesh_material = new GridMaterial('ground', this.scene_);
        ground_mesh_material.majorUnitFrequency = 1;
        ground_mesh_material.minorUnitVisibility = 0.5;
        ground_mesh_material.gridRatio = 1000;
        ground_mesh_material.useMaxLine = true;
        ground_mesh_material.opacity = 0.5;
        ground_mesh_material.zOffset = 1;
        ground_mesh_material.zOffsetUnits = 10;
        this.ground_mesh_.material = ground_mesh_material;

        this.engine_.runRenderLoop(() => {
            this.scene_.render();
        });
        WhoaEvent.Sub('WHOA_WINDOW_RESIZE', () => {
            this.Resize();
        });
        this.Resize();
        this.camera_mode_ = CameraMode.MODE_2D;
        WhoaEvent.Sub('CHANGE_TO_2D_CAMERA', () => {
            this.ChangeTo2D();
        });
        WhoaEvent.Sub('CHANGE_TO_3D_CAMERA', () => {
            this.ChangeTo3D();
        });
        this.ChangeTo2D();
        this.AddPointerWheel();
    }

    public static Get(): Scene {
        if (!Scene.instance_) {
            Scene.instance_ = new Scene();
        }
        return Scene.instance_;
    }

    public Resize(): void {
        this.engine_.resize();
        this.camera_2D_.SetOrthoCameraTopBottom(this.canvas_.height / this.canvas_.width);
    }

    public Release(): void {
        this.engine_.dispose();
    }

    public GetCameraMode(): CameraMode {
        return this.camera_mode_;
    }

    private ChangeTo2D(): void {
        this.camera_2D_.Attach();
        this.camera_mode_ = CameraMode.MODE_2D;
    }

    private ChangeTo3D(): void {
        this.camera_3D_.Attach();
        this.camera_mode_ = CameraMode.MODE_3D;
    }

    public ScreenToWorld(point: WhoaMath.Point2): WhoaMath.Point3 {
        const unproject = Vector3.Unproject(
            new Vector3(point.x, point.y, 0),
            this.engine_.getRenderWidth(),
            this.engine_.getRenderHeight(),
            Matrix.Identity(),
            this.scene_.getViewMatrix(),
            this.scene_.getProjectionMatrix()
        );
        const res = new WhoaMath.Point3(unproject.x, unproject.y, unproject.z);
        return res;
    }

    public WorldToScreen(point: WhoaMath.Point3): WhoaMath.Point2 {
        const res = new WhoaMath.Point2();
        if (this.GetCameraMode() == CameraMode.MODE_2D) {
            const project = Vector3.Project(
                new Vector3(point.x, point.y, point.z),
                Matrix.Identity(),
                this.scene_.getTransformMatrix(),
                this.camera_2D_.GetViewport().toGlobal(this.engine_.getRenderWidth(), this.engine_.getRenderHeight())
            );
            res.x = project.x;
            res.y = project.z;
        } else {
            const project = Vector3.Project(
                new Vector3(point.x, point.y, point.z),
                Matrix.Identity(),
                this.scene_.getTransformMatrix(),
                this.camera_3D_.GetViewport().toGlobal(this.engine_.getRenderWidth(), this.engine_.getRenderHeight())
            );
            res.x = project.x;
            res.y = project.z;
        }
        return res;
    }

    public GetScreenPosition(): WhoaMath.Point2 {
        return new WhoaMath.Point2(this.scene_.pointerX, this.scene_.pointerY);
    }

    public GetGroundPosition(): WhoaMath.Point3 {
        const babylon_pick_info = this.scene_.pick(this.scene_.pointerX, this.scene_.pointerY, (mesh) => {
            return mesh == this.ground_mesh_;
        });
        if (babylon_pick_info.hit && babylon_pick_info.pickedPoint) {
            return new WhoaMath.Point3(
                babylon_pick_info.pickedPoint.x,
                babylon_pick_info.pickedPoint.y,
                babylon_pick_info.pickedPoint.z
            );
        }
        return new WhoaMath.Point3(0, 0, 0);
    }

    public SetEntityHoverColor(): void {
        this.scene_.getBoundingBoxRenderer().frontColor = Color3.FromHexString('#479ef5');
        this.scene_.getBoundingBoxRenderer().backColor = Color3.FromHexString('#479ef5');
    }

    public SetEntitySelectColor(): void {
        this.scene_.getBoundingBoxRenderer().frontColor = Color3.FromHexString('#5b5fc7');
        this.scene_.getBoundingBoxRenderer().backColor = Color3.FromHexString('#5b5fc7');
    }

    public PickEntity(): PickInfo {
        const babylon_pick_info = this.scene_.pick(
            this.scene_.pointerX,
            this.scene_.pointerY,
            undefined,
            false,
            undefined,
            (p0, p1, p2, ray) => {
                const p0_p1 = p0.subtract(p1);
                const p2_p1 = p2.subtract(p1);
                const normal = Vector3.Cross(p0_p1, p2_p1);
                return Vector3.Dot(ray.direction, normal) < 0;
            }
        );
        const pick_info: PickInfo = {
            hit_: babylon_pick_info.hit,
            mesh_id_: babylon_pick_info.pickedMesh ? babylon_pick_info.pickedMesh.id : ''
        };
        return pick_info;
    }

    public EnableCameraInput(): void {
        this.camera_2D_.EnableCameraInput();
        this.camera_3D_.EnableCameraInput();
    }

    public DisableCameraInput(): void {
        this.camera_2D_.DisableCameraInput();
        this.camera_3D_.DisableCameraInput();
    }

    public ImportMeshAsync(baseURL: string, meshName: string, entity_id: string) {
        return SceneLoader.ImportMeshAsync('', baseURL, meshName, this.scene_).then((result) => {
            const meshes: BabylonMesh[] = [];
            result.meshes.forEach((mesh) => {
                mesh.id = entity_id;
                const child_meshes = mesh.getChildMeshes();
                if (child_meshes.length > 0) {
                    let min = child_meshes[0].getBoundingInfo().boundingBox.minimumWorld;
                    let max = child_meshes[0].getBoundingInfo().boundingBox.maximumWorld;
                    for (let i = 0; i < child_meshes.length; i++) {
                        const mesh_min = child_meshes[i].getBoundingInfo().boundingBox.minimumWorld;
                        const mesh_max = child_meshes[i].getBoundingInfo().boundingBox.maximumWorld;
                        min = Vector3.Minimize(min, mesh_min);
                        max = Vector3.Maximize(max, mesh_max);
                    }
                    mesh.setBoundingInfo(new BoundingInfo(min, max));
                    meshes.push(mesh as BabylonMesh);
                }
            });
            if (meshes.length > 0) {
                return new Mesh(meshes[0].id, meshes[0]);
            }
        });
    }

    public AddPointerWheel(): void {
        let wheel_event_start: number | undefined = undefined;
        let wheel_event_timeout: ReturnType<typeof setTimeout> | undefined = undefined;
        const wheel_event_thresh = 300;
        const wheel_event_timeout_callback = () => {
            const current_time = Date.now();
            if (current_time - wheel_event_start! > wheel_event_thresh) {
                WhoaEvent.Pub('POINTER_WHEEL_END');
                wheel_event_start = undefined;
            } else {
                clearTimeout(wheel_event_timeout);
                wheel_event_timeout = setTimeout(wheel_event_timeout_callback, wheel_event_thresh);
            }
        };
        this.scene_.onPointerObservable.add((pointerInfo: PointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERWHEEL: {
                    if (wheel_event_start == undefined) {
                        WhoaEvent.Pub('POINTER_WHEEL_START');
                        wheel_event_start = Date.now();
                        wheel_event_timeout = setTimeout(wheel_event_timeout_callback, wheel_event_thresh);
                    } else {
                        wheel_event_start = Date.now();
                    }
                    break;
                }
            }
        });
    }
}
