"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
    console.log("Folio recibido:", folio);
    if (!folio) {
      alert("No se recibió folio de cita");
      router.push("/Patient/home");
      return;
    }

    const fetchCita = async () => {
      const token = Cookies.get("token");
      console.log("Token obtenido:", token);

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

        console.log("Respuesta fetch cita:", res);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error al obtener la cita");
        }

        const data = await res.json();
        console.log("Datos recibidos de la cita:", data);

        if (data.citas && data.citas.length > 0) {
          setCita(data.citas[0]);
          console.log("Cita seteada:", data.citas[0]);
        } else {
          setError("Cita no encontrada");
        }
      } catch (err) {
        console.error("Error fetch cita:", err);
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
    const confirmCancel = window.confirm("¿Deseas cancelar esta cita?");
    if (!confirmCancel) return;

    setCancelling(true);
    const token = Cookies.get("token");
    console.log("Token para cancelar:", token);

    if (!token) {
      alert("Debes iniciar sesión");
      router.push("/Patient/login");
      return;
    }

    try {
      // Obtener NSS del paciente
      const profileRes = await fetch("http://localhost:7000/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Respuesta fetch perfil:", profileRes);

      if (!profileRes.ok) {
        const text = await profileRes.text();
        throw new Error(text || "Error al obtener perfil del paciente");
      }

      const profileData = await profileRes.json();
      console.log("Datos recibidos del perfil:", profileData);

      const numero_seguridad_social = Number(profileData[0]?.numero_seguridad_social);
      console.log("NSS obtenido:", numero_seguridad_social);

      if (!numero_seguridad_social) throw new Error("No se pudo obtener NSS del paciente");

      // Cancelar cita
      const cancelBody = {
        folio_cita: Number(cita.folio_cita),
        numero_seguridad_social,
      };
      console.log("Body para cancelar cita:", cancelBody);

      const cancelRes = await fetch("http://localhost:7000/citas/cancelar-cita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cancelBody),
      });

      console.log("Respuesta cancelar cita:", cancelRes);

      if (!cancelRes.ok) {
        const text = await cancelRes.text();
        throw new Error(text || "Error al cancelar la cita");
      }

      alert("Cita cancelada exitosamente");
      router.push("/Patient/home");
    } catch (err) {
      console.error("Error cancelar cita:", err);
      alert(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setCancelling(false);
    }
  };

  const handlePay = async () => {
    if (!cita) return;
    setPaying(true);
    const token = Cookies.get("token");
    console.log("Token para pago:", token);

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
      console.log("Body para pago:", payBody);

      const res = await fetch("http://localhost:7000/pay/pay-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payBody),
      });

      console.log("Respuesta del pago:", res);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al realizar el pago");
      }

      const data = await res.json();
      console.log("Datos de respuesta del pago:", data);

      alert("Pago realizado exitosamente");
      router.push("/Patient/home");
    } catch (err) {
      console.error("Error en el pago:", err);
      alert(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <NavBar opaque />

      <div className={styles.container}>
        <h1 className={styles.title}>Detalles de la Cita</h1>

        {loading && <p>Cargando cita...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {cita && (
          <div className={styles.details}>
            <p><strong>Folio:</strong> {cita.folio_cita}</p>
            <p><strong>Estado:</strong> {cita.estatus_texto}</p>
            <p><strong>Fecha:</strong> {formatearFecha(cita.fecha_cita)}</p>
            <p><strong>Hora:</strong> {formatearHora(cita.fecha_cita)}</p>
            <p><strong>Doctor:</strong> {cita.doctor.nombre_completo}</p>
            <p><strong>Especialidad:</strong> {cita.doctor.especialidad}</p>
            <p><strong>Consultorio:</strong> {cita.consultorio.no_consultorio}</p>
            <p><strong>Costo:</strong> ${cita.costo}</p>
            <p><strong>Puede cancelar:</strong> {cita.puede_cancelar ? "Sí" : "No"}</p>

            {/* Botón de cancelar */}
            {cita.puede_cancelar && (
              <button
                className={styles.cancelButton}
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? "Cancelando..." : "Cancelar cita"}
              </button>
            )}

            {/* Botón de pagar solo si la cita está pendiente */}
            {cita.estatus === "PP" ? (
              <button
                className={styles.payButton}
                onClick={handlePay}
                disabled={paying}
              >
                {paying ? "Procesando pago..." : "Pagar"}
              </button>
            ) : (
              <button className={styles.payButton} disabled>
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