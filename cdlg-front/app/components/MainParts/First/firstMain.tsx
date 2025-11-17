"use client";
import React from "react";
import { useRouter } from "next/navigation";
import IconButton from "../../IconButton/iconButton";
import styles from "./firstMain.module.css";
import { CardiologyIcon } from "../../Icons/Icons";

const FirstMain: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.content}>
      <nav></nav>
      <div>
        <h1>Salud Accesible & Cuidado Excepcional</h1>

        <div className={styles["buttons-container"]}>
          <IconButton
            text="Iniciar Sesión"
            onPress={() => router.push("/Patient/login")}
          >
            <CardiologyIcon size={30}/>
          </IconButton>

          <IconButton
            text="Registrarte"
            onPress={() => router.push("/Patient/register")}
          >
            <CardiologyIcon size={30}/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FirstMain;
