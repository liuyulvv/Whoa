import { createElement } from 'react';
import ReactDOM from 'react-dom';

export default class BaseComponent {
    public container: HTMLElement;
    public component: JSX.Element;

    public constructor() {
        this.container = document.createElement('div');
        this.component = createElement('div');
    }

    public destroy() {
        WhoaRootContainer.firstElementChild!.removeChild(this.container);
    }

    public render() {
        WhoaRootContainer.firstElementChild!.appendChild(this.container);
        ReactDOM.render(this.component, this.container);
    }
}
