import { Menu } from '@arco-design/web-react';

const MenuItem = Menu.Item;

export default () => {
    return (
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
            <MenuItem key="1">Home</MenuItem>
            <MenuItem key="2">Solution</MenuItem>
            <MenuItem key="3">Cloud Service</MenuItem>
            <MenuItem key="4">Cooperation</MenuItem>
        </Menu>
    );
};
