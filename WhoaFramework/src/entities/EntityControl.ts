import { Point2 } from 'src/math/Point';
import { Vector2, Vector3 } from 'src/math/Vector';
import Entity from './Entity';
import EntityModel, { EntityModelCreateInfo } from './EntityModel';
import EntityRole from './EntityRole';
import EntityType from './EntityType';

export abstract class EntityControl extends EntityModel {
    protected entity: Entity | null = null;
    protected subID: string;
    protected startPosition2D: WhoaMath.Point2;

    public constructor(entityID: string, info: EntityModelCreateInfo) {
        super(entityID, info);
        this.subID = '';
        this.startPosition2D = new WhoaMath.Point2();
    }

    public onEnter(): void {
        this.showOverlay();
    }

    public onLeave(): void {
        this.hideOverlay();
    }

    public attach(entity: Entity) {
        this.entity = entity;
        const center = this.entity.getBoundingBox().center;
        this.translate(center.x, center.y, center.z, false);
        this.show();
    }

    public detach() {
        WhoaEvent.unsub('CHANGE_TO_2D_CAMERA', this.subID);
        WhoaEvent.unsub('CHANGE_TO_3D_CAMERA', this.subID);
        this.hide();
    }
}

export class EntityControlRotate2D extends EntityControl {
    private static instance: EntityControlRotate2D;

    private constructor() {
        const entityID = 'ControlRotate2D';
        const info: EntityModelCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            modelURL: 'assets/models/',
            modelName: 'arrow_2D.glb',
            scale: [1000000, 1000000, 1000000],
            rotation: [Math.PI / 2, 0, 0]
        };
        super(entityID, info);
    }

    public static get(): EntityControlRotate2D {
        if (!EntityControlRotate2D.instance) {
            EntityControlRotate2D.instance = new EntityControlRotate2D();
        }
        return EntityControlRotate2D.instance;
    }

    public attach(entity: Entity) {
        super.attach(entity);
        this.subID = WhoaEvent.sub('CHANGE_TO_3D_CAMERA', () => {
            EntityControlRotate3D.get().attach(entity);
            EntityControlMove3D.get().attach(entity);
            this.detach();
        });
    }

    public onDragStart(): void {
        this.startPosition2D = WhoaScene.getScreenPosition();
    }

    public onDrag(): void {
        if (this.entity) {
            const position = WhoaScene.getScreenPosition();
            const origin = WhoaScene.worldToScreen(this.entity.position);
            const start = Vector2.FromPoint2(<Point2>this.startPosition2D.Subtract(origin));
            const now = Vector2.FromPoint2(<Point2>position.Subtract(origin));
            this.startPosition2D = position;
            const direction = start.x * now.y - start.y * now.x > 0 ? -1 : 1;
            const radian = start.GetRadianBetween(now) * direction;
            this.entity.rotateLocalY(radian);
            this.rotateLocalY(radian);
        }
    }

    public onDragEnd(): void {}

    public rotateLocalY(radian: number): void {
        if (this.entity) {
            const position = this.entity.position;
            this.mesh.rotateAround(new Vector3(position.x, position.y, position.z), new Vector3(0, 0, 1), radian);
        }
    }
}

export abstract class EntityControl3D extends EntityControl {
    public updateDirection(): void {}
}

export class EntityControlRotate3D extends EntityControl3D {
    private static instance: EntityControlRotate3D;

    private constructor() {
        const entityID = 'ControlRotate3D';
        const info: EntityModelCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            modelURL: 'assets/models/',
            modelName: 'arrow_3D.glb',
            scale: [1000000, 1000000, 1000000],
            rotation: [Math.PI / 2, 0, 0]
        };
        super(entityID, info);
    }

    public static get(): EntityControlRotate3D {
        if (!EntityControlRotate3D.instance) {
            EntityControlRotate3D.instance = new EntityControlRotate3D();
        }
        return EntityControlRotate3D.instance;
    }

    public attach(entity: Entity) {
        super.attach(entity);
        this.subID = WhoaEvent.sub('CHANGE_TO_2D_CAMERA', () => {
            EntityControlRotate2D.get().attach(entity);
            this.detach();
        });
    }
}

export class EntityControlMove3D extends EntityControl3D {
    private static instance: EntityControlMove3D;

    private constructor() {
        const entityID = 'ControlMove3D';
        const info: EntityModelCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            modelURL: 'assets/models/',
            modelName: 'arrow_move.glb',
            scale: [1000000, 1000000, 1000000],
            rotation: [Math.PI / 2, 0, 0]
        };
        super(entityID, info);
    }

    public static get(): EntityControlMove3D {
        if (!EntityControlMove3D.instance) {
            EntityControlMove3D.instance = new EntityControlMove3D();
        }
        return EntityControlMove3D.instance;
    }

    public attach(entity: Entity) {
        super.attach(entity);
        this.subID = WhoaEvent.sub('CHANGE_TO_2D_CAMERA', () => {
            this.detach();
        });
    }
}
