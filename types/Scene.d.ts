import CameraMode from './CameraMode';
import Vector2D from './Vector2D';
import Vector3D from './Vector3D';

declare class Scene {
    static get(): Scene;
    resize(): void;
    release(): void;
    getCameraMode(): CameraMode;
    changeTo2D(): void;
    changeTo3D(): void;
    getWorldPos(pos: Vector2D): Vector3D;
    getScreenPos(pos: Vector3D): Vector2D;
}

export default Scene;
