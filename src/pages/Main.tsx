import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {Marker} from "react-map-gl";
import {useEffect, useState} from "react";
import Vehicle from "../interfaces/Vehicle.ts";
import VehicleMarker from "../components/VehicleMarker/VehicleMarker.tsx";
import { useDisclosure } from '@mantine/hooks';
import {Drawer, LoadingOverlay, Timeline, Title, Text} from '@mantine/core';
import {Connection, ConnectionStop} from "../interfaces/Connection.ts";
import {IconBusStop} from "@tabler/icons-react";
import dayjs from "dayjs";

const Main = () => {

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [mapZoom, setMapZoom] = useState<number>(6);
    const [connectionID, setConnectionID] = useState<string|null>(null);
    const [connectionDetail, setConnectionDetail] = useState<Connection|null>(null);

    const [opened, { open, close }] = useDisclosure(false);

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

    useEffect(() => {
        const fetchDetail = () => {
            fetch(`https://www.datran.eu/api/v1/connection/${connectionID}`)
                .then(response => response.json())
                .then(data => {
                    setConnectionDetail(data.data as Connection);
                })
                .catch(error => console.error('Error fetching connection:', error));
        };

        fetchDetail();
    }, [connectionID]);

    return (
        <>
            <Drawer.Root
                position={"right"}
            opened={opened}
            onClose={close}
            autoFocus={false}
        >
                <Drawer.Content>
                    { connectionDetail ?
                        <>
                            <Drawer.Header>
                                <Drawer.Title>
                                    <Title order={2}>
                                        {connectionDetail.trip.cisLine} ({connectionDetail.trip.idsLine}) / {connectionDetail.trip.order}
                                    </Title>
                                </Drawer.Title>
                                <Drawer.CloseButton/>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Text>
                                    {connectionDetail.trip.firstStopName} - {connectionDetail.trip.lastStopName}<br/>
                                    {connectionDetail.trip.operator}<br/>
                                    {connectionDetail.trip.vehicle ? <span> {connectionDetail.trip.vehicle} <br /></span> : "" }
                                    <br />
                                    <Timeline bulletSize={24} lineWidth={2}>
                                        {connectionDetail.stops.map((stop: ConnectionStop) => (
                                        <Timeline.Item bullet={<IconBusStop size={12} />} title={stop.name} style={{marginTop: "0.5rem"}}>
                                            <Text c="dimmed" size="sm">{dayjs(stop.arrival).format("HH:mm")} - {dayjs(stop.departure).format("HH:mm")}</Text>
                                            <Text c="dimmed" size="xs" mt={4}>Stanoviště {stop.platform}</Text>
                                        </Timeline.Item>
                                            )
                                        )}
                                    </Timeline>
                                </Text>
                            </Drawer.Body>
                        </>
                        :
                        <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    }
                </Drawer.Content>

            </Drawer.Root>

            <Map
                onZoom={(e) => setMapZoom(e.viewState.zoom)}
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
                    <Marker key={vehicle.connectionID} longitude={vehicle.lon} latitude={vehicle.lat} onClick={() => {setConnectionDetail(null); open(); setConnectionID(vehicle.connectionID)}}>
                        <VehicleMarker zoom={mapZoom} vehicle={vehicle} />
                    </Marker>)
                )}
            </Map>
        </>
    );
}

export default Main;
