declare namespace WhoaMath {
    export class Matrix {
        public constructor();

        public Determinant(): number;

        public Invert(): Matrix;

        public GetTranslation(): Vector3;

        public SetTranslation(vector3: Vector3): Matrix;

        public Multiply(matrix: Matrix): Matrix;

        public Clone(): Matrix;

        public Transpose(): Matrix;

        public Scale(scale: number): Matrix;

        public GetRotationMatrix(): Matrix;

        public static RotationX(angle: number): Matrix;

        public static RotationY(angle: number): Matrix;

        public static RotationZ(angle: number): Matrix;

        public static RotationAxis(axis: Vector3, angle: number): Matrix;

        public static Scaling(x: number, y: number, z: number): Matrix;

        public static Translation(x: number, y: number, z: number): Matrix;
    }
}
