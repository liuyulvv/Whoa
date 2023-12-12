import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Customization from './Customization';
import House from './House';
import Ornamentation from './Ornamentation';
import createLeftMenuStore from './store';

export default () => {
    const open = createLeftMenuStore((state) => state.opened);
    const setOpen = createLeftMenuStore((state) => state.setOpened);
    const tabValue = createLeftMenuStore((state) => state.value);
    const setTabValue = createLeftMenuStore((state) => state.setValue);

    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: 'background.paper'
            }}
        >
            <Tabs
                value={tabValue}
                orientation="vertical"
                variant="fullWidth"
                centered
                onChange={(_, value) => {
                    if (value == tabValue) {
                        setTabValue('');
                        setOpen(false);
                    } else {
                        setTabValue(value);
                        setOpen(true);
                    }
                }}
            >
                <Tab icon={<HouseOutlinedIcon />} value="house" />
                <Tab icon={<ChairOutlinedIcon />} value="ornamentation" />
                <Tab icon={<DashboardCustomizeOutlinedIcon />} value="customization" />
            </Tabs>

            <IconButton
                onClick={() => {
                    if (open) {
                        // setTabValue('');
                    } else {
                        setTabValue('house');
                    }
                    setOpen(!open);
                }}
            >
                {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            </IconButton>

            <Box
                sx={
                    open
                        ? {
                              position: 'absolute',
                              left: '90px',
                              zIndex: '2',
                              bgcolor: 'background.paper'
                          }
                        : {
                              display: 'none'
                          }
                }
            >
                {tabValue == 'house' && <House />}
                {tabValue == 'ornamentation' && <Ornamentation />}
                {tabValue == 'customization' && <Customization />}
            </Box>
        </Box>
    );
};
