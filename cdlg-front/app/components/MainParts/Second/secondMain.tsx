import React from "react";
import styles from "./secondMain.module.css";

const SecondMain: React.FC = () => {
    return (
        <div className={styles.content}>
            <nav></nav>
            <div>
                <h1>Porque tu salud nos importa</h1>
                
                <div>
                    <p>Atencion 24/7</p>
                    <p>Con los mejores especialistas en:</p>
                    <ul>
                        <li>Cardología</li>
                        <li>Dermatología</li>
                        <li>Ginecología</li>
                        <li>Medicina General</li>
                        <li>Nefrología</li>
                    </ul>
                    <ul>
                        <li>Nutriología</li>
                        <li>Oftalmología</li>
                        <li>Oncología</li>
                        <li>Ortopedia</li>
                        <li>Pediatría</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SecondMain;
