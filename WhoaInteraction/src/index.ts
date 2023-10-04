import Interaction from './Interaction';
import { MouseButton } from './Mouse';

window.WhoaInteraction = Interaction.get();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaInteraction = {
    MouseButton: MouseButton
};
