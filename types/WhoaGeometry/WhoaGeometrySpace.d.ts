/* eslint-disable camelcase */

declare namespace WhoaGeometrySpace {
    export class Point_2 {
        x(): number;
        y(): number;
    }

    export class vector_point_2 {
        size(): number;
        push_back(value: Point_2): void;
        set(index: number, value: Point_2): boolean;
        get(index: number): Point_2;
        delete(): void;
    }

    export class Polygon_2 {
        vertices(): vector_point_2;
    }

    export class vector_polygon_2 {
        size(): number;
        push_back(value: Polygon_2): void;
        set(index: number, value: Polygon_2): boolean;
        get(index: number): Polygon_2;
        delete(): void;
    }

    export class vector_string {
        size(): number;
        push_back(value: string): void;
        set(index: number, value: string): boolean;
        get(index: number): string;
        delete(): void;
    }

    export function get_spaces(wall_points: vector_string): vector_polygon_2;
}
