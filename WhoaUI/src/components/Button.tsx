import { Button as FluentButton } from '@fluentui/react-components';
import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
    public constructor(name: string) {
        super();
        this.component = <FluentButton shape="circular">{name}</FluentButton>;
    }

    public render() {
        super.render();
    }
}
