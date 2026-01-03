"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./prescription.module.css";

interface PrescriptionProps {
  receta: {
    id: string;
    fecha: string;
    doctor: string;
    especialidad: string;
    medicamentos: {
      nombre: string;
      dosis: string;
      frecuencia: string;
      duracion: string;
    }[];
    indicacionesGenerales?: string;
  };
}

const Prescription: React.FC<PrescriptionProps> = ({ receta }) => {
  const router = useRouter();

  // Dummy data
  receta = {
    id: "REC-001",
    fecha: "15/01/2026",
    doctor: "Dr. Juan Pérez López",
    especialidad: "Cardiología",
    medicamentos: [
      {
        nombre: "Losartán",
        dosis: "50 mg",
        frecuencia: "Cada 24 horas",
        duracion: "30 días",
      },
      {
        nombre: "Aspirina",
        dosis: "100 mg",
        frecuencia: "Cada 24 horas",
        duracion: "30 días",
      },
    ],
    indicacionesGenerales:
      "Tomar los medicamentos después de los alimentos. No suspender el tratamiento sin indicación médica.",
  };

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1>Receta médica</h1>
        <p>ID de receta: {receta.id}</p>
      </header>

      {/* Información general */}
      <section className={styles.section}>
        <h2>Información de la receta</h2>
        <div className={styles.grid}>
          <div>
            <label>Fecha</label>
            <p>{receta.fecha}</p>
          </div>
          <div>
            <label>Médico</label>
            <p>{receta.doctor}</p>
          </div>
          <div>
            <label>Especialidad</label>
            <p>{receta.especialidad}</p>
          </div>
        </div>
      </section>

      {/* Medicamentos */}
      <section className={styles.section}>
        <h2>Medicamentos prescritos</h2>

        {receta.medicamentos.length === 0 ? (
          <p>No hay medicamentos registrados.</p>
        ) : (
          <ul className={styles.list}>
            {receta.medicamentos.map((medicamento, index) => (
              <li key={index} className={styles.card}>
                <p>
                  <strong>Medicamento:</strong> {medicamento.nombre}
                </p>
                <p>
                  <strong>Dosis:</strong> {medicamento.dosis}
                </p>
                <p>
                  <strong>Frecuencia:</strong> {medicamento.frecuencia}
                </p>
                <p>
                  <strong>Duración:</strong> {medicamento.duracion}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Indicaciones */}
      {receta.indicacionesGenerales && (
        <section className={styles.section}>
          <h2>Indicaciones generales</h2>
          <p>{receta.indicacionesGenerales}</p>
        </section>
      )}

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

export default Prescription;
