import { Image, Space } from '@arco-design/web-react';
import { useEffect } from 'react';
import createLeftMenuStore from './store';

export default () => {
    const check = createLeftMenuStore((state) => state.checked);
    const setCheck = createLeftMenuStore((state) => state.setChecked);

    useEffect(() => {
        WhoaEvent.pub('CHANGE_TO_2D_CAMERA');
        const sub = WhoaEvent.sub('STOP_CREATE', () => {
            setCheck('');
        });
        return () => {
            WhoaEvent.unsub('STOP_CREATE', sub);
        };
    });

    const src =
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';

    return (
        <Space
            align="center"
            wrap
            size={16}
            style={{
                paddingTop: '16px'
            }}
        >
            <Image
                width={129}
                src={src}
                title="直墙"
                description="人之生也直，罔之生也幸而免"
                footerPosition="outer"
                preview={false}
                onClick={() => {
                    if (check == 'line') {
                        setCheck('');
                        WhoaEvent.pub('STOP_DRAW_LINE');
                    } else {
                        setCheck('line');
                        WhoaEvent.pub('START_DRAW_LINE');
                    }
                }}
            />

            <Image
                width={129}
                src={src}
                title="矩形"
                description="不以规矩，不能成方圆"
                footerPosition="outer"
                preview={false}
                onClick={() => {
                    if (check == 'border') {
                        setCheck('');
                        WhoaEvent.pub('STOP_DRAW_BORDER');
                    } else {
                        setCheck('border');
                        WhoaEvent.pub('START_DRAW_BORDER');
                    }
                }}
            />
        </Space>
    );
};
