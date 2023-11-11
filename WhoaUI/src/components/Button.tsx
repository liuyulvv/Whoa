import { Button as FluentButton } from '@fluentui/react-components';
import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
    private button;

    public constructor() {
        super();
        this.button = <FluentButton shape="circular">Button</FluentButton>;
    }

    public render() {
        super.render(this.button);
    }
}
