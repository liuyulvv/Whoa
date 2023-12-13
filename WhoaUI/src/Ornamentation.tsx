import { Image, Space } from '@arco-design/web-react';

export default () => {
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
            <Image width={129} src={src} title="直墙" description="人之生也直，罔之生也幸而免" footerPosition="outer" />

            <Image width={129} src={src} title="矩形" description="不以规矩，不能成方圆" footerPosition="outer" />
        </Space>
    );
};
