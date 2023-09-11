import { Button, SelectTabData, Tab, TabList, Tooltip, makeStyles } from '@fluentui/react-components';
import { ArrowExportLtrFilled, ArrowExportRtlFilled } from '@fluentui/react-icons';
import Customization, { CustomizationIcon } from './Customization';
import House, { HouseIcon } from './House';
import Ornamentation, { OrnamentationIcon } from './Ornamentation';
import { createLeftMenuStore } from './store';

const useStyles = makeStyles({
    aside: {
        position: 'relative',
        zIndex: '1000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: '5px',
        backgroundColor: 'rgb(246,248,250,0.8)'
    },
    showCatalog: {
        position: 'absolute',
        left: '49px',
        zIndex: '2',
        backgroundColor: 'rgb(246,248,250,0.8)'
    },
    hideCatalog: {
        display: 'none'
    }
});

export default () => {
    const styles = useStyles();

    const open = createLeftMenuStore((state) => state.opened);
    const setOpen = createLeftMenuStore((state) => state.setOpened);
    const tabValue = createLeftMenuStore((state) => state.value);
    const setTabValue = createLeftMenuStore((state) => state.setValue);

    return (
        <div className={styles.aside}>
            <TabList
                vertical
                size="large"
                selectedValue={tabValue}
                onTabSelect={(_, data: SelectTabData) => {
                    if ((data.value as string) == tabValue) {
                        setTabValue('');
                        setOpen(false);
                    } else {
                        setTabValue(data.value as string);
                        setOpen(true);
                    }
                }}
            >
                <Tooltip content="户型" relationship="label" positioning="after">
                    <Tab icon={<HouseIcon />} value="house" />
                </Tooltip>
                <Tooltip content="装饰" relationship="label" positioning="after">
                    <Tab icon={<OrnamentationIcon />} value="ornamentation" />
                </Tooltip>
                <Tooltip content="定制" relationship="label" positioning="after">
                    <Tab icon={<CustomizationIcon />} value="customization" />
                </Tooltip>
            </TabList>
            <Button
                icon={open ? <ArrowExportLtrFilled /> : <ArrowExportRtlFilled />}
                size="large"
                appearance="transparent"
                onClick={() => {
                    if (open) {
                        // setTabValue('');
                    } else {
                        setTabValue('house');
                    }
                    setOpen(!open);
                }}
            />
            <div className={open ? styles.showCatalog : styles.hideCatalog}>
                {tabValue == 'house' && <House />}
                {tabValue == 'ornamentation' && <Ornamentation />}
                {tabValue == 'customization' && <Customization />}
            </div>
        </div>
    );
};
