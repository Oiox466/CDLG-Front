"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./home.module.css";
import React from "react";
import Image from "next/image";
import { CardiologyIcon } from "@/app/components/Icons/Icons";

const Home = () => {

    return (
        <>
            <NavBar opaque />

            <div className={styles.container}>

                <div className={styles.titleContainer}>
                    <Image src="/Group_19.svg" alt="icon" width={60} height={60} className={styles.titleIcon}/>
                    <h1 className={styles.title}>Citas Pendientes</h1>
                </div>

                <div className={styles.homeContainer}>
                    <div className={styles.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Especialidad</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                                <tr>
                                    <td>DR. Sandra Otilia Hernández</td>
                                    <td> <CardiologyIcon color="white"/>
                                        <p>Cardiología</p>
                                    </td>
                                    <td>Por atender</td>
                                    <td>20/11/2025</td>
                                    <td>9:00 am</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;