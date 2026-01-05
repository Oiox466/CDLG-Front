"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./prescription.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Paciente {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_seguridad_social: string;
}

interface FolioCita {
  id_paciente?: Paciente;
}

interface Receta {
  folio_receta: string;
  diganostico: string;
  observaciones: string;
  fecha_emision: string;
  folio_cita?: FolioCita;
}

const Prescription = () => {
  const router = useRouter();

  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Doctor/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:7000/receta/mostrar-recetas",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Error al obtener recetas");

        const data: Receta[] = await response.json();

        // Normalizar: filtrar recetas con paciente disponible
        const recetasValidas = data.filter(
          (r) => r.folio_cita?.id_paciente?.nombres && r.diganostico
        );

        if (recetasValidas.length === 0) {
          console.log("No hay recetas válidas para mostrar");
        } else {
          console.log("Recetas válidas:", recetasValidas);
        }

        setRecetas(recetasValidas);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las recetas");
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, [router]);

  const formatearFecha = (iso: string) =>
    new Date(iso).toLocaleDateString("es-MX");

  if (loading) {
    return (
      <>
        <NavBar opaque role="doctor" />
        <div className={styles.container}>Cargando recetas...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar opaque role="doctor" />
        <div className={styles.container} style={{ color: "red" }}>
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar opaque role="doctor" />
      <div className={styles.container}>
        <h1 className={styles.title}>Recetas Emitidas</h1>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>NSS</th>
                <th>Diagnóstico</th>
                <th>Fecha de Emisión</th>
              </tr>
            </thead>
            <tbody>
              {recetas.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No hay recetas emitidas
                  </td>
                </tr>
              ) : (
                recetas.map((receta) => (
                  <tr key={receta.folio_receta}>
                    <td>
                      {receta.folio_cita?.id_paciente
                        ? `${receta.folio_cita.id_paciente.nombres} ${receta.folio_cita.id_paciente.apellido_paterno} ${receta.folio_cita.id_paciente.apellido_materno}`
                        : "Paciente no disponible"}
                    </td>
                    <td>
                      {receta.folio_cita?.id_paciente?.numero_seguridad_social ||
                        "-"}
                    </td>
                    <td>{receta.diganostico || "-"}</td>
                    <td>{formatearFecha(receta.fecha_emision)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Prescription;
