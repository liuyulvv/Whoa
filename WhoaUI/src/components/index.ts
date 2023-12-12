import Button from './Button';
import ToolBar from './ToolBar';
import Toast from './Toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaUI = {
    Button: Button,
    ToolBar: ToolBar,
    Toast: Toast
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Toast = Toast;
