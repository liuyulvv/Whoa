/// <reference path="TopoType.d.ts" />

declare namespace WhoaGeometry {
    export abstract class TopoBase {
        public get type(): TopoType;
        public abstract Clone(): TopoBase;
    }
}
