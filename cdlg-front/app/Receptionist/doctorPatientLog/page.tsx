"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./doctorPatientLog.module.css";

interface DoctorPatientLogProps {
  registros: {
    id: string;
    fecha: string;
    hora: string;
    doctor: string;
    accion: string;
    descripcion: string;
  }[];
}

const DoctorPatientLog: React.FC<DoctorPatientLogProps> = ({ registros }) => {
  const router = useRouter();

  // Dummy data
  registros = [
    {
      id: "LOG-001",
      fecha: "15/01/2026",
      hora: "10:45 AM",
      doctor: "Dr. Juan Pérez López",
      accion: "Consulta realizada",
      descripcion:
        "Consulta de seguimiento por hipertensión. Se revisaron signos vitales.",
    },
    {
      id: "LOG-002",
      fecha: "15/01/2026",
      hora: "11:00 AM",
      doctor: "Dr. Juan Pérez López",
      accion: "Receta emitida",
      descripcion:
        "Se emitió receta médica con tratamiento antihipertensivo.",
    },
    {
      id: "LOG-003",
      fecha: "02/02/2026",
      hora: "09:20 AM",
      doctor: "Dra. María Gómez",
      accion: "Actualización de expediente",
      descripcion:
        "Se actualizaron antecedentes médicos del paciente.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1>Bitácora médico–paciente</h1>
        <p>Registro de interacciones clínicas</p>
      </header>

      {/* Registros */}
      <section className={styles.section}>
        {registros.length === 0 ? (
          <p>No hay registros disponibles.</p>
        ) : (
          <ul className={styles.list}>
            {registros.map((registro) => (
              <li key={registro.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>{registro.accion}</h3>
                  <span>{registro.fecha} · {registro.hora}</span>
                </div>

                <p>
                  <strong>Médico:</strong> {registro.doctor}
                </p>
                <p>
                  <strong>Descripción:</strong> {registro.descripcion}
                </p>
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

export default DoctorPatientLog;
