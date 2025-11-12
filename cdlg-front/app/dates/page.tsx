import DateProcess from "../components/DateParts/DateProcess/dateProcess";
import styles from './dates.module.css';

const Dates = () => {
    return (
        <div className={styles.container}>
            <h1>AGENDAR NUEVA CITA</h1>
            <div className={styles.dateContainer}>
                <div className={styles.stepsContainer}>
                    <ul>
                        <li>Especialidad</li>
                        <li>Doctores</li>
                        <li>Fecha</li>
                        <li>Hora</li>
                        <li>Pago</li>
                    </ul>
                </div>
                <div className={styles.actionContainer}>
                    <DateProcess/>
                </div>
            </div>
        </div>
    );
}

export default Dates;