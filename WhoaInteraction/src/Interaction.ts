import Keyboard from './Keyboard';
import Mouse from './Mouse';

export default class Interaction {
    private static instance: Interaction;
    private mouse: Mouse;
    private keyboard: Keyboard;

    private constructor() {
        this.mouse = Mouse.get();
        this.keyboard = Keyboard.get();
        this.registerEvent();
    }

    public static get(): Interaction {
        if (!Interaction.instance) {
            Interaction.instance = new Interaction();
        }
        return Interaction.instance;
    }

    private registerEvent(): void {
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

    public isLeftPressed(): boolean {
        return this.mouse.isLeftPressed();
    }

    public isMidPressed(): boolean {
        return this.mouse.isMidPressed();
    }

    public isRightPressed(): boolean {
        return this.mouse.isRightPressed();
    }

    public setPointerTouch(touch: boolean): void {
        this.mouse.setPointerTouch(touch);
    }
}
