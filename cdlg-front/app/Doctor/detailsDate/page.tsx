"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./datailsDate.module.css";

interface DetalleCitaProps {
  cita: {
    id: string;
    fecha: string;
    hora: string;
    estatus: "Programada" | "Confirmada" | "Cancelada" | "Concluida";
    especialidad: string;
    doctor: {
      nombreCompleto: string;
      consultorio: string;
    };
    motivo: string;
    observaciones?: string;
  };
}

const DetailsDate: React.FC<DetalleCitaProps> = ({ cita }) => {
  const router = useRouter();
cita = {
    id: "CITA-001",
    fecha: "15/01/2026",
    hora: "10:30 AM",
    estatus: "Confirmada",
    especialidad: "Cardiología",
    doctor: {
      nombreCompleto: "Dr. Juan Pérez López",
      consultorio: "Consultorio 304",
    },
    motivo: "Consulta de seguimiento por presión arterial",
    observaciones:
      "Presentarse 15 minutos antes y llevar resultados de estudios previos.",
  };
  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1>Detalle de la cita</h1>
        <span className={styles.status}>{cita.estatus}</span>
      </header>

      {/* Información general */}
      <section className={styles.section}>
        <h2>Información de la cita</h2>
        <div className={styles.grid}>
          <div>
            <label>Fecha</label>
            <p>{cita.fecha}</p>
          </div>
          <div>
            <label>Hora</label>
            <p>{cita.hora}</p>
          </div>
          <div>
            <label>Especialidad</label>
            <p>{cita.especialidad}</p>
          </div>
        </div>
      </section>

      {/* Información del doctor */}
      <section className={styles.section}>
        <h2>Médico asignado</h2>
        <div className={styles.grid}>
          <div>
            <label>Nombre del doctor</label>
            <p>{cita.doctor.nombreCompleto}</p>
          </div>
          <div>
            <label>Consultorio</label>
            <p>{cita.doctor.consultorio}</p>
          </div>
        </div>
      </section>

      {/* Motivo y observaciones */}
      <section className={styles.section}>
        <h2>Motivo de la consulta</h2>
        <p>{cita.motivo}</p>

        {cita.observaciones && (
          <>
            <h3>Observaciones</h3>
            <p>{cita.observaciones}</p>
          </>
        )}
      </section>

      {/* Acciones */}
      <section className={styles.actions}>
        <button
          className={styles.secondaryButton}
          onClick={() => router.back()}
        >
          Volver
        </button>
      </section>
    </div>
  );
};

export default DetailsDate;