"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./datingstatus.module.css";

interface DatingStatusProps {
  citas: {
    id: string;
    fecha: string;
    hora: string;
    especialidad: string;
    doctor: string;
    estatus: "Programada" | "Confirmada" | "Cancelada" | "Concluida";
  }[];
}

const DatingStatus: React.FC<DatingStatusProps> = ({ citas }) => {
  const router = useRouter();

  // Dummy data
  citas = [
    {
      id: "CITA-001",
      fecha: "15/01/2026",
      hora: "10:30 AM",
      especialidad: "Cardiología",
      doctor: "Dr. Juan Pérez López",
      estatus: "Confirmada",
    },
    {
      id: "CITA-002",
      fecha: "02/02/2026",
      hora: "09:00 AM",
      especialidad: "Medicina General",
      doctor: "Dra. María Gómez",
      estatus: "Programada",
    },
    {
      id: "CITA-003",
      fecha: "20/12/2025",
      hora: "12:00 PM",
      especialidad: "Dermatología",
      doctor: "Dr. Carlos Ramírez",
      estatus: "Concluida",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1>Estado de citas</h1>
        <p>Consulta el estatus de tus citas médicas</p>
      </header>

      {/* Lista de citas */}
      <section className={styles.section}>
        {citas.length === 0 ? (
          <p>No tienes citas registradas.</p>
        ) : (
          <ul className={styles.list}>
            {citas.map((cita) => (
              <li key={cita.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{cita.especialidad}</h3>
                  <span className={styles.status}>{cita.estatus}</span>
                </div>

                <p>
                  <strong>Fecha:</strong> {cita.fecha}
                </p>
                <p>
                  <strong>Hora:</strong> {cita.hora}
                </p>
                <p>
                  <strong>Médico:</strong> {cita.doctor}
                </p>

                <button
                  className={styles.linkButton}
                  onClick={() => router.push(`/citas/${cita.id}`)}
                >
                  Ver detalle
                </button>
              </li>
            ))}
          </ul>
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

export default DatingStatus;
