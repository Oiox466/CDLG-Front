"use client";

import { useState, useEffect } from "react";
import Styles from "./day.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

/* =======================
   TIPOS
======================= */

interface DayProps {
  idContrato: string;
  idEspecialidad: number;
  no_consultorio: number;
  onNext: (data: {
    fecha: string;
    total_horas: number;
  }) => void;
}

interface DiaDisponible {
  id_contrato: string;
  fecha: string;
  inicio_turno: string;
  fin_turno: string;
  total_horas: number;
}

/* =======================
   COMPONENTE
======================= */

const Day = ({ idContrato, idEspecialidad, onNext }: DayProps) => {
  const [date, setDate] = useState(new Date());
  const [availableDays, setAvailableDays] = useState<DiaDisponible[]>([]);

  /* =======================
     FETCH DISPONIBILIDAD
  ======================= */

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = Cookies.get("token");

        const res = await fetch(
          "http://localhost:7000/doctores/disponibilidad/resumen",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id_contrato: idContrato,
            }),
          }
        );

        const data = await res.json();
        console.log("RESPUESTA BACKEND:", data);

        if (Array.isArray(data)) {
          setAvailableDays(data);
        } else {
          setAvailableDays([]);
        }
      } catch (error) {
        console.error("Error fetching disponibilidad:", error);
        setAvailableDays([]);
      }
    };

    fetchAvailability();
  }, [idContrato]);

  /* =======================
     CALENDARIO
  ======================= */

  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const now = new Date();
  const limitDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const goNextMonth = () => setDate(new Date(year, month + 1, 1));
  const goPrevMonth = () => setDate(new Date(year, month - 1, 1));

  /* =======================
     HELPERS
  ======================= */

  const formatDay = (day: number) =>
    new Date(year, month, day).toISOString().split("T")[0];

  const isAvailableFromBackend = (day: number) => {
    const formatted = formatDay(day);
    return availableDays.some(
      (d) => d.fecha.split("T")[0] === formatted
    );
  };

  const getDayInfo = (day: number) => {
    const formatted = formatDay(day);
    return availableDays.find(
      (d) => d.fecha.split("T")[0] === formatted
    );
  };

  const isDisabled = (day: number | null) => {
    if (day === null) return true;

    const selectedDate = new Date(year, month, day, 23, 59);
    if (selectedDate.getTime() < limitDate.getTime()) return true;

    return !isAvailableFromBackend(day);
  };

  /* =======================
     TABLA
  ======================= */

  const weekNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const rows = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    rows.push(daysArray.slice(i, i + 7));
  }

  const getWeekDayShort = (day: number) =>
    weekNames[new Date(year, month, day).getDay()];

  /* =======================
     RENDER
  ======================= */

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <button onClick={goPrevMonth}>
          <Image src="/vector.svg" alt="icon" width={24} height={24} />
        </button>

        <h2>
          {date
            .toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            })
            .replace(/^\w/, (c) => c.toUpperCase())}
        </h2>

        <button onClick={goNextMonth}>
          <Image src="/vector2.svg" alt="icon" width={24} height={24} />
        </button>
      </div>

      <div className={Styles.tableContainer}>
        <table className={Styles.table}>
          <tbody>
            {rows.map((week, rIndex) => (
              <tr key={rIndex}>
                {week.map((day, cIndex) => (
                  <td key={cIndex} className={Styles.cell}>
                    {day !== null && (
                      <button
                        disabled={isDisabled(day)}
                        onClick={() => {
                          if (isDisabled(day)) return;

                          const info = getDayInfo(day);
                          if (!info) return;

                          onNext({
                            fecha: formatDay(day),
                            total_horas: info.total_horas,
                          });
                        }}
                        className={`${Styles.dayButton} ${
                          isAvailableFromBackend(day)
                            ? Styles.available
                            : Styles.unavailable
                        }`}
                      >
                        <span className={Styles.weekText}>
                          {getWeekDayShort(day)}
                        </span>
                        <span className={Styles.dayNumber}>{day}</span>
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Day;