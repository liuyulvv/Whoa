import { Angle, Color3, LinesMesh, Vector3 } from '@babylonjs/core';
import Scene from 'src/babylon/Scene';
import { PointerButton } from 'src/utils/Pointer';
import { v4 as uuid } from 'uuid';

enum CreateStatus {
    START,
    CREATE
}

export default class CreateWallByLine {
    private static instance: CreateWallByLine;
    private canvas: HTMLCanvasElement;
    private status: CreateStatus;
    private start: Whoa.WhoaGeometry.Point3D;
    private end: Whoa.WhoaGeometry.Point3D;
    private wall: LinesMesh | undefined;
    private orthogonal: boolean;

    private bindPointerMove: (event: PointerEvent) => void;
    private bindPointerUp: (event: PointerEvent) => void;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.status = CreateStatus.START;
        this.start = new Whoa.WhoaGeometry.Point3D(0, 0, 0);
        this.end = new Whoa.WhoaGeometry.Point3D(0, 0, 0);
        this.orthogonal = true;
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

    private onCreate(): void {
        if (this.orthogonal) {
            const orthogonalPoint = this.end.clone();
            if (this.end.x != this.start.x) {
                orthogonalPoint.y = this.start.y;
            }
            const vecA = orthogonalPoint.subtract(this.start);
            const vecB = this.end.subtract(this.start);
            const radian = vecA.getRadianBetween(vecB);
            // const degree = Angle.FromRadians(vecA.getRadianBetween(vecB)).degrees();
            if (radian > Math.PI / 4) {
                orthogonalPoint.x = this.start.x;
                orthogonalPoint.y = this.end.y;
            }
            this.end = orthogonalPoint;
        }
        const start = new Vector3(this.start.x, this.start.y, 2.8);
        const end = new Vector3(this.end.x, this.end.y, 2.8);
        if (!this.wall) {
            this.wall = Scene.get().MeshBuilder.CreateLines(uuid(), { points: [start, end], updatable: true });
            this.wall.color = Color3.Red();
        } else {
            this.wall = Scene.get().MeshBuilder.CreateLines(this.wall.id, {
                points: [start, end],
                instance: this.wall as LinesMesh
            });
            this.wall.color = Color3.Red();
        }
    }

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
        if (CreateStatus.CREATE == this.status) {
            this.end = WhoaScene.screenToWorld(WhoaScene.getScreenPosition());
            this.onCreate();
        }
    }

    private onPointerUp(event: PointerEvent): void {
        if (PointerButton.LEFT == event.button) {
            if (CreateStatus.START == this.status) {
                this.start = WhoaScene.screenToWorld(WhoaScene.getScreenPosition());
                this.status = CreateStatus.CREATE;
            } else if (CreateStatus.CREATE == this.status) {
                this.end = WhoaScene.screenToWorld(WhoaScene.getScreenPosition());
                this.onCreate();
                this.start = this.end;
                this.wall = undefined;
            }
        } else if (PointerButton.RIGHT == event.button) {
            this.status = CreateStatus.START;
            this.wall?.dispose();
            this.wall = undefined;
            WhoaEvent.pub('STOP_DRAW_LINE');
        }
    }
}
