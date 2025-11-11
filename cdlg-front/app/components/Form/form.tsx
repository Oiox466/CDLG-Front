"use client";
import React from "react";
import styles from "./form.module.css";

interface FormProps {
    inputs: React.ReactNode;
    buttons: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ inputs, buttons }) => {
    return (
        <div className={styles.container}>
        <div className={styles.secondContainer}>
            <div className={styles.inputContainer}>
            {inputs}
            </div>
            <div className={styles.buttonContainer}>
            {buttons}
            </div>
        </div>
        </div>
    );
};

export default Form;