import { createElement } from 'react';
import BaseComponent from './BaseComponent';
// import { Tab, TabList } from '@fluentui/react-components';

export default class ToolBar extends BaseComponent {
    private toolbar: JSX.Element | undefined;
    private items: JSX.Element[] = [];

    public constructor() {
        super();
        // this.toolbar = <TabList></TabList>;
    }

    public addItem(item: JSX.Element) {
        this.items.push(item);
    }

    public render() {
        this.toolbar = createElement('div', undefined, this.items);
        super.render(this.toolbar);
    }
}
