/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */

declare namespace WhoaGeometryUtil {
    export class Point_2 {
        x(): number;
        y(): number;
    }

    export class Segment_2 {
        start(): Point_2;
        end(): Point_2;
    }

    export class Optional<T> {
        has_value(): boolean;
        value(): T;
    }

    export function create_point_2(x: number, y: number): Point_2;

    export function create_segment_2(start: Point_2, end: Point_2): Segment_2;

    export function is_segment_2_intersect(s1: Segment_2, s2: Segment_2): boolean;

    export function get_segment_2_intersect_point(s1: Segment_2, s2: Segment_2): Optional<Point_2>;
}
