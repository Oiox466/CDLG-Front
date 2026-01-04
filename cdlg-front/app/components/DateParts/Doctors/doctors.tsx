"use client";

import { useEffect, useState } from "react";
import ImageButton from "../../ImageButton/imageButton";
import styles from "./doctors.module.css";
import Cookies from "js-cookie";

interface Props {
  specialityId: number;
  onNext: (doctor: {
    id_contrato: string;
    nombre: string;
    id_consultorio: number;
    no_consultorio: number;
  }) => void;
}

interface Doctor {
  id_contrato: string;
  nombre_comp: string;
  id_consultorio: number;
  no_consultorio: number;
}

interface ApiResponse {
  id_especialidad: number;
  total_doctores: number;
  docs: Doctor[];
}

const Doctors = ({ specialityId, onNext }: Props) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = Cookies.get("token");

      if (!token) {
        console.warn("No hay token");
        setDoctors([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:7000/doctores/especialidades/${specialityId}/doctores`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Error al obtener doctores");
        }

        const data: ApiResponse = await res.json();
        console.log("RESPUESTA BACKEND:", data);

        if (Array.isArray(data.docs)) {
          setDoctors(data.docs);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    if (specialityId) {
      fetchDoctors();
    }
  }, [specialityId]);

  const handleSelect = (doc: Doctor) => {
    onNext({
      id_contrato: doc.id_contrato,
      nombre: doc.nombre_comp,
      id_consultorio: doc.id_consultorio,
      no_consultorio: doc.no_consultorio,
    });
  };

  if (loading) {
    return <p>Cargando doctores...</p>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.cell}>
                No hay doctores registrados para esta especialidad
              </td>
            </tr>
          ) : (
            doctors.map((_, index) =>
              index % 4 === 0 ? (
                <tr key={index}>
                  {doctors.slice(index, index + 4).map((doc) => (
                    <td key={doc.id_contrato} className={styles.cell}>
                      <ImageButton
                        text={`${doc.nombre_comp} (Consultorio ${doc.no_consultorio})`}
                        onClick={() => handleSelect(doc)}
                      />
                    </td>
                  ))}
                </tr>
              ) : null
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
