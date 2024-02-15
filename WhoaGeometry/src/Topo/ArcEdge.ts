import { TopoBase } from './TopoBase';
import TopoType from './TopoType';
import Vertex from './Vertex';

export default class ArcEdge extends TopoBase {
    private center_: Vertex;
    private start_: Vertex;
    private end_: Vertex;

    public constructor(center: Vertex, start: Vertex, end: Vertex) {
        super();
        this.center_ = center;
        this.start_ = start;
        this.end_ = end;
        this.type_ = TopoType.ARC_EDGE;
    }

    public get start(): Vertex {
        return this.start_;
    }

    public get end(): Vertex {
        return this.end_;
    }

    public get center(): Vertex {
        return this.center_;
    }

    public Clone(): ArcEdge {
        return new ArcEdge(this.center_, this.start_, this.end_);
    }
}
