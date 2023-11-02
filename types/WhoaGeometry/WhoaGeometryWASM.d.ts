export interface VectorDouble {
  size(): number;
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  set(_0: number, _1: number): boolean;
  get(_0: number): any;
  delete(): void;
}

export interface MainModule {
  VectorDouble: {new(): VectorDouble};
  SegmentArrangement(_0: VectorDouble): void;
}
