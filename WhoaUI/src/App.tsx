import { Layout } from '@arco-design/web-react';
import Aside from './Aside';
import Navigation from './Navigation';
import Scene from './Scene';

const Header = Layout.Header;
const Content = Layout.Content;

export default () => {
    return (
        <Layout
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}
        >
            <Header>
                <Navigation />
            </Header>
            <Content
                style={{
                    display: 'flex',
                    flexGrow: '1',
                    flexShrink: '1',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    position: 'relative'
                }}
            >
                <Aside />
                <Scene />
            </Content>
        </Layout>
    );
};
