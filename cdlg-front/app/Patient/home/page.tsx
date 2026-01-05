"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./home.module.css";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Doctor {
  id_doctor: number;
  nombre_completo: string;
  especialidad: string;
}

interface Consultorio {
  id_consultorio: number;
  no_consultorio: number;
}

interface Cita {
  folio_cita: string;
  fecha_cita: string;
  estatus: string;
  estatus_texto: string;
  fecha_creacion: string;
  doctor: Doctor;
  consultorio: Consultorio;
  costo: number;
  puede_cancelar: boolean;
}

interface Paciente {
  no_ss: string;
  numero_seguridad_social: string;
  nombre_completo: string;
}

interface ApiResponse {
  message: string;
  total: number;
  paciente: Paciente;
  citas: Cita[];
}

const Home = () => {
  const router = useRouter();

  const [citas, setCitas] = useState<Cita[]>([]);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔎 filtros
  const [filtroEstatus, setFiltroEstatus] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Patient/login");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:7000/citas/mis-citas",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al obtener citas");
        }

        const data: ApiResponse = await response.json();

        setCitas(data.citas ?? []);
        setPaciente(data.paciente ?? null);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [router]);

  // 🟢 normaliza a YYYY-MM-DD LOCAL
  const fechaLocalISO = (iso: string) => {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatearHora = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // 📌 citas filtradas (YA SIN BUG DE FECHA)
  const citasFiltradas = useMemo(() => {
    return citas.filter((cita) => {
      const cumpleEstatus =
        filtroEstatus === "todos" || cita.estatus === filtroEstatus;

      const cumpleFecha =
        !filtroFecha || fechaLocalISO(cita.fecha_cita) === filtroFecha;

      return cumpleEstatus && cumpleFecha;
    });
  }, [citas, filtroEstatus, filtroFecha]);

  if (loading) {
    return (
      <>
        <NavBar opaque />
        <div className={styles.container}>
          <p>Cargando citas...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar opaque />
        <div className={styles.container}>
          <p style={{ color: "red" }}>Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar opaque />

      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Image
            src="/Group_19.svg"
            alt="icon"
            width={60}
            height={60}
            className={styles.titleIcon}
          />
          <h1 className={styles.title}>Citas Pendientes</h1>
        </div>

        {paciente && (
          <div className={styles.pacienteInfo}>
            <p>Paciente: {paciente.nombre_completo}</p>
            <p>NSS: {paciente.numero_seguridad_social}</p>
          </div>
        )}

        {/* 🔍 filtros */}
        <div className={styles.filters}>
          <select
            value={filtroEstatus}
            onChange={(e) => setFiltroEstatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="PP">Pendiente pago</option>
            <option value="P">Pendiente</option>
            <option value="AC">Confirmada</option>
            <option value="A">Agendada</option>
            <option value="X">Cancelada</option>
            <option value="FN">Terminada</option>
          </select>

          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />

          <button
            onClick={() => {
              setFiltroEstatus("todos");
              setFiltroFecha("");
            }}
          >
            Limpiar
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Folio</th>
                <th>Doctor</th>
                <th>Especialidad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Consultorio</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>
                    No hay citas con esos filtros
                  </td>
                </tr>
              ) : (
                citasFiltradas.map((cita) => (
                  <tr key={cita.folio_cita}>
                    <td>{cita.folio_cita}</td>
                    <td>{cita.doctor.nombre_completo}</td>
                    <td>
                      <CardiologyIcon />
                      {cita.doctor.especialidad}
                    </td>
                    <td>{cita.estatus_texto}</td>
                    <td>{formatearFecha(cita.fecha_cita)}</td>
                    <td>{formatearHora(cita.fecha_cita)}</td>
                    <td>{cita.consultorio.no_consultorio}</td>
                    <td>${cita.costo}</td>
                    <td>
                      <button
                        className={styles.detailButton}
                        onClick={() =>
                          router.push(
                            `/Patient/datailsDate?folio=${cita.folio_cita}`
                          )
                        }
                      >
                        Detalles
                      </button>
                    </td>
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

export default Home;