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
            Whoa3D.changeTo2D();
            const createInfo: Whoa.WhoaFramework.EntityCreateInfo = {
                role: Whoa.WhoaFramework.EntityRole.ROOT,
                type: Whoa.WhoaFramework.EntityType.WALL,
                hovered: true,
                selected: true,
                visible: true,
                pickable: true,
                movable: true,
                width: 1,
                height: 1,
                depth: 1
            };
            Whoa.WhoaFramework.EntityManager.get().createWall(createInfo);
        });

        WhoaEvent.sub('STOP_DRAW_LINE', () => {});

        WhoaEvent.sub('START_DRAW_BORDER', () => {
            const createInfo: Whoa.WhoaFramework.EntityOrnamentCreateInfo = {
                role: Whoa.WhoaFramework.EntityRole.ROOT,
                type: Whoa.WhoaFramework.EntityType.WALL,
                hovered: true,
                selected: true,
                visible: true,
                pickable: true,
                movable: true,
                width: 1,
                height: 1,
                depth: 1,
                meshURL: 'assets/models/',
                meshName: 'light.glb'
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
}
