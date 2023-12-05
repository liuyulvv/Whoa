import BaseComponent from './BaseComponent';
import Button from './Button';

export default class ToolBar extends BaseComponent {
    protected children: Button[];

    public constructor() {
        super();
        this.children = [];
    }

    public addButton(button: Button) {
        this.children.push(button);
    }

    public removeButton(button: Button) {
        const index = this.children.indexOf(button);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    public render() {
        const toolbarItems: JSX.Element[] = [];
        this.children.forEach((child) => {
            toolbarItems.push(child.component);
        });
        this.component.props.children = toolbarItems;
        super.render();
    }
}
