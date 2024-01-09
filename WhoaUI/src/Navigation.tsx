import { Button, Divider, Dropdown, Menu } from '@arco-design/web-react';
import IconButton from './components/IconButton';

export default () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div>
                <IconButton />
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'文件'}</Button>
                </Dropdown>
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'保存'}</Button>
                </Dropdown>
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'撤销'}</Button>
                </Dropdown>
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'恢复'}</Button>
                </Dropdown>
                <Divider type="vertical" />
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'户型'}</Button>
                </Dropdown>
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'工具'}</Button>
                </Dropdown>
                <Dropdown
                    droplist={
                        <Menu>
                            <Menu.Item key="1">Menu Item 1</Menu.Item>
                            <Menu.Item key="2">Menu Item 2</Menu.Item>
                            <Menu.Item key="3">Menu Item 3</Menu.Item>
                        </Menu>
                    }
                >
                    <Button type="text">{'显隐'}</Button>
                </Dropdown>
                <Divider type="vertical" />
                <Button type="text">{'灵图'}</Button>
                <Button type="text">{'渲染'}</Button>
                <Button type="text">{'图册'}</Button>
            </div>
        </div>
    );
};
