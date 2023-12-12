import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';

export default () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        LOAF
                    </Typography>
                    <Avatar alt="liuyulvv" />
                </Toolbar>
            </AppBar>
        </Box>
    );
};
