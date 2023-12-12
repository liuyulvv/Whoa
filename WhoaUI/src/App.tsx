import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import Aside from './Aside';
import Navigation from './Navigation';
import Scene from './Scene';

export default () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light'
                }
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        height: '64px',
                        alignItems: 'center',
                        zIndex: '1000'
                    }}
                >
                    <Navigation />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexGrow: '1',
                        flexShrink: '1',
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                        position: 'relative'
                    }}
                >
                    <Aside />
                    <Scene />
                </Box>
            </Box>
        </ThemeProvider>
    );
};
