import { Alert, Snackbar } from '@mui/material';
import { Component } from 'react';
import BaseComponent from './BaseComponent';

interface ToastProps {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    handleClose: () => void;
}

interface ToastState {
    open: boolean;
}
class ToastComponent extends Component<ToastProps, ToastState> {
    public constructor(props: ToastProps) {
        super(props);
        this.state = {
            open: true
        };
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.handleClose();
    };

    public render() {
        return (
            <Snackbar
                open={this.state.open}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={this.handleClose}
            >
                <Alert severity={this.props.type} variant="filled">
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}

export default class Toast extends BaseComponent {
    public constructor(message: string, type: 'info' | 'success' | 'warning' | 'error') {
        super();
        this.component = (
            <ToastComponent
                message={message}
                type={type}
                handleClose={() => {
                    this.destroy();
                }}
            />
        );
    }
}
