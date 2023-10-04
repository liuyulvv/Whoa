import Keyboard from './Keyboard';
import Mouse from './Mouse';

class WhoaInteraction {
    private static instance: WhoaInteraction;
    private mouse: Mouse;
    private keyboard: Keyboard;

    private constructor() {
        this.mouse = Mouse.get();
        this.keyboard = Keyboard.get();
    }

    public static get(): WhoaInteraction {
        if (!WhoaInteraction.instance) {
            WhoaInteraction.instance = new WhoaInteraction();
        }
        return WhoaInteraction.instance;
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

export default WhoaInteraction;
