import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

export default () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            <Button startIcon={<HorizontalRuleIcon />}>饰品</Button>
        </Box>
    );
};
