"use client";

import { useEffect, useState } from "react";
import TableButton from "../../../../components/TableButton/tableButton";
import styles from "./speciality.module.css";
import * as Icons from "../../../../components/Icons/Icons";
import Cookies from "js-cookie";

interface Props {
  onNext: (value: { id: number; name: string; cost: number }) => void;
}

const Speciality = ({ onNext }: Props) => {
  const [specialities, setSpecialities] = useState<
    { id_especialidad: number; costo_atencion: number; nom_especialidad: string }[]
  >([]);

  useEffect(() => {
  const fetchData = async () => {
    const token = Cookies.get("token");

    if (!token) {
      alert("Sesión expirada, vuelve a iniciar sesión");
      return;
    }

    const res = await fetch(
      "http://localhost:7000/doctores/especialidades",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Error al cargar especialidades");
    }

    const data = await res.json();
    setSpecialities(data);
  };

  fetchData().catch(console.error);
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
                      onClick={() =>{
                        console.log("TOKEN GUARDADO EN COOKIE:", Cookies.get("token"));
                        handleSelect(
                          subItem.id_especialidad,
                          subItem.nom_especialidad,
                          subItem.costo_atencion
                        )
                      }
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
