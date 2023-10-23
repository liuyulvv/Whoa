declare namespace Whoa {
    export namespace WhoaGeneral {
        export class FreeMove {
            public static get(): FreeMove;
            public attach(entity: WhoaFramework.Entity): void;
            public onDragStart();
            public onDrag();
            public onDragEnd();
        }
    }
}
