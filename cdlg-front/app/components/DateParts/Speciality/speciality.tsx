"use client";

import { useEffect, useState } from "react";
import TableButton from "../../TableButton/tableButton";
import styles from "./speciality.module.css";
import * as Icons from "../../Icons/Icons";

interface Props {
  onNext: (value: { id: number; name: string; cost: number }) => void;
}

const Speciality = ({ onNext }: Props) => {
  const [specialities, setSpecialities] = useState<
    { id_especialidad: number; costo_atencion: number; nom_especialidad: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/citas/especialidades");
      const data = await res.json();
      setSpecialities(data);
    };
    fetchData();
  }, []);

  const handleSelect = (id: number, name: string, cost: number) => {
    onNext({ id, name, cost });
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {specialities.map((item, index) =>
            index % 4 === 0 ? (
              <tr key={index}>
                {specialities.slice(index, index + 4).map((subItem) => (
                  <td key={subItem.id_especialidad} className={styles.cell}>
                    <TableButton
                      text={subItem.nom_especialidad}
                      onClick={() =>
                        handleSelect(
                          subItem.id_especialidad,
                          subItem.nom_especialidad,
                          subItem.costo_atencion
                        )
                      }
                    >
                      {Icons.CardiologyIcon && <Icons.CardiologyIcon />} {/* icono temporal */}
                    </TableButton>
                  </td>
                ))}
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Speciality;
