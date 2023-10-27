import Entity from './Entity';
import EntityModel, { EntityModelCreateInfo } from './EntityModel';
import EntityRole from './EntityRole';
import EntityType from './EntityType';

export abstract class EntityControl extends EntityModel {
    protected entity: Entity | null = null;
    protected subID: string;
    protected startPosition3D: Whoa.WhoaGeometry.Point3D;

    public constructor(entityID: string, info: EntityModelCreateInfo) {
        super(entityID, info);
        this.subID = '';
        this.startPosition3D = new Whoa.WhoaGeometry.Point3D();
    }

    public onEnter(): void {
        this.showOverlay();
    }

    public onLeave(): void {
        this.hideOverlay();
    }

    public attach(entity: Entity) {
        this.entity = entity;
        this.show();
    }

    public detach() {
        WhoaEvent.unsub('CHANGE_CAMERA_TO_2D', this.subID);
        WhoaEvent.unsub('CHANGE_CAMERA_TO_3D', this.subID);
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
            scale: [1000, 1000, 1000],
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
        this.entity = entity;
        this.show();
        this.subID = WhoaEvent.sub('CHANGE_CAMERA_TO_3D', () => {
            EntityControlRotate3D.get().attach(entity);
            this.detach();
        });
    }

    public onDragStart(): void {
        this.startPosition3D = WhoaScene.screenToWorld(WhoaScene.getScreenPosition());
    }

    public onDrag(): void {
        if (this.entity) {
            const position = WhoaScene.screenToWorld(WhoaScene.getScreenPosition());
            const origin = this.entity.position;
            const start = this.startPosition3D.subtract(origin);
            const now = position.subtract(origin);
            this.startPosition3D = position;
            const direction = start.x * now.y - start.y * now.x > 0 ? 1 : -1;
            const radian = start.getRadianBetween(now) * direction;
            this.entity.rotateLocalZ(radian);
            this.rotateLocalZ(radian);
        }
    }

    public onDragEnd(): void {}
}

export class EntityControlRotate3D extends EntityControl {
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
            scale: [1000, 1000, 1000],
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
        this.subID = WhoaEvent.sub('CHANGE_CAMERA_TO_2D', () => {
            EntityControlRotate2D.get().attach(entity);
            this.detach();
        });
    }
}

export class EntityControlMove3D extends EntityControl {
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
            scale: [1000, 1000, 1000],
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
        this.subID = WhoaEvent.sub('CHANGE_CAMERA_TO_2D', () => {
            this.detach();
        });
    }
}
