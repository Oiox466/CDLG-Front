"use client";

import { useEffect, useState } from "react";
import Styles from "./hour.module.css";
import Cookies from "js-cookie";

/* =======================
   TIPOS
======================= */

type HourProps = {
  doctorId: string;   // id_contrato
  fecha: string;      // "2026-01-08"
  no_consultorio: number;

  onNext: (hour: string) => void;
};

interface HorarioDisponible {
  id_contrato: string;
  id_horario_comp_contrato: number;
  id_horario: number;
  fecha: string;
  fechaHora_inicio: string;
  fechaHora_fin: string;
}

/* =======================
   COMPONENTE
======================= */

const Hour = ({ doctorId, fecha, onNext }: HourProps) => {
  const [hours, setHours] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  /* =======================
     FETCH HORAS DEL DÍA
  ======================= */

  useEffect(() => {
    const fetchHours = async () => {
      try {
        setLoading(true);
        setHours([]);

        const token = Cookies.get("token");

        const res = await fetch(
          "http://localhost:7000/doctores/disponibilidad/resumen/dias",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id_contrato: doctorId,
              fecha: `${fecha}T07:00:00.000Z`,
            }),
          }
        );

        const data: HorarioDisponible[] = await res.json();
        console.log("HORARIOS BACKEND:", data);

        if (!Array.isArray(data) || data.length === 0) {
          setLoading(false);
          return;
        }

        const slots: string[] = [];

        data.forEach((h) => {
          const start = new Date(h.fechaHora_inicio);
          const end = new Date(h.fechaHora_fin);

          const current = new Date(start);

          while (current < end) {
            slots.push(
              current.toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            );

            current.setHours(current.getHours() + 1);
          }
        });

        setHours(slots);
      } catch (error) {
        console.error("Error fetching hours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, [doctorId, fecha]);

  /* =======================
     HANDLERS
  ======================= */

  const handleSelect = (hour: string) => {
    setSelectedHour(hour);
    onNext(hour);
  };

  /* =======================
     RENDER
  ======================= */

  return (
    <div className={Styles.container}>
      <h2>Seleccione su horario</h2>
      <p>{fecha}</p>

      {loading && <p>Cargando horarios...</p>}

      {!loading && hours.length === 0 && (
        <p>No hay horarios disponibles</p>
      )}

      <div className={Styles.hoursGrid}>
        {hours.map((hour) => (
          <button
            key={hour}
            className={`${Styles.hourButton} ${
              selectedHour === hour ? Styles.selected : ""
            }`}
            onClick={() => handleSelect(hour)}
          >
            {hour}
          </button>
        ))}
      </div>

      <p>*Recuerde presentarse 10 minutos antes</p>
    </div>
  );
};

export default Hour;