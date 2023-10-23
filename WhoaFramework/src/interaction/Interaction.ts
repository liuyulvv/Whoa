import Entity from 'src/entities/Entity';

export default class Interaction {
    private static instance: Interaction;
    private canvas: HTMLCanvasElement;

    private pointerTouched: boolean;
    private pointerMoved: boolean;

    private lastHover: Entity | undefined;
    private lastSelect: Entity | undefined;
    private lastControl: Entity | undefined;

    private constructor() {
        this.canvas = WhoaCanvas;
        this.pointerTouched = false;
        this.pointerMoved = false;
        this.lastHover = undefined;
        this.lastSelect = undefined;
        this.lastControl = undefined;
        this.registerEvent();
    }

    public static get(): Interaction {
        if (!Interaction.instance) {
            Interaction.instance = new Interaction();
        }
        return Interaction.instance;
    }

    private registerEvent() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.onKeyDown(event);
        });

        WhoaEvent.sub('START_DRAW_LINE', () => {
            const createInfo: Whoa.WhoaFramework.EntityCreateInfo = {
                role: Whoa.WhoaFramework.EntityRole.ROOT,
                type: Whoa.WhoaFramework.EntityType.ORNAMENT,
                hovered: false,
                selected: false,
                visible: true,
                pickable: true,
                movable: true,
                width: 1000,
                height: 1000,
                depth: 1000,
                meshURL: 'assets/models/',
                meshName: 'arrow_move.glb',
                rotation: [-Math.PI / 2, 0, 0]
            };
            Whoa.WhoaFramework.EntityManager.get().createOrnament(createInfo);
        });

        WhoaEvent.sub('STOP_DRAW_LINE', () => {});

        WhoaEvent.sub('START_DRAW_BORDER', () => {
            const createInfo: Whoa.WhoaFramework.EntityCreateInfo = {
                role: Whoa.WhoaFramework.EntityRole.ROOT,
                type: Whoa.WhoaFramework.EntityType.ORNAMENT,
                hovered: false,
                selected: false,
                visible: true,
                pickable: true,
                movable: true,
                width: 30,
                height: 30,
                depth: 30,
                meshURL: 'assets/models/',
                meshName: 'deer.glb',
                rotation: [0, 0, 0]
            };
            Whoa.WhoaFramework.EntityManager.get().createOrnament(createInfo);
        });

        WhoaEvent.sub('STOP_DRAW_BORDER', () => {});
    }

    public setPointerTouch(touch: boolean): void {
        this.pointerTouched = touch;
    }

    private onKeyDown(event: KeyboardEvent) {
        if (this.onlyKey(event)) {
            if (event.key == '2') {
                WhoaScene.changeTo2D();
            } else if (event.key == '3') {
                WhoaScene.changeTo3D();
            }
        }
    }

    private onlyCtrl(event: KeyboardEvent): boolean {
        return (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey;
    }

    private onlyShift(event: KeyboardEvent): boolean {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.shiftKey;
    }

    private onlyKey(event: KeyboardEvent): boolean {
        return !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey;
    }
}
