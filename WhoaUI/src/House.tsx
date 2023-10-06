import { CompoundButton, makeStyles } from '@fluentui/react-components';
import {
    BorderOutsideThickRegular,
    BuildingTownhouseFilled,
    BuildingTownhouseRegular,
    LineRegular,
    bundleIcon
} from '@fluentui/react-icons';
import createLeftMenuStore from './store';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '356px',
        maxWidth: '534px'
    },
    element: {
        flexBasis: '178px'
    }
});

const HouseIcon = bundleIcon(BuildingTownhouseFilled, BuildingTownhouseRegular);
export { HouseIcon };

export default () => {
    const styles = useStyles();

    const check = createLeftMenuStore((state) => state.checked);
    const setCheck = createLeftMenuStore((state) => state.setChecked);

    return (
        <div className={styles.container}>
            <CompoundButton
                icon={<LineRegular />}
                secondaryContent="人之生也直,罔之生也幸而免"
                className={styles.element}
                appearance={check == 'line' ? 'primary' : 'subtle'}
                onClick={() => {
                    if (check == 'line') {
                        setCheck('');
                        WhoaEvent.pub('STOP_DRAW_LINE');
                    } else {
                        setCheck('line');
                        WhoaEvent.pub('START_DRAW_LINE');
                    }
                }}
            >
                直墙
            </CompoundButton>
            <CompoundButton
                icon={<BorderOutsideThickRegular />}
                secondaryContent="不以规矩,不能成方圆"
                className={styles.element}
                appearance={check == 'border' ? 'primary' : 'subtle'}
                onClick={() => {
                    if (check == 'border') {
                        setCheck('');
                        WhoaEvent.pub('STOP_DRAW_BORDER');
                    } else {
                        setCheck('border');
                        WhoaEvent.pub('START_DRAW_BORDER');
                    }
                }}
            >
                矩形
            </CompoundButton>
        </div>
    );
};
