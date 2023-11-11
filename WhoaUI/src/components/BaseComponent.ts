import ReactDOM from 'react-dom';

export default class BaseComponent {
    private container;

    public constructor() {
        this.container = document.createElement('div');
    }

    public destroy() {
        WhoaRootContainer.firstElementChild!.removeChild(this.container);
    }

    public render(component: JSX.Element) {
        WhoaRootContainer.firstElementChild!.appendChild(this.container);
        ReactDOM.render(component, this.container);
    }
}
