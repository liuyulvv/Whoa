import Delaunator, { DelaunatorResult } from './Delaunator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaGeometry = {
    Delaunator: Delaunator,
    DelaunatorResult: DelaunatorResult
};
