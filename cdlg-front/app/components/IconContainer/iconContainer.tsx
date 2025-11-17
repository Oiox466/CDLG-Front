"use client";
import React, { ReactNode } from "react";
import styles from "./iconContainer.module.css";

interface IconContainerProps {
    children?: ReactNode;
}

const IconContainer: React.FC<IconContainerProps> = ({ children }) => {
    return (
        <div className={styles.diamond}>{children}</div>
    );
};

export default IconContainer;