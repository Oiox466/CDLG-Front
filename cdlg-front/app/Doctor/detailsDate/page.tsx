"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NavBar from "@/app/components/NavBar/navBar";
import styles from "./datailsDate.module.css";

/* =======================
   TIPOS
======================= */

interface Doctor {
  nombre_completo: string;
  especialidad: string;
}

interface Consultorio {
  no_consultorio: number;
}

interface Paciente {
  numero_seguridad_social: string;
}

interface Cita {
  folio_cita: string;
  fecha_cita: string;
  estatus_texto: string;
  doctor: Doctor;
  consultorio: Consultorio;
  paciente?: Paciente;
}

interface HistorialClinico {
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  fecha: string;
}

interface Medicamento {
  medicamento: string;
  tratamiento: string;
}

const DetailsDate = () => {
  const searchParams = useSearchParams();
  const folio = searchParams.get("folio");
  const nss = searchParams.get("nss"); // <-- recibimos el NSS
  const router = useRouter();

  const [cita, setCita] = useState<Cita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarReceta, setMostrarReceta] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const [historial, setHistorial] = useState<HistorialClinico[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);
  const [errorHistorial, setErrorHistorial] = useState<string | null>(null);

  const [diagnostico, setDiagnostico] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    { medicamento: "", tratamiento: "" },
  ]);
  const [datosPaciente, setDatosPaciente] = useState<{
  nombre: string;
  tipo_sangre: string;
  peso: number;
  estatura: number;
  edad: number;
} | null>(null);


  /* =======================
     FETCH CITA
  ======================== */
  useEffect(() => {
    if (!folio) {
      setError("No se recibió el folio de la cita");
      setLoading(false);
      return;
    }

    const fetchCita = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Doctor/login");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:7000/citas/mis-citas/${folio}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error al obtener la cita");
        }

        const data = await res.json();

        if (data.citas && data.citas.length > 0) {
          setCita(data.citas[0]);
        } else {
          setError("Cita no encontrada");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCita();
  }, [folio, router]);

  /* =======================
     FORMATEO DE FECHA Y HORA
  ======================== */
  const formatearFecha = (fechaISO: string) =>
    new Date(fechaISO).toLocaleDateString("es-MX");

  const formatearHora = (fechaISO: string) =>
    new Date(fechaISO).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  /* =======================
     FUNCIONES RECETA
  ======================== */
  const agregarMedicamento = () => {
    setMedicamentos([...medicamentos, { medicamento: "", tratamiento: "" }]);
  };

  const generarReceta = async () => {
    if (!cita) return;

    const token = Cookies.get("token");
    if (!token) {
      alert("Sesión expirada");
      router.push("/Doctor/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:7000/receta/crear-receta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          diagnostico,
          observaciones,
          folio_cita: cita.folio_cita,
          medicamentos,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al generar receta");
      }

      alert("Receta generada correctamente");
      router.push("/receta/crear-receta");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  /* =======================
     FUNCION HISTORIAL
  ======================== */
const verHistorialClinico = async () => {
  console.log("funciona"); // Para verificar que entra

  const token = Cookies.get("token");
  if (!token) {
    alert("Sesión expirada");
    return;
  }

  try {
    setLoadingHistorial(true);
    setErrorHistorial(null);

    const res = await fetch("http://localhost:7000/citas/historial-clinico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        numero_seguridad_social: nss,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error al obtener historial clínico");
    }

    const data = await res.json();
    console.log("Historial recibido:", data);

    // AJUSTE IMPORTANTE: usar los nombres que devuelve tu backend
    setDatosPaciente(data.datos_paciente || null);
    setHistorial(data.historial_clinico || []);
    setMostrarHistorial(true);
  } catch (err) {
    setErrorHistorial(err instanceof Error ? err.message : "Error desconocido");
  } finally {
    setLoadingHistorial(false);
  }
};


  return (
    <>
      <NavBar opaque role="doctor" />

      <div className={styles.container}>
        {loading && <p>Cargando cita...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {cita && (
          <>
            {/* Encabezado */}
            <header className={styles.header}>
              <h1>Detalle de la cita</h1>
              <span className={styles.status}>{cita.estatus_texto}</span>
            </header>

            {/* Información de la cita */}
            <section className={styles.section}>
              <h2>Información de la cita</h2>
              <div className={styles.grid}>
                <div>
                  <label>Folio</label>
                  <p>{cita.folio_cita}</p>
                </div>
                <div>
                  <label>Fecha</label>
                  <p>{formatearFecha(cita.fecha_cita)}</p>
                </div>
                <div>
                  <label>Hora</label>
                  <p>{formatearHora(cita.fecha_cita)}</p>
                </div>
                <div>
                  <label>Especialidad</label>
                  <p>{cita.doctor.especialidad}</p>
                </div>
              </div>
            </section>

            {/* Información del doctor */}
            <section className={styles.section}>
              <h2>Médico asignado</h2>
              <div className={styles.grid}>
                <div>
                  <label>Nombre</label>
                  <p>{cita.doctor.nombre_completo}</p>
                </div>
                <div>
                  <label>Consultorio</label>
                  <p>{cita.consultorio.no_consultorio}</p>
                </div>
              </div>
            </section>

            {/* ACCIONES */}
            <section className={styles.section}>
              <button className={styles.primaryButton} onClick={() => setMostrarReceta(true)}>
                Generar receta
              </button>

              <button className={styles.primaryButton} onClick={verHistorialClinico}>
                Ver historial clínico
              </button>
            </section>

            {/* SECCION RECETA */}
            {mostrarReceta && (
              <section className={styles.section}>
                <h2>Receta médica</h2>

                <label>Diagnóstico</label>
                <textarea value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />

                <label>Observaciones</label>
                <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />

                <h3>Medicamentos</h3>
                {medicamentos.map((m, i) => (
                  <div key={i} className={styles.grid}>
                    <input
                      placeholder="Medicamento"
                      value={m.medicamento}
                      onChange={(e) => {
                        const copy = [...medicamentos];
                        copy[i].medicamento = e.target.value;
                        setMedicamentos(copy);
                      }}
                    />
                    <input
                      placeholder="Tratamiento"
                      value={m.tratamiento}
                      onChange={(e) => {
                        const copy = [...medicamentos];
                        copy[i].tratamiento = e.target.value;
                        setMedicamentos(copy);
                      }}
                    />
                  </div>
                ))}

                <button className={styles.addButton} onClick={agregarMedicamento}>
                  + Agregar medicamento
                </button>

                <button className={styles.primaryButton} onClick={generarReceta}>
                  Confirmar receta
                </button>
              </section>
            )}

            {/* SECCION HISTORIAL */}
{/* SECCION HISTORIAL Y DATOS DEL PACIENTE */}
{mostrarHistorial && datosPaciente && (
  <section className={styles.section}>
    <h2>Datos del paciente</h2>
    <div className={styles.grid}>
      <div>
        <label>Nombre</label>
        <p>{datosPaciente.nombre}</p>
      </div>
      <div>
        <label>Edad</label>
        <p>{datosPaciente.edad}</p>
      </div>
      <div>
        <label>Estatura</label>
        <p>{datosPaciente.estatura} m</p>
      </div>
      <div>
        <label>Peso</label>
        <p>{datosPaciente.peso} kg</p>
      </div>
      <div>
        <label>Tipo de sangre</label>
        <p>{datosPaciente.tipo_sangre}</p>
      </div>
    </div>

    <h2>Historial clínico</h2>

    {loadingHistorial && <p>Cargando historial...</p>}
    {errorHistorial && <p className={styles.error}>{errorHistorial}</p>}

    {historial.length === 0 ? (
      <p>No hay historial clínico disponible.</p>
    ) : (
      historial.map((h, i) => (
        <div key={i} className={styles.card}>
          <p>Fecha: {formatearFecha(h.fecha)}</p>
          <p>Diagnóstico: {h.diagnostico}</p>
          <p>Tratamiento: {h.tratamiento}</p>
          <p>Observaciones: {h.observaciones}</p>
        </div>
      ))
    )}
  </section>
)}



          </>
        )}
      </div>
    </>
  );
};

export default DetailsDate;