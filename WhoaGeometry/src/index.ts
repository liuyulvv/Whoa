import Earcut, { EarcutResult } from './Earcut/Earcut';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaGeometry = {
    Earcut: Earcut,
    EarcutResult: EarcutResult
};
