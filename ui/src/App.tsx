import { makeStyles } from '@fluentui/react-components';
import Aside from './Aside';
import Navigation from './Navigation';
import Scene from './Scene';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    navigationContainer: {
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgb(246,248,250)'
    },
    mainContainer: {
        display: 'flex',
        flexGrow: '1',
        flexShrink: '1',
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'relative'
    }
});

export default () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.navigationContainer}>
                <Navigation />
            </div>
            <div className={styles.mainContainer}>
                <Aside />
                <Scene />
            </div>
        </div>
    );
};
