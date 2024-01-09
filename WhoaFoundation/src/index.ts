import Event from './Event/Event';

window.WhoaEvent = Event.Get();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).WhoaEvent = Event.Get();
