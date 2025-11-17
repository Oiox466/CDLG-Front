"use client";

import { useState } from "react";
import Styles from "./hour.module.css";

type HourProps = {
    doctor: string;
    day: string;
    onNext: (hour: string) => void;
};

const Hour = ({ doctor, day, onNext }: HourProps) => {
    const [selectedHour, setSelectedHour] = useState("");

    const handleHourClick = (hour: string) => {
        setSelectedHour(hour);
        onNext(hour);
    };

    return (
        <div className={Styles.container}>
            <h2>Fecha y hora</h2>

            <p>{day} Horarios disponibles</p>

            <table className={Styles.table}>
                <tbody>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("9:00 AM")}>9:00 AM</button></td>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("10:00 AM")}>10:00 AM</button></td>
                    </tr>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("11:00 AM")}>11:00 AM</button></td>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("12:00 PM")}>12:00 PM</button></td>
                    </tr>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("1:00 PM")}>1:00 PM</button></td>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("2:00 PM")}>2:00 PM</button></td>
                    </tr>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("3:00 PM")}>3:00 PM</button></td>
                        <td><button className={Styles.hourButton} onClick={() => handleHourClick("4:00 PM")}>4:00 PM</button></td>
                    </tr>
                </tbody>
            </table>

            <p>*Recuerde presentarse 10 minutos antes</p>
        </div>
    );
};

export default Hour;