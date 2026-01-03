"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./medicalHistory.module.css";

interface MedicalHistoryProps {
  historial: {
    tipoSangre: string;
    alergias: string[];
    padecimientosPrevios: string[];
    consultas: {
      id: string;
      fecha: string;
      especialidad: string;
      doctor: string;
      diagnostico: string;
    }[];
  };
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ historial }) => {
  const router = useRouter();

  // Dummy data
  historial = {
    tipoSangre: "O+",
    alergias: ["Penicilina", "Polen"],
    padecimientosPrevios: ["Hipertensión arterial", "Asma leve"],
    consultas: [
      {
        id: "CONS-001",
        fecha: "10/09/2025",
        especialidad: "Medicina General",
        doctor: "Dra. María Gómez",
        diagnostico: "Control rutinario, signos vitales estables",
      },
      {
        id: "CONS-002",
        fecha: "15/01/2026",
        especialidad: "Cardiología",
        doctor: "Dr. Juan Pérez López",
        diagnostico: "Seguimiento por presión arterial elevada",
      },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1>Historial médico</h1>
        <p>Consulta de información médica básica</p>
      </header>

      {/* Información médica básica */}
      <section className={styles.section}>
        <h2>Información médica básica</h2>

        <div className={styles.grid}>
          <div>
            <label>Tipo de sangre</label>
            <p>{historial.tipoSangre}</p>
          </div>

          <div>
            <label>Alergias</label>
            <p>
              {historial.alergias.length > 0
                ? historial.alergias.join(", ")
                : "No registradas"}
            </p>
          </div>

          <div>
            <label>Padecimientos previos</label>
            <p>
              {historial.padecimientosPrevios.length > 0
                ? historial.padecimientosPrevios.join(", ")
                : "No registrados"}
            </p>
          </div>
        </div>
      </section>

      {/* Historial de consultas */}
      <section className={styles.section}>
        <h2>Consultas anteriores</h2>

        {historial.consultas.length === 0 ? (
          <p>No hay consultas registradas.</p>
        ) : (
          <ul className={styles.list}>
            {historial.consultas.map((consulta) => (
              <li key={consulta.id} className={styles.card}>
                <p>
                  <strong>Fecha:</strong> {consulta.fecha}
                </p>
                <p>
                  <strong>Especialidad:</strong> {consulta.especialidad}
                </p>
                <p>
                  <strong>Médico:</strong> {consulta.doctor}
                </p>
                <p>
                  <strong>Diagnóstico:</strong> {consulta.diagnostico}
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

export default MedicalHistory;