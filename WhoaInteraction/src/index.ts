import { MouseButton } from './Mouse';
import WhoaInteraction from './WhoaInteraction';

window.WhoaInteraction = WhoaInteraction.get();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaInteraction = {
    MouseButton: MouseButton,
    WhoaInteraction: WhoaInteraction
};
