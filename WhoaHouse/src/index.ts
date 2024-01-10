/* eslint-disable @typescript-eslint/no-unused-vars */

import CreateWallByLine from './action/wall/CreateWallByLine';
import EntityWallManager from './entity/wall/EntityWallManager';

const create_wall_by_line = CreateWallByLine.Get();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaHouse = {
    EntityWallManager: EntityWallManager.Get()
};
