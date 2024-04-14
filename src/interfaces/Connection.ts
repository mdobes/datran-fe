export interface ConnectionStop {
    arrival: string;
    departure: string;
    name: string;
    delay: number | null;
    id: number;
    lat: number;
    lon: number;
    platform: string;
}

export interface ConnectionTrip {
    cisLine: string;
    idsLine: string;
    order: number;
    firstStopDep: string;
    lastStopArr: string;
    operator: string;
    vehicle: string;
    firstStopName: string;
    lastStopName: string;
}

export interface ConnectionLive {
    time: string;
    id: number;
    name: string;
    delay: number;
    lastUpdated: string;
}

export interface Connection {
    trip: ConnectionTrip;
    live: ConnectionLive;
    stops: ConnectionStop[];
}
