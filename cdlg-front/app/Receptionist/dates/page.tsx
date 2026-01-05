"use client";

import NavBar from "@/app/components/NavBar/navBar";
import DateProcess from "./DateParts/DateProcess/dateProcess";
import styles from "./dates.module.css";
import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Dates = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const searchParams = useSearchParams();
    const nss = searchParams.get("nss"); // ⚡ Obtenemos el NSS del paciente desde la URL

    return (
        <>
            <NavBar opaque />

            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <Image
                        src="/Group_19.svg"
                        alt="icon"
                        width={60}
                        height={60}
                        className={styles.titleIcon}
                    />
                    <h1 className={styles.title}>AGENDAR NUEVA CITA</h1>
                </div>

                <div className={styles.dateContainer}>
                    <div className={styles.stepsContainer}>
                        <ul className={styles.stepList}>
                            {["Especialidad", "Doctores", "Fecha", "Hora", "Pago"].map(
                                (text, index) => (
                                    <li key={index} className={styles.stepItem}>
                                        <Image
                                            src="/Subtitle_Icon.svg"
                                            alt="icon"
                                            width={35}
                                            height={35}
                                            className={`${styles.diamond} ${
                                                index === currentStep ? styles.activeDiamond : ""
                                            }`}
                                        />
                                        <p className={styles.stepText}>{text}</p>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className={styles.actionContainer}>
                        {/* ⚡ Pasamos el NSS a DateProcess */}
                        <DateProcess onStepChange={setCurrentStep} nss={nss} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dates;
