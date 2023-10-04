import { CompoundButton, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular, GridFilled, GridRegular, bundleIcon } from '@fluentui/react-icons';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '356px',
        maxWidth: '534px'
    }
});

const OrnamentationIcon = bundleIcon(GridFilled, GridRegular);
export { OrnamentationIcon };

export default () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Ornamentation
            </CompoundButton>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Ornamentation
            </CompoundButton>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Ornamentation
            </CompoundButton>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Ornamentation
            </CompoundButton>
        </div>
    );
};
