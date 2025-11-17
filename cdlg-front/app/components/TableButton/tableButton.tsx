"use client";
import React, { ReactNode } from "react";
import styles from "./tableButton.module.css";

interface TableButtonProps {
    children?: ReactNode;
    text: string;
    onClick?: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({ text, onClick, children }) => {
    return (
        <div className={styles.backgroundImage}>
            <button className={styles.button} onClick={onClick}>
                <div className={styles.diamond}>
                    {children}
                </div>
                <p className={styles.text}>{text}</p>
            </button>
        </div>
    );
};

export default TableButton;
