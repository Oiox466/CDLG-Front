"use client";

import { useEffect, useState } from "react";
import ImageButton from "../../ImageButton/imageButton";
import styles from "./doctors.module.css";

interface Props {
  specialityId: number;
  onNext: (doctor: { name: string; id: string }) => void;
}

interface Doctor {
  id_contrato: string;
  nombre_comp: string;
}

const Doctors = ({ specialityId, onNext }: Props) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/citas/especialidades/${specialityId}/doctores`
        );
        const result = await res.json();

        console.log("BACKEND:", result);

        // Aseguramos que docs exista y sea array
        if (Array.isArray(result.docs)) {
          setDoctors(result.docs);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [specialityId]);

  const handleSelect = (name: string, id: string) => {
    onNext({ name, id }); // Enviar info al DateProcess
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {Array.isArray(doctors) &&
            doctors.map((doc, index) =>
              index % 4 === 0 ? (
                <tr key={index}>
                  {doctors.slice(index, index + 4).map((subDoc) => (
                    <td key={subDoc.id_contrato} className={styles.cell}>
                      <ImageButton
                        text={subDoc.nombre_comp}
                        onClick={() =>
                          handleSelect(subDoc.nombre_comp, subDoc.id_contrato)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ) : null
            )}

          {doctors.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.cell}>
                No hay doctores registrados para esta especialidad
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
