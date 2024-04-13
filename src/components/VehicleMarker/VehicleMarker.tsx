import styles from "./VehicleMarker.module.scss";
import {colorByDelay} from "../../utils/Utils.ts";
import Vehicle from "../../interfaces/Vehicle.ts";

type Props = {
    vehicle: Vehicle;
}

const VehicleMarker = ({ vehicle }: Props) => {

    return (
        <div className={styles.vehicleMarker}>
            <svg x="0px" y="0px"
                 viewBox="0 0 629 619.8" height={40} width={40}>
                <g>
                    {vehicle.angle !== -1 ?
                        <path fill={colorByDelay(vehicle.delay)}
                              style={{transform: `rotate(${vehicle.angle}deg)`}} className={styles.vehicleIcon}
                              d="M314.5,123.2c84.9,0,236.3,113.7,298.7,163.6,14.9,11.9,14.9,34.2,0,46.1-62.4,50.8-213.6,163.6-298.7,163.6-103.1-.1-186.6-83.6-186.6-186.7,0-103.1,83.5-186.6,186.6-186.6h0Z"/>
                        : ""}
                    <circle fill={colorByDelay(vehicle.delay)} cx="314.5" cy="309.9" r="186.6"/>
                    <path fill={"#fff"}
                          d="M246.3,347.7c0-8.4,6.8-15.2,15.2-15.2s15.2,6.8,15.2,15.2-6.8,15.2-15.2,15.2-15.2-6.7-15.2-15.2ZM352.4,347.7c0-8.4,6.8-15.2,15.2-15.2s15.2,6.8,15.2,15.2-6.8,15.2-15.2,15.2-15.2-6.7-15.2-15.2ZM213.1,221.7c12.2-14.9,44.4-33.3,101.4-33.3s90.1,18.3,101.6,33.5c3.6,4.6,4.6,9.9,4.6,14.2v130.7c0,11.4-6.1,21.9-15.2,28.4v24.7c0,6.3-5.1,11.4-11.4,11.4s-11.4-5.1-11.4-11.4v-19h-136.4v19c0,6.3-5.1,11.4-11.4,11.4s-11.4-5.1-11.4-11.3v-24.8c-9.1-6.6-15.2-17-15.2-28.4v-130.7c0-4.3.9-9.7,4.8-14.4h0ZM232.7,234h164c-7.5-8.1-29.4-22.7-82.1-22.7-48.6-.1-73.2,14.3-81.9,22.7ZM397.9,256.8h-166.8v37.9h166.9v-37.9h-.1ZM397.9,317.4h-166.8v49.3c0,6.3,5.1,11.4,11.4,11.4h144.2c6.3,0,11.4-5.1,11.4-11.4l-.2-49.3h0Z"/>
                </g>
            </svg>
            <span>{vehicle.idsLine}</span>
        </div>
    )
}

export default VehicleMarker;