import { LinesMesh, Mesh, StandardMaterial, VertexData } from '@babylonjs/core';
import Scene from 'src/babylon/Scene';
import { EntityWallCreateInfo } from 'src/entities/EntityWall';
import { Color3 } from 'src/math/Color';
import { Vector3 } from 'src/math/Vector';
import { PointerButton } from 'src/utils/Pointer';
import { v4 as uuid } from 'uuid';
import EntityWallManager from './EntityWallManager';

enum CreateStatus {
    START,
    CREATE
}

export default class CreateWallByLine {
    private static instance: CreateWallByLine;
    private canvas: HTMLCanvasElement;
    private status: CreateStatus;
    private start: WhoaMath.Point3;
    private end: WhoaMath.Point3;
    private wallMidLine: LinesMesh | undefined;
    private wallMesh: Mesh | undefined;
    private wallMeshMaterial: StandardMaterial;

    private orthogonal: boolean = true;
    private radian: number = 0;
    private wallWidth: number = 240;
    private wallHeight: number = 2800;

    private bindPointerMove: (event: PointerEvent) => void;
    private bindPointerUp: (event: PointerEvent) => void;
    private bindKeyUp: (event: KeyboardEvent) => void;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.status = CreateStatus.START;
        this.start = new WhoaMath.Point3(0, 0, 0);
        this.end = new WhoaMath.Point3(0, 0, 0);
        this.wallMeshMaterial = new StandardMaterial(uuid());
        this.wallMeshMaterial.emissiveColor = new Color3(1, 1, 1);
        this.bindPointerMove = this.onPointerMove.bind(this);
        this.bindPointerUp = this.onPointerUp.bind(this);
        this.bindKeyUp = this.onKeyUp.bind(this);
    }

    public static get(): CreateWallByLine {
        if (!CreateWallByLine.instance) {
            CreateWallByLine.instance = new CreateWallByLine();
        }
        return CreateWallByLine.instance;
    }

    public onCreateStart(): void {
        this.registerPointerEvent();
        this.registerKeyEvent();
    }

    private onCreate(): void {
        this.start.z = this.wallHeight;
        this.end.z = this.wallHeight;
        if (this.orthogonal) {
            const orthogonalPoint = this.end.Clone();
            if (this.end.x != this.start.x) {
                orthogonalPoint.y = this.start.y;
            }
            const vecA = WhoaMath.Vector3.FromPoint3(orthogonalPoint.Subtract(this.start));
            const vecB = WhoaMath.Vector3.FromPoint3(this.end.Subtract(this.start));
            const radian = vecA.GetRadianBetween(vecB);
            if (radian > Math.PI / 4) {
                orthogonalPoint.x = this.start.x;
                orthogonalPoint.y = this.end.y;
            }
            this.end = orthogonalPoint;
        }
        const vecMidLine = WhoaMath.Vector3.FromPoint3(this.end.Subtract(this.start));
        const direction = vecMidLine.y > 0 ? 1 : -1;
        this.radian = vecMidLine.GetRadianBetween(new WhoaMath.Vector3(1, 0, 0)) * direction;
        const start = new Vector3(this.start.x, this.start.y, this.start.z);
        const end = new Vector3(this.end.x, this.end.y, this.end.z);
        const startLeft = start.Clone();
        const startRight = start.Clone();
        const endLeft = end.Clone();
        const endRight = end.Clone();
        startLeft.x = startLeft.x - (this.wallWidth / 2) * Math.sin(-this.radian);
        startLeft.y = startLeft.y - (this.wallWidth / 2) * Math.cos(-this.radian);
        startRight.x = startRight.x + (this.wallWidth / 2) * Math.sin(-this.radian);
        startRight.y = startRight.y + (this.wallWidth / 2) * Math.cos(-this.radian);
        endLeft.x = endLeft.x - (this.wallWidth / 2) * Math.sin(-this.radian);
        endLeft.y = endLeft.y - (this.wallWidth / 2) * Math.cos(-this.radian);
        endRight.x = endRight.x + (this.wallWidth / 2) * Math.sin(-this.radian);
        endRight.y = endRight.y + (this.wallWidth / 2) * Math.cos(-this.radian);
        if (!this.wallMesh) {
            this.wallMesh = new Mesh(uuid());
            this.wallMesh.material = this.wallMeshMaterial;
        }
        const vertexData = new VertexData();
        const earcutResult = WhoaGeometry.Earcut.triangulate2D([startLeft, endLeft, endRight, startRight]);
        vertexData.positions = earcutResult.vertices;
        vertexData.indices = earcutResult.indices;
        vertexData.applyToMesh(this.wallMesh, true);
        if (!this.wallMidLine) {
            this.wallMidLine = Scene.get().MeshBuilder.CreateLines(uuid(), { points: [start, end], updatable: true });
            this.wallMidLine.color = Color3.Red();
        } else {
            this.wallMidLine = Scene.get().MeshBuilder.CreateLines(this.wallMidLine.id, {
                points: [start, end],
                instance: this.wallMidLine as LinesMesh
            });
            this.wallMidLine.color = Color3.Red();
        }
    }

    public onCreateEnd(): void {
        this.unregisterPointerEvent();
        this.unregisterKeyEvent();
        // @info: Maybe we can create space after create a wall.
        // create space
        const allWall = EntityWallManager.get().getAllWall();
        const vectorPoints = new WhoaGeometrySpace.vector_string();
        allWall.forEach((wall) => {
            const box = wall.getBoundingBox();
            if (box) {
                let points = '';
                points += box.bottomFarLeft.x.toString() + ' ' + box.bottomFarLeft.y + ' ';
                points += box.bottomFarRight.x.toString() + ' ' + box.bottomFarRight.y + ' ';
                points += box.bottomNearRight.x.toString() + ' ' + box.bottomNearRight.y + ' ';
                points += box.bottomNearLeft.x.toString() + ' ' + box.bottomNearLeft.y;
                vectorPoints.push_back(points);
            }
        });
        const vectorSpace = WhoaGeometrySpace.get_spaces(vectorPoints);
        for (let i = 0; i < vectorSpace.size(); i++) {
            const space = vectorSpace.get(i);
            const points = space.vertices();
            const positions: Vector3[] = [];
            const vertexData = new VertexData();
            for (let j = 0; j < points.size(); j++) {
                positions.push(new Vector3(points.get(j).x(), points.get(j).y(), 0));
            }
            const earcutResult = WhoaGeometry.Earcut.triangulate2D(positions);
            vertexData.positions = earcutResult.vertices;
            vertexData.indices = earcutResult.indices;
            const spaceMesh = new Mesh(uuid());
            const spaceMeshMaterial = new StandardMaterial(uuid());
            spaceMeshMaterial.emissiveColor = new Color3(1, 0, 0);
            spaceMesh.material = spaceMeshMaterial;
            vertexData.applyToMesh(spaceMesh, true);
        }
    }

    private registerKeyEvent() {
        this.canvas.addEventListener('keyup', this.bindKeyUp);
    }

    private unregisterKeyEvent() {
        this.canvas.removeEventListener('keyup', this.bindKeyUp);
    }

    private registerPointerEvent() {
        this.canvas.addEventListener('pointermove', this.bindPointerMove);
        this.canvas.addEventListener('pointerup', this.bindPointerUp);
    }

    private unregisterPointerEvent() {
        this.canvas.removeEventListener('pointermove', this.bindPointerMove);
        this.canvas.removeEventListener('pointerup', this.bindPointerUp);
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (event.key == 'Shift') {
            this.orthogonal = !this.orthogonal;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                const mid = this.start.Add(this.end).Multiply(0.5);
                const info: EntityWallCreateInfo = {
                    role: Whoa.WhoaFramework.EntityRole.ROOT,
                    type: Whoa.WhoaFramework.EntityType.WALL,
                    hovered: false,
                    selected: false,
                    visible: true,
                    pickable: true,
                    movable: true,
                    width: this.wallWidth,
                    height: WhoaMath.Vector3.FromPoint3(this.end.Subtract(this.start)).Length(),
                    depth: this.wallHeight,
                    radian: this.radian + Math.PI / 2,
                    position: new Vector3(mid.x, mid.y, mid.z / 2)
                };
                EntityWallManager.get().create(info);
                this.start = this.end;
                this.wallMesh?.dispose();
                this.wallMesh = undefined;
            }
        } else if (PointerButton.RIGHT == event.button) {
            this.status = CreateStatus.START;
            this.wallMidLine?.dispose();
            this.wallMidLine = undefined;
            this.wallMesh?.dispose();
            this.wallMesh = undefined;
            WhoaEvent.pub('STOP_DRAW_LINE');
        }
    }
}
