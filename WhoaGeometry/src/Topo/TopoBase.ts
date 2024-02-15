import TopoType from './TopoType';

export abstract class TopoBase {
    protected type_: TopoType;

    public constructor() {
        this.type_ = TopoType.NONE;
    }

    public get type(): TopoType {
        return this.type_;
    }

    public abstract Clone(): TopoBase;
}
