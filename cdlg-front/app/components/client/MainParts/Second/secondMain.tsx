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
                        <li>Omeopatia</li>
                        <li>Nutriología</li>
                        <li>Momoligia</li>
                        <li>Gastroenterología</li>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default SecondMain;
