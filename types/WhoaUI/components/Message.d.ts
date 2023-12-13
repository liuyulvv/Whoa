declare namespace WhoaUI {
    export class Message {
        public static info(message: string): void;

        public static success(message: string): void;

        public static warning(message: string): void;

        public static error(message: string): void;

        public static normal(message: string): void;
    }
}
