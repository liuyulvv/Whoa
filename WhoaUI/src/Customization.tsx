import { CompoundButton, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular, CouchFilled, CouchRegular, bundleIcon } from '@fluentui/react-icons';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '356px',
        maxWidth: '534px'
    }
});

const CustomizationIcon = bundleIcon(CouchFilled, CouchRegular);
export { CustomizationIcon };

export default () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Customization
            </CompoundButton>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Customization
            </CompoundButton>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Customization
            </CompoundButton>
            <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content">
                Customization
            </CompoundButton>
        </div>
    );
};
