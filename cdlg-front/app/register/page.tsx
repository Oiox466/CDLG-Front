"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../components/Form/form";
import IconButton from "../components/IconButton/iconButton";
import TextInput from "../components/TextInput/textInput";
import styles from "./register.module.css";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>*icono*</p>
        <p>
          Recuerda que al crear tu cuenta, se te asignará un número de seguridad
          social al correo que proporcionaste
        </p>
      </div>
      <div className={styles.right}>
        <Form
          inputs={
            <>
              <TextInput
                placeHolder="Nombre"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeHolder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                placeHolder="Contraseña"
                value={password}
                onChangeText={setPassword}
                security={true}
              />
            </>
          }
          buttons={
            <>
              <IconButton
                text="Iniciar sesión"
                onPress={() => router.push("/login")}
              >
                <p>→</p>
              </IconButton>

              <IconButton
                text="Crear Cuenta"
                onPress={() => router.push("/dates")}
              >
                <p>+</p>
              </IconButton>
            </>
          }
        />
      </div>
    </div>
  );
}