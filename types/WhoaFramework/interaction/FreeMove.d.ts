/// <reference path="../entities/Entity.d.ts" />

declare namespace WhoaFramework {
    export class FreeMove {
        public static Get(): FreeMove;
        public Attach(entity: WhoaFramework.Entity): void;
        public OnDragStart();
        public OnDrag();
        public OnDragEnd();
    }
}
