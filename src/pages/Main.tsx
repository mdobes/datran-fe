import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {Marker} from "react-map-gl";
import {useEffect, useState} from "react";

interface Vehicle {
    connectionID: string;
    lon: number;
    lat: number;
    idsLine: string;
}

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
                    <span>{vehicle.idsLine}</span>
                    <svg x="0px" y="0px"
                         viewBox="0 0 500 500" height={30} width={30}>
                        <g>
                            <path fill={"#00AA00"} d="M190.1,63.4c84.9,0,236.3,113.7,298.7,163.6c14.9,11.9,14.9,34.2,0,46.1c-62.4,50.8-213.6,163.6-298.7,163.6
		C87,436.6,3.5,353.1,3.5,250S87,63.4,190.1,63.4L190.1,63.4z"/>
                            <g>
                                <circle fill={"#00AA00"} cx="186.7" cy="250" r="186.6"/>
                                <path fill={"#ffffff"} d="M118.5,287.9c0-8.4,6.8-15.2,15.2-15.2c8.4,0,15.2,6.8,15.2,15.2c0,8.4-6.8,15.2-15.2,15.2
			S118.5,296.4,118.5,287.9z M224.6,287.9c0-8.4,6.8-15.2,15.2-15.2c8.4,0,15.2,6.8,15.2,15.2c0,8.4-6.8,15.2-15.2,15.2
			C231.4,303.1,224.6,296.4,224.6,287.9z M85.3,161.9c12.2-14.9,44.4-33.3,101.4-33.3c61,0,90.1,18.3,101.6,33.5
			c3.6,4.6,4.6,9.9,4.6,14.2V307c0,11.4-6.1,21.9-15.2,28.4v24.7c0,6.3-5.1,11.4-11.4,11.4c-6.3,0-11.4-5.1-11.4-11.4v-19H118.5v19
			c0,6.3-5.1,11.4-11.4,11.4c-6.3,0-11.4-5.1-11.4-11.3v-24.8c-9.1-6.6-15.2-17-15.2-28.4V176.3C80.4,172,81.4,166.6,85.3,161.9
			L85.3,161.9z M104.9,174.2h164c-7.5-8.1-29.4-22.7-82.1-22.7C138.2,151.4,113.6,165.8,104.9,174.2z M270.1,197H103.3v37.9h166.9
			V197z M270.1,257.6H103.3v49.3c0,6.3,5.1,11.4,11.4,11.4h144.2c6.3,0,11.4-5.1,11.4-11.4L270.1,257.6L270.1,257.6z"/>
                            </g>
                        </g>
                    </svg>


                </Marker>)
            )}
        </Map>
    );
}

export default Main;
