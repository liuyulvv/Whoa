import Wall, { WallCreateInfo } from 'src/entities/Wall';
import SpaceUtil from 'src/space/SpaceUtil';
import { v4 as uuid } from 'uuid';
import WallManager from './WallManager';

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
    private wall_mid_line_: Whoa3D.LineMesh | undefined;
    private wall_mesh_: Whoa3D.Mesh | undefined;
    private wall_mesh_material_: Whoa3D.StandardMaterial;

    private orthogonal_: boolean = true;
    private radian_: number = 0;
    private wall_width_: number = 240;
    private wall_height_: number = 2800;

    private bind_pointer_move_: (event: PointerEvent) => void;
    private bind_pointer_up_: (event: PointerEvent) => void;
    private bind_key_up_: (event: KeyboardEvent) => void;

    private all_walls_: Array<Wall>;
    private wall_vector_points_: WhoaGeometrySpace.vector_string;

    private constructor() {
        this.canvas_ = WhoaCanvas;
        this.status_ = CreateStatus.START;
        this.start_ = new WhoaMath.Point3(0, 0, 0);
        this.end_ = new WhoaMath.Point3(0, 0, 0);
        this.wall_mesh_material_ = new Whoa3D.StandardMaterial(uuid());
        this.wall_mesh_material_.SetEmissiveColor(new WhoaMath.Color3(1, 1, 1));
        this.bind_pointer_move_ = this.OnPointerMove.bind(this);
        this.bind_pointer_up_ = this.OnPointerUp.bind(this);
        this.bind_key_up_ = this.OnKeyUp.bind(this);
        this.RegisterEvent();
        this.all_walls_ = new Array<Wall>();
        this.wall_vector_points_ = new WhoaGeometrySpace.vector_string();
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
        this.all_walls_ = WallManager.Get().GetAllWall();
        this.all_walls_.forEach((wall) => {
            const box = wall.GetPoints();
            if (box) {
                let points = '';
                points += box[0].x.toString() + ' ' + box[0].y + ' ';
                points += box[1].x.toString() + ' ' + box[1].y + ' ';
                points += box[2].x.toString() + ' ' + box[2].y + ' ';
                points += box[3].x.toString() + ' ' + box[3].y;
                this.wall_vector_points_.push_back(points);
            }
        });
    }

    private GetWallPoints(start: WhoaMath.Vector3, end: WhoaMath.Vector3): Array<WhoaMath.Vector3> {
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
        return [start_left, end_left, end_right, start_right];
    }

    private OnCreate(): Array<WhoaMath.Vector3> {
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
        const start = new WhoaMath.Vector3(this.start_.x, this.start_.y, this.start_.z);
        const end = new WhoaMath.Vector3(this.end_.x, this.end_.y, this.end_.z);
        const [start_left, end_left, end_right, start_right] = this.GetWallPoints(start, end);
        if (!this.wall_mesh_) {
            this.wall_mesh_ = new Whoa3D.Mesh(uuid());
            this.wall_mesh_.SetMaterial(this.wall_mesh_material_);
        }
        const vertex_data = new Whoa3D.VertexData();
        const earcut_result = WhoaGeometry.Earcut.Triangulate2D([start_left, end_left, end_right, start_right]);
        vertex_data.SetVertices(earcut_result.vertices_);
        vertex_data.SetIndices(earcut_result.indices_);
        vertex_data.ApplyToMesh(this.wall_mesh_);
        if (!this.wall_mid_line_) {
            this.wall_mid_line_ = Whoa3D.MeshBuilder.CreateLines(uuid(), {
                points: [start, end],
                updatable: true
            });
            this.wall_mid_line_!.SetColor(new WhoaMath.Color3(1, 0, 0));
        } else {
            this.wall_mid_line_ = Whoa3D.MeshBuilder.CreateLines(this.wall_mid_line_.GetID(), {
                points: [start, end],
                instance: this.wall_mid_line_
            });
            this.wall_mid_line_!.SetColor(new WhoaMath.Color3(1, 0, 0));
        }
        return [start_left, end_left, end_right, start_right];
    }

    public OnCreateEnd(): void {
        this.UnregisterPointerEvent();
        this.UnregisterKeyEvent();
    }

    // private GetSpace(): void {
    //     const vector_space = WhoaGeometrySpace.get_spaces(this.wall_vector_points_);
    //     for (let i = 0; i < vector_space.size(); i++) {
    //         const space = vector_space.get(i);
    //         const points = space.vertices();
    //         const positions: WhoaMath.Vector3[] = [];
    //         const vertex_data = new Whoa3D.VertexData();
    //         for (let j = 0; j < points.size(); j++) {
    //             positions.push(new WhoaMath.Vector3(points.get(j).x(), points.get(j).y(), 0));
    //         }
    //         const earcut_result = WhoaGeometry.Earcut.Triangulate2D(positions);
    //         vertex_data.SetIndices(earcut_result.indices_);
    //         vertex_data.SetVertices(earcut_result.vertices_);
    //         const space_mesh = new Whoa3D.Mesh(uuid());
    //         const space_mesh_material = new Whoa3D.StandardMaterial(uuid());
    //         space_mesh_material.SetEmissiveColor(new WhoaMath.Color3(1, 0, 0));
    //         space_mesh_material.SetZOffset(-1, -10);
    //         space_mesh.SetMaterial(space_mesh_material);
    //         vertex_data.ApplyToMesh(space_mesh, true);
    //     }
    // }

    private RegisterKeyEvent() {
        this.canvas_.addEventListener('keyup', this.bind_key_up_);
    }

    private UnregisterKeyEvent() {
        this.canvas_.removeEventListener('keyup', this.bind_key_up_);
    }

    private RegisterPointerEvent() {
        this.canvas_.addEventListener('pointermove', this.bind_pointer_move_);
        this.canvas_.addEventListener('pointerup', this.bind_pointer_up_);
    }

    private UnregisterPointerEvent() {
        this.canvas_.removeEventListener('pointermove', this.bind_pointer_move_);
        this.canvas_.removeEventListener('pointerup', this.bind_pointer_up_);
    }

    private RegisterEvent() {
        WhoaEvent.Sub('START_DRAW_LINE', () => {
            WhoaInteraction.Pause();
            CreateWallByLine.Get().OnCreateStart();
        });

        WhoaEvent.Sub('STOP_DRAW_LINE', () => {
            WhoaInteraction.Restore();
            CreateWallByLine.Get().OnCreateEnd();
        });
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
        if (WhoaFramework.PointerButton.LEFT == event.button) {
            if (CreateStatus.START == this.status_) {
                const screen_position = WhoaScene.GetScreenPosition();
                this.start_ = WhoaScene.ScreenToWorld(screen_position);
                this.status_ = CreateStatus.CREATE;
            } else if (CreateStatus.CREATE == this.status_) {
                this.end_ = WhoaScene.ScreenToWorld(WhoaScene.GetScreenPosition());
                const wall_points = this.OnCreate();
                const mid = this.start_.Add(this.end_).Multiply(0.5);
                const info = new WallCreateInfo();
                info.role_ = WhoaFramework.EntityRole.ROOT;
                info.type_ = WhoaFramework.EntityType.WALL;
                info.hovered_ = false;
                info.selected_ = false;
                info.visible_ = true;
                info.pickable_ = true;
                info.movable_ = true;
                info.points_ = wall_points;
                info.width_ = this.wall_width_;
                info.length_ = WhoaMath.Vector3.FromPoint3(this.end_.Subtract(this.start_)).Length();
                info.height_ = this.wall_height_;
                info.radian_ = this.radian_ + Math.PI / 2;
                info.position_ = new WhoaMath.Vector3(mid.x, mid.y, mid.z / 2);
                WallManager.Get().Create(info);
                this.start_ = this.end_;
                this.wall_mesh_?.Dispose();
                this.wall_mesh_ = undefined;

                let points = '';
                points += wall_points[0].x.toString() + ' ' + wall_points[0].y + ' ';
                points += wall_points[1].x.toString() + ' ' + wall_points[1].y + ' ';
                points += wall_points[2].x.toString() + ' ' + wall_points[2].y + ' ';
                points += wall_points[3].x.toString() + ' ' + wall_points[3].y;
                this.wall_vector_points_.push_back(points);
                // this.GetSpace();
                SpaceUtil.GetSpace(this.wall_vector_points_);
            }
        } else if (WhoaFramework.PointerButton.RIGHT == event.button) {
            this.status_ = CreateStatus.START;
            this.wall_mid_line_?.Dispose();
            this.wall_mid_line_ = undefined;
            this.wall_mesh_?.Dispose();
            this.wall_mesh_ = undefined;
            WhoaEvent.Pub('STOP_DRAW_LINE');
        }
    }
}
