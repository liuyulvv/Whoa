export default class Stack<T> {
    private stack_: T[] = [];

    public Push(item: T): void {
        this.stack_.push(item);
    }

    public Pop(): T | undefined {
        return this.stack_.pop();
    }

    public Peek(): T {
        return this.stack_[this.stack_.length - 1];
    }

    public IsEmpty(): boolean {
        return this.stack_.length === 0;
    }

    public Clear(): void {
        this.stack_ = [];
    }
}
