export class UnReListener {
    public constructor() {}

    public BeforeUnDo(): void {}

    public BeforeReDo(): void {}

    public AfterUnDo(): void {}

    public AfterReDo(): void {}
}

export default class UnRe {
    private listener_: UnReListener;

    public constructor(listener: UnReListener) {
        this.listener_ = listener;
    }

    public UnDo(): void {
        this.listener_.BeforeUnDo();
        this.listener_.AfterUnDo();
    }

    public ReDo(): void {
        this.listener_.BeforeReDo();
        this.listener_.AfterReDo();
    }
}
