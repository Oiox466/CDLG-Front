"use client";
import React from "react";
import styles from "./tableButton.module.css";

interface TableButtonProps {
    text: string;
    onClick?: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({ text, onClick }) => {
    return (
        <div className={styles.backgroundImage}>
            <button className={styles.button} onClick={onClick}>
                <div className={styles.diamond}>
                    <span>♦</span>
                </div>
                <p className={styles.text}>{text}</p>
            </button>
        </div>
    );
};

export default TableButton;
