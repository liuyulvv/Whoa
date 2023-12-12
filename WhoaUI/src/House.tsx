import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import createLeftMenuStore from './store';

export default () => {
    const check = createLeftMenuStore((state) => state.checked);
    const setCheck = createLeftMenuStore((state) => state.setChecked);

    useEffect(() => {
        WhoaEvent.pub('CHANGE_TO_2D_CAMERA');
        const sub = WhoaEvent.sub('STOP_CREATE', () => {
            setCheck('');
        });
        return () => {
            WhoaEvent.unsub('STOP_CREATE', sub);
        };
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            <Button
                onClick={() => {
                    if (check == 'line') {
                        setCheck('');
                        WhoaEvent.pub('STOP_DRAW_LINE');
                    } else {
                        setCheck('line');
                        WhoaEvent.pub('START_DRAW_LINE');
                    }
                }}
                variant={check == 'line' ? 'contained' : 'outlined'}
                startIcon={<HorizontalRuleIcon />}
            >
                直墙
            </Button>
            <Button
                onClick={() => {
                    if (check == 'border') {
                        setCheck('');
                        WhoaEvent.pub('STOP_DRAW_BORDER');
                    } else {
                        setCheck('border');
                        WhoaEvent.pub('START_DRAW_BORDER');
                    }
                }}
                variant={check == 'border' ? 'contained' : 'outlined'}
                startIcon={<CropSquareOutlinedIcon />}
            >
                矩形
            </Button>
        </Box>
    );
};
