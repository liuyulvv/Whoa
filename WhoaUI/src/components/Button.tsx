import { Button as MaterialButton } from '@mui/material';
import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
    public constructor(name: string) {
        super();
        this.component = <MaterialButton>{name}</MaterialButton>;
    }

    public render() {
        super.render();
    }
}
