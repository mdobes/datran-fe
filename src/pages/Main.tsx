import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {Marker} from "react-map-gl";
import {useEffect, useState} from "react";
import styles from './Main.module.scss';
import Vehicle from "../interfaces/Vehicle.ts";
import VehicleMarker from "../components/VehicleMarker/VehicleMarker.tsx";

const Main = () => {

    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        const fetchVehicles = () => {
            fetch(`https://www.datran.eu/api/v1/vehicles`)
                .then(response => response.json())
                .then(data => {
                    setVehicles(data.data as Vehicle[]);
                })
                .catch(error => console.error('Error fetching vehicles:', error));
        };

        fetchVehicles();

        const intervalId = setInterval(fetchVehicles, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Map
            initialViewState={{
                latitude: 49.7273796,
                longitude: 15.7495473,
                zoom: 6
            }}
            //maxBounds={[11.2401111182, 48.5553052842, 19.8531441586, 51.1172677679]}
            style={{minWidth: "100dvw", minHeight: "100dvh"}}
            mapStyle="./map/style_light.json"
            attributionControl={false}
        >
            {vehicles?.map(vehicle => (
                <Marker key={vehicle.connectionID}
                        longitude={vehicle.lon}
                        latitude={vehicle.lat}
                >
                    <VehicleMarker vehicle={vehicle} />
                </Marker>)
            )}
        </Map>
    );
}

export default Main;
