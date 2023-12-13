import { Message as ArcoMessage } from '@arco-design/web-react';

export default class Message {
    public static info(message: string) {
        ArcoMessage.info({
            closable: false,
            content: message
        });
    }

    public static success(message: string) {
        ArcoMessage.success({
            closable: false,
            content: message
        });
    }

    public static warning(message: string) {
        ArcoMessage.warning({
            closable: false,
            content: message
        });
    }

    public static error(message: string) {
        ArcoMessage.error({
            closable: false,
            content: message
        });
    }

    public static normal(message: string) {
        ArcoMessage.normal({
            closable: false,
            content: message
        });
    }
}
