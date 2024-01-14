export default class Ground extends WhoaFramework.Entity {
    private points_: Array<WhoaMath.Vector3>;

    public constructor(id: string, points: Array<WhoaMath.Vector3>) {
        super(id);
        this.points_ = points;
        this.material_.SetEmissiveColor(new WhoaMath.Color3(1, 0, 0));
        const vertex_data = new Whoa3D.VertexData();
        const earcut_result = WhoaGeometry.Earcut.Triangulate2D(this.points_);
        vertex_data.SetIndices(earcut_result.indices_);
        vertex_data.SetVertices(earcut_result.vertices_);
        this.material_.SetZOffset(-1, -10);
        this.mesh_.SetMaterial(this.material_);
        vertex_data.ApplyToMesh(this.mesh_, true);
        this.mesh_.UpdateVertices(earcut_result.vertices_);
        this.mesh_.UpdateIndices(earcut_result.indices_);
        this.ComputeWorldMatrix(true);
        this.UpdateBoundingBox();
    }
}
