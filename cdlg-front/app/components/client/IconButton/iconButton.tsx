"use client";
import React, { ReactNode } from "react";
import styles from "./iconButton.module.css";

interface IconButtonProps {
    children?: ReactNode;
    text: string;
    onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ children, text, onPress }) => {
    return (
        <button onClick={onPress} className={styles.button}>
        <div className={styles.diagonalTop}></div>
        <div className={styles.container}>
            <div className={styles.diagonalFake}></div>
            <p className={styles.text}>{text}</p>
            <div className={styles.diamond}>{children}</div>
            <div className={styles.diagonalBottom}></div>
        </div>
        </button>
    );
};

export default IconButton;