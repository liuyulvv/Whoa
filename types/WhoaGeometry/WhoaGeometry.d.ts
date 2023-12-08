/* eslint-disable camelcase */

declare namespace Module {
    export class VectorDouble {
        size(): number;
        push_back(_0: number): void;
        resize(_0: number, _1: number): void;
        set(_0: number, _1: number): boolean;
        get(_0: number): number;
        delete(): void;
    }

    export function SegmentArrangement(vector: VectorDouble): void;
}
