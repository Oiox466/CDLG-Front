"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./patients.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

/* =========================
   TIPOS (SEGÚN JSON REAL)
========================= */

interface HistorialMedico {
  tipo_sangre: string;
  peso: number;
  estatura: number;
}

interface Paciente {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  sexo: string;
  numero_seguridad_social: string;
  id_historial_medico: HistorialMedico;
}

/* =========================
   COMPONENTE
========================= */

const Patients = () => {
  const router = useRouter();

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     FETCH paciente/todos
  ========================= */

  useEffect(() => {
    const fetchPacientes = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Patient/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:7000/paciente/todos",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Error al obtener pacientes");
        }

        const data = await response.json();

        console.log("PACIENTES:", data);

        setPacientes(data ?? []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, [router]);

  const formatearFecha = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-MX");
  };

  /* =========================
     RENDER
  ========================= */

  if (loading) {
    return (
      <>
        <NavBar opaque role="receptionist" />
        <div className={styles.container}>
          <p>Cargando pacientes...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar opaque role="receptionist" />
        <div className={styles.container}>
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar opaque role="receptionist"/>

      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Image
            src="/Group_19.svg"
            alt="icon"
            width={60}
            height={60}
            className={styles.titleIcon}
          />
          <h1 className={styles.title}>Pacientes</h1>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Sexo</th>
                <th>Fecha nacimiento</th>
                <th>NSS</th>
                <th>Tipo sangre</th>
                <th>Peso</th>
                <th>Estatura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    No hay pacientes
                  </td>
                </tr>
              ) : (
                pacientes.map((paciente) => (
                  <tr
                    key={paciente.numero_seguridad_social}
                  >
                    <td>
                      {paciente.nombres}{" "}
                      {paciente.apellido_paterno}{" "}
                      {paciente.apellido_materno}
                    </td>
                    <td>{paciente.sexo}</td>
                    <td>{formatearFecha(paciente.fecha_nacimiento)}</td>
                    <td>{paciente.numero_seguridad_social}</td>
                    <td>{paciente.id_historial_medico?.tipo_sangre}</td>
                    <td>{paciente.id_historial_medico?.peso}</td>
                    <td>{paciente.id_historial_medico?.estatura}</td>
                    <td>
                      <button
                        className={styles.detailButton}
                        onClick={() => {
                          console.log("AGENDAR CITA PARA:", paciente);
                          // router.push(`/appointments/new?nss=${paciente.numero_seguridad_social}`)
                        }}
                      >
                        Agendar cita
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Patients;
