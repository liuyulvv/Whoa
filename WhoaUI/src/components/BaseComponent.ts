import ReactDOM from 'react-dom';

export default class BaseComponent {
    private container;

    public constructor() {
        this.container = document.createElement('div');
        WhoaRootContainer.firstElementChild!.appendChild(this.container);
    }

    public destroy() {
        WhoaRootContainer.firstElementChild!.removeChild(this.container);
    }

    public render(component: JSX.Element) {
        ReactDOM.render(component, this.container);
    }
}
