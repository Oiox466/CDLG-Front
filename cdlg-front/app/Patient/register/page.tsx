"use client";
import React, { useState } from "react";
import Image from "next/image";
import Form from "../../components/Form/form";
import IconButton from "../../components/IconButton/iconButton";
import TextInput from "../../components/TextInput/textInput";
import styles from "./register.module.css";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import { useRouter } from "next/navigation";

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ===== USUARIO =====
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // ===== PACIENTE =====
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cp, setCp] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [correo, setCorreo] = useState("");

  // ===== ARCHIVO =====
  const [filePdf, setFilePdf] = useState<File | null>(null);

  // ===== SUBMIT =====
  const handleSubmit = async () => {
  if (!filePdf) {
    alert("Debes subir un archivo PDF");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();

    // usuario
    formData.append(
      "usuario",
      JSON.stringify({
        nombre_usuario: nombreUsuario,
        contrasenia: contrasenia,
        tipo_usuario: 0,
      })
    );

    // paciente
    formData.append(
      "paciente",
      JSON.stringify({
        nombres,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        sexo,
        fecha_nacimiento: fechaNacimiento,
        calle,
        colonia,
        ciudad,
        cp,
        estado_civil: estadoCivil,
        ocupacion,
        nacionalidad,
        correo,
      })
    );

    // archivo PDF (MULTER ESPERA "file")
    formData.append("file", filePdf);

    const res = await fetch(
      "http://localhost:7000/auth/register-patient",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    const data = await res.json();
    console.log("Registro exitoso:", data);

    alert("Registro exitoso, revisa tu correo");

    // 👉 REDIRECCIÓN AL LOGIN
    router.push("/Patient/login");

  } catch (error) {
    if (error instanceof Response) {
      error.json().then((err) => {
        alert(err.message || "Error al registrar");
      });
    } else if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Error desconocido");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image src="/icon.svg" alt="icon" width={200} height={200} />
        <p>CDLG</p>
        <p>Registro de paciente</p>
      </div>

      <div className={styles.right}>
        {/* ===== FORM 1 ===== */}
        {step === 1 && (
          <Form
            inputs={
              <>
                <TextInput
                  placeHolder="Nombre de usuario"
                  value={nombreUsuario}
                  onChangeText={setNombreUsuario}
                />
                <TextInput
                  placeHolder="Contraseña"
                  value={contrasenia}
                  onChangeText={setContrasenia}
                  security
                />
                <TextInput
                  placeHolder="Correo electrónico"
                  value={correo}
                  onChangeText={setCorreo}
                />
              </>
            }
            buttons={
              <IconButton text="Continuar" onPress={() => setStep(2)}>
                <CardiologyIcon size={30} />
              </IconButton>
            }
          />
        )}

        {/* ===== FORM 2 ===== */}
        {step === 2 && (
          <Form
            inputs={
              <>
                <TextInput placeHolder="Nombres" value={nombres} onChangeText={setNombres} />
                <TextInput placeHolder="Apellido paterno" value={apellidoPaterno} onChangeText={setApellidoPaterno} />
                <TextInput placeHolder="Apellido materno" value={apellidoMaterno} onChangeText={setApellidoMaterno} />
                <TextInput placeHolder="Sexo (M/F)" value={sexo} onChangeText={setSexo} />
                <TextInput placeHolder="Fecha nacimiento (YYYY-MM-DD)" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
              </>
            }
            buttons={
              <>
                <IconButton text="Regresar" onPress={() => setStep(1)}>
                  <CardiologyIcon size={30} />
                </IconButton>
                <IconButton text="Continuar" onPress={() => setStep(3)}>
                  <CardiologyIcon size={30} />
                </IconButton>
              </>
            }
          />
        )}

        {/* ===== FORM 3 ===== */}
        {step === 3 && (
          <Form
            inputs={
              <>
                <TextInput placeHolder="Nacionalidad" value={nacionalidad} onChangeText={setNacionalidad} />
                <TextInput placeHolder="Estado civil" value={estadoCivil} onChangeText={setEstadoCivil} />
                <TextInput placeHolder="Ocupación" value={ocupacion} onChangeText={setOcupacion} />
                <TextInput placeHolder="Calle" value={calle} onChangeText={setCalle} />
                <TextInput placeHolder="Colonia" value={colonia} onChangeText={setColonia} />
                <TextInput placeHolder="Ciudad" value={ciudad} onChangeText={setCiudad} />
                <TextInput placeHolder="CP" value={cp} onChangeText={setCp} />

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFilePdf(e.target.files?.[0] || null)}
                />
              </>
            }
            buttons={
              <>
                <IconButton text="Regresar" onPress={() => setStep(2)}>
                  <CardiologyIcon size={30} />
                </IconButton>
                <IconButton
                  text={loading ? "Registrando..." : "Crear cuenta"}
                  onPress={handleSubmit}
                >
                  <CardiologyIcon size={30} />
                </IconButton>
              </>
            }
          />
        )}
      </div>
    </div>
  );
}