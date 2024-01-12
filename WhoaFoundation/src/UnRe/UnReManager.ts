import Stack from '../Util/Stack';
import UnRe from './UnRe';

export default class UnReManager {
    private static instance_: UnReManager;
    private un_stack_: Stack<Stack<UnRe>>;
    private re_stack_: Stack<Stack<UnRe>>;
    private un_command_stack_: Stack<UnRe>;
    private re_command_stack_: Stack<UnRe>;

    private constructor() {
        this.un_stack_ = new Stack<Stack<UnRe>>();
        this.re_stack_ = new Stack<Stack<UnRe>>();
        this.un_command_stack_ = new Stack<UnRe>();
        this.re_command_stack_ = new Stack<UnRe>();
        this.un_stack_.Push(this.un_command_stack_);
        this.re_stack_.Push(this.re_command_stack_);
    }

    public static Get(): UnReManager {
        if (!UnReManager.instance_) {
            UnReManager.instance_ = new UnReManager();
        }
        return UnReManager.instance_;
    }

    public Start() {
        this.un_stack_.Push(this.un_command_stack_);
        this.re_stack_.Push(this.re_command_stack_);
        this.un_command_stack_ = new Stack<UnRe>();
        this.re_command_stack_ = new Stack<UnRe>();
    }

    public Stop() {
        this.un_stack_.Pop();
        this.re_stack_.Pop();
        this.un_command_stack_ = this.un_stack_.Peek();
        this.re_command_stack_ = this.re_stack_.Peek();
    }
}
