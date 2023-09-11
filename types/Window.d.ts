import Event from './Event';
import Scene from './Scene';
import Store from './Store';

declare global {
    interface Window {
        WhoaCanvas: HTMLCanvasElement;
        WhoaCanvasContainer: HTMLDivElement;
        WhoaStore: Store;
        WhoaEvent: Event;
        WhoaScene: Scene;
    }
}
