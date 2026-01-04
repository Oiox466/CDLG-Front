"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./payment.module.css";
import Cookies from "js-cookie";

type PaymentProps = {
  speciality: string;
  doctor: string;
  doctorId: string;          // id_contrato
  no_consultorio: number;    // número de consultorio
  day: string;               // "2026-01-08"
  hour: string;              // "15:00"
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

  // Arma el JSON que se enviará al backend
  const buildPayload = () => {
    const fechaISO = new Date(`${day}T${hour}:00`).toISOString();

    return {
      id_contrato: Number(doctorId),
      fecha: fechaISO,
      no_consultorio: no_consultorio,
    };
  };

  // Click en "Estoy de acuerdo"
  const handleAgree = () => {
    const payload = buildPayload();
    console.log("JSON QUE SE ENVIARÁ AL DAR 'ESTOY DE ACUERDO':", payload);
    setAgreed(true);
  };

  // Click en "Pagar"
  // Click en "Pagar"
const handlePayment = async () => {
  const token = Cookies.get("token");
  const body = buildPayload();

  setLoadingPayment(true);
  console.log("ENVIANDO AL BACKEND:", body);

  try {
    const response = await fetch(
      "http://localhost:7000/citas/agendar-cita",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del backend:", errorData);
      alert("Error al registrar la cita");
      return;
    }

    // Obtiene el PDF como blob
    const blob = await response.blob();
    // Crea un enlace temporal para descargarlo
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Nombre del PDF, puedes cambiarlo según quieras
    link.download = `Comprobante_Cita_${day}_${hour}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    setPaid(true);
    onNext();
  } catch (error) {
    console.error("Error al agendar cita:", error);
    // alert("Ocurrió un error al generar el comprobante");
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
          <p>
            Día {day} a las {hour}
          </p>

          <p>Verifique que los datos sean correctos</p>

          {!agreed && (
            <button onClick={handleAgree}>
              Estoy de acuerdo
            </button>
          )}

          {agreed && (
            <>
              <p>Precio: ${cost} MXN</p>
              <button
                onClick={handlePayment}
                disabled={loadingPayment}
              >
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