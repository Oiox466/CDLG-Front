"use client";

import Styles from "./hour.module.css";

const Hour = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className={Styles.container}>
            <h2>Fecha</h2>
            <p>Horario disponible</p>

            <table className={Styles.table}>
                <tbody>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={onNext}>9:00 AM</button></td>
                        <td><button className={Styles.hourButton} onClick={onNext}>10:00 AM</button></td>
                    </tr>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={onNext}>11:00 AM</button></td>
                        <td><button className={Styles.hourButton} onClick={onNext}>12:00 PM</button></td>
                    </tr>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={onNext}>1:00 PM</button></td>
                        <td><button className={Styles.hourButton} onClick={onNext}>2:00 PM</button></td>
                    </tr>
                    <tr>
                        <td><button className={Styles.hourButton} onClick={onNext}>3:00 PM</button></td>
                        <td><button className={Styles.hourButton} onClick={onNext}>4:00 PM</button></td>
                    </tr>
                </tbody>
            </table>

            <p>*Recuerde presentarse a su cita 10 minutos antes</p>
        </div>
    );
};

export default Hour;