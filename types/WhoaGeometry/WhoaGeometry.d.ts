/* eslint-disable camelcase */

declare namespace WhoaGeometry {
    export class Point2 {
        x(): number;
        y(): number;
    }

    export class Segment2 {
        source(): Point2;
        target(): Point2;
    }

    export class Polygon2 {}

    export class vector_double {
        size(): number;
        push_back(value: number): void;
        set(index: number, value: number): boolean;
        get(index: number): number;
        delete(): void;
    }

    export class vector_point_2 {
        size(): number;
        push_back(value: Point2): void;
        set(index: number, value: Point2): boolean;
        get(index: number): Point2;
        delete(): void;
    }

    export class vector_segment_2 {
        size(): number;
        push_back(value: Segment2): void;
        set(index: number, value: Segment2): boolean;
        get(index: number): Segment2;
        delete(): void;
    }

    export class vector_polygon_2 {
        size(): number;
        push_back(value: Polygon_2): void;
        set(index: number, value: Polygon_2): boolean;
        get(index: number): Polygon_2;
        delete(): void;
    }

    export function create_point_2(x: number, y: number): Point2;

    export function create_segment_2(start: Point2, end: Point2): Segment2;

    export function create_polygon_2(vector: vector_point_2): Polygon2;

    export function make_arrangement_2(vector: vector_segment_2): void;

    export function get_space_vector_from_walls(vector: vector_polygon_2): vector_polygon_2;
}
