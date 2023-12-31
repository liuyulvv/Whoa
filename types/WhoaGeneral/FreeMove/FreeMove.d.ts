/// <reference path="../../WhoaFramework/entities/Entity.d.ts" />

declare namespace Whoa {
    export namespace WhoaGeneral {
        export class FreeMove {
            public static Get(): FreeMove;
            public Attach(entity: WhoaFramework.Entity): void;
            public OnDragStart();
            public OnDrag();
            public OnDragEnd();
        }
    }
}
