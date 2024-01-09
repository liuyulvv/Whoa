import { Button, Image, Space } from '@arco-design/web-react';
import { useEffect } from 'react';
import createLeftMenuStore from './store';

export default () => {
    const check = createLeftMenuStore((state) => state.checked);
    const setCheck = createLeftMenuStore((state) => state.setChecked);

    useEffect(() => {
        WhoaEvent.Pub('CHANGE_TO_2D_CAMERA');
        const sub = WhoaEvent.Sub('STOP_CREATE', () => {
            setCheck('');
        });
        return () => {
            WhoaEvent.UnSub('STOP_CREATE', sub);
        };
    });

    return (
        <Space
            align="center"
            wrap
            size={16}
            style={{
                paddingTop: '16px'
            }}
        >
            <Button
                type="text"
                onClick={() => {
                    if (check == 'line') {
                        setCheck('');
                        WhoaEvent.Pub('STOP_DRAW_LINE');
                    } else {
                        setCheck('line');
                        WhoaEvent.Pub('START_DRAW_LINE');
                    }
                }}
            >
                {'直墙'}
            </Button>

            <Button
                type="text"
                onClick={() => {
                    if (check == 'border') {
                        setCheck('');
                        WhoaEvent.Pub('STOP_DRAW_BORDER');
                    } else {
                        setCheck('border');
                        WhoaEvent.Pub('START_DRAW_BORDER');
                    }
                }}
            >
                {'矩形'}
            </Button>
        </Space>
    );
};
