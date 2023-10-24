import { Vector3 } from '@babylonjs/core';

enum CreateStatus {
    START,
    END
}

export default class CreateWallByLine {
    private static instance: CreateWallByLine;
    private canvas: HTMLCanvasElement;
    private status: CreateStatus;
    private start: Vector3;
    private end: Vector3;

    private bindPointerMove: (event: PointerEvent) => void;
    private bindPointerUp: (event: PointerEvent) => void;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.status = CreateStatus.END;
        this.start = new Vector3();
        this.end = new Vector3();
        this.bindPointerMove = this.onPointerMove.bind(this);
        this.bindPointerUp = this.onPointerUp.bind(this);
    }

    public static get(): CreateWallByLine {
        if (!CreateWallByLine.instance) {
            CreateWallByLine.instance = new CreateWallByLine();
        }
        return CreateWallByLine.instance;
    }

    public onCreateStart(): void {
        this.registerPointerEvent();
    }

    private onCreate(): void {}

    public onCreateEnd(): void {
        this.unregisterPointerEvent();
    }

    private registerPointerEvent() {
        this.canvas.addEventListener('pointermove', this.bindPointerMove);
        this.canvas.addEventListener('pointerup', this.bindPointerUp);
    }

    private unregisterPointerEvent() {
        this.canvas.removeEventListener('pointermove', this.bindPointerMove);
        this.canvas.removeEventListener('pointerup', this.bindPointerUp);
    }

    private onPointerMove(event: PointerEvent): void {
        if (CreateStatus.START == this.status) {
            this.end = new Vector3(event.clientX, event.clientY);
            this.onCreate();
        }
    }

    private onPointerUp(event: PointerEvent): void {
        if (CreateStatus.END == this.status) {
            this.status = CreateStatus.START;
            this.start = new Vector3(event.clientX, event.clientY, 0);
        } else if (CreateStatus.START == this.status) {
            this.status = CreateStatus.END;
        }
    }
}
