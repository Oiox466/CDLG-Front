"use client";
import React from "react";
import IconButton from "../../IconButton/iconButton";
import styles from "./firstMain.module.css";

const FirstMain: React.FC = () => {
    return (
        <div className={styles.content}>
            <nav></nav>
            <div>
                <h1>Salud Accesible & Cuidado Excepcional</h1>
                
                <div className={styles['buttons-container']}>
                    <IconButton text="Conócenos" onPress={() => console.log("Iniciar Sesión")}>
                        <p>i</p>
                    </IconButton>

                    <IconButton text="Registrarte" onPress={() => console.log("Registro")}>
                        <p>h</p>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default FirstMain;
