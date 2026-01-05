"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./payment.module.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

/* =======================
   TIPADO DEL TOKEN
======================= */
type DecodedToken = {
  sub: number;        // id_usuario / id_paciente
  tipo_usuario: number;
  iat: number;
  exp: number;
};

type PaymentProps = {
  speciality: string;
  doctor: string;
  doctorId: string;        // id_contrato
  no_consultorio: number;  // número de consultorio
  day: string;             // "2026-01-08"
  hour: string;            // "15:00"
  cost: number;
  onNext: () => void;
};

const Payment = ({
  speciality,
  doctor,
  doctorId,
  no_consultorio,
  day,
  hour,
  cost,
  onNext,
}: PaymentProps) => {
  const [agreed, setAgreed] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const router = useRouter();

  /* =======================
     OBTENER ID DEL TOKEN
  ======================= */
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("No hay token de autenticación");
  }

  const decodedToken = jwtDecode<DecodedToken>(token);

  console.log("TOKEN DECODIFICADO:", decodedToken);
  console.log("TIPO DE USUARIO:", decodedToken.tipo_usuario);
  console.log("ID USUARIO:", decodedToken.sub);

  const id_paciente = decodedToken.sub;

  // Construye el payload
  const buildPayload = () => {
    const fechaISO = new Date(`${day}T${hour}:00`).toISOString();

    return {
      id_contrato: Number(doctorId),
      fecha: fechaISO,
      no_consultorio,
      id_paciente,
    };
  };

  const handleAgree = () => {
    console.log("JSON AL CONFIRMAR:", buildPayload());
    setAgreed(true);
  };

  const handlePayment = async () => {
    setLoadingPayment(true);

    try {
      const response = await fetch(
        "http://localhost:7000/citas/agendar-cita",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(buildPayload()),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del backend:", errorData);
        alert("Error al registrar la cita");
        return;
      }

      // PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Comprobante_Cita_${day}_${hour}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setPaid(true);
      onNext();
    } catch (error) {
      console.error("Error al agendar cita:", error);
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <div className={Styles.container}>
      {!paid && (
        <>
          <h2>Datos de la cita</h2>

          <p>Especialidad: {speciality}</p>
          <p>Doctor: {doctor}</p>
          <p>Día {day} a las {hour}</p>

          {!agreed && (
            <button onClick={handleAgree}>
              Estoy de acuerdo
            </button>
          )}

          {agreed && (
            <>
              <p>Precio: ${cost} MXN</p>
              <button onClick={handlePayment} disabled={loadingPayment}>
                {loadingPayment ? "Procesando..." : "Agendar"}
              </button>
            </>
          )}
        </>
      )}

      {paid && (
        <>
          <p>Pago realizado con éxito</p>
          <button onClick={() => router.push("/Patient/home")}>
            Ir a citas próximas
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;