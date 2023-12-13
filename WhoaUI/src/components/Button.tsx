import { Button as ArcoButton } from '@arco-design/web-react';
import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
    public constructor(title: string) {
        super();
        this.component = <ArcoButton>{title}</ArcoButton>;
    }

    public render() {
        super.render();
    }
}
