import { makeStyles } from '@fluentui/react-components';
import { useEffect, useRef } from 'react';

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
    const mainContainer = useRef<HTMLDivElement>(null);
    const mainCanvas = useRef<HTMLCanvasElement>(null);

    const resize = () => {
        WhoaCanvas.width = WhoaCanvasContainer.clientWidth;
        WhoaCanvas.height = WhoaCanvasContainer.clientHeight;
        WhoaEvent.pub('WHOA_WINDOW_RESIZE');
    };

    useEffect(() => {
        const { current: container } = mainContainer;
        const { current: canvas } = mainCanvas;
        if (!window || !container || !canvas) return;
        window.WhoaCanvas = canvas;
        window.WhoaCanvasContainer = container;
        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        };
    });

    return (
        <div ref={mainContainer} className={styles.main}>
            <canvas ref={mainCanvas} className={styles.canvas} id="main_canvas" />;
        </div>
    );
};
