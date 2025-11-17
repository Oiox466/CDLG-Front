import React from "react";
import styles from "./secondMain.module.css";
import Image from "next/image";
import * as Icons from "../../Icons/Icons";

const SecondMain: React.FC = () => {
    return (
        <div className={styles.content}>
            <nav></nav>
            <div>
                <div className={styles.titleContainer}>
                    <h1>Porque tu salud nos importa</h1>
                </div>
                
                <div className={styles.container}>
                    <div className={styles.secondContainer}>
                        <div className={styles.topRow}>
                            <Image src="/CDLG_List_Icon.svg" alt="icon" width={40} height={40}/>
                            <p>Atencion 24/7</p>
                        </div>
                        <p>Con los mejores especialistas en:</p>
                        <table>
                            <tbody>
                                <tr>
                                <td>
                                    <p>Cardiología</p>
                                    <Icons.CardiologyIcon />
                                </td>
                                <td>
                                    <p>Dermatología</p>
                                    <Icons.DermatologyIcon />
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <p>Ginecología</p>
                                    <Icons.GynecologyIcon />
                                </td>
                                <td>
                                    <p>Medicina General</p>
                                    <Icons.GeneralMedicineIcon />
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <p>Nefrología</p>
                                    <Icons.NephrologyIcon />
                                </td>
                                <td>
                                    <p>Nutriología</p>
                                    <Icons.NutritionIcon />
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <p>Oftalmología</p>
                                    <Icons.OphthalmologyIcon />
                                </td>
                                <td>
                                    <p>Oncología</p>
                                    <Icons.OncologyIcon />
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <p>Ortopedia</p>
                                    <Icons.OrthopedicsIcon />
                                </td>
                                <td>
                                    <p>Pediatría</p>
                                    <Icons.PediatricsIcon />
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondMain;
