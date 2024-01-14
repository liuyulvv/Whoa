export default class Roof extends WhoaFramework.Entity {
    private points_: Array<WhoaMath.Vector3>;
    private layer_height_: number;

    public constructor(id: string, points: Array<WhoaMath.Vector3>, layer_height: number) {
        super(id);
        this.points_ = points;
        this.layer_height_ = layer_height;
        this.material_.SetEmissiveColor(new WhoaMath.Color3(1, 1, 0));
        const vertex_data = new Whoa3D.VertexData();
        const earcut_result = WhoaGeometry.Earcut.Triangulate2D(this.points_);
        vertex_data.SetIndices(earcut_result.indices_.reverse());
        vertex_data.SetVertices(earcut_result.vertices_);
        this.material_.SetZOffset(-1, -10);
        this.mesh_.SetMaterial(this.material_);
        vertex_data.ApplyToMesh(this.mesh_, true);
        this.mesh_.UpdateVertices(earcut_result.vertices_);
        this.mesh_.UpdateIndices(earcut_result.indices_);
        this.Translate(0, 0, layer_height, true);
        this.ComputeWorldMatrix(true);
        this.UpdateBoundingBox();
    }
}
