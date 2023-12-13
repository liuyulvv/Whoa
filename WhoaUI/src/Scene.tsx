import { useEffect, useRef } from 'react';

export default () => {
    const mainContainer = useRef<HTMLDivElement>(null);
    const mainCanvas = useRef<HTMLCanvasElement>(null);

    const resize = () => {
        window.WhoaCanvas.width = window.WhoaCanvasContainer.clientWidth;
        window.WhoaCanvas.height = window.WhoaCanvasContainer.clientHeight;
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
        <div
            ref={mainContainer}
            style={{
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
            }}
        >
            <canvas
                ref={mainCanvas}
                id="main_canvas"
                style={{
                    outline: 'none'
                }}
            />
        </div>
    );
};
