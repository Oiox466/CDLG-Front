"use client";
import React from "react";
import styles from "./iconButton.module.css";

const IconButton = ({ children, text }) => {
    return (
        <button onClick={() => console.log("si jala")} className={styles.button}>
            <div className={styles.diagonalTop}></div>
            <div className={styles.container}>
                <div className={styles.diagonalFake}></div>
                <p className={styles.text}>{text}</p>
                <div className={styles.rombo}>{children}</div>
                <div className={styles.diagonalBottom}></div>
            </div>
        </button>
    );
};

export default IconButton;