import { Avatar, Button, Toolbar, ToolbarButton, ToolbarGroup, makeStyles } from '@fluentui/react-components';
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderNavigation,
    DrawerHeaderTitle,
    DrawerOverlay
} from '@fluentui/react-components/unstable';
import { ArrowClockwiseRegular, ArrowLeftRegular, DismissRegular, SettingsRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import avatarJPG from './assets/img/avatar.jpg';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    }
});

export default () => {
    const navigate = useNavigate();
    const styles = useStyles();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.header}>
            <Button
                onClick={async () => {
                    navigate('/user/login');
                }}
            >
                Logout Header
            </Button>

            <Avatar
                // image={{ src: avatarJPG }}
                onClick={() => {
                    setIsOpen(true);
                }}
            />

            <DrawerOverlay
                modalType="modal"
                open={isOpen}
                position="end"
                onOpenChange={(_, { open }) => setIsOpen(open)}
            >
                <DrawerHeader>
                    <DrawerHeaderNavigation>
                        <Toolbar>
                            <ToolbarButton aria-label="Back" appearance="subtle" icon={<ArrowLeftRegular />} />
                            <ToolbarGroup>
                                <ToolbarButton
                                    aria-label="Reload content"
                                    appearance="subtle"
                                    icon={<ArrowClockwiseRegular />}
                                />
                                <ToolbarButton aria-label="Settings" appearance="subtle" icon={<SettingsRegular />} />
                                <ToolbarButton
                                    aria-label="Close panel"
                                    appearance="subtle"
                                    icon={<DismissRegular />}
                                    onClick={() => setIsOpen(false)}
                                />
                            </ToolbarGroup>
                        </Toolbar>
                    </DrawerHeaderNavigation>
                    <DrawerHeaderTitle>Overlay Drawer</DrawerHeaderTitle>
                </DrawerHeader>
                <DrawerBody>
                    <p>Drawer content</p>
                </DrawerBody>
            </DrawerOverlay>
        </div>
    );
};
