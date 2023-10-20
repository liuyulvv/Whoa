import Entity, { EntityCreateInfo } from './Entity';
import EntityModel from './EntityModel';
import EntityRole from './EntityRole';
import EntityType from './EntityType';

export abstract class EntityControl extends EntityModel {
    protected entity: Entity | null = null;
    protected subID: string;

    public constructor(entityID: string, info: EntityCreateInfo) {
        super(entityID, info);
        this.subID = '';
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
        const info: EntityCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            width: 1000,
            height: 1000,
            depth: 1000,
            meshURL: 'assets/models/',
            meshName: 'arrow_2D.glb',
            rotation: [0, 0, 0]
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

    public onSelect(selected?: boolean): void {
        console.log(selected);
    }
}

export class EntityControlRotate3D extends EntityControl {
    private static instance: EntityControlRotate3D;

    private constructor() {
        const entityID = 'ControlRotate3D';
        const info: EntityCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            width: 1000,
            height: 1000,
            depth: 1000,
            meshURL: 'assets/models/',
            meshName: 'arrow_3D.glb',
            rotation: [0, 0, 0]
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
        this.entity = entity;
        this.show();
        this.subID = WhoaEvent.sub('CHANGE_CAMERA_TO_2D', () => {
            EntityControlRotate2D.get().attach(entity);
            this.detach();
        });
    }

    public onSelect(selected?: boolean): void {
        console.log(selected);
    }
}

export class EntityControlMove2D extends EntityControl {
    private static instance: EntityControlMove2D;

    private constructor() {
        const entityID = 'ControlMove2D';
        const info: EntityCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            width: 1000,
            height: 1000,
            depth: 1000,
            meshURL: 'assets/models/',
            meshName: 'arrow_move.glb',
            rotation: [-Math.PI / 2, 0, 0]
        };
        super(entityID, info);
    }

    public static get(): EntityControlMove2D {
        if (!EntityControlMove2D.instance) {
            EntityControlMove2D.instance = new EntityControlMove2D();
        }
        return EntityControlMove2D.instance;
    }

    public attach(entity: Entity) {
        this.entity = entity;
        this.show();
        this.subID = WhoaEvent.sub('CHANGE_CAMERA_TO_3D', () => {
            EntityControlMove3D.get().attach(entity);
            this.detach();
        });
    }

    public onSelect(selected?: boolean): void {
        console.log(selected);
    }
}

export class EntityControlMove3D extends EntityControl {
    private static instance: EntityControlMove3D;

    private constructor() {
        const entityID = 'ControlMove3D';
        const info: EntityCreateInfo = {
            role: EntityRole.ROOT,
            type: EntityType.CONTROL,
            hovered: false,
            selected: false,
            visible: false,
            pickable: true,
            movable: true,
            width: 1000,
            height: 1000,
            depth: 1000,
            meshURL: 'assets/models/',
            meshName: 'arrow_move.glb',
            rotation: [0, 0, 0]
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
        this.entity = entity;
        if (this.entity.isSelected) {
            this.show();
            this.subID = WhoaEvent.sub('CHANGE_CAMERA_TO_2D', () => {
                EntityControlMove2D.get().attach(entity);
                this.detach();
            });
        }
    }

    public onSelect(selected?: boolean): void {
        console.log(selected);
    }
}
