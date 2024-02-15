import { TopoBase } from './TopoBase';
import TopoType from './TopoType';
import Vertex from './Vertex';

export default class LineEdge extends TopoBase {
    private start_: Vertex;
    private end_: Vertex;

    public constructor(start: Vertex, end: Vertex) {
        super();
        this.start_ = start;
        this.end_ = end;
        this.type_ = TopoType.LINE_EDGE;
    }

    public get start(): Vertex {
        return this.start_;
    }

    public get end(): Vertex {
        return this.end_;
    }

    public Clone(): LineEdge {
        return new LineEdge(this.start_, this.end_);
    }
}
