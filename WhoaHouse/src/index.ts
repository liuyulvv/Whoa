/* eslint-disable @typescript-eslint/no-unused-vars */

import CreateWallByLine from './wall/CreateWallByLine';
import WallManager from './wall/WallManager';

const create_wall_by_line = CreateWallByLine.Get();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaHouse = {
    WallManager: WallManager.Get()
};
