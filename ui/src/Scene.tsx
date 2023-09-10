import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    main: {
        flexGrow: '1',
        flexShrink: '1',
        flexBasis: '0%',
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'absolute',
        zIndex: '0',
        left: '0px',
        right: '0px',
        height: '100%'
    },
    canvas: {
        ':focus-visible': {
            outlineWidth: '0px'
        }
    }
});

export default () => {
    const styles = useStyles();

    return (
        <div className={styles.main}>
            <canvas className={styles.canvas} id="main_canvas" />;
        </div>
    );
};
