import { CameraMode } from './Camera';
import Scene from './Scene';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.Whoa3D = {
    CameraMode: CameraMode
};

window.Whoa3D = Scene.get();
