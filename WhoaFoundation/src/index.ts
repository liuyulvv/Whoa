import Event from './Event/Event';
import Http from './Http/Http';
import Websocket from './Websocket/Websocket';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaFoundation = {
    Http: Http,
    Websocket: Websocket
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaEvent = Event.Get();
