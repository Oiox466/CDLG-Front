"use client";
import React from "react";
import styles from "./imageButton.module.css";

interface ImageButtonProps {
  text: string;
  onClick?: () => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ text, onClick }) => {
  return (
    <div
      className={styles.backgroundImage}
    >
      <button className={styles.button} onClick={onClick}>
        <div className={styles.container}>
          <div className={styles.secondContainer}>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      </button>

      <div className={styles.diamond}>
        <span>♦</span>
      </div>
    </div>
  );
};

export default ImageButton;
