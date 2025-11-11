"use client";
import React from "react";
import styles from "./textInput.module.css";

interface TextInputProps {
    placeHolder: string;
    value: string | number;
    onChangeText?: (value: string) => void;
    security?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ placeHolder, value, onChangeText, security = false, }) => {
    return (
        <div className={styles.container}>
            <div className={styles.circleOuter}>
                <div className={styles.circleMiddle}>
                    <div className={styles.circleInner}></div>
                </div>
            </div>
            <input className={styles.input} placeholder={placeHolder} type={security ? "password" : "text"} value={value} onChange={(e) => onChangeText?.(e.target.value)}/>
        </div>
    );
};

export default TextInput;