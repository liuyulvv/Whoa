import FreeMove from './FreeMove/FreeMove';
import Http from './Http/Http';
import Websocket from './Websocket/Websocket';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).Whoa.WhoaGeneral = {
    Http: Http,
    FreeMove: FreeMove,
    Websocket: Websocket
};
