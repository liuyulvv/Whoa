import { Layout, Tabs, Typography } from '@arco-design/web-react';
import { IconCalendar } from '@arco-design/web-react/icon';
import House from './House';
import createLeftMenuStore from './store';

const TabPane = Tabs.TabPane;
const Sider = Layout.Sider;

export default () => {
    const collapsed = createLeftMenuStore((state) => state.collapsed);
    const setCollapsed = createLeftMenuStore((state) => state.setCollapsed);
    const tabValue = createLeftMenuStore((state) => state.value);
    const setTabValue = createLeftMenuStore((state) => state.setValue);

    return (
        <Sider
            onCollapse={(collapsed) => {
                setCollapsed(collapsed);
                if (tabValue == '') {
                    setTabValue('house');
                }
            }}
            collapsed={collapsed}
            collapsible
            width={360}
            style={{
                zIndex: 1000
            }}
        >
            <Tabs
                tabPosition="left"
                defaultActiveTab=""
                activeTab={tabValue}
                onClickTab={(key) => {
                    if (key == tabValue) {
                        setCollapsed(true);
                        setTabValue('');
                    } else {
                        setTabValue(key);
                        setCollapsed(false);
                    }
                }}
            >
                <TabPane key="house" title={<IconCalendar />}>
                    <House />
                </TabPane>
                <TabPane key="decoration" title={<IconCalendar />}>
                    <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
                </TabPane>
                <TabPane key="customization" title={<IconCalendar />}>
                    <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
                </TabPane>
            </Tabs>
        </Sider>
    );
};
