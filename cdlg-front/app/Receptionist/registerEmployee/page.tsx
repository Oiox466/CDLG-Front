"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Form from "../../components/Form/form";
import IconButton from "../../components/IconButton/iconButton";
import TextInput from "../../components/TextInput/textInput";
import styles from "./registerEmployee.module.css";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

/* =======================
   TIPOS
======================= */
type Especialidad = {
  id_especialidad: number;
  nom_especialidad: string;
  costo_atencion: number;
};

type Horario = {
  id_horario: number;
  descripcion: string;
};

export default function RegisterEmployee() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* ========= USUARIO ========= */
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [correo, setCorreo] = useState("");

  /* ========= EMPLEADO ========= */
  const [nomEmpleado, setNomEmpleado] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");

  /* ========= CONTRATO ========= */
  const [cedulaProfesional, setCedulaProfesional] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [idEspecialidad, setIdEspecialidad] = useState("");

  /* ========= CATALOGOS ========= */
  const [specialities, setSpecialities] = useState<Especialidad[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [horariosSeleccionados, setHorariosSeleccionados] = useState<number[]>([]);

  /* ========= ARCHIVO ========= */
  const [filePdf, setFilePdf] = useState<File | null>(null);

  /* =======================
     FETCH ESPECIALIDADES
  ======================= */
  useEffect(() => {
    const fetchSpecialities = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      const res = await fetch(
        "http://localhost:7000/doctores/especialidades",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al cargar especialidades");

      const data = await res.json();
      console.log("ESPECIALIDADES:", data);
      setSpecialities(data);
    };

    fetchSpecialities().catch(console.error);
  }, []);

  /* =======================
     FETCH HORARIOS
  ======================= */
  useEffect(() => {
    const fetchHorarios = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      const res = await fetch(
        "http://localhost:7000/doctores/horarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error al cargar horarios");

      const data = await res.json();
      console.log("HORARIOS:", data);
      setHorarios(data);
    };

    fetchHorarios().catch(console.error);
  }, []);

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async () => {
  if (!filePdf) {
    alert("Debes subir un archivo PDF");
    return;
  }

  if (horariosSeleccionados.length === 0) {
    alert("Selecciona al menos un horario");
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    alert("No hay sesión activa");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();

    formData.append(
      "usuario",
      JSON.stringify({
        nombre_usuario: nombreUsuario,
        contrasenia,
        tipo_usuario: 1,
      })
    );

    formData.append(
      "empleado",
      JSON.stringify({
        nom_empleado: nomEmpleado,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        sexo,
        fecha_nacimiento: fechaNacimiento,
        fecha_contratacion: fechaContratacion,
        correo,
        curp,
        rfc,
        tipo: "D",
        estatus: "A",
      })
    );

    formData.append(
      "contrato",
      JSON.stringify({
        cedula_profesional: cedulaProfesional,
        id_especialidad: Number(idEspecialidad),
        sueldo,
      })
    );

    formData.append(
      "horarios",
      JSON.stringify(
        horariosSeleccionados.map((id) => ({
          id_horario: id,
        }))
      )
    );

    formData.append("file", filePdf);

    const res = await fetch(
      "http://localhost:7000/auth/register-employee",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error al registrar");
    }

    alert("Empleado registrado correctamente");
    router.push("/Receptionist/home");
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image src="/icon.svg" alt="icon" width={200} height={200} />
        <p>CDLG</p>
        <p>Registro de empleado</p>
      </div>

      <div className={styles.right}>
        {/* ===== STEP 1 USUARIO ===== */}
        {step === 1 && (
          <Form
            inputs={
              <>
                <TextInput placeHolder="Usuario" value={nombreUsuario} onChangeText={setNombreUsuario} />
                <TextInput placeHolder="Contraseña" value={contrasenia} onChangeText={setContrasenia} security />
                <TextInput placeHolder="Correo" value={correo} onChangeText={setCorreo} />
              </>
            }
            buttons={
              <IconButton text="Continuar" onPress={() => setStep(2)}>
                <CardiologyIcon size={30} />
              </IconButton>
            }
          />
        )}

        {/* ===== STEP 2 EMPLEADO ===== */}
        {step === 2 && (
          <Form
            inputs={
              <>
                <TextInput placeHolder="Nombre" value={nomEmpleado} onChangeText={setNomEmpleado} />
                <TextInput placeHolder="Apellido paterno" value={apellidoPaterno} onChangeText={setApellidoPaterno} />
                <TextInput placeHolder="Apellido materno" value={apellidoMaterno} onChangeText={setApellidoMaterno} />

                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                  <option value="">Sexo</option>
                  <option value="H">Hombre</option>
                  <option value="M">Mujer</option>
                </select>

                <TextInput placeHolder="Fecha nacimiento (YYYY-MM-DD)" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
                <TextInput placeHolder="Fecha contratación (YYYY-MM-DD)" value={fechaContratacion} onChangeText={setFechaContratacion} />
                <TextInput placeHolder="CURP" value={curp} onChangeText={setCurp} />
                <TextInput placeHolder="RFC" value={rfc} onChangeText={setRfc} />
              </>
            }
            buttons={
              <>
                <IconButton text="Regresar" onPress={() => setStep(1)} />
                <IconButton text="Continuar" onPress={() => setStep(3)} />
              </>
            }
          />
        )}

        {/* ===== STEP 3 CONTRATO ===== */}
        {step === 3 && (
          <Form
            inputs={
              <>
                <TextInput placeHolder="Cédula profesional" value={cedulaProfesional} onChangeText={setCedulaProfesional} />

                <select
                  value={idEspecialidad}
                  onChange={(e) => setIdEspecialidad(e.target.value)}
                >
                  <option value="">Especialidad</option>
                  {specialities.map((esp) => (
                    <option
                      key={esp.id_especialidad}
                      value={String(esp.id_especialidad)}
                    >
                      {esp.nom_especialidad}
                    </option>
                  ))}
                </select>

                <TextInput placeHolder="Sueldo" value={sueldo} onChangeText={setSueldo} />

                <select
                  multiple
                  value={horariosSeleccionados.map(String)}
                  onChange={(e) =>
                    setHorariosSeleccionados(
                      Array.from(e.target.selectedOptions, (o) => Number(o.value))
                    )
                  }
                >
                  {horarios.map((h) => (
                    <option key={h.id_horario} value={h.id_horario}>
                      {h.descripcion}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFilePdf(e.target.files?.[0] || null)}
                />
              </>
            }
            buttons={
              <>
                <IconButton text="Regresar" onPress={() => setStep(2)} />
                <IconButton
                  text={loading ? "Registrando..." : "Registrar"}
                  onPress={handleSubmit}
                />
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
