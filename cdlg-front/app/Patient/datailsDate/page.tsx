"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NavBar from "@/app/components/NavBar/navBar";
import styles from "./datailsDate.module.css";

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

const DetailDate = () => {
  const searchParams = useSearchParams();
  const folio = searchParams.get("folio");
  const router = useRouter();

  const [cita, setCita] = useState<Cita | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!folio) {
      alert("No se recibió folio de cita");
      router.push("/Patient/home");
      return;
    }

    const fetchCita = async () => {
      const token = Cookies.get("token");
      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Patient/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:7000/citas/mis-citas/${folio}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

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
    const utc7 = new Date(fecha.getTime() - 7 * 60 * 60 * 1000);
    return utc7.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleCancel = async () => {
    if (!cita) return;
    if (!window.confirm("¿Deseas cancelar esta cita?")) return;

    setCancelling(true);
    const token = Cookies.get("token");
    if (!token) {
      alert("Debes iniciar sesión");
      router.push("/Patient/login");
      return;
    }

    try {
      const profileRes = await fetch("http://localhost:7000/auth/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!profileRes.ok) throw new Error(await profileRes.text());
      const profileData = await profileRes.json();
      const numero_seguridad_social = Number(profileData[0]?.numero_seguridad_social);
      if (!numero_seguridad_social) throw new Error("No se pudo obtener NSS del paciente");

      const cancelBody = {
        folio_cita: Number(cita.folio_cita),
        numero_seguridad_social,
      };

      const cancelRes = await fetch("http://localhost:7000/citas/cancelar-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(cancelBody),
      });

      if (!cancelRes.ok) throw new Error(await cancelRes.text());

      alert("Cita cancelada exitosamente");
      router.push("/Patient/home");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setCancelling(false);
    }
  };

  const handlePay = async () => {
    if (!cita) return;
    setPaying(true);
    const token = Cookies.get("token");
    if (!token) {
      alert("Debes iniciar sesión");
      router.push("/Patient/login");
      return;
    }

    try {
      const payBody = {
        folio_cita: Number(cita.folio_cita),
        folio_pago: 1,
        pago: Number(cita.costo),
      };

      const res = await fetch("http://localhost:7000/pay/pay-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payBody),
      });

      if (!res.ok) throw new Error(await res.text());
      alert("Pago realizado exitosamente");
      router.push("/Patient/home");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <NavBar opaque />

      <div className={styles.container}>
        <h1 className={styles.header}>Detalles de la Cita</h1>

        {loading && <p className={styles.loading}>Cargando cita...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {cita && (
          <div className={styles.section}>
            <div className={styles.grid}>
              <div>
                <label>Folio</label>
                <p>{cita.folio_cita}</p>
              </div>
              <div>
                <label>Estado</label>
                <p>{cita.estatus_texto}</p>
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
                <label>Doctor</label>
                <p>{cita.doctor.nombre_completo}</p>
              </div>
              <div>
                <label>Especialidad</label>
                <p>{cita.doctor.especialidad}</p>
              </div>
              <div>
                <label>Consultorio</label>
                <p>{cita.consultorio.no_consultorio}</p>
              </div>
              <div>
                <label>Costo</label>
                <p>${cita.costo}</p>
              </div>
              <div>
                <label>Puede cancelar</label>
                <p>{cita.puede_cancelar ? "Sí" : "No"}</p>
              </div>
            </div>

            {cita.puede_cancelar && (
              <button
                className={styles.primaryButton}
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? "Cancelando..." : "Cancelar cita"}
              </button>
            )}

            {cita.estatus === "PP" ? (
              <button
                className={styles.primaryButton}
                onClick={handlePay}
                disabled={paying}
              >
                {paying ? "Procesando pago..." : "Pagar"}
              </button>
            ) : (
              <button className={styles.primaryButton} disabled>
                Pagado
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailDate;