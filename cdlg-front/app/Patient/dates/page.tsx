"use client";

import DateProcess from "../../components/DateParts/DateProcess/dateProcess";
import styles from './dates.module.css';
import React, { useState } from "react";

const Dates = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className={styles.container}>
            <h1>AGENDAR NUEVA CITA</h1>
            <div className={styles.dateContainer}>
                <div className={styles.stepsContainer}>
                    <ul className={styles.stepList}>
                        {["Especialidad", "Doctores", "Fecha", "Hora", "Pago"].map((text, index) => (
                            <li key={index} className={styles.stepItem}>
                                <div className={`${styles.diamond} ${index === currentStep ? styles.activeDiamond : ""}`}>
                                    <span>♦</span>
                                </div>
                                <p className={styles.stepText}>{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.actionContainer}>
                    <DateProcess onStepChange={setCurrentStep}/>
                </div>
            </div>
        </div>
    );
};

export default Dates;
