import { Message } from '@arco-design/web-react';

export default class Toast {
    public constructor(message: string, type: 'info' | 'success' | 'warning' | 'error' | 'normal') {
        if (type === 'info') {
            Message.info({
                closable: false,
                content: message
            });
        } else if (type === 'success') {
            Message.success({
                closable: false,
                content: message
            });
        } else if (type === 'warning') {
            Message.warning({
                closable: false,
                content: message
            });
        } else if (type === 'error') {
            Message.error({
                closable: false,
                content: message
            });
        } else if (type === 'normal') {
            Message.normal({
                closable: false,
                content: message
            });
        }
    }
}
