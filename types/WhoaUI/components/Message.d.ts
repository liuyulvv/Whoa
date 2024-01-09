declare namespace WhoaUI {
    export class Message {
        public static Info(message: string): void;

        public static Success(message: string): void;

        public static Warning(message: string): void;

        public static Error(message: string): void;

        public static Normal(message: string): void;
    }
}
