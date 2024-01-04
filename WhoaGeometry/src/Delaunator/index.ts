import MapBoxDelaunator from 'delaunator';

export class DelaunatorResult {
    public vertices: Array<number>;
    public indices: Array<number>;

    public constructor(vertices: Array<number>, indices: Array<number>) {
        this.vertices = vertices;
        this.indices = indices;
    }
}

export default class Delaunator {
    public static triangulate2D(boundary: Array<WhoaMath.Vector2>) {
        const vertices: Array<number> = [];
        for (let i = 0; i < boundary.length; i++) {
            vertices.push(boundary[i].x);
            vertices.push(boundary[i].y);
        }
        const result = new MapBoxDelaunator(vertices);
        const indices: Array<number> = [];
        for (let i = 0; i < result.triangles.length; i += 3) {
            indices.push(result.triangles[i]);
            indices.push(result.triangles[i + 1]);
            indices.push(result.triangles[i + 2]);
        }
        return new DelaunatorResult(vertices, indices);
    }
}
