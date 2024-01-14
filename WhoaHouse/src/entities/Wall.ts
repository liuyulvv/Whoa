import { v4 as uuid } from 'uuid';
import Entity from './Entity';

export class WallCreateInfo extends WhoaFramework.EntityCreateInfo {
    points_: Array<WhoaMath.Vector3> = [];
    width_: number = 0;
    length_: number = 0;
    height_: number = 0;
    radian_: number = 0;
    position_: WhoaMath.Vector3 = new WhoaMath.Vector3(0, 0, 0);
}

export default class Wall extends WhoaFramework.EntityGroup {
    private points_: Array<WhoaMath.Vector3>;

    public constructor(entity_id: string, info: WallCreateInfo) {
        super(entity_id);
        this.points_ = info.points_;
        info.visible_ ? this.Show() : this.Hide();
        this.material_.SetEmissiveColor(new WhoaMath.Color3(1, 1, 1));
        this.CreateWallMesh(info);
        this.RegisterOnSelect();
        this.RotateLocalZ(info.radian_);
        this.mesh_.SetPosition(info.position_);
        this.ComputeWorldMatrix(true);
        this.UpdateBoundingBox();
    }

    private CreateWallMesh(info: WallCreateInfo): void {
        const top_entity = new Entity(uuid());
        top_entity.name_ = 'TOP';
        WhoaFramework.EntityManager.Get().AddEntity(top_entity.GetID(), top_entity);
        const top_mesh = Whoa3D.MeshBuilder.CreatePlane(top_entity.GetID(), {
            width: info.width_,
            length: info.length_,
            sideOrientation: Whoa3D.SideOrientation.FRONT
        });
        top_entity.UpdateMesh(top_mesh);
        top_entity.SetMaterial(this.material_);
        this.AddChild(top_entity);
        top_entity.Translate(0, 0, info.height_ / 2, true);

        const bottom_entity = new Entity(uuid());
        WhoaFramework.EntityManager.Get().AddEntity(bottom_entity.GetID(), bottom_entity);
        bottom_entity.name_ = 'BOTTOM';
        const bottom_mesh = Whoa3D.MeshBuilder.CreatePlane(bottom_entity.GetID(), {
            width: info.width_,
            length: info.length_,
            sideOrientation: Whoa3D.SideOrientation.BACK
        });
        bottom_entity.UpdateMesh(bottom_mesh);
        bottom_entity.SetMaterial(this.material_);
        this.AddChild(bottom_entity);
        bottom_entity.Translate(0, 0, -info.height_ / 2, true);

        const left_entity = new Entity(uuid());
        WhoaFramework.EntityManager.Get().AddEntity(left_entity.GetID(), left_entity);
        left_entity.name_ = 'LEFT';
        const left_mesh = Whoa3D.MeshBuilder.CreatePlane(left_entity.GetID(), {
            width: info.height_,
            length: info.length_,
            sideOrientation: Whoa3D.SideOrientation.FRONT
        });
        left_entity.UpdateMesh(left_mesh);
        left_entity.SetMaterial(this.material_);
        this.AddChild(left_entity);
        left_entity.RotateLocalY(WhoaMath.DegreesToRadians(-90));
        left_entity.Translate(-info.width_ / 2, 0, 0, true);

        const right_entity = new Entity(uuid());
        WhoaFramework.EntityManager.Get().AddEntity(right_entity.GetID(), right_entity);
        right_entity.name_ = 'RIGHT';
        const right_mesh = Whoa3D.MeshBuilder.CreatePlane(right_entity.GetID(), {
            width: info.height_,
            length: info.length_,
            sideOrientation: Whoa3D.SideOrientation.FRONT
        });
        right_entity.UpdateMesh(right_mesh);
        right_entity.SetMaterial(this.material_);
        this.AddChild(right_entity);
        right_entity.RotateLocalY(WhoaMath.DegreesToRadians(90));
        right_entity.Translate(info.width_ / 2, 0, 0, true);

        const front_entity = new Entity(uuid());
        WhoaFramework.EntityManager.Get().AddEntity(front_entity.GetID(), front_entity);
        front_entity.name_ = 'FRONT';
        const front_mesh = Whoa3D.MeshBuilder.CreatePlane(front_entity.GetID(), {
            width: info.width_,
            length: info.height_,
            sideOrientation: Whoa3D.SideOrientation.FRONT
        });
        front_entity.UpdateMesh(front_mesh);
        front_entity.SetMaterial(this.material_);
        this.AddChild(front_entity);
        front_entity.RotateLocalX(WhoaMath.DegreesToRadians(90));
        front_entity.Translate(0, -info.length_ / 2, 0, true);

        const back_entity = new Entity(uuid());
        WhoaFramework.EntityManager.Get().AddEntity(back_entity.GetID(), back_entity);
        back_entity.name_ = 'BACK';
        const back_mesh = Whoa3D.MeshBuilder.CreatePlane(back_entity.GetID(), {
            width: info.width_,
            length: info.height_,
            sideOrientation: Whoa3D.SideOrientation.FRONT
        });
        back_entity.UpdateMesh(back_mesh);
        back_entity.SetMaterial(this.material_);
        this.AddChild(back_entity);
        back_entity.RotateLocalX(WhoaMath.DegreesToRadians(-90));
        back_entity.Translate(0, info.length_ / 2, 0, true);
    }

    public GetPoints(): Array<WhoaMath.Vector3> {
        return this.points_;
    }

    private RegisterOnSelect(): void {
        // this.children_.forEach((child) => {
        //     // child.OnSelect = (selected: boolean, event: PointerEvent) => {
        //     // if (child.IsSelected()) {
        //     // }
        //     // child.OnSelect(selected, event);
        //     // if (child.selected_ != selected) {
        //     //     this.selected_ = selected;
        //     //     if (this.selected_) {
        //     //         WhoaScene.SetEntitySelectColor();
        //     //         this.ShowBoundingBox();
        //     //     } else if (this.hovered_) {
        //     //         WhoaScene.SetEntityHoverColor();
        //     //         this.ShowBoundingBox();
        //     //     } else {
        //     //         this.HideBoundingBox();
        //     //     }
        //     // }
        //     // };
        // });
    }

    // public OnSelect(selected: boolean, event: PointerEvent): void {
    //     if (event.ctrlKey) {
    //         console.log('ctrlKey');
    //     } else {
    //         super.OnSelect(selected, event);
    //     }
    // }

    public OnEnter(): void {
        console.log('OnEnter');
    }

    public OnLeave(): void {
        console.log('OnLeave');
    }
}
