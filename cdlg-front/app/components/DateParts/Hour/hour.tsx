"use client";

import { useState, useEffect } from "react";
import Styles from "./hour.module.css";

type HourProps = {
  doctorId: string;
  idEspecialidad: number;
  day: string;
  onNext: (hour: string) => void;
};

const Hour = ({ doctorId, idEspecialidad, day, onNext }: HourProps) => {
  const [hour, setHour] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHour = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/citas/disponibilidad/resumen?id_contrato=${doctorId}&id_especialidad=${idEspecialidad}`
        );

        const result = await res.json();
        console.log("BACKEND RESUMEN:", result);

        if (!Array.isArray(result) || result.length === 0) {
          setHour(null);
          setLoading(false);
          return;
        }

        // Tomamos el primer registro válido
        const disponibilidad = result[0];

        if (!disponibilidad?.horario_inicio) {
          setHour(null);
          setLoading(false);
          return;
        }

        // Extraer parte después de 'T'
        const rawTime = disponibilidad.horario_inicio.split("T")[1]; // "15:00:00.000Z"

        // Convertir a formato legible HH:MM AM/PM
        const readableTime = new Date(disponibilidad.horario_inicio).toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setHour(readableTime);

      } catch (error) {
        console.error("Error fetching hour:", error);
        setHour(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHour();
  }, [doctorId, idEspecialidad, day]);

  const handleClick = () => {
    if (hour) onNext(hour);
  };

  return (
    <div className={Styles.container}>
      <h2>Seleccione su horario</h2>
      <p>{day}</p>

      {loading ? (
        <p>Cargando horario...</p>
      ) : hour ? (
        <button className={Styles.hourButton} onClick={handleClick}>
          {hour}
        </button>
      ) : (
        <p>No hay horarios disponibles</p>
      )}

      <p>*Recuerde presentarse 10 minutos antes</p>
    </div>
  );
};

export default Hour;
