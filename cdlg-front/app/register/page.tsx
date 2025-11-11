"use client";
import React, {useState} from "react";
import Form from "../components/Form/form";
import IconButton from "../components/IconButton/iconButton";
import TextInput from "../components/TextInput/textInput";
import styles from "./register.module.css";

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <p>*icono*</p>
                <p>Recuerda que al crear tu cuenta, se te asignará un número de seguridad social al correo que proporcionaste</p>
            </div>
            <div className={styles.right}>
                <Form
                inputs={
                    <>
                    <TextInput placeHolder="Nombre" value={name} onChangeText={setName}/>
                    <TextInput placeHolder="Correo electrónico" value={email} onChangeText={setEmail} />
                    <TextInput placeHolder="Contraseña" value={password} onChangeText={setPassword} security={true} />
                    </>
                }
                buttons={
                    <>
                    <IconButton text="Iniciar sesión" onPress={() => console.log("Iniciar Sesion")}>
                        <p>→</p>
                    </IconButton>
                    <IconButton text="Crear Cuenta" onPress={() => console.log("Registrarse")}>
                        <p>+</p>
                    </IconButton>
                    </>
                }
                />
            </div>
        </div>
    );
}