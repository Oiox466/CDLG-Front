"use client";

import { useState, useEffect } from "react";
import Styles from "./day.module.css";
import Image from "next/image";

interface DayProps {
  idContrato: string;
  idEspecialidad: number;
  onNext: (dateStr: string) => void;
}

interface DiaDisponible {
  fecha: string;
  dia_nombre: string;
  slots_disponibles: number;
  horario_inicio: string;
  horario_fin: string;
}

const Day = ({ idContrato, idEspecialidad, onNext }: DayProps) => {
  const [date, setDate] = useState(new Date());
  const [availableDays, setAvailableDays] = useState<DiaDisponible[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/citas/disponibilidad/resumen?id_contrato=${idContrato}&id_especialidad=${idEspecialidad}`
        );
        const data = await res.json();
        console.log("DIAS DISPONIBLES:", data);

        if (Array.isArray(data)) setAvailableDays(data);
        else setAvailableDays([]);
      } catch (error) {
        console.error("Error fetching disponibilidad:", error);
        setAvailableDays([]);
      }
    };

    fetchAvailability();
  }, [idContrato, idEspecialidad]);

  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const now = new Date();
  const limitDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const goNextMonth = () => setDate(new Date(year, month + 1, 1));
  const goPrevMonth = () => setDate(new Date(year, month - 1, 1));

  const isAvailableFromBackend = (day: number) => {
    const formatted = new Date(year, month, day).toISOString().split("T")[0];
    return availableDays.some((d) => d.fecha.split("T")[0] === formatted);
  };

  const isDisabled = (day: number | null) => {
    if (day === null) return true;
    const selectedDate = new Date(year, month, day, 23, 59);
    if (selectedDate.getTime() < limitDate.getTime()) return true;
    return !isAvailableFromBackend(day);
  };

  const formatDay = (day: number) => {
    return new Date(year, month, day).toISOString().split("T")[0]; // Solo fecha
  };

  const weekNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const rows = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    rows.push(daysArray.slice(i, i + 7));
  }

  const getWeekDayShort = (day: number) => {
    return weekNames[new Date(year, month, day).getDay()];
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <button onClick={goPrevMonth}>
          <Image src="/vector.svg" alt="icon" width={24} height={24} />
        </button>
        <button onClick={goNextMonth}>
          <Image src="/vector2.svg" alt="icon" width={24} height={24} />
        </button>

        <h2>
          {date
            .toLocaleDateString("es-ES", { month: "long", year: "numeric" })
            .replace(/^\w/, (c) => c.toUpperCase())}
        </h2>
      </div>

      <div className={Styles.tableContainer}>
        <table className={Styles.table}>
          <tbody>
            {rows.map((week, rIndex) => (
              <tr key={rIndex}>
                {week.map((day, cIndex) => (
                  <td key={cIndex} className={Styles.cell}>
                    {day !== null ? (
                      <button
                        disabled={isDisabled(day)}
                        onClick={() => !isDisabled(day) && onNext(formatDay(day))}
                        className={`${Styles.dayButton} ${
                          isAvailableFromBackend(day) ? Styles.available : Styles.unavailable
                        }`}
                      >
                        <span className={Styles.weekText}>{getWeekDayShort(day)}</span>
                        <span className={Styles.dayNumber}>{day}</span>
                      </button>
                    ) : null}
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