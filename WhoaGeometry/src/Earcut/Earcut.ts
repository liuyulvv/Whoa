import earcut from 'earcut';

export class EarcutResult {
    public vertices_: Array<number>;
    public indices_: Array<number>;

    public constructor(vertices_: Array<number>, indices_: Array<number>) {
        this.vertices_ = vertices_;
        this.indices_ = indices_;
    }
}

export default class Earcut {
    public static Triangulate2D(boundary: Array<WhoaMath.Vector3>): EarcutResult {
        const input_vertices: Array<number> = [];
        const vertices: Array<number> = [];
        for (let i = 0; i < boundary.length; i++) {
            input_vertices.push(boundary[i].x);
            input_vertices.push(boundary[i].y);
            vertices.push(boundary[i].x);
            vertices.push(boundary[i].y);
            vertices.push(boundary[i].z);
        }
        const indices = earcut(input_vertices);
        return new EarcutResult(vertices, indices.reverse());
    }
}
