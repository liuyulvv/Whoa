import { Matrix as BabylonMatrix } from '@babylonjs/core';
import { Vector3 } from './Vector';

export class Matrix extends BabylonMatrix {
    public constructor() {
        super();
    }

    public Determinant(): number {
        return this.determinant();
    }

    public Invert(): Matrix {
        return this.invert();
    }

    public GetTranslation(): Vector3 {
        const vector = this.getTranslation();
        return new Vector3(vector.x, vector.y, vector.z);
    }

    public SetTranslation(vector3: Vector3) {
        this.setTranslation(vector3);
        return this;
    }

    public Multiply(matrix: Matrix) {
        // A.multiply(B) means apply B to A so result is B x A
        return this.multiply(matrix);
    }

    public Clone(): Matrix {
        return this.Clone();
    }

    public Transpose(): Matrix {
        return this.transpose();
    }

    public Scale(scale: number): Matrix {
        return this.scale(scale);
    }

    public GetRotationMatrix(): Matrix {
        return this.getRotationMatrix();
    }
}
