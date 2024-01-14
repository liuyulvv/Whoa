export default class CreateWallUtil {
    private static instance: CreateWallUtil;

    private wall_width_: number;
    private wall_height_: number;

    private constructor() {
        this.wall_width_ = 240;
        this.wall_height_ = 2800;
    }

    public static Get(): CreateWallUtil {
        if (!CreateWallUtil.instance) {
            CreateWallUtil.instance = new CreateWallUtil();
        }
        return CreateWallUtil.instance;
    }

    public GetWallWidth(): number {
        return this.wall_width_;
    }

    public GetWallHeight(): number {
        return this.wall_height_;
    }

    public SetWallWidth(width: number): void {
        this.wall_width_ = width;
    }

    public SetWallHeight(height: number): void {
        this.wall_height_ = height;
    }
}
