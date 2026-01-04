"use client";

import NavBar from "@/app/components/NavBar/navBar";
import DateProcess from "../../components/DateParts/DateProcess/dateProcess";
import styles from "./dates.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

const Dates = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <>
            <NavBar opaque />

            <div className={styles.container}>

                <div className={styles.titleContainer}>
                    <Image src="/Group_19.svg" alt="icon" width={60} height={60} className={styles.titleIcon}/>
                    <h1 className={styles.title}>AGENDAR NUEVA CITA</h1>
                </div>

                <div className={styles.dateContainer}>
                    <div className={styles.stepsContainer}>
                        <ul className={styles.stepList}>
                            {["Especialidad", "Doctores", "Fecha", "Hora", "Pago"].map((text, index) => (
                                <li key={index} className={styles.stepItem}>
                                    <Image src="/Subtitle_Icon.svg" alt="icon" width={35} height={35} className={`${styles.diamond} ${index === currentStep ? styles.activeDiamond : ""}`}/>
                                    <p className={styles.stepText}>{text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.actionContainer}>
                        <DateProcess onStepChange={setCurrentStep} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dates;
