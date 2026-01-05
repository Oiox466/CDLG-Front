"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./homeDoctor.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

/* =======================
   TIPOS (SEGÚN RESPONSE REAL)
======================= */

interface Paciente {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_seguridad_social: string;
}

interface Especialidad {
  nom_especialidad: string;
}

interface Contrato {
  especialidad: Especialidad;
}

interface CitaDoctor {
  folio_cita: string;
  estatus: string;
  fecha_cita: string;
  id_paciente: Paciente;
  id_contrato: Contrato;
}

const HomeDoctor = () => {
  const router = useRouter();

  const [citas, setCitas] = useState<CitaDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCitas = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Doctor/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:7000/citas/mis-citas/doctor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener citas");
        }

        const data: CitaDoctor[] = await response.json();
        setCitas(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las citas");
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [router]);

  const formatearFecha = (iso: string) =>
    new Date(iso).toLocaleDateString("es-MX");

  const formatearHora = (iso: string) =>
    new Date(iso).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  if (loading) {
    return (
      <>
        <NavBar opaque role="doctor" />
        <div className={styles.container}>Cargando citas...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar opaque role="doctor" />
        <div className={styles.container} style={{ color: "red" }}>
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar opaque role="doctor" />

      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Image
            src="/Group_19.svg"
            alt="icon"
            width={60}
            height={60}
            className={styles.titleIcon}
          />
          <h1 className={styles.title}>Citas Pendientes</h1>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>NSS</th>
                <th>Especialidad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No hay citas asignadas
                  </td>
                </tr>
              ) : (
                citas.map((cita) => (
                  <tr key={cita.folio_cita}>
                    <td>
                      {cita.id_paciente.nombres}{" "}
                      {cita.id_paciente.apellido_paterno}{" "}
                      {cita.id_paciente.apellido_materno}
                    </td>
                    <td>{cita.id_paciente.numero_seguridad_social}</td>
                    <td>
                      <CardiologyIcon />
                      {cita.id_contrato.especialidad.nom_especialidad}
                    </td>
                    <td>{cita.estatus}</td>
                    <td>{formatearFecha(cita.fecha_cita)}</td>
                    <td>{formatearHora(cita.fecha_cita)}</td>
                    <td>
                      <button
  onClick={() => {
    console.log("Enviando a detailsDate:", {
      folio: cita.folio_cita,
      nss: cita.id_paciente.numero_seguridad_social
    });
    router.push(
      `/Doctor/detailsDate?folio=${cita.folio_cita}&nss=${cita.id_paciente.numero_seguridad_social}`
    );
  }}
>
  Detalles
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

export default HomeDoctor;
