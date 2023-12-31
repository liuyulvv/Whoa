import { LinesMesh, Mesh, StandardMaterial, VertexData } from '@babylonjs/core';
import Scene from 'src/babylon/Scene';
import { EntityWallCreateInfo } from 'src/entities/EntityWall';
import { Color3 } from 'src/math/Color';
import { Vector3 } from 'src/math/Vector';
import { PointerButton } from 'src/utils/Pointer';
import { v4 as uuid } from 'uuid';
import EntityWallManager from './EntityWallManager';

enum CreateStatus {
    START,
    CREATE
}

export default class CreateWallByLine {
    private static instance_: CreateWallByLine;
    private canvas_: HTMLCanvasElement;
    private status_: CreateStatus;
    private start_: WhoaMath.Point3;
    private end_: WhoaMath.Point3;
    private wall_mid_line_: LinesMesh | undefined;
    private wall_mesh_: Mesh | undefined;
    private wall_mesh_material_: StandardMaterial;

    private orthogonal_: boolean = true;
    private radian_: number = 0;
    private wall_width_: number = 240;
    private wall_height_: number = 2800;

    private bind_pointer_move_: (event: PointerEvent) => void;
    private bind_pointer_up_: (event: PointerEvent) => void;
    private bind_key_up: (event: KeyboardEvent) => void;

    private constructor() {
        this.canvas_ = WhoaCanvas;
        this.status_ = CreateStatus.START;
        this.start_ = new WhoaMath.Point3(0, 0, 0);
        this.end_ = new WhoaMath.Point3(0, 0, 0);
        this.wall_mesh_material_ = new StandardMaterial(uuid());
        this.wall_mesh_material_.emissiveColor = new Color3(1, 1, 1);
        this.bind_pointer_move_ = this.OnPointerMove.bind(this);
        this.bind_pointer_up_ = this.OnPointerUp.bind(this);
        this.bind_key_up = this.OnKeyUp.bind(this);
    }

    public static Get(): CreateWallByLine {
        if (!CreateWallByLine.instance_) {
            CreateWallByLine.instance_ = new CreateWallByLine();
        }
        return CreateWallByLine.instance_;
    }

    public OnCreateStart(): void {
        this.RegisterPointerEvent();
        this.RegisterKeyEvent();
    }

    private OnCreate(): void {
        this.start_.z = this.wall_height_;
        this.end_.z = this.wall_height_;
        if (this.orthogonal_) {
            const orthogonal_point = this.end_.Clone();
            if (this.end_.x != this.start_.x) {
                orthogonal_point.y = this.start_.y;
            }
            const vec_a = WhoaMath.Vector3.FromPoint3(orthogonal_point.Subtract(this.start_));
            const vec_b = WhoaMath.Vector3.FromPoint3(this.end_.Subtract(this.start_));
            const radian = vec_a.GetRadianBetween(vec_b);
            if (radian > Math.PI / 4) {
                orthogonal_point.x = this.start_.x;
                orthogonal_point.y = this.end_.y;
            }
            this.end_ = orthogonal_point;
        }
        const vec_mid_line = WhoaMath.Vector3.FromPoint3(this.end_.Subtract(this.start_));
        const direction = vec_mid_line.y > 0 ? 1 : -1;
        this.radian_ = vec_mid_line.GetRadianBetween(new WhoaMath.Vector3(1, 0, 0)) * direction;
        const start = new Vector3(this.start_.x, this.start_.y, this.start_.z);
        const end = new Vector3(this.end_.x, this.end_.y, this.end_.z);
        const start_left = start.Clone();
        const start_right = start.Clone();
        const end_left = end.Clone();
        const end_right = end.Clone();
        start_left.x = start_left.x - (this.wall_width_ / 2) * Math.sin(-this.radian_);
        start_left.y = start_left.y - (this.wall_width_ / 2) * Math.cos(-this.radian_);
        start_right.x = start_right.x + (this.wall_width_ / 2) * Math.sin(-this.radian_);
        start_right.y = start_right.y + (this.wall_width_ / 2) * Math.cos(-this.radian_);
        end_left.x = end_left.x - (this.wall_width_ / 2) * Math.sin(-this.radian_);
        end_left.y = end_left.y - (this.wall_width_ / 2) * Math.cos(-this.radian_);
        end_right.x = end_right.x + (this.wall_width_ / 2) * Math.sin(-this.radian_);
        end_right.y = end_right.y + (this.wall_width_ / 2) * Math.cos(-this.radian_);
        if (!this.wall_mesh_) {
            this.wall_mesh_ = new Mesh(uuid());
            this.wall_mesh_.material = this.wall_mesh_material_;
        }
        const vertex_data = new VertexData();
        const earcut_result = WhoaGeometry.Earcut.Triangulate2D([start_left, end_left, end_right, start_right]);
        vertex_data.positions = earcut_result.vertices_;
        vertex_data.indices = earcut_result.indices_;
        vertex_data.applyToMesh(this.wall_mesh_, true);
        if (!this.wall_mid_line_) {
            this.wall_mid_line_ = Scene.Get().MeshBuilder.CreateLines(uuid(), {
                points: [start, end],
                updatable: true
            });
            this.wall_mid_line_.color = Color3.Red();
        } else {
            this.wall_mid_line_ = Scene.Get().MeshBuilder.CreateLines(this.wall_mid_line_.id, {
                points: [start, end],
                instance: this.wall_mid_line_ as LinesMesh
            });
            this.wall_mid_line_.color = Color3.Red();
        }
    }

    public OnCreateEnd(): void {
        this.UnregisterPointerEvent();
        this.UnregisterKeyEvent();
        // @info: Maybe we can create space after create a wall.
        // create space
        const all_wall = EntityWallManager.get().getAllWall();
        const vector_points = new WhoaGeometrySpace.vector_string();
        all_wall.forEach((wall) => {
            const box = wall.GetBoundingBox();
            if (box) {
                let points = '';
                points += box.bottom_far_left_.x.toString() + ' ' + box.bottom_far_left_.y + ' ';
                points += box.bottom_far_right_.x.toString() + ' ' + box.bottom_far_right_.y + ' ';
                points += box.bottom_near_right_.x.toString() + ' ' + box.bottom_near_right_.y + ' ';
                points += box.bottom_near_left_.x.toString() + ' ' + box.bottom_near_left_.y;
                vector_points.push_back(points);
            }
        });
        const vector_space = WhoaGeometrySpace.get_spaces(vector_points);
        for (let i = 0; i < vector_space.size(); i++) {
            const space = vector_space.get(i);
            const points = space.vertices();
            const positions: Vector3[] = [];
            const vertex_data = new VertexData();
            for (let j = 0; j < points.size(); j++) {
                positions.push(new Vector3(points.get(j).x(), points.get(j).y(), 0));
            }
            const earcut_result = WhoaGeometry.Earcut.Triangulate2D(positions);
            vertex_data.positions = earcut_result.vertices_;
            vertex_data.indices = earcut_result.indices_;
            const space_mesh = new Mesh(uuid());
            const space_mesh_material = new StandardMaterial(uuid());
            space_mesh_material.emissiveColor = new Color3(1, 0, 0);
            space_mesh_material.zOffset = -1;
            space_mesh_material.zOffsetUnits = -10;
            space_mesh.material = space_mesh_material;
            vertex_data.applyToMesh(space_mesh, true);
        }
    }

    private RegisterKeyEvent() {
        this.canvas_.addEventListener('keyup', this.bind_key_up);
    }

    private UnregisterKeyEvent() {
        this.canvas_.removeEventListener('keyup', this.bind_key_up);
    }

    private RegisterPointerEvent() {
        this.canvas_.addEventListener('pointermove', this.bind_pointer_move_);
        this.canvas_.addEventListener('pointerup', this.bind_pointer_up_);
    }

    private UnregisterPointerEvent() {
        this.canvas_.removeEventListener('pointermove', this.bind_pointer_move_);
        this.canvas_.removeEventListener('pointerup', this.bind_pointer_up_);
    }

    private OnKeyUp(event: KeyboardEvent): void {
        if (event.key == 'Shift') {
            this.orthogonal_ = !this.orthogonal_;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private OnPointerMove(event: PointerEvent): void {
        if (CreateStatus.CREATE == this.status_) {
            this.end_ = WhoaScene.ScreenToWorld(WhoaScene.GetScreenPosition());
            this.OnCreate();
        }
    }

    private OnPointerUp(event: PointerEvent): void {
        if (PointerButton.LEFT == event.button) {
            if (CreateStatus.START == this.status_) {
                const screen_position = WhoaScene.GetScreenPosition();
                // const radius = 5;
                // const radiusScreenPosition = new WhoaMath.Point2(screenPosition.x + radius, screenPosition.y);
                // const radiusWorldPosition = WhoaScene.screenToWorld(radiusScreenPosition);
                this.start_ = WhoaScene.ScreenToWorld(screen_position);
                this.status_ = CreateStatus.CREATE;
                // const mesh = Scene.Get().MeshBuilder.CreateDisc(uuid(), {
                //     radius: radiusWorldPosition.Distance(this.start_),
                //     sideOrientation: Mesh.BACKSIDE
                // });
                // const texture = new Texture('/assets/images/circle.svg');
                // const material = new StandardMaterial(uuid());
                // material.emissiveTexture = texture;
                // material.zOffset = -1;
                // material.zOffsetUnits = -10;
                // mesh.material = material;
                // mesh.position = new Vector3(this.start_.x, this.start_.y, this.wall_height_);
            } else if (CreateStatus.CREATE == this.status_) {
                this.end_ = WhoaScene.ScreenToWorld(WhoaScene.GetScreenPosition());
                this.OnCreate();
                const mid = this.start_.Add(this.end_).Multiply(0.5);
                const info = new EntityWallCreateInfo();
                info.role_ = Whoa.WhoaFramework.EntityRole.ROOT;
                info.type_ = Whoa.WhoaFramework.EntityType.WALL;
                info.hovered_ = false;
                info.selected_ = false;
                info.visible_ = true;
                info.pickable_ = true;
                info.movable_ = true;
                info.width_ = this.wall_width_;
                info.height_ = WhoaMath.Vector3.FromPoint3(this.end_.Subtract(this.start_)).Length();
                info.depth_ = this.wall_height_;
                info.radian_ = this.radian_ + Math.PI / 2;
                info.position_ = new Vector3(mid.x, mid.y, mid.z / 2);
                EntityWallManager.get().create(info);
                this.start_ = this.end_;
                this.wall_mesh_?.dispose();
                this.wall_mesh_ = undefined;
            }
        } else if (PointerButton.RIGHT == event.button) {
            this.status_ = CreateStatus.START;
            this.wall_mid_line_?.dispose();
            this.wall_mid_line_ = undefined;
            this.wall_mesh_?.dispose();
            this.wall_mesh_ = undefined;
            WhoaEvent.Pub('STOP_DRAW_LINE');
        }
    }
}
