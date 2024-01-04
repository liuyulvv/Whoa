import earcut from 'earcut';

export class EarcutResult {
    public vertices: Array<number>;
    public indices: Array<number>;

    public constructor(vertices: Array<number>, indices: Array<number>) {
        this.vertices = vertices;
        this.indices = indices;
    }
}

export default class Earcut {
    public static triangulate2D(boundary: Array<WhoaMath.Vector3>): EarcutResult {
        const inputVertices: Array<number> = [];
        const vertices: Array<number> = [];
        for (let i = 0; i < boundary.length; i++) {
            inputVertices.push(boundary[i].x);
            inputVertices.push(boundary[i].y);
            vertices.push(boundary[i].x);
            vertices.push(boundary[i].y);
            vertices.push(boundary[i].z);
        }
        const indices = earcut(inputVertices);
        return new EarcutResult(vertices, indices.reverse());
    }
}
