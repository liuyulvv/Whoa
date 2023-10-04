import Entity from "./entities/Entity";
import EntityRole from "./entities/EntityRole";
import EntityType from "./entities/EntityType";

let WhoaFramework = {
    Entity: Entity,
    EntityRole: EntityRole,
    EntityType: EntityType,
};

(<any>window).WhoaFramework = WhoaFramework;