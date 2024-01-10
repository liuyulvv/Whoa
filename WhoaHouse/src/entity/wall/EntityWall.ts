export class EntityWallCreateInfo extends Whoa.WhoaFramework.EntityCreateInfo {
    width_: number = 0;
    height_: number = 0;
    depth_: number = 0;
    radian_: number = 0;
    position_: WhoaMath.Vector3 = new WhoaMath.Vector3(0, 0, 0);
}

export default class EntityWall extends Whoa.WhoaFramework.Entity {
    public constructor(entity_id: string, info: EntityWallCreateInfo) {
        super(entity_id, info);
        this.visible_ ? this.Show() : this.Hide();
        this.material_.SetEmissiveColor(new WhoaMath.Color3(1, 1, 1));
        this.mesh_ = Whoa3D.MeshBuilder.CreateBox(entity_id, {
            width: info.width_,
            height: info.height_,
            depth: info.depth_
        });
        this.mesh_.SetMaterial(this.material_);
        this.RotateLocalZ(info.radian_);
        this.mesh_.SetPosition(info.position_);
    }
}
