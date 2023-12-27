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
        const positions: number[] = [];
        [startLeft, endLeft, endRight, startRight].forEach((point) => {
            positions.push(point.x);
            positions.push(point.y);
            positions.push(point.z);
        });
        // temp: both side render
        const indices = [0, 1, 2, 0, 2, 1, 0, 2, 3, 0, 3, 2];
        const vertexData = new VertexData();
        vertexData.positions = positions;
        vertexData.indices = indices;
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
        const allWall = EntityWallManager.get().getAllWall();
        const wallArrangements = new WhoaGeometry.vector_arrangement_2();
        const spaceSegment = new WhoaGeometry.vector_segment_2();
        allWall.forEach((wall) => {
            const box = wall.getBoundingBox();
            if (box) {
                // const bottomFarLeft = WhoaGeometry.create_point_2(
                //     WhoaUtil.NumberPrecision(box.bottomFarLeft.x),
                //     WhoaUtil.NumberPrecision(box.bottomFarLeft.y)
                // );
                // const bottomFarRight = WhoaGeometry.create_point_2(
                //     WhoaUtil.NumberPrecision(box.bottomFarRight.x),
                //     WhoaUtil.NumberPrecision(box.bottomFarRight.y)
                // );
                // const bottomNearRight = WhoaGeometry.create_point_2(
                //     WhoaUtil.NumberPrecision(box.bottomNearRight.x),
                //     WhoaUtil.NumberPrecision(box.bottomNearRight.y)
                // );
                // const bottomNearLeft = WhoaGeometry.create_point_2(
                //     WhoaUtil.NumberPrecision(box.bottomNearLeft.x),
                //     WhoaUtil.NumberPrecision(box.bottomNearLeft.y)
                // );
                const bottomFarLeft = WhoaGeometry.create_point_2(box.bottomFarLeft.x, box.bottomFarLeft.y);
                const bottomFarRight = WhoaGeometry.create_point_2(box.bottomFarRight.x, box.bottomFarRight.y);
                const bottomNearRight = WhoaGeometry.create_point_2(box.bottomNearRight.x, box.bottomNearRight.y);
                const bottomNearLeft = WhoaGeometry.create_point_2(box.bottomNearLeft.x, box.bottomNearLeft.y);
                // console.log(
                //     box.bottomFarLeft.x,
                //     box.bottomFarLeft.y,
                //     box.bottomFarRight.x,
                //     box.bottomFarRight.y,
                //     box.bottomNearRight.x,
                //     box.bottomNearRight.y,
                //     box.bottomNearLeft.x,
                //     box.bottomNearLeft.y
                // );
                const vectorSegment2 = new WhoaGeometry.vector_segment_2();
                vectorSegment2.push_back(WhoaGeometry.create_segment_2(bottomFarLeft, bottomFarRight));
                vectorSegment2.push_back(WhoaGeometry.create_segment_2(bottomFarRight, bottomNearRight));
                vectorSegment2.push_back(WhoaGeometry.create_segment_2(bottomNearRight, bottomNearLeft));
                vectorSegment2.push_back(WhoaGeometry.create_segment_2(bottomNearLeft, bottomFarLeft));

                spaceSegment.push_back(WhoaGeometry.create_segment_2(bottomFarLeft, bottomFarRight));
                spaceSegment.push_back(WhoaGeometry.create_segment_2(bottomFarRight, bottomNearRight));
                spaceSegment.push_back(WhoaGeometry.create_segment_2(bottomNearRight, bottomNearLeft));
                spaceSegment.push_back(WhoaGeometry.create_segment_2(bottomNearLeft, bottomFarLeft));

                const arrangement = WhoaGeometry.create_arrangement_2(vectorSegment2);
                wallArrangements.push_back(arrangement);
            }
        });
        // const arrangement = WhoaGeometry.create_arrangement_2(spaceSegment);
        // console.log(arrangement);
        const arrangement1 = WhoaGeometry.create_arrangement_2_from_walls(wallArrangements);
        console.log(arrangement1);
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
