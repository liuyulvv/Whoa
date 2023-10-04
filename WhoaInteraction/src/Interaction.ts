import Keyboard from './Keyboard';
import Mouse from './Mouse';

class Interaction {
    private static instance: Interaction;
    private mouse: Mouse;
    private keyboard: Keyboard;

    private constructor() {
        this.mouse = Mouse.get();
        this.keyboard = Keyboard.get();
    }

    public static get(): Interaction {
        if (!Interaction.instance) {
            Interaction.instance = new Interaction();
        }
        return Interaction.instance;
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

export default Interaction;
